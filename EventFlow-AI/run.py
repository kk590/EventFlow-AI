#!/usr/bin/env python3
"""
EventFlow-AI Startup Script
This script provides a convenient way to start the backend server.
"""

import os
import sys

# Add backend directory to path
backend_dir = os.path.join(os.path.dirname(__file__), 'backend')
sys.path.insert(0, backend_dir)

if __name__ == '__main__':
    # Change to backend directory
    os.chdir(backend_dir)
    
    # Import and run the Flask app
    try:
        from app import app
        print("Starting EventFlow-AI Backend Server...")
        print("Server running at http://localhost:5000")
        app.run(debug=True, host='0.0.0.0', port=5000)
    except ImportError as e:
        print(f"Error: {e}")
        print("Please make sure you have installed the requirements:")
        print("  pip install -r requirements.txt")
        sys.exit(1)
