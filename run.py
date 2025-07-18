#!/usr/bin/env python3
"""
AlyProp API Runner
Run the $5 AI Property Report service
"""

import uvicorn
from app.main import app
from app.config import config

if __name__ == "__main__":
    print("🏠 Starting AlyProp - $5 AI Property Reports")
    print(f"🌐 Server will run on http://localhost:{config.PORT}")
    print("📝 API docs available at http://localhost:{}/docs".format(config.PORT))
    print("💰 Cost: $5.00 per property report")
    print("-" * 50)
    
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=config.PORT,
        reload=True,
        log_level="info"
    )