# EventFlow AI API Documentation

## Overview
EventFlow AI provides RESTful API endpoints for handling voice calls, SMS messages, and transcription services for event planning automation.

## Base URL
```
http://localhost:5000
```

## Endpoints

### GET /
Returns the API status and information.

**Response:**
```json
{
  "message": "EventFlow AI API Server",
  "status": "running"
}
```

### POST /webhook/twilio/voice
Handles incoming voice calls from Twilio.

**Request Body (Form Data):**
- `From`: Caller's phone number
- `CallSid`: Unique call identifier
- `CallStatus`: Call status (e.g., 'ringing')

**Response:**
TwiML XML response for voice handling.

### POST /webhook/twilio/sms
Handles incoming SMS messages from Twilio.

**Request Body (Form Data):**
- `From`: Sender's phone number
- `Body`: SMS message content
- `MessageSid`: Unique message identifier

**Response:**
```json
{
  "message": "Thanks for your message! We'll get back to you shortly about your event planning needs."
}
```

### POST /webhook/twilio/transcription
Handles transcription results from Twilio.

**Request Body (Form Data):**
- `TranscriptionText`: Transcribed text
- `CallSid`: Call identifier
- `Confidence`: Confidence score (0-1)

**Response:**
```json
{
  "status": "success"
}
```

### POST /webhook/twilio/recording
Handles call recording completion.

**Request Body (Form Data):**
- `RecordingUrl`: URL of the recorded audio
- `CallSid`: Call identifier
- `From`: Caller's phone number

**Response:**
TwiML XML response confirming recording processing.

## Authentication
All webhook endpoints require valid Twilio credentials configured in environment variables.

## Error Handling
All endpoints return appropriate HTTP status codes:
- `200`: Success
- `500`: Internal server error

## Data Flow
1. Twilio webhook receives call/SMS
2. EventFlow AI processes the request
3. Transcription is performed (if applicable)
4. Data is stored in Airtable
5. n8n workflow is triggered for automation
