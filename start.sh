#!/bin/bash

echo "🏠 Starting AlyProp - $5 AI Property Reports"
echo "📋 Activating virtual environment..."

# Activate virtual environment
source venv/bin/activate

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  No .env file found. Please copy .env.example to .env and fill in your API keys."
    echo "📝 Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ Please edit .env file with your API keys before running the server."
    exit 1
fi

echo "🚀 Starting FastAPI server..."
python3 run.py