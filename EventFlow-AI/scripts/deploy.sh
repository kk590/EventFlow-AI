#!/bin/bash

# EventFlow AI Deployment Script
# Handles deployment to various platforms

echo "🚀 EventFlow AI Deployment Script"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Deployment options
show_menu() {
    echo "Select deployment option:"
    echo "1. Local deployment (development)"
    echo "2. Docker deployment"
    echo "3. Heroku deployment"
    echo "4. AWS deployment"
    echo "5. Manual deployment"
    echo "6. Exit"
    echo ""
    read -p "Enter your choice (1-6): " choice
    echo ""
}

# Local deployment
deploy_local() {
    print_info "Starting local deployment..."

    cd ../backend

    # Check if virtual environment exists
    if [ ! -d "venv" ]; then
        print_error "Virtual environment not found. Run setup script first."
        return 1
    fi

    # Activate virtual environment
    source venv/bin/activate 2>/dev/null || source venv/Scripts/activate 2>/dev/null

    # Install/update dependencies
    print_info "Installing dependencies..."
    pip install -r requirements.txt

    # Set environment variables
    print_info "Setting environment variables..."
    python env_config.py

    # Start the application
    print_info "Starting EventFlow AI server..."
    print_status "Server will be available at http://localhost:5000"
    print_warning "Press Ctrl+C to stop the server"

    python app.py
}

# Docker deployment
deploy_docker() {
    print_info "Starting Docker deployment..."

    # Check if Docker is installed
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker first."
        return 1
    fi

    # Check if docker-compose exists
    if [ ! -f "docker-compose.yml" ]; then
        print_info "Creating docker-compose.yml..."

        cat > docker-compose.yml << EOF
version: '3.8'

services:
  eventflow-backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production
    volumes:
      - ./backend/.env:/app/.env
    restart: unless-stopped

  eventflow-frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - eventflow-backend
    restart: unless-stopped
EOF

        print_status "docker-compose.yml created"
    fi

    # Create Dockerfile for backend
    if [ ! -f "backend/Dockerfile" ]; then
        print_info "Creating backend Dockerfile..."

        cat > backend/Dockerfile << EOF
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "app.py"]
EOF

        print_status "Backend Dockerfile created"
    fi

    # Create Dockerfile for frontend
    if [ ! -f "frontend/Dockerfile" ]; then
        print_info "Creating frontend Dockerfile..."

        cat > frontend/Dockerfile << EOF
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
EOF

        print_status "Frontend Dockerfile created"
    fi

    # Build and start containers
    print_info "Building and starting Docker containers..."
    docker-compose up --build -d

    if [ $? -eq 0 ]; then
        print_status "Docker deployment successful!"
        print_info "Frontend: http://localhost:3000"
        print_info "Backend: http://localhost:5000"
        print_info "To stop: docker-compose down"
    else
        print_error "Docker deployment failed"
        return 1
    fi
}

# Heroku deployment
deploy_heroku() {
    print_info "Starting Heroku deployment..."

    # Check if Heroku CLI is installed
    if ! command_exists heroku; then
        print_error "Heroku CLI is not installed."
        print_info "Install from: https://devcenter.heroku.com/articles/heroku-cli"
        return 1
    fi

    # Check if logged in
    if ! heroku whoami > /dev/null 2>&1; then
        print_error "Not logged in to Heroku. Run 'heroku login' first."
        return 1
    fi

    cd ../backend

    # Create Heroku app if it doesn't exist
    if [ -z "$HEROKU_APP_NAME" ]; then
        read -p "Enter Heroku app name: " HEROKU_APP_NAME
    fi

    heroku create $HEROKU_APP_NAME

    # Set environment variables
    print_info "Setting environment variables on Heroku..."

    # Read .env file and set variables
    if [ -f ".env" ]; then
        while IFS='=' read -r key value; do
            if [[ ! $key =~ ^# ]] && [ ! -z "$key" ]; then
                heroku config:set "$key=$value" --app $HEROKU_APP_NAME
            fi
        done < .env
    fi

    # Deploy
    print_info "Deploying to Heroku..."
    git push heroku main

    if [ $? -eq 0 ]; then
        print_status "Heroku deployment successful!"
        print_info "App URL: https://$HEROKU_APP_NAME.herokuapp.com"
    else
        print_error "Heroku deployment failed"
        return 1
    fi
}

# AWS deployment
deploy_aws() {
    print_info "Starting AWS deployment..."

    # Check if AWS CLI is installed
    if ! command_exists aws; then
        print_error "AWS CLI is not installed."
        print_info "Install from: https://aws.amazon.com/cli/"
        return 1
    fi

    print_warning "AWS deployment requires manual configuration."
    print_info "Recommended approach:"
    echo "1. Use Elastic Beanstalk for the backend"
    echo "2. Use S3 + CloudFront for the frontend"
    echo "3. Use RDS for database (if needed)"
    echo "4. Use API Gateway + Lambda (alternative)"
    echo ""
    read -p "Do you want to continue with basic AWS setup? (y/n): " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Setting up basic AWS infrastructure..."

        # Create S3 bucket for frontend
        read -p "Enter S3 bucket name for frontend: " BUCKET_NAME
        aws s3 mb s3://$BUCKET_NAME

        # Upload frontend build
        cd ../frontend
        npm run build
        aws s3 sync build/ s3://$BUCKET_NAME --delete

        print_status "Frontend deployed to S3"
        print_info "Configure CloudFront distribution for the bucket"
    fi
}

# Manual deployment
deploy_manual() {
    print_info "Manual deployment guide..."

    echo "Follow these steps for manual deployment:"
    echo ""
    echo "1. Choose a hosting provider (DigitalOcean, Linode, Vultr, etc.)"
    echo ""
    echo "2. Server setup:"
    echo "   sudo apt update && sudo apt upgrade"
    echo "   sudo apt install python3 python3-pip nginx"
    echo ""
    echo "3. Application setup:"
    echo "   git clone <your-repo>"
    echo "   cd EventFlow-AI/backend"
    echo "   python3 -m venv venv"
    echo "   source venv/bin/activate"
    echo "   pip install -r requirements.txt"
    echo ""
    echo "4. Environment configuration:"
    echo "   cp .env.example .env"
    echo "   nano .env  # Edit with your API keys"
    echo ""
    echo "5. Start application:"
    echo "   python app.py"
    echo ""
    echo "6. Configure Nginx (optional):"
    echo "   sudo nano /etc/nginx/sites-available/eventflow"
    echo "   # Add server block configuration"
    echo "   sudo ln -s /etc/nginx/sites-available/eventflow /etc/nginx/sites-enabled/"
    echo "   sudo systemctl restart nginx"
    echo ""
    echo "7. Set up SSL certificate:"
    echo "   sudo apt install certbot python3-certbot-nginx"
    echo "   sudo certbot --nginx -d yourdomain.com"
    echo ""
    read -p "Press Enter to continue..."
}

# Main deployment logic
main() {
    while true; do
        show_menu

        case $choice in
            1)
                deploy_local
                ;;
            2)
                deploy_docker
                ;;
            3)
                deploy_heroku
                ;;
            4)
                deploy_aws
                ;;
            5)
                deploy_manual
                ;;
            6)
                print_info "Goodbye!"
                exit 0
                ;;
            *)
                print_error "Invalid option. Please choose 1-6."
                ;;
        esac

        echo ""
        read -p "Do you want to perform another deployment? (y/n): " -n 1 -r
        echo ""

        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            break
        fi
    done
}

# Run main function
main
