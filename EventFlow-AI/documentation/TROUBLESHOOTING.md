# EventFlow AI Troubleshooting Guide

## Quick Diagnosis

### System Health Check
Run the diagnostic script to check all integrations:
```bash
cd backend
python test_webhooks.py
```

Expected output shows status of each service.

## Common Issues and Solutions

### 1. Flask Server Won't Start

**Symptoms:**
- `ModuleNotFoundError` when running `python app.py`
- Import errors for Flask, Twilio, etc.

**Solutions:**
```bash
# Install missing dependencies
pip install -r requirements.txt

# Check Python version (requires 3.7+)
python --version

# Virtual environment issues
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 2. Twilio Webhook Errors

**Symptoms:**
- 500 errors in Twilio debugger
- Webhooks not triggering

**Solutions:**
1. **Check webhook URL accessibility:**
   ```bash
   curl -X GET http://localhost:5000/
   ```

2. **Verify environment variables:**
   ```python
   # In Python shell
   import os
   print(os.getenv('TWILIO_ACCOUNT_SID'))
   ```

3. **Check webhook URL format:**
   - Must be HTTPS in production
   - Must be publicly accessible
   - Must accept POST requests

4. **Twilio Console Configuration:**
   - Ensure webhook URLs are correct
   - Check HTTP method is POST
   - Verify phone number is active

### 3. Airtable Connection Issues

**Symptoms:**
- "Airtable credentials not configured" warnings
- Data not saving to Airtable

**Solutions:**
1. **Verify API key:**
   ```bash
   # Test API key
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        "https://api.airtable.com/v0/meta/bases/YOUR_BASE_ID/tables"
   ```

2. **Check base permissions:**
   - API key must have read/write access
   - Base must be shared with the API key

3. **Verify table names:**
   - Check exact table names in Airtable
   - Ensure "Transcripts" table exists

4. **Network connectivity:**
   ```bash
   ping api.airtable.com
   ```

### 4. AssemblyAI Transcription Failures

**Symptoms:**
- "Transcription error" in logs
- No transcription results

**Solutions:**
1. **Verify API key:**
   ```python
   import assemblyai as aai
   aai.settings.api_key = "YOUR_API_KEY"
   # Test with sample audio
   ```

2. **Check audio file format:**
   - Supported: MP3, WAV, M4A, FLAC
   - File must be accessible via URL

3. **Monitor API limits:**
   - Check AssemblyAI dashboard for usage
   - Free tier has limits

4. **Network issues:**
   ```bash
   curl -I https://api.assemblyai.com
   ```

### 5. n8n Workflow Not Triggering

**Symptoms:**
- Webhooks received but no workflow execution
- n8n shows no activity

**Solutions:**
1. **Check n8n server status:**
   ```bash
   curl http://localhost:5678/
   ```

2. **Verify webhook URL in n8n:**
   - Must match the webhook endpoint
   - Must be HTTP POST

3. **Check workflow activation:**
   - Workflow must be active in n8n
   - Webhook node must be properly configured

4. **Review n8n logs:**
   - Check n8n interface for error messages
   - Verify data mapping in workflow

## Debug Tools

### Enable Debug Logging
```python
# In app.py, temporarily add:
import logging
logging.basicConfig(level=logging.DEBUG)
```

### Test Individual Components

#### Test Twilio Webhook Locally
```bash
curl -X POST http://localhost:5000/webhook/twilio/voice \
  -d "From=+1234567890" \
  -d "CallSid=TEST123"
```

#### Test Airtable Connection
```python
import requests
import os

url = f"https://api.airtable.com/v0/{os.getenv('AIRTABLE_BASE_ID')}/Transcripts"
headers = {"Authorization": f"Bearer {os.getenv('AIRTABLE_API_KEY')}"}

response = requests.get(url, headers=headers)
print(f"Status: {response.status_code}")
print(response.json())
```

#### Test AssemblyAI
```python
import assemblyai as aai

aai.settings.api_key = os.getenv('ASSEMBLYAI_API_KEY')
print("API Key configured successfully")
```

### Log Analysis

#### View Application Logs
```bash
# Real-time logging
tail -f logs/eventflow.log

# Search for errors
grep "ERROR" logs/eventflow.log

# Search for specific component
grep "twilio" logs/eventflow.log
```

#### Twilio Debugger
1. Log into Twilio Console
2. Go to Monitor → Logs → Debugger
3. Check for webhook delivery errors

## Performance Issues

### Slow Response Times

**Causes:**
- Large audio files for transcription
- Network latency to external APIs
- Database query optimization

**Solutions:**
1. **Optimize audio files:**
   - Compress audio before upload
   - Use shorter recording durations

2. **Implement caching:**
   - Cache frequent API responses
   - Use Redis for session storage

3. **Database optimization:**
   - Add indexes to Airtable fields
   - Batch API requests

### Memory Usage

**Symptoms:**
- Server crashes with memory errors
- Slow performance under load

**Solutions:**
1. **Monitor memory usage:**
   ```bash
   # Windows
   tasklist /FI "IMAGENAME eq python.exe"

   # Linux
   ps aux | grep python
   ```

2. **Optimize code:**
   - Process audio files in chunks
   - Clear large objects from memory
   - Use streaming for large files

## Environment-Specific Issues

### Windows Development
```bash
# Use double quotes for paths
set FLASK_APP=app.py

# Virtual environment activation
venv\Scripts\activate.bat
```

### Linux/Mac Development
```bash
# Use single quotes for paths
export FLASK_APP='app.py'

# Virtual environment activation
source venv/bin/activate
```

### Production Deployment

#### Heroku Issues
```bash
# Check logs
heroku logs --tail -a your-app-name

# Environment variables
heroku config:set TWILIO_ACCOUNT_SID=your_sid
```

#### Docker Issues
```yaml
# docker-compose.yml troubleshooting
version: '3.8'
services:
  eventflow:
    environment:
      - FLASK_ENV=production
    ports:
      - "5000:5000"
```

## Emergency Recovery

### Data Recovery
1. Check Airtable for existing data
2. Review n8n workflow history
3. Check server backups

### Service Restart
```bash
# Stop all services
pkill -f "python app.py"

# Restart with clean state
python app.py
```

### Full System Reset
```bash
# Clear all data (CAUTION!)
# This will delete all stored data
rm -rf logs/
rm -rf cache/

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall

# Reset database (if applicable)
# Reset n8n workflows
```

## Getting Help

### Support Resources
1. **Twilio Documentation:** https://www.twilio.com/docs
2. **Airtable API Docs:** https://airtable.com/api
3. **AssemblyAI Docs:** https://docs.assemblyai.com
4. **n8n Documentation:** https://docs.n8n.io

### Community Support
- Check GitHub issues for similar problems
- Post questions with full error logs
- Include system information and configuration

### Professional Support
For enterprise deployments, consider:
- Twilio Professional Services
- AssemblyAI Enterprise support
- n8n Cloud hosting
