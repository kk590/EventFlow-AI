#!/usr/bin/env python3
"""
Test script for EventFlow AI webhook endpoints
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

BASE_URL = "http://localhost:5000"

def test_voice_webhook():
    """Test Twilio voice webhook"""
    print("Testing Voice Webhook...")
    
    test_data = {
        'From': '+1234567890',
        'CallSid': 'TEST_CALL_SID_123',
        'CallStatus': 'ringing'
    }
    
    try:
        response = requests.post(f"{BASE_URL}/webhook/twilio/voice", data=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}...")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_sms_webhook():
    """Test Twilio SMS webhook"""
    print("Testing SMS Webhook...")
    
    test_data = {
        'From': '+1234567890',
        'Body': 'Hi, I need help planning a corporate event for 100 people in March.',
        'MessageSid': 'TEST_SMS_SID_123'
    }
    
    try:
        response = requests.post(f"{BASE_URL}/webhook/twilio/sms", data=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_transcription_webhook():
    """Test transcription webhook"""
    print("Testing Transcription Webhook...")
    
    test_data = {
        'TranscriptionText': 'I am planning a wedding for 150 guests in June. We need catering and photography services.',
        'CallSid': 'TEST_CALL_SID_123',
        'Confidence': '0.85'
    }
    
    try:
        response = requests.post(f"{BASE_URL}/webhook/twilio/transcription", data=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_recording_webhook():
    """Test recording webhook"""
    print("Testing Recording Webhook...")
    
    test_data = {
        'RecordingUrl': 'https://api.twilio.com/2010-04-01/Accounts/AC123/Recordings/RE123',
        'CallSid': 'TEST_CALL_SID_123',
        'From': '+1234567890'
    }
    
    try:
        response = requests.post(f"{BASE_URL}/webhook/twilio/recording", data=test_data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text[:200]}...")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_n8n_integration():
    """Test n8n webhook integration"""
    print("Testing n8n Integration Webhook...")
    
    test_payload = {
        'eventType': 'new_lead',
        'data': {
            'fromNumber': '+1234567890',
            'messageId': 'TEST_123',
            'transcription': 'Looking to plan a birthday party for 50 people',
            'source': 'voice',
            'categories': ['Birthday Party', 'Entertainment']
        }
    }
    
    try:
        # This would be the n8n webhook URL - adjust based on your n8n setup
        n8n_url = "http://localhost:5678/webhook/eventflow-webhook"
        response = requests.post(n8n_url, json=test_payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return response.status_code == 200
    except Exception as e:
        print(f"Error: {e}")
        return False

def test_airtable_connection():
    """Test Airtable API connection"""
    print("Testing Airtable Connection...")
    
    api_key = os.getenv('AIRTABLE_API_KEY')
    base_id = os.getenv('AIRTABLE_BASE_ID')
    
    if not api_key or not base_id:
        print("Airtable credentials not configured")
        return False
    
    url = f"https://api.airtable.com/v0/meta/bases/{base_id}/tables"
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    try:
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            print("✅ Airtable connection successful")
            tables = response.json().get('tables', [])
            print(f"Found {len(tables)} tables in base")
            return True
        else:
            print(f"❌ Airtable connection failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"Error: {e}")
        return False

def run_all_tests():
    """Run all test functions"""
    print("🚀 Running EventFlow AI Integration Tests")
    print("=" * 50)
    
    tests = [
        ("Airtable Connection", test_airtable_connection),
        ("Voice Webhook", test_voice_webhook),
        ("SMS Webhook", test_sms_webhook),
        ("Transcription Webhook", test_transcription_webhook),
        ("Recording Webhook", test_recording_webhook),
        ("n8n Integration", test_n8n_integration)
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{test_name}:")
        result = test_func()
        results.append((test_name, result))
        print("✅ Pass" if result else "❌ Fail")
    
    print("\n" + "=" * 50)
    print("📊 Test Results Summary:")
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    for test_name, result in results:
        status = "✅" if result else "❌"
        print(f"{status} {test_name}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 All tests passed! The system is ready.")
    else:
        print("\n⚠️  Some tests failed. Please check your configuration.")
    
    return passed == total

if __name__ == "__main__":
    # Check if server is running
    try:
        health_check = requests.get(f"{BASE_URL}/", timeout=5)
        if health_check.status_code == 200:
            run_all_tests()
        else:
            print("❌ Server not running. Please start the server with: python app.py")
    except requests.ConnectionError:
        print("❌ Server not running. Please start the server with: python app.py")
    except Exception as e:
        print(f"Error: {e}")
