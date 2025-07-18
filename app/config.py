import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    ESTATED_API_KEY = os.getenv("ESTATED_API_KEY")
    ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY")
    ESTATED_BASE_URL = os.getenv("ESTATED_BASE_URL", "https://apis.estated.com/v4")
    PORT = int(os.getenv("PORT", 8000))
    
    @classmethod
    def validate(cls):
        """Validate that required environment variables are set"""
        missing = []
        if not cls.ESTATED_API_KEY:
            missing.append("ESTATED_API_KEY")
        if not cls.ANTHROPIC_API_KEY:
            missing.append("ANTHROPIC_API_KEY")
        
        if missing:
            raise ValueError(f"Missing required environment variables: {', '.join(missing)}")
        
        return True

config = Config()