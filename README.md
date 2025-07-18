# AlyProp - $5 AI Property Reports

**Professional real estate investment analysis powered by Estated data and Claude AI**

## 🏠 What is AlyProp?

AlyProp generates comprehensive $5 property investment reports that combine:
- ✅ **Estated's property data** (PAYG service)
- 🤖 **Claude AI analysis** for investment insights
- 🎯 **Investor-focused insights** for flippers and buy-and-hold investors
- 📊 **8 detailed report sections** with actionable data

Perfect for investors, first-time homebuyers, and real estate professionals who need quick, affordable property analysis.

## 🧠 $5 Property Report Contents

### 1. 🏠 Property Overview
- **Estated Data**: Full address, parcel ID, property type, year built, square footage, lot size, bed/bath count, legal description, zoning
- **AI Enhancement**: Human-readable property summary

### 2. 👤 Ownership & Sale History  
- **Estated Data**: Owner name, mailing address, last sale price/date
- **AI Analysis**: Ownership duration calculation, absentee owner detection, motivation insights

### 3. 💵 Estimated Equity Position
- **Estated Data**: AVM estimate, tax assessed value, property tax amount
- **AI Analysis**: Equity calculations, tax vs AVM comparison analysis

### 4. 🔁 Investment Strategy Insight
- **AI Analysis**: Flip potential rating (A-F), buy-and-hold assessment, BRRRR fit analysis, strategy recommendations

### 5. 🧭 Neighborhood & Walkability Context
- **Estated Data**: City, ZIP, county
- **AI Analysis**: Walkability estimates, transit access, school quality, community demographics

### 6. ⚠️ Risk & Red Flags
- **AI Analysis**: Age/rehab risk detection, tax under-assessment flags, non-resident owner alerts, structure age warnings

### 7. 📊 AI Investor Snapshot Summary
- **AI Analysis**: Investor summary, target buyer identification, seller motivation assessment, outreach recommendations

### 8. 🔒 Bonus Inferred Analytics
- **AI Analysis**: Off-market probability score (0-100), overall investment grade (A-F), rebuild vs rehab recommendations

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd AlyProp

# Install dependencies
pip install -r requirements.txt
```

### 2. Configuration

Create a `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your API keys:

```env
ESTATED_API_KEY=your_estated_api_key_here
ANTHROPIC_API_KEY=your_claude_api_key_here
ESTATED_BASE_URL=https://apis.estated.com/v4
PORT=8000
```

### 3. Run the API

```bash
# Start the server
python run.py

# Or use uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 4. Test the System

```bash
# Run the test script
python test_property_report.py
```

## 📡 API Endpoints

### Generate Property Report
```http
POST /property/report
Content-Type: application/json

{
  "address": "123 Main St, Anytown, CA 90210"
}
```

**Response**: Complete $5 property report with all 8 sections

### Health Check
```http
GET /health
```

**Response**: API status and configuration validation

### Sample Report Structure
```http
GET /property/sample
```

**Response**: Overview of report sections and fields

## 💰 Pricing

- **$5.00 per successful property report**
- Uses Estated's Pay-As-You-Go (PAYG) pricing
- Claude AI analysis included in the $5 fee

## 🔧 API Usage Examples

### Python

```python
import httpx
import asyncio

async def get_property_report(address: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8000/property/report",
            json={"address": address}
        )
        return response.json()

# Example usage
report = asyncio.run(get_property_report("123 Main St, Los Angeles, CA"))
```

### cURL

```bash
curl -X POST "http://localhost:8000/property/report" \
     -H "Content-Type: application/json" \
     -d '{"address": "123 Main St, Los Angeles, CA"}'
```

### JavaScript/Node.js

```javascript
const response = await fetch('http://localhost:8000/property/report', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ address: '123 Main St, Los Angeles, CA' })
});

const report = await response.json();
```

## 🏗️ Architecture

```
📁 app/
├── 📄 main.py              # FastAPI application
├── 📄 models.py            # Pydantic data models
├── 📄 config.py            # Configuration management
├── 📁 services/
│   ├── 📄 estated_client.py    # Estated API integration
│   ├── 📄 ai_analyzer.py       # Claude AI analysis
│   └── 📄 report_generator.py  # Main report orchestration
📄 run.py                   # Application runner
📄 test_property_report.py  # Test script
```

## 🔑 Required API Keys

### Estated API
1. Sign up at [estated.com](https://estated.com)
2. Subscribe to their Pay-As-You-Go plan
3. Get your API key from the dashboard

### Anthropic Claude API
1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Add credits to your account
3. Generate an API key

## 🎯 Target Use Cases

### Real Estate Investors
- **Flippers**: Identify rehab opportunities and profit potential
- **Buy-and-hold**: Assess rental potential and long-term value
- **Wholesalers**: Find motivated sellers and off-market opportunities

### First-Time Homebuyers
- **Market research**: Understand property value and neighborhood
- **Investment potential**: Assess future equity growth
- **Risk assessment**: Identify potential issues before purchase

### Real Estate Professionals
- **Lead generation**: Identify motivated sellers
- **Market analysis**: Quick property assessments
- **Client education**: Provide detailed property insights

## 🔒 Data Sources & Accuracy

- **Estated**: Professional real estate data provider with nationwide coverage
- **Claude AI**: Advanced language model for investment analysis and insights
- **Accuracy**: Data is as current as Estated's database (typically updated monthly)
- **Coverage**: Nationwide US property data

## 🛡️ Security & Privacy

- API keys stored in environment variables
- No property data stored locally
- HTTPS recommended for production
- CORS enabled for web applications

## 📈 Deployment

### Development
```bash
python run.py
```

### Production
```bash
# Using Gunicorn
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker

# Using Docker (create Dockerfile as needed)
docker build -t alyprop .
docker run -p 8000:8000 alyprop
```

## 🤝 Support

For questions about:
- **Estated API**: Contact Estated support
- **Claude AI**: Check Anthropic documentation
- **AlyProp**: Create an issue in this repository

## 📄 License

[Add your license information here]

---

**Ready to generate your first $5 property report? Set up your API keys and run the system!** 🚀