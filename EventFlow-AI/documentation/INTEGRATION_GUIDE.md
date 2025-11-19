# EventFlow AI Integration Guide

## Overview
This guide explains how to integrate EventFlow AI with external services and set up the complete automation workflow.

## Prerequisites

### Required Accounts
1. **Twilio Account**: For voice and SMS handling
2. **Airtable Account**: For data storage
3. **AssemblyAI Account**: For audio transcription
4. **n8n Account**: For workflow automation

### Environment Setup
1. Clone the repository
2. Install Python dependencies: `pip install -r requirements.txt`
3. Configure environment variables in `.env` file
4. Run setup script: `python setup.py`

## Service Integrations

### 1. Twilio Setup

#### Voice Webhook Configuration
1. Log into Twilio Console
2. Go to Phone Numbers → Manage → Active Numbers
3. Select your phone number
4. Configure Voice webhook URL: `https://your-domain.com/webhook/twilio/voice`
5. Configure SMS webhook URL: `https://your-domain.com/webhook/twilio/sms`

#### Required Twilio Settings
- **HTTP Method**: POST
- **Webhook URL**: Your deployed EventFlow AI endpoint
- **Status Callback**: Enable for call status updates

### 2. Airtable Setup

#### Base Configuration
1. Create a new Airtable base called "EventFlow AI"
2. Create the following tables:
   - **Transcripts**: Store call/SMS transcriptions
   - **Leads**: Store processed leads
   - **Analytics**: Store usage statistics

#### Transcripts Table Schema
```
MessageID (Single Line Text)
FromNumber (Phone Number)
Transcription (Long Text)
Source (Single Select: voice/sms)
Timestamp (Date & Time)
Status (Single Select: new/analyzed)
Categories (Multiple Select)
```

#### API Configuration
1. Go to Airtable Account → Developer Hub
2. Generate API Key
3. Get your Base ID from the API documentation

### 3. AssemblyAI Setup

#### Account Setup
1. Sign up at assemblyai.com
2. Generate API key from dashboard
3. Verify API key with test transcription

#### Configuration
- **API Key**: Store in environment variables
- **Language**: English (en_us)
- **Features**: Speaker labels enabled

### 4. n8n Setup

#### Workflow Import
1. Import `n8n-workflows/eventflow-automation.json`
2. Configure webhook nodes with your endpoints
3. Set up email/SMS notification nodes
4. Configure data processing nodes

#### Webhook Configuration
- **Method**: POST
- **Content-Type**: application/json
- **Authentication**: None (internal use)

## Testing Integration

### 1. Unit Tests
```bash
cd backend
python test_webhooks.py
```

### 2. Manual Testing

#### Voice Call Test
1. Call your Twilio number
2. Speak about event planning needs
3. Check Airtable for transcription
4. Verify n8n workflow execution

#### SMS Test
1. Send SMS to Twilio number
2. Include event planning keywords
3. Check Airtable for message storage
4. Verify category detection

### 3. Integration Tests
```bash
# Test all services
python test_webhooks.py

# Check logs
tail -f logs/eventflow.log
```

## Troubleshooting

### Common Issues

#### Twilio Webhook Errors
- Verify webhook URLs are publicly accessible
- Check SSL certificate validity
- Ensure proper HTTP method (POST)

#### Airtable Connection Issues
- Verify API key permissions
- Check base ID correctness
- Ensure table names match configuration

#### AssemblyAI Transcription Failures
- Verify API key validity
- Check audio file format compatibility
- Monitor API usage limits

#### n8n Workflow Issues
- Check webhook node configuration
- Verify data mapping between nodes
- Monitor workflow execution logs

### Debug Mode
Enable debug logging by setting:
```bash
export FLASK_ENV=development
```

## Deployment

### Local Development
```bash
# Start backend
python app.py

# Start frontend (separate terminal)
cd frontend && npm start
```

### Production Deployment
1. Set up production server (Heroku/AWS/DigitalOcean)
2. Configure environment variables
3. Update webhook URLs in Twilio
4. Set up SSL certificates
5. Configure monitoring and logging

## Monitoring

### Key Metrics
- Webhook response times
- Transcription success rates
- Airtable API usage
- n8n workflow execution status

### Logging
All services log to `logs/eventflow.log` with the following levels:
- INFO: Normal operations
- WARNING: Non-critical issues
- ERROR: Critical failures

## Support
For integration issues, check:
1. Service status pages (Twilio, Airtable, AssemblyAI)
2. EventFlow AI logs
3. n8n workflow execution history
4. Network connectivity and firewall settings
