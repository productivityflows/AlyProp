import uuid
from datetime import datetime
from typing import Dict, Any, Optional
import logging
from app.models import (
    PropertyReport, PropertyOverview, OwnershipSaleHistory, 
    EquityPosition, InvestmentStrategy, NeighborhoodContext,
    RiskRedFlags, InvestorSnapshot, BonusAnalytics, PropertyType
)
from app.services.estated_client import EstatedClient
from app.services.ai_analyzer import AIAnalyzer
from app.config import settings

logger = logging.getLogger(__name__)


class ReportGenerator:
    """Main service for generating $5 AI Property Reports"""
    
    def __init__(self):
        self.estated_client = EstatedClient()
        self.ai_analyzer = AIAnalyzer()
    
    async def generate_report(self, address: str) -> PropertyReport:
        """
        Generate complete $5 AI Property Report
        
        Args:
            address: Property address to analyze
            
        Returns:
            Complete PropertyReport with all 8 sections
            
        Raises:
            ValueError: If property data cannot be found or processed
        """
        try:
            # Step 1: Fetch property data from Estated
            logger.info(f"Fetching property data for: {address}")
            property_data = await self.estated_client.get_property_data(address)
            
            if not property_data:
                raise ValueError(f"Property not found for address: {address}")
            
            # Step 2: Generate AI analysis
            logger.info("Generating AI analysis...")
            ai_insights = await self.ai_analyzer.analyze_property(property_data)
            
            # Step 3: Build complete report
            logger.info("Assembling final report...")
            report = await self._build_report(property_data, ai_insights)
            
            logger.info(f"Report generated successfully for: {address}")
            return report
            
        except Exception as e:
            logger.error(f"Error generating report for {address}: {str(e)}")
            raise
    
    async def _build_report(self, property_data: Dict[str, Any], ai_insights: Dict[str, Any]) -> PropertyReport:
        """Build the final PropertyReport from data and AI insights"""
        
        # Generate unique report ID
        report_id = str(uuid.uuid4())[:8]
        
        # Build each section
        property_overview = self._build_property_overview(property_data, ai_insights)
        ownership_history = self._build_ownership_history(property_data, ai_insights)
        equity_position = self._build_equity_position(property_data, ai_insights)
        investment_strategy = self._build_investment_strategy(ai_insights)
        neighborhood_context = self._build_neighborhood_context(property_data, ai_insights)
        risk_flags = self._build_risk_flags(ai_insights)
        investor_snapshot = self._build_investor_snapshot(ai_insights)
        bonus_analytics = self._build_bonus_analytics(ai_insights)
        
        # Create complete report
        report = PropertyReport(
            report_id=report_id,
            generated_at=datetime.now(),
            cost=settings.REPORT_COST,
            property_overview=property_overview,
            ownership_sale_history=ownership_history,
            equity_position=equity_position,
            investment_strategy=investment_strategy,
            neighborhood_context=neighborhood_context,
            risk_red_flags=risk_flags,
            investor_snapshot=investor_snapshot,
            bonus_analytics=bonus_analytics
        )
        
        return report
    
    def _build_property_overview(self, property_data: Dict[str, Any], ai_insights: Dict[str, Any]) -> PropertyOverview:
        """Build Section 1: 🏠 Property Overview"""
        
        # Map property type to enum
        property_type_str = property_data.get("property_type", "Other")
        try:
            property_type = PropertyType(property_type_str)
        except ValueError:
            property_type = PropertyType.OTHER
        
        return PropertyOverview(
            full_address=property_data.get("full_address", "Address not available"),
            parcel_id=property_data.get("parcel_id"),
            property_type=property_type,
            year_built=property_data.get("year_built"),
            square_footage=property_data.get("square_footage"),
            lot_size=property_data.get("lot_size"),
            bedrooms=property_data.get("bedrooms"),
            bathrooms=property_data.get("bathrooms"),
            legal_description=property_data.get("legal_description"),
            ai_summary=ai_insights.get("property_summary", "Property analysis completed.")
        )
    
    def _build_ownership_history(self, property_data: Dict[str, Any], ai_insights: Dict[str, Any]) -> OwnershipSaleHistory:
        """Build Section 2: 👤 Ownership & Sale History"""
        
        return OwnershipSaleHistory(
            owner_name=property_data.get("owner_name"),
            owner_mailing_address=property_data.get("owner_mailing_address"),
            last_sale_price=property_data.get("last_sale_price"),
            last_sale_date=property_data.get("last_sale_date"),
            ownership_duration_years=ai_insights.get("ownership_duration_years"),
            is_absentee_owner=ai_insights.get("is_absentee_owner"),
            motivation_insight=ai_insights.get("motivation_insight", "Owner motivation analysis completed.")
        )
    
    def _build_equity_position(self, property_data: Dict[str, Any], ai_insights: Dict[str, Any]) -> EquityPosition:
        """Build Section 3: 💵 Estimated Equity Position"""
        
        return EquityPosition(
            estimated_value=property_data.get("estimated_value"),
            tax_assessed_value=property_data.get("tax_assessed_value"),
            property_tax_amount=property_data.get("property_tax_amount"),
            equity_estimate=ai_insights.get("equity_estimate"),
            tax_vs_avm_analysis=ai_insights.get("tax_vs_avm_analysis", "Tax vs market value analysis completed.")
        )
    
    def _build_investment_strategy(self, ai_insights: Dict[str, Any]) -> InvestmentStrategy:
        """Build Section 4: 🔁 Investment Strategy Insight"""
        
        return InvestmentStrategy(
            flip_potential_rating=ai_insights.get("flip_potential_rating", "B - Moderate potential"),
            buy_hold_assessment=ai_insights.get("buy_hold_assessment", "Buy-and-hold potential evaluated"),
            brrrr_fit_score=ai_insights.get("brrrr_fit_score", "BRRRR strategy assessed"),
            ownership_duration_logic=ai_insights.get("ownership_duration_logic", "Ownership timeline analyzed"),
            strategy_recommendation=ai_insights.get("strategy_recommendation", "Investment strategy recommendation available")
        )
    
    def _build_neighborhood_context(self, property_data: Dict[str, Any], ai_insights: Dict[str, Any]) -> NeighborhoodContext:
        """Build Section 5: 🧭 Neighborhood & Walkability Context"""
        
        return NeighborhoodContext(
            city=property_data.get("city"),
            zip_code=property_data.get("zip_code"),
            county=property_data.get("county"),
            walkability_estimate=ai_insights.get("walkability_estimate", "Walkability assessment completed"),
            transit_access=ai_insights.get("transit_access", "Transit access evaluated"),
            school_zone_quality=ai_insights.get("school_zone_quality", "School zone quality assessed"),
            community_description=ai_insights.get("community_description", "Community characteristics analyzed")
        )
    
    def _build_risk_flags(self, ai_insights: Dict[str, Any]) -> RiskRedFlags:
        """Build Section 6: ⚠️ Risk & Red Flags"""
        
        return RiskRedFlags(
            age_rehab_risk=ai_insights.get("age_rehab_risk", "Age-related risk assessed"),
            tax_underassessment_risk=ai_insights.get("tax_underassessment_risk", "Tax assessment risk evaluated"),
            absentee_owner_risk=ai_insights.get("absentee_owner_risk", "Ownership risk assessed"),
            old_structure_risk=ai_insights.get("old_structure_risk", "Structural risk evaluated"),
            risk_summary=ai_insights.get("risk_summary", "Overall risk assessment completed")
        )
    
    def _build_investor_snapshot(self, ai_insights: Dict[str, Any]) -> InvestorSnapshot:
        """Build Section 7: 📊 AI Investor Snapshot Summary"""
        
        return InvestorSnapshot(
            investor_summary=ai_insights.get("investor_summary", "Investment opportunity summary completed"),
            target_buyer_type=ai_insights.get("target_buyer_type", "Target buyer analysis available"),
            motivation_to_sell=ai_insights.get("motivation_to_sell", "Seller motivation assessed"),
            outreach_approach=ai_insights.get("outreach_approach", "Outreach strategy recommendations available")
        )
    
    def _build_bonus_analytics(self, ai_insights: Dict[str, Any]) -> BonusAnalytics:
        """Build Section 8: 🔒 Bonus Inferred Analytics"""
        
        return BonusAnalytics(
            off_market_probability=ai_insights.get("off_market_probability", "50% - Moderate off-market potential"),
            ai_grade=ai_insights.get("ai_grade", "B"),
            rebuild_vs_rehab=ai_insights.get("rebuild_vs_rehab", "Renovation approach recommendation available")
        )
    
    async def health_check(self) -> Dict[str, Any]:
        """Check system health and API connectivity"""
        try:
            estated_status = await self.estated_client.health_check()
            api_keys_valid = settings.validate_api_keys()
            
            return {
                "status": "healthy" if estated_status and api_keys_valid else "degraded",
                "estated_api": "connected" if estated_status else "disconnected",
                "api_keys": "valid" if api_keys_valid else "missing",
                "report_cost": settings.REPORT_COST,
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            logger.error(f"Health check failed: {str(e)}")
            return {
                "status": "unhealthy",
                "error": str(e),
                "timestamp": datetime.now().isoformat()
            }
    
    def get_sample_report_structure(self) -> Dict[str, Any]:
        """Return sample report structure for API documentation"""
        return {
            "report_id": "abc12345",
            "generated_at": "2024-01-15T10:30:00Z",
            "cost": 5.00,
            "sections": {
                "1_property_overview": {
                    "description": "🏠 Basic property details + AI summary",
                    "data_sources": ["Estated", "Claude AI"],
                    "fields": ["address", "parcel_id", "type", "year_built", "sqft", "lot_size", "bed/bath", "ai_summary"]
                },
                "2_ownership_sale_history": {
                    "description": "👤 Owner info + sale history + AI motivation analysis",
                    "data_sources": ["Estated", "Claude AI"],
                    "fields": ["owner_name", "owner_address", "last_sale", "ownership_years", "absentee_status", "motivation"]
                },
                "3_equity_position": {
                    "description": "💵 Financial position + AI equity analysis",
                    "data_sources": ["Estated", "Claude AI"],
                    "fields": ["estimated_value", "tax_assessed", "property_tax", "equity_estimate", "tax_analysis"]
                },
                "4_investment_strategy": {
                    "description": "🔁 AI investment strategy analysis",
                    "data_sources": ["Claude AI"],
                    "fields": ["flip_rating", "buy_hold_assessment", "brrrr_fit", "strategy_recommendation"]
                },
                "5_neighborhood_context": {
                    "description": "🧭 Location + AI walkability/community analysis",
                    "data_sources": ["Estated", "Claude AI"],
                    "fields": ["city", "zip", "county", "walkability", "transit", "schools", "community_type"]
                },
                "6_risk_red_flags": {
                    "description": "⚠️ AI risk assessment and warnings",
                    "data_sources": ["Claude AI"],
                    "fields": ["age_risk", "tax_risk", "absentee_risk", "structure_risk", "risk_summary"]
                },
                "7_investor_snapshot": {
                    "description": "📊 AI investor summary and recommendations",
                    "data_sources": ["Claude AI"],
                    "fields": ["investor_summary", "target_buyer", "seller_motivation", "outreach_approach"]
                },
                "8_bonus_analytics": {
                    "description": "🔒 AI probability scores and grades",
                    "data_sources": ["Claude AI"],
                    "fields": ["off_market_probability", "ai_grade", "rebuild_vs_rehab"]
                }
            }
        }