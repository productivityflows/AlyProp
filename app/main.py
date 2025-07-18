from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
from contextlib import asynccontextmanager
from typing import Dict, Any

from app.config import settings
from app.models import PropertyReportRequest, PropertyReport, ErrorResponse
from app.services.report_generator import ReportGenerator

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global report generator instance
report_generator = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan management"""
    global report_generator
    
    # Startup
    logger.info("Starting AlyProp $5 AI Property Report Service...")
    report_generator = ReportGenerator()
    
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
    """Dependency to get report generator instance"""
    if report_generator is None:
        raise HTTPException(status_code=503, detail="Service not initialized")
    return report_generator


@app.get("/")
async def root():
    """Root endpoint - API status"""
    return {
        "service": settings.APP_NAME,
        "version": settings.VERSION,
        "description": "AI-powered property analysis for real estate investors",
        "cost_per_report": f"${settings.REPORT_COST}",
        "endpoints": {
            "generate_report": "POST /property/report",
            "health_check": "GET /health",
            "sample_structure": "GET /property/sample",
            "api_docs": "GET /docs"
        }
    }


@app.post("/property/report", response_model=PropertyReport)
async def generate_property_report(
    request: PropertyReportRequest,
    generator: ReportGenerator = Depends(get_report_generator)
) -> PropertyReport:
    """
    Generate a $5 AI Property Report
    
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
        logger.info(f"Generating report for address: {request.address}")
        
        # Generate the complete report
        report = await generator.generate_report(request.address)
        
        logger.info(f"Report {report.report_id} generated successfully")
        return report
        
    except ValueError as e:
        # Property not found or invalid input
        logger.warning(f"Invalid request for {request.address}: {str(e)}")
        raise HTTPException(status_code=404, detail=str(e))
    
    except Exception as e:
        # Internal server error
        logger.error(f"Error generating report for {request.address}: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail="Internal server error - please try again or contact support"
        )


@app.get("/health")
async def health_check(
    generator: ReportGenerator = Depends(get_report_generator)
) -> Dict[str, Any]:
    """
    Health check endpoint
    
    Returns system status and API connectivity information
    """
    try:
        health_status = await generator.health_check()
        
        status_code = 200 if health_status["status"] == "healthy" else 503
        return JSONResponse(content=health_status, status_code=status_code)
        
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return JSONResponse(
            content={
                "status": "unhealthy",
                "error": "Health check failed",
                "detail": str(e)
            },
            status_code=503
        )


@app.get("/property/sample")
async def get_sample_report_structure(
    generator: ReportGenerator = Depends(get_report_generator)
) -> Dict[str, Any]:
    """
    Get sample report structure
    
    Returns the structure and description of all 8 report sections
    """
    try:
        return generator.get_sample_report_structure()
    except Exception as e:
        logger.error(f"Error getting sample structure: {str(e)}")
        raise HTTPException(status_code=500, detail="Unable to retrieve sample structure")


@app.exception_handler(404)
async def not_found_handler(request, exc):
    """Custom 404 handler"""
    return JSONResponse(
        status_code=404,
        content={
            "error": "Resource not found",
            "detail": "The requested endpoint or resource does not exist",
            "available_endpoints": [
                "POST /property/report - Generate property report",
                "GET /health - Health check",
                "GET /property/sample - Sample report structure",
                "GET /docs - API documentation"
            ]
        }
    )


@app.exception_handler(500)
async def internal_error_handler(request, exc):
    """Custom 500 handler"""
    logger.error(f"Internal server error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": "An unexpected error occurred. Please try again or contact support.",
            "support": "For support, please contact the AlyProp team"
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