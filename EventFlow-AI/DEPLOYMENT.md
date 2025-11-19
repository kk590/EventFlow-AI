# EventFlow AI Deployment Guide

## Prerequisites

### 1. API Accounts Setup
- **Twilio**: Create account at [twilio.com](https://twilio.com)
  - Get Account SID, Auth Token, and purchase a phone number
- **AssemblyAI**: Sign up at [assemblyai.com](https://assemblyai.com)
  - Get API key for speech-to-text
- **Airtable**: Create account at [airtable.com](https://airtable.com)
  - Create base with required tables (see setup.py)
  - Get API key and Base ID

### 2. Local Development Setup

```bash
# Clone or create project directory
cd EventFlow-AI/backend

# Copy environment template
cp .env.example .env

# Edit .env with your API keys
nano .env  # or use your preferred editor

# Install dependencies
pip install -r requirements.txt

# Test setup
python setup.py

# Run the server
python app.py
```

### 3. Ngrok Setup for Webhooks
```bash
# Download and install ngrok
# Authenticate
ngrok authtoken YOUR_AUTH_TOKEN

# Start tunnel
ngrok http 5000

# Use the generated URL (e.g., https://abc123.ngrok.io) for Twilio webhooks
```

### 4. Twilio Webhook Configuration
1. Go to Twilio Console → Phone Numbers → Manage → Active Numbers
2. Select your purchased number
3. Configure webhooks:
   - **Voice & Fax**: `https://your-ngrok-url.ngrok.io/webhook/twilio/voice`
   - **Messaging**: `https://your-ngrok-url.ngrok.io/webhook/twilio/sms`
4. Save changes

## Production Deployment

### Option 1: Heroku Deployment
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-eventflow-app

# Set environment variables
heroku config:set TWILIO_ACCOUNT_SID=your_sid
heroku config:set TWILIO_AUTH_TOKEN=your_token
heroku config:set TWILIO_PHONE_NUMBER=your_number
heroku config:set ASSEMBLYAI_API_KEY=your_key
heroku config:set AIRTABLE_API_KEY=your_key
heroku config:set AIRTABLE_BASE_ID=your_base_id

# Deploy
git init
git add .
git commit -m "Initial deployment"
git push heroku main

# Open app
heroku open
```

### Option 2: DigitalOcean App Platform
1. Connect your GitHub repository
2. Set environment variables in App Platform dashboard
3. Deploy automatically on git push

### Option 3: AWS Elastic Beanstalk
```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
eb init -p python-3.9 your-eventflow-app

# Create environment
eb create production

# Set environment variables
eb setenv TWILIO_ACCOUNT_SID=your_sid
# ... set all other variables

# Deploy
eb deploy
```

## n8n Automation Setup

### 1. Install n8n
```bash
# Using npm
npm install n8n -g

# Using Docker
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

### 2. Import Workflow
1. Open n8n at http://localhost:5678
2. Go to Workflows → Import from File
3. Select `n8n-workflows/eventflow-automation.json`
4. Configure credentials for:
   - Airtable
   - Twilio  
   - Slack (optional)
5. Activate workflow

### 3. Configure Webhook in n8n
1. Get webhook URL from n8n workflow
2. Update Flask app to send events to n8n webhook

## Testing the System

### 1. Test Voice Calls
```bash
# Call your Twilio number
# You should hear the automated message and be able to record
# Check Airtable for new transcript entries
```

### 2. Test SMS
```bash
# Send SMS to your Twilio number
# You should receive an auto-response
# Check Airtable for the message and analysis
```

### 3. Test Webhook Integration
```bash
# Use curl to test webhook endpoints
curl -X POST http://localhost:5000/webhook/test \
  -H "Content-Type: application/json" \
  -d '{"eventType": "test", "data": {"fromNumber": "+1234567890", "message": "Test message"}}'
```

## Monitoring and Logging

### 1. Application Logs
```bash
# Heroku logs
heroku logs --tail

# Local logs
tail -f logs/app.log
```

### 2. Twilio Debugging
- Use Twilio Console → Monitor → Logs
- Check call and message statuses

### 3. Airtable Monitoring
- Regularly check Transcripts and Leads tables
- Monitor for failed API calls

## Scaling Considerations

### 1. Database
- Consider migrating from Airtable to PostgreSQL for production
- Implement proper database indexing

### 2. Queue System
- Add Redis or RabbitMQ for background processing
- Implement retry logic for failed operations

### 3. Caching
- Implement Redis caching for frequent operations
- Cache transcription results

### 4. Load Balancing
- Use multiple instances behind a load balancer
- Implement health checks

## Security Best Practices

### 1. Environment Variables
- Never commit .env files to version control
- Use different keys for development and production

### 2. API Security
- Validate all incoming webhook requests
- Implement rate limiting
- Use HTTPS in production

### 3. Data Protection
- Encrypt sensitive data in transit and at rest
- Implement proper access controls

## Troubleshooting

### Common Issues:
1. **Webhook timeouts**: Increase timeout settings in Twilio
2. **API rate limits**: Implement retry logic with exponential backoff
3. **Transcription failures**: Check AssemblyAI API status
4. **Airtable connection issues**: Verify base ID and API key

### Debug Mode:
```python
# Enable debug logging
import logging
logging.basicConfig(level=logging.DEBUG)
```

## Next Steps

1. **Implement WhatsApp Integration**: Use Twilio WhatsApp API
2. **Add Contractor Matching**: Algorithm for vendor recommendations
3. **E-signature Workflows**: Integrate with DocuSign or HelloSign
4. **Advanced Analytics**: Dashboard with lead conversion metrics
5. **Mobile App**: React Native client for coordinators

## Support
- Check API documentation for each service
- Monitor error logs regularly
- Implement comprehensive testing suite
