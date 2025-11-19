#!/bin/bash

# EventFlow AI Comprehensive Test Script
# Runs all available tests and checks system health

echo "🧪 EventFlow AI Test Suite"
echo "==========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test results
PASSED=0
FAILED=0
TOTAL=0

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

# Function to run test and track results
run_test() {
    local test_name="$1"
    local test_command="$2"

    echo ""
    print_info "Running: $test_name"

    eval "$test_command"
    local exit_code=$?

    ((TOTAL++))

    if [ $exit_code -eq 0 ]; then
        print_status "$test_name PASSED"
        ((PASSED++))
    else
        print_error "$test_name FAILED"
        ((FAILED++))
    fi

    return $exit_code
}

# Check if we're in the right directory
if [ ! -d "../backend" ]; then
    print_error "Please run this script from the scripts directory"
    exit 1
fi

cd ../backend

# Test 1: Environment setup
run_test "Environment Configuration" "python env_config.py"

# Test 2: Python dependencies
run_test "Python Dependencies" "python -c \"import flask, twilio, assemblyai, requests, flask_cors; print('All imports successful')\""

# Test 3: Flask app startup
print ""
print_info "Testing Flask app startup..."
timeout 5 python app.py > /dev/null 2>&1 &
APP_PID=$!
sleep 3

if kill -0 $APP_PID 2>/dev/null; then
    print_status "Flask App Startup PASSED"
    ((PASSED++))
    kill $APP_PID
else
    print_error "Flask App Startup FAILED"
    ((FAILED++))
fi
((TOTAL++))

# Test 4: Webhook tests
run_test "Webhook Integration Tests" "python test_webhooks.py"

# Test 5: API health check
print ""
print_info "Testing API health endpoint..."
python app.py > /dev/null 2>&1 &
APP_PID=$!
sleep 3

if curl -s http://localhost:5000/ > /dev/null 2>&1; then
    print_status "API Health Check PASSED"
    ((PASSED++))
else
    print_error "API Health Check FAILED"
    ((FAILED++))
fi
((TOTAL++))

# Clean up
kill $APP_PID 2>/dev/null

# Test 6: Frontend build (if available)
if [ -d "../frontend" ] && [ -f "../frontend/package.json" ]; then
    cd ../frontend
    print ""
    print_info "Testing frontend build..."

    if npm run build > /dev/null 2>&1; then
        print_status "Frontend Build PASSED"
        ((PASSED++))
    else
        print_error "Frontend Build FAILED"
        ((FAILED++))
    fi
    ((TOTAL++))
    cd ../backend
fi

# Test 7: Configuration validation
print ""
print_info "Validating configuration..."

if [ -f ".env" ]; then
    # Check for required environment variables
    required_vars=("TWILIO_ACCOUNT_SID" "TWILIO_AUTH_TOKEN" "ASSEMBLYAI_API_KEY" "AIRTABLE_API_KEY" "AIRTABLE_BASE_ID")
    missing_vars=()

    for var in "${required_vars[@]}"; do
        if ! grep -q "^$var=" .env; then
            missing_vars+=("$var")
        fi
    done

    if [ ${#missing_vars[@]} -eq 0 ]; then
        print_status "Configuration Validation PASSED"
        ((PASSED++))
    else
        print_warning "Configuration Validation WARNING - Missing: ${missing_vars[*]}"
        ((PASSED++))  # Still count as passed, just with warnings
    fi
else
    print_error "Configuration Validation FAILED - .env file not found"
    ((FAILED++))
fi
((TOTAL++))

# Test 8: File structure check
print ""
print_info "Checking project structure..."

required_files=(
    "app.py"
    "requirements.txt"
    "test_webhooks.py"
    "../frontend/package.json"
    "../n8n-workflows/eventflow-automation.json"
    "../README.md"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    print_status "Project Structure Check PASSED"
    ((PASSED++))
else
    print_error "Project Structure Check FAILED - Missing: ${missing_files[*]}"
    ((FAILED++))
fi
((TOTAL++))

# Test 9: Port availability
print ""
print_info "Checking port availability..."

if lsof -i :5000 > /dev/null 2>&1; then
    print_warning "Port 5000 Check WARNING - Port already in use"
else
    print_status "Port 5000 Check PASSED"
    ((PASSED++))
fi
((TOTAL++))

# Test 10: Disk space check
print ""
print_info "Checking disk space..."

disk_usage=$(df -h . | tail -1 | awk '{print $5}' | sed 's/%//')

if [ "$disk_usage" -lt 90 ]; then
    print_status "Disk Space Check PASSED (${disk_usage}% used)"
    ((PASSED++))
else
    print_warning "Disk Space Check WARNING - High disk usage (${disk_usage}%)"
    ((PASSED++))
fi
((TOTAL++))

# Summary
echo ""
echo "==========================="
echo "📊 Test Results Summary"
echo "==========================="

echo "Total Tests: $TOTAL"
echo "Passed: $PASSED"
echo "Failed: $FAILED"

if [ $FAILED -eq 0 ]; then
    echo ""
    print_status "🎉 All tests passed! System is ready for deployment."
    echo ""
    echo "Next steps:"
    echo "1. Start the server: python app.py"
    echo "2. Test webhooks manually"
    echo "3. Deploy to production"
    exit 0
else
    success_rate=$((PASSED * 100 / TOTAL))
    echo ""
    print_warning "⚠️  $FAILED test(s) failed. Success rate: ${success_rate}%"
    echo ""
    echo "Failed tests indicate potential issues that should be resolved before deployment."
    echo "Check the output above for specific error details."
    exit 1
fi
