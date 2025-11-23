"""Environment Configuration Validator for EventFlow-AI"""
import os
import sys
from typing import List, Tuple

class ConfigValidator:
    """Validates required environment variables are set"""
    
    REQUIRED_VARS = [
        'TWILIO_ACCOUNT_SID',
        'TWILIO_AUTH_TOKEN',
        'TWILIO_PHONE_NUMBER',
        'ASSEMBLYAI_API_KEY',
        'AIRTABLE_API_KEY',
        'AIRTABLE_BASE_ID',
        'FLASK_SECRET_KEY'
    ]
    
    @staticmethod
    def validate() -> Tuple[bool, List[str]]:
        """Validate all required environment variables
        
        Returns:
            Tuple of (is_valid, missing_vars)
        """
        missing_vars = []
        
        for var in ConfigValidator.REQUIRED_VARS:
            value = os.getenv(var)
            if not value or value.startswith('your_'):
                missing_vars.append(var)
        
        return (len(missing_vars) == 0, missing_vars)
    
    @staticmethod
    def validate_or_exit():
        """Validate configuration and exit if invalid"""
        is_valid, missing_vars = ConfigValidator.validate()
        
        if not is_valid:
            print("\n❌ Configuration Error: Missing required environment variables!\n")
            print("Missing variables:")
            for var in missing_vars:
                print(f"  - {var}")
            print("\nPlease set these in your .env file.")
            print("See .env.example for template.\n")
            sys.exit(1)
        
        print("✅ Configuration validated successfully!")

if __name__ == '__main__':
    ConfigValidator.validate_or_exit()
