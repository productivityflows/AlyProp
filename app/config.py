import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()


class Settings:
    """Application settings and configuration"""
    
    # API Keys
    ESTATED_API_KEY: str = os.getenv("ESTATED_API_KEY", "")
    ANTHROPIC_API_KEY: str = os.getenv("ANTHROPIC_API_KEY", "")
    
    # API Configuration
    ESTATED_BASE_URL: str = "https://apis.estated.com/v4"
    
    # Report Configuration
    REPORT_COST: float = 5.00
    
    # Application Settings
    APP_NAME: str = "AlyProp $5 AI Property Report"
    VERSION: str = "1.0.0"
    DESCRIPTION: str = "AI-powered property analysis for investors and first-time homebuyers"
    
    def validate_api_keys(self) -> bool:
        """Validate that required API keys are present"""
        return bool(self.ESTATED_API_KEY and self.ANTHROPIC_API_KEY)


# Global settings instance
settings = Settings()