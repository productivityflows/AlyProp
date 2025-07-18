from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from contextlib import asynccontextmanager
from typing import Dict, Any

from app.config import settings
from app.models import (
    PropertyReportRequest, PropertyReport, ErrorResponse,
    LegendaryReportRequest, LegendaryPropertyReport
)
from app.services.report_generator import ReportGenerator, LegendaryReportGenerator

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global report generator instances
report_generator = None
legendary_generator = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    global report_generator, legendary_generator
    
    # Startup
    logger.info("Starting AlyProp AI Property Report Service...")
    report_generator = ReportGenerator()
    legendary_generator = LegendaryReportGenerator()
    
    # Validate configuration
    if not settings.validate_api_keys():
        logger.warning("API keys not configured - service will run in demo mode")
    
    logger.info("Service started successfully!")
    yield
    
    # Shutdown
    logger.info("Shutting down service...")


# Initialize FastAPI app
app = FastAPI(
    title=settings.APP_NAME,
    description=settings.DESCRIPTION,
    version=settings.VERSION,
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure appropriately for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_report_generator() -> ReportGenerator:
    """Dependency to get legacy report generator instance"""
    if report_generator is None:
        raise HTTPException(status_code=503, detail="Service not initialized")
    return report_generator


def get_legendary_generator() -> LegendaryReportGenerator:
    """Dependency to get legendary report generator instance"""
    if legendary_generator is None:
        raise HTTPException(status_code=503, detail="Service not initialized")
    return legendary_generator


@app.get("/")
async def root():
    """Root endpoint - API status"""
    return {
        "service": settings.APP_NAME,
        "version": settings.VERSION,
        "description": "AI-powered property analysis for real estate investors",
        "report_options": {
            "legacy_8_section": {
                "cost": f"${settings.REPORT_COST}",
                "endpoint": "POST /property/report",
                "description": "Standard 8-section property analysis"
            },
            "legendary_10_section": {
                "cost": f"${settings.REPORT_COST}",
                "endpoint": "POST /property/legendary",
                "description": "Comprehensive 10-section legendary analysis with bonus features"
            }
        },
        "endpoints": {
            "legacy_report": "POST /property/report",
            "legendary_report": "POST /property/legendary",
            "health_check": "GET /health",
            "sample_structure": "GET /property/sample",
            "legendary_sample": "GET /property/legendary/sample",
            "api_docs": "GET /docs"
        }
    }


@app.post("/property/report", response_model=PropertyReport)
async def generate_property_report(
    request: PropertyReportRequest,
    generator: ReportGenerator = Depends(get_report_generator)
) -> PropertyReport:
    """
    Generate a Legacy $5 AI Property Report (8 Sections)
    
    This endpoint creates a comprehensive property analysis including:
    - 🏠 Property Overview (Estated + AI)
    - 👤 Ownership & Sale History (Estated + AI) 
    - 💵 Estimated Equity Position (Estated + AI)
    - 🔁 Investment Strategy Insight (AI)
    - 🧭 Neighborhood & Walkability Context (Estated + AI)
    - ⚠️ Risk & Red Flags (AI)
    - 📊 AI Investor Snapshot Summary (AI)
    - 🔒 Bonus Inferred Analytics (AI)
    
    **Cost:** $5.00 per report
    """
    try:
        logger.info(f"Generating legacy report for address: {request.address}")
        
        # Generate the complete legacy report
        report = await generator.generate_report(
            request.address, 
            legendary_format=request.legendary_format if hasattr(request, 'legendary_format') else False
        )
        
        logger.info(f"Legacy report {report.report_id} generated successfully")
        return report
        
    except ValueError as e:
        # Property not found or invalid input
        logger.warning(f"Invalid request for {request.address}: {str(e)}")
        raise HTTPException(status_code=404, detail=str(e))
    
    except Exception as e:
        # Internal server error
        logger.error(f"Error generating legacy report for {request.address}: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Internal server error occurred while generating report"
        )


@app.post("/property/legendary", response_model=LegendaryPropertyReport)
async def generate_legendary_property_report(
    request: LegendaryReportRequest,
    generator: LegendaryReportGenerator = Depends(get_legendary_generator)
) -> LegendaryPropertyReport:
    """
    Generate a Legendary $5 AI Property Report (10 Sections + Bonus Extras)
    
    This endpoint creates a comprehensive legendary property analysis including:
    
    **10 Main Sections:**
    - 🧱 Property Identity & Physical Overview
    - 🏦 Valuation & Equity Insights  
    - 💡 Deal Type & Strategy Recommendations
    - 🧠 Ownership Profile & Motivation to Sell
    - 💬 Investor Action Section
    - 🌍 Neighborhood, School & Infrastructure
    - 🌪 Risk Flags & Regulatory Red Alerts
    - 💸 Financial Breakdown + Forecasting
    - ⚠️ Market Context
    - 📜 Executive Summary
    
    **Bonus Extras:**
    - 📎 Claude-generated investor pitch deck text
    - 📎 AI-generated marketing copy for buyer/seller
    - 📎 Shareable 1-pager summary (Markdown/HTML)
    - 📎 Custom-named report file
    
    **Cost:** $5.00 per report
    """
    try:
        logger.info(f"Generating legendary report for address: {request.address}")
        
        # Generate the complete legendary report
        report = await generator.generate_legendary_report(request.address)
        
        logger.info(f"Legendary report {report.report_id} generated successfully")
        return report
        
    except ValueError as e:
        # Property not found or invalid input
        logger.warning(f"Invalid legendary request for {request.address}: {str(e)}")
        raise HTTPException(status_code=404, detail=str(e))
    
    except Exception as e:
        # Internal server error
        logger.error(f"Error generating legendary report for {request.address}: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Internal server error occurred while generating legendary report"
        )


@app.get("/health")
async def health_check(generator: ReportGenerator = Depends(get_report_generator)):
    """
    Health check endpoint
    
    Returns system status, API connectivity, and service readiness.
    """
    try:
        health_status = await generator.health_check()
        
        if health_status.get("status") == "healthy":
            return health_status
        else:
            return JSONResponse(
                status_code=503,
                content=health_status
            )
            
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return JSONResponse(
            status_code=503,
            content={
                "status": "unhealthy", 
                "error": str(e),
                "message": "Service health check failed"
            }
        )


@app.get("/property/sample")
async def get_sample_report_structure(generator: ReportGenerator = Depends(get_report_generator)):
    """
    Get sample legacy report structure
    
    Returns the structure and field descriptions for the legacy 8-section property report.
    Useful for API integration and understanding report format.
    """
    try:
        return generator.get_sample_report_structure()
    except Exception as e:
        logger.error(f"Error getting sample structure: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not retrieve sample structure")


@app.get("/property/legendary/sample")
async def get_legendary_sample_structure():
    """
    Get sample legendary report structure
    
    Returns the structure and field descriptions for the comprehensive 10-section legendary property report.
    """
    try:
        return {
            "report_id": "leg12345",
            "generated_at": "2024-01-15T10:30:00Z",
            "address_analyzed": "123 Main St, Anytown, ST 12345",
            "sections": {
                "1_property_identity_physical": {
                    "description": "🧱 Complete property identity & physical overview",
                    "data_sources": ["Estated", "Claude AI"],
                    "fields": [
                        "full_address", "apn", "parcel_id", "property_type", "structure_sqft", 
                        "lot_sqft", "lot_dimensions", "bedrooms", "bathrooms", "year_built", 
                        "stories", "garage_type", "legal_land_use", "structure_condition", 
                        "property_age_classification", "exterior_material_style", 
                        "zoning_compatibility_issues", "human_readable_summary"
                    ]
                },
                "2_valuation_equity_insights": {
                    "description": "🏦 Comprehensive valuation & equity analysis",
                    "data_sources": ["Estated", "Claude AI"],
                    "fields": [
                        "avm_value", "last_sale_price", "last_sale_date", "assessed_tax_value", 
                        "property_tax_amount", "price_per_sqft_current", "price_per_sqft_historical", 
                        "estimated_equity", "assessed_undervaluation_risk", "tax_vs_avm_discrepancy", 
                        "forecasted_appreciation", "price_trend_comparison"
                    ]
                },
                "3_deal_strategy_recommendations": {
                    "description": "💡 Complete deal type & strategy analysis",
                    "data_sources": ["Claude AI"],
                    "fields": [
                        "flip_potential_score", "brrrr_potential", "buy_hold_rental_fit", 
                        "wholesaling_viability", "rebuild_vs_rehab_vs_leave", 
                        "income_property_conversion", "top_strategy_recommendation", 
                        "suggested_purchase_price", "holding_cost_estimate", "roi_estimate"
                    ]
                },
                "4_ownership_profile_motivation": {
                    "description": "🧠 Deep ownership analysis & motivation scoring",
                    "data_sources": ["Estated", "Claude AI"],
                    "fields": [
                        "owner_names", "owner_mailing_address", "absentee_owner_flag", 
                        "time_held_years", "owner_occupancy_likelihood", "long_term_hold_score", 
                        "owner_type_inference", "motivation_to_sell_score", "top_reason_might_sell"
                    ]
                },
                "5_investor_action_section": {
                    "description": "💬 Specific investor action recommendations",
                    "data_sources": ["Claude AI"],
                    "fields": [
                        "recommended_approach", "suggested_message_script", "suggested_offer_range", 
                        "counter_offer_logic", "contact_urgency_estimate"
                    ]
                },
                "6_neighborhood_school_infrastructure": {
                    "description": "🌍 Complete area analysis & infrastructure assessment",
                    "data_sources": ["Estated", "Claude AI"],
                    "fields": [
                        "zip_code", "county", "census_data_basic", "neighborhood_type", 
                        "school_zone_quality", "transit_access_level", "walkability_estimate", 
                        "distance_to_commercial", "road_type", "parking_availability", "development_trend"
                    ]
                },
                "7_risk_flags_regulatory_alerts": {
                    "description": "🌪 Comprehensive risk assessment & regulatory warnings",
                    "data_sources": ["Claude AI"],
                    "fields": [
                        "age_no_remodel_flag", "avm_vs_tax_flag", "structure_age_risk", 
                        "flip_speculation_warning", "ownership_cluster_warning", "flood_zone_inference", 
                        "tornado_risk_inference", "earthquake_risk_inference", "wildfire_proximity_inference", 
                        "historical_disaster_proximity"
                    ]
                },
                "8_financial_breakdown_forecasting": {
                    "description": "💸 Detailed financial analysis & projections",
                    "data_sources": ["Claude AI"],
                    "fields": [
                        "estimated_rental_income", "estimated_cap_rate", "rehab_cost_estimate", 
                        "total_project_budget", "exit_price_scenarios", "profit_potential_per_strategy", 
                        "monthly_carrying_costs", "noi_estimate", "cash_on_cash_return"
                    ]
                },
                "9_market_context": {
                    "description": "⚠️ Market timing & context analysis",
                    "data_sources": ["Claude AI"],
                    "fields": [
                        "city_appreciation_trend", "median_home_price_vs_subject", 
                        "average_holding_period_zip", "investor_activity_score", 
                        "neighborhood_appreciation_rate", "gentrification_likelihood"
                    ]
                },
                "10_executive_summary": {
                    "description": "📜 Executive decision summary & recommendations",
                    "data_sources": ["Claude AI"],
                    "fields": [
                        "worth_it_verdict", "top_3_strengths", "top_3_weaknesses", 
                        "recommended_next_step", "report_scorecard", "time_sensitive_insight"
                    ]
                },
                "bonus_extras": {
                    "description": "📎 Premium bonus features & marketing materials",
                    "data_sources": ["Claude AI"],
                    "fields": [
                        "investor_pitch_deck_text", "marketing_copy", "shareable_summary", "custom_report_name"
                    ]
                }
            }
        }
    except Exception as e:
        logger.error(f"Error getting legendary sample structure: {str(e)}")
        raise HTTPException(status_code=500, detail="Could not retrieve legendary sample structure")


# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler"""
    return JSONResponse(
        status_code=exc.status_code,
        content={"error": exc.detail, "status_code": exc.status_code}
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    """General exception handler for unhandled errors"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error", 
            "message": "An unexpected error occurred",
            "status_code": 500
        }
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )