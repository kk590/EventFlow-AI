# EventFlow AI - Multi-Channel Event Planning Automation Platform

## Overview
EventFlow AI is a comprehensive automation platform for event planning that integrates multiple communication channels and AI-powered processing.

## Core Technologies
- **Twilio**: Voice and SMS communications
- **AssemblyAI**: Speech-to-text transcription
- **n8n.io**: Workflow automation
- **Airtable**: Lead and event data storage
- **Python/Flask**: Backend API server
- **React**: Frontend dashboard

## Architecture
```
EventFlow-AI/
├── backend/           # Flask API server
├── frontend/          # React dashboard
├── n8n-workflows/     # Automation workflows
├── scripts/           # Utility scripts
├── config/            # Configuration files
└── docs/              # Documentation
```

## Key Features
- Multi-channel lead capture (Phone, SMS, Web)
- AI-powered call transcription and analysis
- Automated lead routing and follow-up
- Real-time event planning workflows
- Contractor matching system
- E-signature integration capabilities



## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+
- Twilio Account (for SMS/Voice)
- AssemblyAI API Key
- Airtable Account
- n8n instance (self-hosted or cloud)

### Installation

#### Backend Setup
```bash
# Navigate to backend directory
cd backend/

# Install Python dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env with your API keys

# Run the Flask server
python app.py
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend/

# Install dependencies
npm install

# Start development server
npm start
```

#### n8n Workflows Setup
1. Import workflows from `n8n-workflows/` directory
2. Configure webhook URLs
3. Set up Airtable connections
4. Enable workflows

### Configuration

Create a `.env` file in the `backend/` directory with:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_phone_number

# AssemblyAI
ASSEMBLYAI_API_KEY=your_api_key

# Airtable
AIRTABLE_API_KEY=your_api_key
AIRTABLE_BASE_ID=your_base_id

# n8n
N8N_WEBHOOK_URL=your_webhook_url

# Flask
FLASK_ENV=development
FLASK_SECRET_KEY=your_secret_key
```

## Project Structure

- **backend/** - Flask API server with webhook handlers
- **frontend/** - React dashboard for event management
- **n8n-workflows/** - Automation workflows for lead processing
- **scripts/** - Utility scripts for deployment and testing
- **config/** - Configuration files
- **documentation/** - Detailed project documentation

## Testing

```bash
# Test webhooks
cd backend/
python test_webhooks.py
```

## Deployment

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## Documentation

- [Project Overview](PROJECT_OVERVIEW.md)
- [Integration Hub](INTEGRATION_HUB.md)
- [Project Structure](PROJECT_STRUCTURE.md)
- [Deployment Guide](DEPLOYMENT.md)

## Support

For issues or questions, please open an issue on GitHub.
