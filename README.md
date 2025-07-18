# AlyProp - $5 AI Property Report Service

🏠 **AI-powered property analysis for real estate investors and first-time homebuyers**

Generate comprehensive $5 property reports combining Estated's professional property data with Claude AI's investment insights. Perfect for investors, flippers, and first-time buyers who need actionable intelligence on any property.

## 🧠 Report Sections (8 Total)

### 1. 🏠 Property Overview
- **Data Source:** Estated + Claude AI
- Full address, parcel ID, property type, year built
- Square footage, lot size, bed/bath count
- Legal description/zoning + AI summary

### 2. 👤 Ownership & Sale History  
- **Data Source:** Estated + Claude AI
- Owner name and mailing address
- Last sale price and date
- AI-calculated ownership duration + absentee status
- Seller motivation analysis

### 3. 💵 Estimated Equity Position
- **Data Source:** Estated + Claude AI  
- Estimated value (AVM) and tax assessed value
- Property tax amount
- AI equity calculations + tax vs AVM comparison

### 4. 🔁 Investment Strategy Insight
- **Data Source:** Claude AI
- Flip potential rating (A-F scale)
- Buy-and-hold rental assessment
- BRRRR strategy fit analysis
- Primary strategy recommendation

### 5. 🧭 Neighborhood & Walkability Context
- **Data Source:** Estated + Claude AI
- City, ZIP, county information
- AI walkability and transit access estimates
- School zone quality assessment
- Community type description

### 6. ⚠️ Risk & Red Flags
- **Data Source:** Claude AI
- Age + ownership duration rehab needs
- Tax under-assessment risks
- Absentee owner implications
- Structural/age concern warnings

### 7. 📊 AI Investor Snapshot Summary
- **Data Source:** Claude AI
- Comprehensive investor opportunity summary
- Target buyer identification (first-time, flipper, etc.)
- Seller motivation scoring
- Outreach approach recommendations

### 8. 🔒 Bonus Inferred Analytics
- **Data Source:** Claude AI
- Off-market probability score (0-100%)
- Overall AI grade (A-F)
- Rebuild vs rehab recommendations

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Estated API key (PAYG subscription)
- Anthropic API key (Claude access)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/alyprop.git
cd alyprop

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure API keys
cp .env.example .env
# Edit .env with your API keys:
# ESTATED_API_KEY=your_estated_key_here
# ANTHROPIC_API_KEY=your_anthropic_key_here
```

### Running the Service

```bash
# Start the server
python run.py

# Or use uvicorn directly
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The service will be available at:
- 🌐 **API:** http://localhost:8000
- 📚 **Documentation:** http://localhost:8000/docs
- 🏥 **Health Check:** http://localhost:8000/health

## 📡 API Usage

### Generate Property Report

```bash
curl -X POST "http://localhost:8000/property/report" \
     -H "Content-Type: application/json" \
     -d '{"address": "1600 Amphitheatre Parkway, Mountain View, CA"}'
```

### Python Example

```python
import httpx
import asyncio

async def get_property_report():
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/property/report",
            json={"address": "123 Main Street, Anytown, USA"}
        )
        report = response.json()
        print(f"Report ID: {report['report_id']}")
        print(f"AI Grade: {report['bonus_analytics']['ai_grade']}")
        return report

# Run the example
asyncio.run(get_property_report())
```

## 🧪 Testing

```bash
# Run comprehensive tests
python test_property_report.py

# Test without API keys (structure validation only)
python test_property_report.py  # Will skip live API tests if keys missing
```

## 📁 Project Structure

```
alyprop/
├── app/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application
│   ├── models.py               # Pydantic data models
│   ├── config.py               # Configuration management
│   └── services/
│       ├── __init__.py
│       ├── estated_client.py   # Estated API integration
│       ├── ai_analyzer.py      # Claude AI analysis
│       └── report_generator.py # Report orchestration
├── requirements.txt            # Dependencies
├── .env.example               # Environment template
├── run.py                     # Application runner
├── test_property_report.py    # Test suite
└── README.md                  # This file
```

## 💰 Pricing

- **$5.00 per property report**
- Combines Estated PAYG pricing + Claude API costs
- No subscription required - pay per use
- Perfect for occasional investors or high-volume analysis

## 🔧 Configuration

### Environment Variables

```bash
# Required API Keys
ESTATED_API_KEY=your_estated_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key

# Optional Configuration  
APP_NAME="AlyProp $5 AI Property Report"
VERSION="1.0.0"
```

### Estated API Setup
1. Sign up at [Estated.com](https://estated.com)
2. Subscribe to PAYG (Pay-As-You-Go) plan
3. Get your API key from the dashboard

### Anthropic API Setup
1. Sign up at [Anthropic](https://anthropic.com)
2. Get API access to Claude
3. Generate an API key

## 🛠️ Development

### Adding New Analysis Features

1. **Extend AI Prompts** in `app/services/ai_analyzer.py`
2. **Update Data Models** in `app/models.py`
3. **Modify Report Builder** in `app/services/report_generator.py`

### Custom Estated Integration

The `EstatedClient` class in `app/services/estated_client.py` can be extended to:
- Add new property data fields
- Integrate additional Estated endpoints
- Customize data parsing logic

## 📊 Example Report Output

```json
{
  "report_id": "abc12345",
  "generated_at": "2024-01-15T10:30:00Z",
  "cost": 5.00,
  "property_overview": {
    "full_address": "123 Main Street, Anytown, USA",
    "property_type": "Single Family Residential",
    "year_built": 1995,
    "square_footage": 2400,
    "bedrooms": 4,
    "bathrooms": 2.5,
    "ai_summary": "Well-maintained family home with strong rental potential..."
  },
  "investment_strategy": {
    "flip_potential_rating": "B+ - Good flip potential with moderate renovation",
    "buy_hold_assessment": "Strong rental income potential in desirable area",
    "strategy_recommendation": "Recommend buy-and-hold for long-term appreciation"
  },
  "bonus_analytics": {
    "off_market_probability": "75% - High likelihood of off-market opportunity",
    "ai_grade": "B+",
    "rebuild_vs_rehab": "Rehab recommended - structure in good condition"
  }
}
```

## 🚨 Error Handling

The API provides detailed error responses:

```json
{
  "error": "Property not found",
  "detail": "No property data available for the provided address",
  "status_code": 404
}
```

Common error scenarios:
- **404:** Property not found in Estated database
- **500:** API key issues or service errors
- **503:** Service temporarily unavailable

## 🔐 Security Notes

- Never commit API keys to version control
- Use environment variables for all secrets
- Consider API rate limiting for production
- Validate all input addresses

## 📞 Support

For issues or questions:
1. Check the API documentation at `/docs`
2. Run the test suite to verify setup
3. Review logs for detailed error information

## 🎯 Use Cases

**Perfect For:**
- 🏘️ Real estate investors evaluating deals
- 🏠 First-time homebuyers researching properties  
- 🔄 House flippers assessing renovation potential
- 📊 Agents providing client property insights
- 💼 Wholesalers identifying motivated sellers

**Key Benefits:**
- ⚡ Fast 30-second report generation
- 🎯 Investor-focused insights and recommendations
- 💡 AI-powered risk and opportunity identification
- 📈 Professional-grade data from Estated
- 💰 Affordable $5 per report pricing

---

**Built with:** FastAPI • Claude AI • Estated API • Python 3.8+