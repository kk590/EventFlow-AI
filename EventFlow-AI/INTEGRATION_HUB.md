# 🎯 EventFlow AI Integration Hub

Welcome to the EventFlow AI Integration Hub! This central location provides quick access to all integration components, documentation, and tools for the EventFlow AI system.

## 📁 Quick Access Navigation

### 🔧 Core Components
- **[Backend API](backend/app.py)** - Flask application with webhook handlers
- **[Frontend](frontend/)** - React dashboard interface
- **[n8n Workflows](n8n-workflows/eventflow-automation.json)** - Automation workflows

### 📚 Documentation
- **[API Documentation](documentation/API_DOCUMENTATION.md)** - Complete API reference
- **[Integration Guide](documentation/INTEGRATION_GUIDE.md)** - Step-by-step setup instructions
- **[Troubleshooting](documentation/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Project Structure](PROJECT_STRUCTURE.md)** - File organization guide

### ⚙️ Configuration
- **[Twilio Config](config/twilio_config.json)** - Voice/SMS settings
- **[Airtable Config](config/airtable_config.json)** - Database schema and settings
- **[AssemblyAI Config](config/assemblyai_config.json)** - Transcription settings

### 🚀 Scripts & Tools
- **[Setup Script](scripts/setup_integrations.sh)** - Automated environment setup
- **[Test Suite](scripts/test_all.sh)** - Comprehensive testing
- **[Deploy Script](scripts/deploy.sh)** - Multi-platform deployment

## 🎯 Integration Status Overview

| Service | Status | Configuration | Testing |
|---------|--------|---------------|---------|
| **Twilio** | ✅ Ready | [Config](config/twilio_config.json) | [Tests](backend/test_webhooks.py) |
| **Airtable** | ✅ Ready | [Config](config/airtable_config.json) | [Tests](backend/test_webhooks.py) |
| **AssemblyAI** | ✅ Ready | [Config](config/assemblyai_config.json) | [Tests](backend/test_webhooks.py) |
| **n8n** | ✅ Ready | [Workflow](n8n-workflows/) | Manual testing |
| **Frontend** | ✅ Ready | [Package](frontend/package.json) | Manual testing |

## 🚀 Quick Start Commands

### 1. Environment Setup
```bash
# Automated setup (recommended)
./scripts/setup_integrations.sh

# Or manual setup
cd backend
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

### 2. Configuration
```bash
# Set API keys
cd backend
python env_config.py

# Edit environment variables
nano .env
```

### 3. Start Services
```bash
# Start backend
cd backend && python app.py

# Start frontend (new terminal)
cd frontend && npm start

# Start n8n (if using local instance)
n8n start
```

### 4. Run Tests
```bash
# Comprehensive testing
./scripts/test_all.sh

# Webhook testing only
cd backend && python test_webhooks.py
```

## 🔗 Integration Flow

```
1. Twilio Call/SMS → 2. EventFlow API → 3. AssemblyAI → 4. Airtable → 5. n8n → 6. Frontend
     ↑                        ↑                      ↑                   ↑            ↑
   Voice/SMS              Webhook Handler      Transcription       Data Storage  Dashboard
```

### Detailed Flow:
1. **Incoming Communication** → Twilio receives call or SMS
2. **Webhook Processing** → EventFlow API processes the request
3. **Audio Transcription** → AssemblyAI transcribes voice messages
4. **Data Storage** → Airtable stores transcriptions and metadata
5. **Workflow Automation** → n8n processes leads and triggers actions
6. **Dashboard Display** → Frontend shows analytics and lead information

## 📊 Monitoring & Health Checks

### API Health
```bash
curl http://localhost:5000/
# Expected: {"message": "EventFlow AI API Server", "status": "running"}
```

### Service Status
```bash
# Check all services
./scripts/test_all.sh

# Individual service checks
curl -s https://api.twilio.com/ | head -1
curl -s https://api.airtable.com/ | head -1
curl -s https://api.assemblyai.com/ | head -1
```

### Logs
```bash
# Application logs
tail -f logs/eventflow.log

# n8n logs (if local)
tail -f ~/.n8n/logs/n8n.log
```

## 🔧 Configuration Management

### Environment Variables
Required environment variables in `backend/.env`:
```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_phone_number
ASSEMBLYAI_API_KEY=your_assemblyai_key
AIRTABLE_API_KEY=your_airtable_key
AIRTABLE_BASE_ID=your_base_id
```

### Service Configuration
- **Twilio**: Update webhook URLs in Twilio Console
- **Airtable**: Ensure base permissions and table schema
- **AssemblyAI**: Verify API key and usage limits
- **n8n**: Import workflow and configure credentials

## 🧪 Testing Strategy

### Automated Tests
```bash
# Run all tests
./scripts/test_all.sh

# Test specific components
cd backend && python test_webhooks.py
```

### Manual Testing

#### Voice Call Testing
1. Call your Twilio number
2. Speak about event planning
3. Check Airtable for transcription
4. Verify n8n workflow execution

#### SMS Testing
1. Send SMS to Twilio number
2. Include event keywords
3. Check transcription processing
4. Verify lead categorization

#### Integration Testing
1. Test end-to-end flow
2. Verify data consistency
3. Check error handling
4. Monitor performance

## 🚀 Deployment Options

### Quick Deploy
```bash
# Interactive deployment
./scripts/deploy.sh
```

### Platform Options
- **Local**: Development environment
- **Docker**: Containerized deployment
- **Heroku**: Cloud platform
- **AWS**: Enterprise deployment
- **Manual**: Custom server setup

## 📞 Support & Resources

### Documentation Links
- [Twilio Docs](https://www.twilio.com/docs)
- [Airtable API](https://airtable.com/api)
- [AssemblyAI Docs](https://docs.assemblyai.com)
- [n8n Docs](https://docs.n8n.io)
- [Flask Docs](https://flask.palletsprojects.com)

### Troubleshooting
- Check [Troubleshooting Guide](documentation/TROUBLESHOOTING.md)
- Review application logs
- Test individual components
- Verify configuration settings

### Community
- GitHub Issues for bug reports
- n8n Community Forum
- Stack Overflow for technical questions

## 🎯 Success Metrics

### Key Performance Indicators
- **Webhook Response Time** < 2 seconds
- **Transcription Accuracy** > 85%
- **System Uptime** > 99.5%
- **Lead Processing Rate** > 95%

### Monitoring Dashboards
- Application metrics via `/metrics` endpoint
- n8n workflow execution stats
- Airtable usage analytics
- Twilio delivery reports

---

## 📝 Quick Reference

### Most Used Commands
```bash
# Start everything
./scripts/setup_integrations.sh && cd backend && python app.py

# Test everything
./scripts/test_all.sh

# Deploy everything
./scripts/deploy.sh

# Check status
curl http://localhost:5000/ && echo "✅ API Running"
```

### File Locations
- **Main App**: `backend/app.py`
- **Tests**: `backend/test_webhooks.py`
- **Config**: `backend/.env`
- **Workflows**: `n8n-workflows/`
- **Frontend**: `frontend/src/`

### Emergency Contacts
- **System Admin**: [Your contact]
- **Twilio Support**: support@twilio.com
- **Airtable Support**: support@airtable.com
- **AssemblyAI Support**: support@assemblyai.com

---

*Last updated: $(date)*
*EventFlow AI Integration Hub v1.0*
