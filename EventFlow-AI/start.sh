#!/bin/bash

# EventFlow AI Startup Script
# This script sets up and starts the EventFlow AI platform

echo "🚀 Starting EventFlow AI Platform..."
echo "==================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed (for frontend)
if ! command -v node &> /dev/null; then
    echo "⚠️  Node.js is not installed. Frontend will not be started."
    FRONTEND_AVAILABLE=false
else
    FRONTEND_AVAILABLE=true
fi

# Function to check and install dependencies
check_dependencies() {
    echo "📦 Checking dependencies..."
    
    # Check backend dependencies
    if [ ! -f "backend/requirements.txt" ]; then
        echo "❌ Backend requirements.txt not found"
        return 1
    fi
    
    # Install Python dependencies
    echo "Installing Python dependencies..."
    pip3 install -r backend/requirements.txt
    
    if [ "$FRONTEND_AVAILABLE" = true ]; then
        # Check frontend dependencies
        if [ -f "frontend/package.json" ]; then
            echo "Installing Node.js dependencies..."
            cd frontend && npm install && cd ..
        fi
    fi
    
    return 0
}

# Function to start backend
start_backend() {
    echo "🔧 Starting backend server..."
    cd backend
    
    # Check if .env file exists
    if [ ! -f ".env" ]; then
        echo "⚠️  .env file not found. Copying from .env.example..."
        cp .env.example .env
        echo "Please edit backend/.env with your API keys before continuing."
        exit 1
    fi
    
    # Start Flask server
    python3 app.py &
    BACKEND_PID=$!
    echo "Backend started with PID: $BACKEND_PID"
    cd ..
}

# Function to start frontend
start_frontend() {
    if [ "$FRONTEND_AVAILABLE" = true ]; then
        echo "🎨 Starting frontend..."
        cd frontend
        npm start &
        FRONTEND_PID=$!
        echo "Frontend started with PID: $FRONTEND_PID"
        cd ..
    else
        echo "⚠️  Frontend not started (Node.js not installed)"
    fi
}

# Function to start n8n (if available)
start_n8n() {
    if command -v n8n &> /dev/null; then
        echo "⚡ Starting n8n automation..."
        n8n start &
        N8N_PID=$!
        echo "n8n started with PID: $N8N_PID"
    else
        echo "⚠️  n8n not installed. Install with: npm install -g n8n"
    fi
}

# Function to display status
show_status() {
    echo ""
    echo "✅ EventFlow AI Platform Status:"
    echo "==================================="
    echo "Backend:  http://localhost:5000"
    if [ "$FRONTEND_AVAILABLE" = true ]; then
        echo "Frontend: http://localhost:3000"
    fi
    echo "n8n:      http://localhost:5678 (if installed)"
    echo ""
    echo "📋 Next steps:"
    echo "1. Configure Twilio webhooks to point to your backend"
    echo "2. Set up Airtable base with the required tables"
    echo "3. Import n8n workflow from n8n-workflows/eventflow-automation.json"
    echo ""
    echo "Press Ctrl+C to stop all services"
}

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping EventFlow AI services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    if [ ! -z "$N8N_PID" ]; then
        kill $N8N_PID 2>/dev/null
    fi
    echo "✅ All services stopped"
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Main execution
check_dependencies
start_backend
start_frontend
start_n8n
show_status

# Wait for processes
wait
