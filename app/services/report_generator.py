from typing import Optional
from datetime import datetime
import logging

from app.models import *
from app.services.estated_client import EstatedClient
from app.services.ai_analyzer import AIAnalyzer

logger = logging.getLogger(__name__)

class ReportGenerator:
    def __init__(self):
        self.estated_client = EstatedClient()
        self.ai_analyzer = AIAnalyzer()
    
    async def generate_property_report(self, address: str) -> PropertySearchResponse:
        """
        Generate a complete $5 property report for the given address
        """
        try:
            logger.info(f"Starting property report generation for: {address}")
            
            # Step 1: Fetch property data from Estated
            raw_property_data = await self.estated_client.search_property(address)
            
            if not raw_property_data:
                return PropertySearchResponse(
                    success=False,
                    error_message="Property not found or Estated API error",
                    credits_used=0.0
                )
            
            # Step 2: Extract and normalize property data
            extracted_data = self.estated_client.extract_property_data(raw_property_data)
            
            if not extracted_data.get('full_address'):
                return PropertySearchResponse(
                    success=False,
                    error_message="Unable to extract property information",
                    credits_used=0.0
                )
            
            # Step 3: Generate AI insights
            ai_insights = await self.ai_analyzer.analyze_property(extracted_data)
            
            # Step 4: Build the complete property report
            report = self._build_property_report(extracted_data, ai_insights)
            
            logger.info(f"Successfully generated report for: {address}")
            
            return PropertySearchResponse(
                success=True,
                report=report,
                credits_used=5.0
            )
            
        except Exception as e:
            logger.error(f"Error generating property report for {address}: {str(e)}")
            return PropertySearchResponse(
                success=False,
                error_message=f"Report generation failed: {str(e)}",
                credits_used=0.0
            )
    
    def _build_property_report(self, estated_data: dict, ai_insights: dict) -> PropertyReport:
        """
        Combine Estated data and AI insights into a structured PropertyReport
        """
        
        # 1. Property Overview
        property_overview = PropertyOverview(
            full_address=estated_data.get('full_address', ''),
            parcel_id=estated_data.get('parcel_id'),
            property_type=estated_data.get('property_type', 'Other'),
            year_built=estated_data.get('year_built'),
            square_footage=estated_data.get('square_footage'),
            lot_size=estated_data.get('lot_size'),
            bedrooms=estated_data.get('bedrooms'),
            bathrooms=estated_data.get('bathrooms'),
            legal_description=estated_data.get('legal_description'),
            zoning=estated_data.get('zoning'),
            human_readable_summary=ai_insights.get('human_readable_summary', 'Property summary unavailable')
        )
        
        # 2. Ownership & Sale History
        ownership_history = OwnershipHistory(
            owner_name=estated_data.get('owner_name'),
            owner_mailing_address=estated_data.get('owner_mailing_address'),
            last_sale_price=estated_data.get('last_sale_price'),
            last_sale_date=self._parse_date(estated_data.get('last_sale_date')),
            ownership_duration_years=ai_insights.get('ownership_duration_years') or ai_insights.get('calculated_ownership_years'),
            absentee_owner_status=ai_insights.get('absentee_owner_status', False),
            motivation_insight=ai_insights.get('motivation_insight', 'Motivation analysis unavailable')
        )
        
        # 3. Estimated Equity Position
        equity_position = EquityPosition(
            estimated_value_avm=estated_data.get('estimated_value_avm'),
            tax_assessed_value=estated_data.get('tax_assessed_value'),
            property_tax_amount=estated_data.get('property_tax_amount'),
            equity_estimate=ai_insights.get('equity_estimate') or ai_insights.get('calculated_equity'),
            tax_vs_avm_comparison=ai_insights.get('tax_vs_avm_comparison', 'Analysis unavailable')
        )
        
        # 4. Investment Strategy Insight
        investment_insight = InvestmentInsight(
            flip_potential_rating=ai_insights.get('flip_potential_rating', 'C'),
            buy_and_hold_assessment=ai_insights.get('buy_and_hold_assessment', 'Analysis needed'),
            brrrr_fit=ai_insights.get('brrrr_fit', 'Analysis needed'),
            ownership_duration_logic=ai_insights.get('ownership_duration_logic', 'Unable to analyze'),
            strategy_recommendation=self._map_strategy(ai_insights.get('strategy_recommendation', 'Not Suitable'))
        )
        
        # 5. Neighborhood & Walkability Context
        neighborhood_context = NeighborhoodContext(
            city=estated_data.get('city', ''),
            zip_code=estated_data.get('zip_code', ''),
            county=estated_data.get('county', ''),
            walkability_estimate=ai_insights.get('walkability_estimate', 'Medium'),
            transit_access_likelihood=ai_insights.get('transit_access_likelihood', 'Fair'),
            school_zone_quality_guess=ai_insights.get('school_zone_quality_guess', 'Average'),
            community_type_description=ai_insights.get('community_type_description', 'Analysis unavailable')
        )
        
        # 6. Risk & Red Flags
        risk_flags = RiskFlags(
            age_rehab_risk=ai_insights.get('age_rehab_risk', False),
            tax_under_assessment=ai_insights.get('tax_under_assessment', False),
            owner_non_residency=ai_insights.get('owner_non_residency', False),
            old_structure_flag=ai_insights.get('old_structure_flag', False),
            risk_summary=ai_insights.get('risk_summary', 'Risk analysis unavailable')
        )
        
        # 7. AI Investor Snapshot Summary
        investor_snapshot = InvestorSnapshot(
            summary_paragraph=ai_insights.get('summary_paragraph', 'Investor summary unavailable'),
            target_buyer_type=ai_insights.get('target_buyer_type', 'Analysis needed'),
            estimated_motivation_to_sell=ai_insights.get('estimated_motivation_to_sell', 'Medium'),
            suggested_outreach_approach=ai_insights.get('suggested_outreach_approach', 'Standard approach')
        )
        
        # 8. Bonus Inferred Analytics
        bonus_analytics = BonusAnalytics(
            off_market_probability_score=ai_insights.get('off_market_probability_score', 50),
            ai_grade=ai_insights.get('ai_grade', 'C'),
            rebuild_vs_rehab_guess=ai_insights.get('rebuild_vs_rehab_guess', 'Analysis needed')
        )
        
        # Build complete report
        report = PropertyReport(
            property_overview=property_overview,
            ownership_history=ownership_history,
            equity_position=equity_position,
            investment_insight=investment_insight,
            neighborhood_context=neighborhood_context,
            risk_flags=risk_flags,
            investor_snapshot=investor_snapshot,
            bonus_analytics=bonus_analytics
        )
        
        return report
    
    def _parse_date(self, date_str: Optional[str]) -> Optional[datetime]:
        """Parse date string from Estated API"""
        if not date_str:
            return None
        
        try:
            # Handle various date formats
            if 'T' in date_str:
                return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
            else:
                return datetime.strptime(date_str, '%Y-%m-%d')
        except Exception as e:
            logger.error(f"Error parsing date {date_str}: {e}")
            return None
    
    def _map_strategy(self, strategy_str: str) -> InvestmentStrategy:
        """Map AI strategy recommendation to enum"""
        strategy_lower = strategy_str.lower() if strategy_str else ''
        
        if 'flip' in strategy_lower:
            return InvestmentStrategy.FLIP
        elif 'buy and hold' in strategy_lower or 'hold' in strategy_lower:
            return InvestmentStrategy.BUY_AND_HOLD
        elif 'brrrr' in strategy_lower:
            return InvestmentStrategy.BRRRR
        elif 'wholesale' in strategy_lower:
            return InvestmentStrategy.WHOLESALE
        else:
            return InvestmentStrategy.NOT_SUITABLE