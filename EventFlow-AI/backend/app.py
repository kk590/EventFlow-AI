from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from twilio.twiml.voice_response import VoiceResponse
import assemblyai as aai
import requests
import json
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_PHONE_NUMBER = os.getenv('TWILIO_PHONE_NUMBER')
ASSEMBLYAI_API_KEY = os.getenv('ASSEMBLYAI_API_KEY')
AIRTABLE_API_KEY = os.getenv('AIRTABLE_API_KEY')
AIRTABLE_BASE_ID = os.getenv('AIRTABLE_BASE_ID')

# Initialize AssemblyAI
aai.settings.api_key = ASSEMBLYAI_API_KEY

@app.route('/')
def home():
    return jsonify({"message": "EventFlow AI API Server", "status": "running"})

@app.route('/webhook/twilio/voice', methods=['POST'])
def twilio_voice_webhook():
    """Handle incoming voice calls from Twilio"""
    try:
        from_number = request.form.get('From')
        call_sid = request.form.get('CallSid')
        
        # Create TwiML response
        response = VoiceResponse()
        response.say("Thank you for calling EventFlow AI. Please tell us about your event planning needs.")
        response.record(
            action='/webhook/twilio/recording',
            method='POST',
            max_length=60,
            transcribe=True,
            transcribe_callback='/webhook/twilio/transcription'
        )
        
        # Log the incoming call
        log_call_event('incoming_call', {
            'from_number': from_number,
            'call_sid': call_sid,
            'timestamp': datetime.now().isoformat()
        })
        
        return str(response)
        
    except Exception as e:
        app.logger.error(f"Error handling voice webhook: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/webhook/twilio/recording', methods=['POST'])
def twilio_recording_webhook():
    """Handle recording completion"""
    try:
        recording_url = request.form.get('RecordingUrl')
        call_sid = request.form.get('CallSid')
        from_number = request.form.get('From')
        
        # Process recording with AssemblyAI
        process_recording(recording_url, call_sid, from_number)
        
        response = VoiceResponse()
        response.say("Thank you for your message. We'll get back to you shortly.")
        response.hangup()
        
        return str(response)
        
    except Exception as e:
        app.logger.error(f"Error handling recording webhook: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/webhook/twilio/transcription', methods=['POST'])
def twilio_transcription_webhook():
    """Handle transcription results"""
    try:
        transcription_text = request.form.get('TranscriptionText')
        call_sid = request.form.get('CallSid')
        confidence = request.form.get('Confidence')
        
        if transcription_text and float(confidence) > 0.7:
            # Process the transcription
            process_transcription(transcription_text, call_sid)
        
        return jsonify({"status": "success"})
        
    except Exception as e:
        app.logger.error(f"Error handling transcription webhook: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/webhook/twilio/sms', methods=['POST'])
def twilio_sms_webhook():
    """Handle incoming SMS messages"""
    try:
        from_number = request.form.get('From')
        message_body = request.form.get('Body')
        message_sid = request.form.get('MessageSid')
        
        # Process SMS message
        process_sms_message(message_body, from_number, message_sid)
        
        # Auto-respond
        response = f"Thanks for your message! We'll get back to you shortly about your event planning needs."
        
        return jsonify({"message": response})
        
    except Exception as e:
        app.logger.error(f"Error handling SMS webhook: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

def process_recording(recording_url, call_sid, from_number):
    """Process voice recording with AssemblyAI"""
    try:
        # Configure AssemblyAI
        config = aai.TranscriptionConfig(
            speaker_labels=True,
            language_code='en_us'
        )
        
        # Transcribe the recording
        transcriber = aai.Transcriber()
        transcript = transcriber.transcribe(recording_url, config)
        
        if transcript.status == aai.TranscriptStatus.error:
            app.logger.error(f"Transcription error: {transcript.error}")
            return
        
        # Store transcription and process
        store_transcription(transcript.text, call_sid, from_number, 'voice')
        analyze_transcription(transcript.text, call_sid)
        
    except Exception as e:
        app.logger.error(f"Error processing recording: {str(e)}")

def process_transcription(text, call_sid):
    """Process completed transcription"""
    try:
        # Store the transcription
        store_transcription(text, call_sid, None, 'voice')
        # Analyze for event planning keywords
        analyze_transcription(text, call_sid)
        
    except Exception as e:
        app.logger.error(f"Error processing transcription: {str(e)}")

def process_sms_message(text, from_number, message_sid):
    """Process incoming SMS message"""
    try:
        # Store SMS message
        store_transcription(text, message_sid, from_number, 'sms')
        # Analyze for event planning keywords
        analyze_transcription(text, message_sid)
        
    except Exception as e:
        app.logger.error(f"Error processing SMS: {str(e)}")

def store_transcription(text, message_id, from_number, source):
    """Store transcription in Airtable"""
    try:
        if not AIRTABLE_API_KEY or not AIRTABLE_BASE_ID:
            app.logger.warning("Airtable credentials not configured")
            return
        
        url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/Transcripts"
        headers = {
            "Authorization": f"Bearer {AIRTABLE_API_KEY}",
            "Content-Type": "application/json"
        }
        
        data = {
            "fields": {
                "MessageID": message_id,
                "FromNumber": from_number,
                "Transcription": text,
                "Source": source,
                "Timestamp": datetime.now().isoformat(),
                "Status": "new"
            }
        }
        
        response = requests.post(url, headers=headers, json=data)
        if response.status_code != 200:
            app.logger.error(f"Airtable error: {response.text}")
            
    except Exception as e:
        app.logger.error(f"Error storing transcription: {str(e)}")

def analyze_transcription(text, message_id):
    """Analyze transcription for event planning keywords"""
    try:
        # Simple keyword analysis for event planning
        keywords = {
            'wedding': 'Wedding Planning',
            'corporate': 'Corporate Event',
            'birthday': 'Birthday Party',
            'conference': 'Conference',
            'meeting': 'Business Meeting',
            'party': 'Social Party',
            'venue': 'Venue Booking',
            'catering': 'Catering Services',
            'entertainment': 'Entertainment',
            'photography': 'Photography Services'
        }
        
        detected_categories = []
        text_lower = text.lower()
        
        for keyword, category in keywords.items():
            if keyword in text_lower:
                detected_categories.append(category)
        
        # Update Airtable with analysis results
        if detected_categories:
            update_lead_categories(message_id, detected_categories)
            
    except Exception as e:
        app.logger.error(f"Error analyzing transcription: {str(e)}")

def update_lead_categories(message_id, categories):
    """Update lead categories in Airtable"""
    try:
        if not AIRTABLE_API_KEY or not AIRTABLE_BASE_ID:
            return
        
        # First, find the record by MessageID
        url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/Transcripts"
        headers = {
            "Authorization": f"Bearer {AIRTABLE_API_KEY}",
            "Content-Type": "application/json"
        }
        
        params = {
            "filterByFormula": f"{{MessageID}} = '{message_id}'"
        }
        
        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            records = response.json().get('records', [])
            if records:
                record_id = records[0]['id']
                
                # Update the record
                update_url = f"https://api.airtable.com/v0/{AIRTABLE_BASE_ID}/Transcripts/{record_id}"
                update_data = {
                    "fields": {
                        "Categories": ", ".join(categories),
                        "Status": "analyzed"
                    }
                }
                
                requests.patch(update_url, headers=headers, json=update_data)
                
    except Exception as e:
        app.logger.error(f"Error updating lead categories: {str(e)}")

def log_call_event(event_type, data):
    """Log call events for monitoring"""
    try:
        print(f"[{datetime.now()}] {event_type}: {json.dumps(data)}")
    except Exception as e:
        app.logger.error(f"Error logging event: {str(e)}")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
