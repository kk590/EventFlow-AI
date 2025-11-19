#!/bin/bash

# EventFlow AI Integration Setup Script
# This script helps set up all required integrations

echo "🚀 EventFlow AI Integration Setup"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to print status
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
echo "Checking prerequisites..."

if command_exists python3; then
    print_status "Python 3 found"
else
    print_error "Python 3 not found. Please install Python 3.7+"
    exit 1
fi

if command_exists pip; then
    print_status "pip found"
else
    print_error "pip not found. Please install pip"
    exit 1
fi

if command_exists node; then
    print_status "Node.js found"
else
    print_warning "Node.js not found. Frontend will not be available"
fi

if command_exists npm; then
    print_status "npm found"
else
    print_warning "npm not found. Frontend dependencies cannot be installed"
fi

# Setup backend
echo ""
echo "Setting up backend..."

cd ../backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
    print_status "Virtual environment created"
else
    print_status "Virtual environment already exists"
fi

# Activate virtual environment
source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null

# Install Python dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

if [ $? -eq 0 ]; then
    print_status "Python dependencies installed"
else
    print_error "Failed to install Python dependencies"
    exit 1
fi

# Setup frontend (if Node.js is available)
if command_exists node && command_exists npm; then
    echo ""
    echo "Setting up frontend..."

    cd ../frontend

    echo "Installing Node.js dependencies..."
    npm install

    if [ $? -eq 0 ]; then
        print_status "Frontend dependencies installed"
    else
        print_error "Failed to install frontend dependencies"
    fi

    cd ../backend
else
    print_warning "Skipping frontend setup (Node.js/npm not available)"
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo ""
    echo "Creating .env file..."
    cp .env.example .env 2>/dev/null || touch .env

    echo "Please edit the .env file with your API keys:"
    echo "- TWILIO_ACCOUNT_SID"
    echo "- TWILIO_AUTH_TOKEN"
    echo "- TWILIO_PHONE_NUMBER"
    echo "- ASSEMBLYAI_API_KEY"
    echo "- AIRTABLE_API_KEY"
    echo "- AIRTABLE_BASE_ID"

    print_warning ".env file created. Please configure your API keys"
else
    print_status ".env file already exists"
fi

# Create logs directory
mkdir -p ../logs

# Test setup
echo ""
echo "Testing setup..."

python -c "import flask, twilio, assemblyai, requests; print('✅ All Python dependencies working')"

if [ $? -eq 0 ]; then
    print_status "Basic dependency test passed"
else
    print_error "Dependency test failed"
fi

# Deactivate virtual environment
deactivate

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit ../backend/.env with your API keys"
echo "2. Run 'python ../backend/env_config.py' to set environment variables"
echo "3. Start the server with 'python ../backend/app.py'"
echo "4. Run tests with 'python ../backend/test_webhooks.py'"
echo ""
echo "For detailed setup instructions, see ../documentation/INTEGRATION_GUIDE.md"
