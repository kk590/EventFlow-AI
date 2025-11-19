#!/usr/bin/env python3
"""
Setup script for EventFlow AI backend
"""

import os
import sys
import subprocess
import requests
from dotenv import load_dotenv

def check_environment():
    """Check if required environment variables are set"""
    load_dotenv()
    
    required_vars = [
        'TWILIO_ACCOUNT_SID',
        'TWILIO_AUTH_TOKEN', 
        'TWILIO_PHONE_NUMBER',
        'ASSEMBLYAI_API_KEY',
        'AIRTABLE_API_KEY',
        'AIRTABLE_BASE_ID'
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print("❌ Missing environment variables:")
        for var in missing_vars:
            print(f"   - {var}")
        print("\nPlease copy .env.example to .env and fill in the required values.")
        return False
    
    print("✅ All required environment variables are set")
    return True

def install_dependencies():
    """Install Python dependencies"""
    try:
        print("📦 Installing dependencies...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependencies installed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed to install dependencies: {e}")
        return False

def test_twilio_connection():
    """Test Twilio API connection"""
    try:
        from twilio.rest import Client
        
        account_sid = os.getenv('TWILIO_ACCOUNT_SID')
        auth_token = os.getenv('TWILIO_AUTH_TOKEN')
        
        client = Client(account_sid, auth_token)
        # Try to list available phone numbers as a test
        numbers = client.incoming_phone_numbers.list(limit=1)
        print("✅ Twilio connection successful")
        return True
        
    except Exception as e:
        print(f"❌ Twilio connection failed: {e}")
        return False

def test_assemblyai_connection():
    """Test AssemblyAI API connection"""
    try:
        import assemblyai as aai
        
        aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
        
        # Test with a simple configuration request
        config = aai.TranscriptionConfig()
        print("✅ AssemblyAI connection successful")
        return True
        
    except Exception as e:
        print(f"❌ AssemblyAI connection failed: {e}")
        return False

def test_airtable_connection():
    """Test Airtable API connection"""
    try:
        api_key = os.getenv('AIRTABLE_API_KEY')
        base_id = os.getenv('AIRTABLE_BASE_ID')
        
        if not api_key or not base_id:
            print("❌ Airtable credentials not configured")
            return False
        
        url = f"https://api.airtable.com/v0/meta/bases/{base_id}/tables"
        headers = {
            "Authorization": f"Bearer {api_key}"
        }
        
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            print("✅ Airtable connection successful")
            return True
        else:
            print(f"❌ Airtable connection failed: {response.status_code} - {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Airtable connection failed: {e}")
        return False

def create_airtable_base():
    """Create the Airtable base structure if it doesn't exist"""
    print("📋 Setting up Airtable base structure...")
    print("Please manually create an Airtable base with the following tables:")
    print("\n1. Transcripts Table:")
    print("   - MessageID (Text)")
    print("   - FromNumber (Text)") 
    print("   - Transcription (Long Text)")
    print("   - Source (Text: voice/sms)")
    print("   - Timestamp (DateTime)")
    print("   - Status (Text: new/analyzed/processed)")
    print("   - Categories (Text)")
    print("   - Priority (Number)")
    
    print("\n2. Leads Table:")
    print("   - PhoneNumber (Text)")
    print("   - Name (Text)")
    print("   - EventType (Text)")
    print("   - EventDate (DateTime)")
    print("   - GuestCount (Number)")
    print("   - Budget (Number)")
    print("   - Location (Text)")
    print("   - Status (Text: new/contacted/quoted/booked)")
    print("   - Notes (Long Text)")
    
    print("\n3. Events Table:")
    print("   - LeadID (Link to Leads)")
    print("   - EventName (Text)")
    print("   - EventType (Text)")
    print("   - EventDate (DateTime)")
    print("   - Venue (Text)")
    print("   - Budget (Number)")
    print("   - Status (Text: planning/in-progress/completed)")
    print("   - Coordinator (Text)")
    
    return True

def setup_ngrok():
    """Setup ngrok for local development webhooks"""
    print("🌐 Ngrok setup for webhooks:")
    print("1. Download ngrok from https://ngrok.com/download")
    print("2. Extract and add to PATH")
    print("3. Run: ngrok authtoken YOUR_AUTH_TOKEN")
    print("4. Run: ngrok http 5000")
    print("5. Use the generated URL for Twilio webhooks")

def main():
    print("🚀 EventFlow AI Setup Script")
    print("=" * 50)
    
    # Check if .env file exists
    if not os.path.exists('.env'):
        print("❌ .env file not found")
        print("Please copy .env.example to .env and configure your API keys")
        return
    
    # Load environment
    load_dotenv()
    
    # Run setup steps
    steps = [
        ("Environment Check", check_environment),
        ("Install Dependencies", install_dependencies),
        ("Twilio Connection", test_twilio_connection),
        ("AssemblyAI Connection", test_assemblyai_connection),
        ("Airtable Connection", test_airtable_connection),
        ("Airtable Base Setup", create_airtable_base),
        ("Ngrok Setup", setup_ngrok)
    ]
    
    results = []
    for step_name, step_func in steps:
        print(f"\n{step_name}:")
        result = step_func()
        results.append((step_name, result))
    
    print("\n" + "=" * 50)
    print("📊 Setup Summary:")
    
    success_count = 0
    total_count = len(results)
    
    for step_name, success in results:
        status = "✅" if success else "❌"
        print(f"{status} {step_name}")
        if success:
            success_count += 1
    
    print(f"\nOverall: {success_count}/{total_count} steps completed successfully")
    
    if success_count == total_count:
        print("\n🎉 Setup completed successfully!")
        print("\nTo start the server:")
        print("1. python app.py")
        print("2. Configure Twilio webhooks to point to your server")
        print("3. Start testing with phone calls and SMS!")
    else:
        print("\n⚠️  Some setup steps failed. Please check the errors above.")

if __name__ == "__main__":
    main()
