from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.config import config
from app.models import PropertySearchRequest, PropertySearchResponse
from app.services.report_generator import ReportGenerator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting AlyProp API...")
    try:
        config.validate()
        logger.info("Configuration validated successfully")
    except ValueError as e:
        logger.error(f"Configuration validation failed: {e}")
        raise
    
    yield
    
    # Shutdown
    logger.info("Shutting down AlyProp API...")

# Initialize FastAPI app
app = FastAPI(
    title="AlyProp - AI Property Analysis API",
    description="Generate $5 AI-powered property investment reports using Estated data and Claude analysis",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure as needed for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize report generator
report_generator = ReportGenerator()

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "message": "AlyProp API is running",
        "version": "1.0.0",
        "service": "$5 AI Property Reports"
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "services": {
            "estated_api": "configured" if config.ESTATED_API_KEY else "missing_key",
            "anthropic_api": "configured" if config.ANTHROPIC_API_KEY else "missing_key"
        },
        "cost_per_report": "$5.00"
    }

@app.post("/property/report", response_model=PropertySearchResponse)
async def generate_property_report(request: PropertySearchRequest):
    """
    Generate a $5 AI Property Report for the given address
    
    This endpoint:
    1. Fetches property data from Estated API (PAYG)
    2. Generates AI insights using Claude
    3. Returns structured investment analysis
    
    Cost: $5.00 per successful report
    """
    try:
        logger.info(f"Generating property report for: {request.address}")
        
        if not request.address or len(request.address.strip()) < 5:
            raise HTTPException(
                status_code=400,
                detail="Address must be at least 5 characters long"
            )
        
        # Generate the report
        response = await report_generator.generate_property_report(request.address.strip())
        
        if not response.success:
            raise HTTPException(
                status_code=404 if "not found" in response.error_message.lower() else 500,
                detail=response.error_message
            )
        
        logger.info(f"Successfully generated report for: {request.address}")
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error generating report for {request.address}: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="Internal server error occurred while generating report"
        )

@app.get("/property/sample")
async def sample_report_structure():
    """
    Get a sample of the property report structure (no API calls made)
    """
    return {
        "report_sections": {
            "1_property_overview": {
                "description": "Basic property details from Estated",
                "ai_enhanced": ["human_readable_summary"],
                "fields": [
                    "full_address", "parcel_id", "property_type", "year_built",
                    "square_footage", "lot_size", "bedrooms", "bathrooms",
                    "legal_description", "zoning"
                ]
            },
            "2_ownership_history": {
                "description": "Owner and sale information",
                "ai_enhanced": ["ownership_duration_years", "absentee_owner_status", "motivation_insight"],
                "fields": [
                    "owner_name", "owner_mailing_address", "last_sale_price", "last_sale_date"
                ]
            },
            "3_equity_position": {
                "description": "Financial analysis and equity estimates",
                "ai_enhanced": ["equity_estimate", "tax_vs_avm_comparison"],
                "fields": [
                    "estimated_value_avm", "tax_assessed_value", "property_tax_amount"
                ]
            },
            "4_investment_insight": {
                "description": "AI-powered investment strategy analysis",
                "ai_enhanced": "*all fields*",
                "fields": [
                    "flip_potential_rating", "buy_and_hold_assessment", "brrrr_fit",
                    "ownership_duration_logic", "strategy_recommendation"
                ]
            },
            "5_neighborhood_context": {
                "description": "Location and community insights",
                "ai_enhanced": ["walkability_estimate", "transit_access_likelihood", "school_zone_quality_guess", "community_type_description"],
                "fields": ["city", "zip_code", "county"]
            },
            "6_risk_flags": {
                "description": "AI-identified investment risks",
                "ai_enhanced": "*all fields*",
                "fields": [
                    "age_rehab_risk", "tax_under_assessment", "owner_non_residency",
                    "old_structure_flag", "risk_summary"
                ]
            },
            "7_investor_snapshot": {
                "description": "AI summary for investors",
                "ai_enhanced": "*all fields*",
                "fields": [
                    "summary_paragraph", "target_buyer_type", "estimated_motivation_to_sell",
                    "suggested_outreach_approach"
                ]
            },
            "8_bonus_analytics": {
                "description": "Advanced AI analytics",
                "ai_enhanced": "*all fields*",
                "fields": [
                    "off_market_probability_score", "ai_grade", "rebuild_vs_rehab_guess"
                ]
            }
        },
        "cost": "$5.00",
        "data_sources": {
            "estated": "Property data, ownership, financials",
            "claude_ai": "Investment analysis, insights, risk assessment"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=config.PORT)