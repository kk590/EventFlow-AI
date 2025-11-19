# EventFlow AI - Project Structure Guide

## 📁 Project Organization

```
EventFlow-AI/
├── 📄 README.md                    # Project overview and setup instructions
├── 📄 PROJECT_OVERVIEW.md          # Detailed project description
├── 📄 DEPLOYMENT.md               # Deployment instructions
├── 🚀 start.sh                    # Quick start script
├── 📄 PROJECT_STRUCTURE.md        # This file - project organization guide
│
├── 🔧 backend/                    # Flask backend application
│   ├── 📄 app.py                  # Main Flask application
│   ├── 📄 requirements.txt        # Python dependencies
│   ├── 📄 setup.py               # Setup and configuration
│   ├── 📄 test_webhooks.py       # Integration tests
│   ├── 📄 env_config.py          # Environment configuration
│   └── 📄 .env                   # Environment variables (gitignored)
│
├── 🎨 frontend/                   # React frontend application
│   ├── 📄 package.json           # Node.js dependencies
│   ├── 📁 public/
│   │   └── 📄 index.html         # HTML template
│   ├── 📁 src/
│   │   ├── 📄 App.js             # Main React component
│   │   ├── 📄 App.css            # Main styles
│   │   ├── 📄 index.js           # Entry point
│   │   ├── 📄 index.css          # Global styles
│   │   └── 📁 components/        # React components
│   │       ├── 📄 Dashboard.js
│   │       ├── 📄 Header.js
│   │       ├── 📄 Sidebar.js
│   │       ├── 📄 Leads.js
│   │       ├── 📄 Analytics.js
│   │       └── 📄 Settings.js
│
├── ⚡ n8n-workflows/              # Automation workflows
│   └── 📄 eventflow-automation.json
│
├── 📁 documentation/              # Additional documentation
│   ├── 📄 API_DOCUMENTATION.md
│   ├── 📄 INTEGRATION_GUIDE.md
│   └── 📄 TROUBLESHOOTING.md
│
├── 📁 scripts/                    # Utility scripts
│   ├── 📄 setup_integrations.sh
│   ├── 📄 test_all.sh
│   └── 📄 deploy.sh
│
└── 📁 config/                     # Configuration files
    ├── 📄 twilio_config.json
    ├── 📄 airtable_config.json
    └── 📄 assemblyai_config.json
```

## 🔗 Integration Points

### Twilio Integration
- **File**: `backend/app.py` (webhook handlers)
- **Test**: `backend/test_webhooks.py` (voice/sms tests)
- **Config**: Environment variables in `.env`

### Airtable Integration  
- **File**: `backend/app.py` (store_transcription function)
- **Test**: `backend/test_webhooks.py` (Airtable connection test)
- **Config**: Environment variables in `.env`

### AssemblyAI Integration
- **File**: `backend/app.py` (process_recording function)
- **Config**: Environment variables in `.env`

### n8n Integration
- **File**: `n8n-workflows/eventflow-automation.json`
- **Test**: `backend/test_webhooks.py` (n8n integration test)

## 🚀 Quick Access Commands

```bash
# Start backend server
cd EventFlow-AI/backend && python app.py

# Run integration tests  
cd EventFlow-AI/backend && python test_webhooks.py

# Install dependencies
cd EventFlow-AI/backend && pip install -r requirements.txt

# Set up environment
cd EventFlow-AI/backend && python env_config.py
```

## 📋 Environment Variables Required

Create `.env` file in backend/ with:
```
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_phone_number
ASSEMBLYAI_API_KEY=your_assemblyai_key
AIRTABLE_API_KEY=your_airtable_key
AIRTABLE_BASE_ID=your_base_id
