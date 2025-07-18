import uuid
from datetime import datetime
from typing import Dict, Any, Optional
import logging
from app.models import (
    # Legacy Models
    PropertyReport, PropertyOverview, OwnershipSaleHistory, 
    EquityPosition, InvestmentStrategy, NeighborhoodContext,
    RiskRedFlags, InvestorSnapshot, BonusAnalytics, PropertyType,
    # New Legendary Models
    LegendaryPropertyReport, PropertyIdentityPhysical, ValuationEquityInsights,
    DealTypeStrategyRecommendations, OwnershipProfileMotivation, InvestorActionSection,
    NeighborhoodSchoolInfrastructure, RiskFlagsRegulatoryAlerts, FinancialBreakdownForecasting,
    MarketContext, ExecutiveSummary, BonusExtras
)
from app.services.estated_client import EstatedClient
from app.services.ai_analyzer import AIAnalyzer, LegendaryAIAnalyzer
from app.config import settings

logger = logging.getLogger(__name__)


class LegendaryReportGenerator:
    """Enhanced service for generating comprehensive 10-section legendary property reports"""
    
    def __init__(self):
        self.estated_client = EstatedClient()
        self.legendary_ai_analyzer = LegendaryAIAnalyzer()
    
    async def generate_legendary_report(self, address: str) -> LegendaryPropertyReport:
        """
        Generate complete 10-section Legendary Property Report
        
        Args:
            address: Property address to analyze
            
        Returns:
            Complete LegendaryPropertyReport with all 10 sections + bonus extras
            
        Raises:
            ValueError: If property data cannot be found or processed
        """
        try:
            # Step 1: Fetch comprehensive property data from Estated
            logger.info(f"Fetching property data for legendary report: {address}")
            property_data = await self.estated_client.get_property_data(address)
            
            if not property_data:
                raise ValueError(f"Property not found for address: {address}")
            
            # Step 2: Generate comprehensive AI analysis for all 10 sections
            logger.info("Generating comprehensive AI analysis for legendary report...")
            ai_insights = await self.legendary_ai_analyzer.analyze_property_legendary(property_data)
            
            # Step 3: Build complete legendary report
            logger.info("Assembling legendary report with all 10 sections...")
            legendary_report = await self._build_legendary_report(property_data, ai_insights, address)
            
            logger.info(f"Legendary report generated successfully: {legendary_report.report_id}")
            return legendary_report
            
        except Exception as e:
            logger.error(f"Failed to generate legendary report for {address}: {str(e)}")
            raise
    
    async def _build_legendary_report(
        self, 
        property_data: Dict[str, Any], 
        ai_insights: Dict[str, Any], 
        address: str
    ) -> LegendaryPropertyReport:
        """Build the complete legendary report structure"""
        
        # Extract data sections
        property_details = property_data.get('property', {})
        address_info = property_data.get('address', {})
        owner_info = property_data.get('owner', {})
        valuation = property_data.get('valuation', {})
        
        # Section 1: Property Identity & Physical Overview
        property_identity = PropertyIdentityPhysical(
            full_address=address_info.get('formatted_address', address),
            apn=property_details.get('apn'),
            parcel_id=property_details.get('parcel_id'),
            property_type=self._map_property_type(property_details.get('property_type')),
            structure_sqft=property_details.get('sqft'),
            lot_sqft=property_details.get('lot_sqft'),
            lot_dimensions=property_details.get('lot_dimensions'),
            bedrooms=property_details.get('bedrooms'),
            bathrooms=property_details.get('bathrooms'),
            year_built=property_details.get('year_built'),
            stories=property_details.get('stories'),
            garage_type=property_details.get('garage_type'),
            legal_land_use=property_details.get('zoning'),
            structure_condition=ai_insights.get('property_identity', {}).get('structure_condition', 'Assessment pending'),
            property_age_classification=ai_insights.get('property_identity', {}).get('property_age_classification', 'Classification pending'),
            exterior_material_style=ai_insights.get('property_identity', {}).get('exterior_material_style', 'Style analysis pending'),
            zoning_compatibility_issues=ai_insights.get('property_identity', {}).get('zoning_compatibility_issues', 'Analysis pending'),
            human_readable_summary=ai_insights.get('property_identity', {}).get('human_readable_summary', 'Summary generation pending')
        )
        
        # Section 2: Valuation & Equity Insights
        valuation_equity = ValuationEquityInsights(
            avm_value=valuation.get('avm'),
            last_sale_price=property_details.get('last_sale_price'),
            last_sale_date=property_details.get('last_sale_date'),
            assessed_tax_value=valuation.get('tax_assessed_value'),
            property_tax_amount=valuation.get('property_tax_amount'),
            price_per_sqft_current=ai_insights.get('valuation_equity', {}).get('price_per_sqft_current'),
            price_per_sqft_historical=ai_insights.get('valuation_equity', {}).get('price_per_sqft_historical'),
            estimated_equity=ai_insights.get('valuation_equity', {}).get('estimated_equity'),
            assessed_undervaluation_risk=ai_insights.get('valuation_equity', {}).get('assessed_undervaluation_risk', 'Risk assessment pending'),
            tax_vs_avm_discrepancy=ai_insights.get('valuation_equity', {}).get('tax_vs_avm_discrepancy', 'Analysis pending'),
            forecasted_appreciation=ai_insights.get('valuation_equity', {}).get('forecasted_appreciation', 'Forecast pending'),
            price_trend_comparison=ai_insights.get('valuation_equity', {}).get('price_trend_comparison', 'Comparison pending')
        )
        
        # Section 3: Deal Type & Strategy Recommendations
        deal_strategy = DealTypeStrategyRecommendations(
            flip_potential_score=ai_insights.get('deal_strategy', {}).get('flip_potential_score', 'C - Analysis pending'),
            brrrr_potential=ai_insights.get('deal_strategy', {}).get('brrrr_potential', 'Assessment pending'),
            buy_hold_rental_fit=ai_insights.get('deal_strategy', {}).get('buy_hold_rental_fit', 'Analysis pending'),
            wholesaling_viability=ai_insights.get('deal_strategy', {}).get('wholesaling_viability', 'Assessment pending'),
            rebuild_vs_rehab_vs_leave=ai_insights.get('deal_strategy', {}).get('rebuild_vs_rehab_vs_leave', 'Recommendation pending'),
            income_property_conversion=ai_insights.get('deal_strategy', {}).get('income_property_conversion', 'Analysis pending'),
            top_strategy_recommendation=ai_insights.get('deal_strategy', {}).get('top_strategy_recommendation', 'Recommendation pending'),
            suggested_purchase_price=ai_insights.get('deal_strategy', {}).get('suggested_purchase_price'),
            holding_cost_estimate=ai_insights.get('deal_strategy', {}).get('holding_cost_estimate', 'Estimate pending'),
            roi_estimate=ai_insights.get('deal_strategy', {}).get('roi_estimate', 'Calculation pending')
        )
        
        # Section 4: Ownership Profile & Motivation to Sell
        ownership_profile = OwnershipProfileMotivation(
            owner_names=[owner_info.get('name')] if owner_info.get('name') else None,
            owner_mailing_address=owner_info.get('mailing_address'),
            absentee_owner_flag=ai_insights.get('ownership_profile', {}).get('absentee_owner_flag', False),
            time_held_years=ai_insights.get('ownership_profile', {}).get('time_held_years'),
            owner_occupancy_likelihood=ai_insights.get('ownership_profile', {}).get('owner_occupancy_likelihood', 'Assessment pending'),
            long_term_hold_score=ai_insights.get('ownership_profile', {}).get('long_term_hold_score', 'Score pending'),
            owner_type_inference=ai_insights.get('ownership_profile', {}).get('owner_type_inference', 'Analysis pending'),
            motivation_to_sell_score=ai_insights.get('ownership_profile', {}).get('motivation_to_sell_score', 5),
            top_reason_might_sell=ai_insights.get('ownership_profile', {}).get('top_reason_might_sell', 'Analysis pending')
        )
        
        # Section 5: Investor Action Section
        investor_action = InvestorActionSection(
            recommended_approach=ai_insights.get('investor_action', {}).get('recommended_approach', 'Approach pending'),
            suggested_message_script=ai_insights.get('investor_action', {}).get('suggested_message_script', 'Script generation pending'),
            suggested_offer_range=ai_insights.get('investor_action', {}).get('suggested_offer_range', 'Range analysis pending'),
            counter_offer_logic=ai_insights.get('investor_action', {}).get('counter_offer_logic', 'Logic pending'),
            contact_urgency_estimate=ai_insights.get('investor_action', {}).get('contact_urgency_estimate', 'Assessment pending')
        )
        
        # Section 6: Neighborhood, School & Infrastructure
        neighborhood_infrastructure = NeighborhoodSchoolInfrastructure(
            zip_code=address_info.get('zip'),
            county=address_info.get('county'),
            census_data_basic=address_info.get('census_data'),
            neighborhood_type=ai_insights.get('neighborhood_infrastructure', {}).get('neighborhood_type', 'Type analysis pending'),
            school_zone_quality=ai_insights.get('neighborhood_infrastructure', {}).get('school_zone_quality', 'Quality assessment pending'),
            transit_access_level=ai_insights.get('neighborhood_infrastructure', {}).get('transit_access_level', 'Access analysis pending'),
            walkability_estimate=ai_insights.get('neighborhood_infrastructure', {}).get('walkability_estimate', 'Estimate pending'),
            distance_to_commercial=ai_insights.get('neighborhood_infrastructure', {}).get('distance_to_commercial', 'Distance analysis pending'),
            road_type=ai_insights.get('neighborhood_infrastructure', {}).get('road_type', 'Type assessment pending'),
            parking_availability=ai_insights.get('neighborhood_infrastructure', {}).get('parking_availability', 'Assessment pending'),
            development_trend=ai_insights.get('neighborhood_infrastructure', {}).get('development_trend', 'Trend analysis pending')
        )
        
        # Section 7: Risk Flags & Regulatory Red Alerts
        risk_flags = RiskFlagsRegulatoryAlerts(
            age_no_remodel_flag=ai_insights.get('risk_flags', {}).get('age_no_remodel_flag', 'Flag assessment pending'),
            avm_vs_tax_flag=ai_insights.get('risk_flags', {}).get('avm_vs_tax_flag', 'Assessment pending'),
            structure_age_risk=ai_insights.get('risk_flags', {}).get('structure_age_risk', 'Risk analysis pending'),
            flip_speculation_warning=ai_insights.get('risk_flags', {}).get('flip_speculation_warning', 'Warning assessment pending'),
            ownership_cluster_warning=ai_insights.get('risk_flags', {}).get('ownership_cluster_warning', 'Cluster analysis pending'),
            flood_zone_inference=ai_insights.get('risk_flags', {}).get('flood_zone_inference', 'Zone assessment pending'),
            tornado_risk_inference=ai_insights.get('risk_flags', {}).get('tornado_risk_inference', 'Risk analysis pending'),
            earthquake_risk_inference=ai_insights.get('risk_flags', {}).get('earthquake_risk_inference', 'Risk assessment pending'),
            wildfire_proximity_inference=ai_insights.get('risk_flags', {}).get('wildfire_proximity_inference', 'Proximity analysis pending'),
            historical_disaster_proximity=ai_insights.get('risk_flags', {}).get('historical_disaster_proximity', 'History analysis pending')
        )
        
        # Section 8: Financial Breakdown + Forecasting
        financial_breakdown = FinancialBreakdownForecasting(
            estimated_rental_income=ai_insights.get('financial_breakdown', {}).get('estimated_rental_income'),
            estimated_cap_rate=ai_insights.get('financial_breakdown', {}).get('estimated_cap_rate'),
            rehab_cost_estimate=ai_insights.get('financial_breakdown', {}).get('rehab_cost_estimate', 'Estimate pending'),
            total_project_budget=ai_insights.get('financial_breakdown', {}).get('total_project_budget', 'Budget analysis pending'),
            exit_price_scenarios=ai_insights.get('financial_breakdown', {}).get('exit_price_scenarios', 'Scenarios pending'),
            profit_potential_per_strategy=ai_insights.get('financial_breakdown', {}).get('profit_potential_per_strategy', 'Analysis pending'),
            monthly_carrying_costs=ai_insights.get('financial_breakdown', {}).get('monthly_carrying_costs', 'Costs analysis pending'),
            noi_estimate=ai_insights.get('financial_breakdown', {}).get('noi_estimate'),
            cash_on_cash_return=ai_insights.get('financial_breakdown', {}).get('cash_on_cash_return', 'Return calculation pending')
        )
        
        # Section 9: Market Context
        market_context = MarketContext(
            city_appreciation_trend=ai_insights.get('market_context', {}).get('city_appreciation_trend', 'Trend analysis pending'),
            median_home_price_vs_subject=ai_insights.get('market_context', {}).get('median_home_price_vs_subject', 'Comparison pending'),
            average_holding_period_zip=ai_insights.get('market_context', {}).get('average_holding_period_zip', 'Analysis pending'),
            investor_activity_score=ai_insights.get('market_context', {}).get('investor_activity_score', 'Score pending'),
            neighborhood_appreciation_rate=ai_insights.get('market_context', {}).get('neighborhood_appreciation_rate', 'Rate analysis pending'),
            gentrification_likelihood=ai_insights.get('market_context', {}).get('gentrification_likelihood', 'Assessment pending')
        )
        
        # Section 10: Executive Summary
        executive_summary = ExecutiveSummary(
            worth_it_verdict=ai_insights.get('executive_summary', {}).get('worth_it_verdict', 'Verdict pending'),
            top_3_strengths=ai_insights.get('executive_summary', {}).get('top_3_strengths', ['Analysis', 'In', 'Progress']),
            top_3_weaknesses=ai_insights.get('executive_summary', {}).get('top_3_weaknesses', ['Assessment', 'Pending', 'Review']),
            recommended_next_step=ai_insights.get('executive_summary', {}).get('recommended_next_step', 'Next step analysis pending'),
            report_scorecard=ai_insights.get('executive_summary', {}).get('report_scorecard', 'Scorecard pending'),
            time_sensitive_insight=ai_insights.get('executive_summary', {}).get('time_sensitive_insight', 'Insight analysis pending')
        )
        
        # Bonus Extras
        bonus_extras = BonusExtras(
            investor_pitch_deck_text=ai_insights.get('bonus_extras', {}).get('investor_pitch_deck_text', 'Pitch deck generation pending'),
            marketing_copy=ai_insights.get('bonus_extras', {}).get('marketing_copy', 'Marketing copy generation pending'),
            shareable_summary=ai_insights.get('bonus_extras', {}).get('shareable_summary', 'Summary generation pending'),
            custom_report_name=ai_insights.get('bonus_extras', {}).get('custom_report_name', f"Property Report - {address}")
        )
        
        # Build complete legendary report
        legendary_report = LegendaryPropertyReport(
            report_id=str(uuid.uuid4()),
            generated_at=datetime.now(),
            address_analyzed=address,
            property_identity=property_identity,
            valuation_equity=valuation_equity,
            deal_strategy=deal_strategy,
            ownership_profile=ownership_profile,
            investor_action=investor_action,
            neighborhood_infrastructure=neighborhood_infrastructure,
            risk_flags=risk_flags,
            financial_breakdown=financial_breakdown,
            market_context=market_context,
            executive_summary=executive_summary,
            bonus_extras=bonus_extras
        )
        
        return legendary_report
    
    def _map_property_type(self, property_type_str: Optional[str]) -> Optional[PropertyType]:
        """Map string property type to enum"""
        if not property_type_str:
            return None
        
        type_str = property_type_str.lower()
        if 'single family' in type_str or 'sfr' in type_str:
            return PropertyType.SINGLE_FAMILY
        elif 'duplex' in type_str:
            return PropertyType.DUPLEX
        elif 'condo' in type_str:
            return PropertyType.CONDO
        elif 'townhouse' in type_str or 'townhome' in type_str:
            return PropertyType.TOWNHOUSE
        elif 'multi' in type_str:
            return PropertyType.MULTI_FAMILY
        elif 'land' in type_str:
            return PropertyType.LAND
        elif 'commercial' in type_str:
            return PropertyType.COMMERCIAL
        else:
            return PropertyType.OTHER


class ReportGenerator:
    """Legacy service for generating $5 AI Property Reports (8 sections)"""
    
    def __init__(self):
        self.estated_client = EstatedClient()
        self.ai_analyzer = AIAnalyzer()
        self.legendary_generator = LegendaryReportGenerator()
    
    async def generate_report(self, address: str, legendary_format: bool = False) -> PropertyReport:
        """
        Generate Property Report - either legacy 8-section or legendary 10-section format
        
        Args:
            address: Property address to analyze
            legendary_format: If True, generates 10-section legendary format; if False, generates legacy 8-section
            
        Returns:
            Complete PropertyReport with specified format
            
        Raises:
            ValueError: If property data cannot be found or processed
        """
        if legendary_format:
            # Generate legendary 10-section report and convert to legacy format for compatibility
            legendary_report = await self.legendary_generator.generate_legendary_report(address)
            return self._convert_legendary_to_legacy(legendary_report)
        
        # Generate legacy 8-section report
        return await self._generate_legacy_report(address)
    
    async def _generate_legacy_report(self, address: str) -> PropertyReport:
        """Generate legacy 8-section report"""
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
            report = await self._build_legacy_report(property_data, ai_insights)
            
            logger.info(f"Report generated successfully: {report.report_id}")
            return report
            
        except Exception as e:
            logger.error(f"Failed to generate report for {address}: {str(e)}")
            raise
    
    async def _build_legacy_report(self, property_data: Dict[str, Any], ai_insights: Dict[str, Any]) -> PropertyReport:
        """Build the legacy 8-section report structure"""
        
        # Extract data sections for legacy format
        property_details = property_data.get('property', {})
        address_info = property_data.get('address', {})
        owner_info = property_data.get('owner', {})
        valuation = property_data.get('valuation', {})
        
        # Section 1: Property Overview
        property_overview = PropertyOverview(
            full_address=address_info.get('formatted_address', ''),
            parcel_id=property_details.get('parcel_id'),
            property_type=self._map_property_type(property_details.get('property_type')),
            year_built=property_details.get('year_built'),
            square_footage=property_details.get('sqft'),
            lot_size=property_details.get('lot_size'),
            bedrooms=property_details.get('bedrooms'),
            bathrooms=property_details.get('bathrooms'),
            legal_description=property_details.get('zoning'),
            ai_summary=ai_insights.get('property_overview', {}).get('ai_summary', 'Analysis pending')
        )
        
        # Section 2: Ownership & Sale History
        ownership_sale_history = OwnershipSaleHistory(
            owner_name=owner_info.get('name'),
            owner_mailing_address=owner_info.get('mailing_address'),
            last_sale_price=property_details.get('last_sale_price'),
            last_sale_date=property_details.get('last_sale_date'),
            ownership_duration_years=ai_insights.get('ownership_analysis', {}).get('ownership_duration_years'),
            is_absentee_owner=ai_insights.get('ownership_analysis', {}).get('is_absentee_owner'),
            motivation_insight=ai_insights.get('ownership_analysis', {}).get('motivation_insight', 'Analysis pending')
        )
        
        # Section 3: Equity Position
        equity_position = EquityPosition(
            estimated_value=valuation.get('avm'),
            tax_assessed_value=valuation.get('tax_assessed_value'),
            property_tax_amount=valuation.get('property_tax_amount'),
            equity_estimate=ai_insights.get('equity_analysis', {}).get('estimated_equity'),
            tax_vs_avm_analysis=ai_insights.get('equity_analysis', {}).get('tax_vs_avm_analysis', 'Analysis pending')
        )
        
        # Section 4: Investment Strategy
        investment_strategy = InvestmentStrategy(
            flip_potential_rating=ai_insights.get('investment_strategy', {}).get('flip_potential_rating', 'C'),
            buy_hold_assessment=ai_insights.get('investment_strategy', {}).get('buy_hold_assessment', 'Analysis pending'),
            brrrr_fit_score=ai_insights.get('investment_strategy', {}).get('brrrr_fit_score', 'Analysis pending'),
            ownership_duration_logic=ai_insights.get('investment_strategy', {}).get('ownership_duration_logic', 'Logic pending'),
            strategy_recommendation=ai_insights.get('investment_strategy', {}).get('strategy_recommendation', 'Recommendation pending')
        )
        
        # Section 5: Neighborhood Context
        neighborhood_context = NeighborhoodContext(
            city=address_info.get('city'),
            zip_code=address_info.get('zip'),
            county=address_info.get('county'),
            walkability_estimate=ai_insights.get('neighborhood_context', {}).get('walkability_estimate', 'Assessment pending'),
            transit_access=ai_insights.get('neighborhood_context', {}).get('transit_access', 'Assessment pending'),
            school_zone_quality=ai_insights.get('neighborhood_context', {}).get('school_zone_quality', 'Assessment pending'),
            community_description=ai_insights.get('neighborhood_context', {}).get('community_description', 'Description pending')
        )
        
        # Section 6: Risk & Red Flags
        risk_red_flags = RiskRedFlags(
            age_rehab_risk=ai_insights.get('risk_assessment', {}).get('age_rehab_risk', 'Risk assessment pending'),
            tax_underassessment_risk=ai_insights.get('risk_assessment', {}).get('tax_underassessment_risk', 'Assessment pending'),
            absentee_owner_risk=ai_insights.get('risk_assessment', {}).get('absentee_owner_risk', 'Risk analysis pending'),
            old_structure_risk=ai_insights.get('risk_assessment', {}).get('old_structure_risk', 'Assessment pending'),
            risk_summary=ai_insights.get('risk_assessment', {}).get('risk_summary', 'Summary pending')
        )
        
        # Section 7: Investor Snapshot
        investor_snapshot = InvestorSnapshot(
            investor_summary=ai_insights.get('investor_action', {}).get('investor_summary', 'Summary pending'),
            target_buyer_type=ai_insights.get('investor_action', {}).get('target_buyer_type', 'Type analysis pending'),
            motivation_to_sell=ai_insights.get('investor_action', {}).get('motivation_to_sell', 'Motivation pending'),
            outreach_approach=ai_insights.get('investor_action', {}).get('outreach_approach', 'Approach pending')
        )
        
        # Section 8: Bonus Analytics
        bonus_analytics = BonusAnalytics(
            off_market_probability=ai_insights.get('bonus_analytics', {}).get('off_market_probability', 'Probability pending'),
            ai_grade=ai_insights.get('bonus_analytics', {}).get('ai_grade', 'C'),
            rebuild_vs_rehab=ai_insights.get('bonus_analytics', {}).get('rebuild_vs_rehab', 'Recommendation pending'),
            cold_outreach_script=ai_insights.get('bonus_analytics', {}).get('cold_outreach_script', 'Script generation pending')
        )
        
        # Build complete legacy report
        report = PropertyReport(
            property_overview=property_overview,
            ownership_sale_history=ownership_sale_history,
            equity_position=equity_position,
            investment_strategy=investment_strategy,
            neighborhood_context=neighborhood_context,
            risk_red_flags=risk_red_flags,
            investor_snapshot=investor_snapshot,
            bonus_analytics=bonus_analytics
        )
        
        return report
    
    def _convert_legendary_to_legacy(self, legendary_report: LegendaryPropertyReport) -> PropertyReport:
        """Convert legendary 10-section report to legacy 8-section format"""
        
        # Map legendary sections to legacy format
        property_overview = PropertyOverview(
            full_address=legendary_report.property_identity.full_address,
            parcel_id=legendary_report.property_identity.parcel_id,
            property_type=legendary_report.property_identity.property_type,
            year_built=legendary_report.property_identity.year_built,
            square_footage=legendary_report.property_identity.structure_sqft,
            lot_size=legendary_report.property_identity.lot_sqft / 43560 if legendary_report.property_identity.lot_sqft else None,  # Convert to acres
            bedrooms=legendary_report.property_identity.bedrooms,
            bathrooms=legendary_report.property_identity.bathrooms,
            legal_description=legendary_report.property_identity.legal_land_use,
            ai_summary=legendary_report.property_identity.human_readable_summary
        )
        
        ownership_sale_history = OwnershipSaleHistory(
            owner_name=legendary_report.ownership_profile.owner_names[0] if legendary_report.ownership_profile.owner_names else None,
            owner_mailing_address=legendary_report.ownership_profile.owner_mailing_address,
            last_sale_price=legendary_report.valuation_equity.last_sale_price,
            last_sale_date=legendary_report.valuation_equity.last_sale_date,
            ownership_duration_years=legendary_report.ownership_profile.time_held_years,
            is_absentee_owner=legendary_report.ownership_profile.absentee_owner_flag,
            motivation_insight=legendary_report.ownership_profile.top_reason_might_sell
        )
        
        equity_position = EquityPosition(
            estimated_value=legendary_report.valuation_equity.avm_value,
            tax_assessed_value=legendary_report.valuation_equity.assessed_tax_value,
            property_tax_amount=legendary_report.valuation_equity.property_tax_amount,
            equity_estimate=legendary_report.valuation_equity.estimated_equity,
            tax_vs_avm_analysis=legendary_report.valuation_equity.tax_vs_avm_discrepancy
        )
        
        investment_strategy = InvestmentStrategy(
            flip_potential_rating=legendary_report.deal_strategy.flip_potential_score,
            buy_hold_assessment=legendary_report.deal_strategy.buy_hold_rental_fit,
            brrrr_fit_score=legendary_report.deal_strategy.brrrr_potential,
            ownership_duration_logic=f"Owner held for {legendary_report.ownership_profile.time_held_years} years",
            strategy_recommendation=legendary_report.deal_strategy.top_strategy_recommendation
        )
        
        neighborhood_context = NeighborhoodContext(
            city=legendary_report.address_analyzed.split(',')[1].strip() if ',' in legendary_report.address_analyzed else '',
            zip_code=legendary_report.neighborhood_infrastructure.zip_code,
            county=legendary_report.neighborhood_infrastructure.county,
            walkability_estimate=legendary_report.neighborhood_infrastructure.walkability_estimate,
            transit_access=legendary_report.neighborhood_infrastructure.transit_access_level,
            school_zone_quality=legendary_report.neighborhood_infrastructure.school_zone_quality,
            community_description=legendary_report.neighborhood_infrastructure.neighborhood_type
        )
        
        risk_red_flags = RiskRedFlags(
            age_rehab_risk=legendary_report.risk_flags.age_no_remodel_flag,
            tax_underassessment_risk=legendary_report.risk_flags.avm_vs_tax_flag,
            absentee_owner_risk=f"Absentee owner: {legendary_report.ownership_profile.absentee_owner_flag}",
            old_structure_risk=legendary_report.risk_flags.structure_age_risk,
            risk_summary=f"Overall risk assessment based on {len([f for f in [legendary_report.risk_flags.flood_zone_inference, legendary_report.risk_flags.tornado_risk_inference, legendary_report.risk_flags.earthquake_risk_inference] if 'low' not in f.lower()])} elevated risk factors"
        )
        
        investor_snapshot = InvestorSnapshot(
            investor_summary=legendary_report.executive_summary.worth_it_verdict,
            target_buyer_type=legendary_report.deal_strategy.top_strategy_recommendation,
            motivation_to_sell=f"{legendary_report.ownership_profile.motivation_to_sell_score}/10 - {legendary_report.ownership_profile.top_reason_might_sell}",
            outreach_approach=legendary_report.investor_action.recommended_approach
        )
        
        bonus_analytics = BonusAnalytics(
            off_market_probability=f"Score based on motivation: {legendary_report.ownership_profile.motivation_to_sell_score}/10",
            ai_grade=legendary_report.executive_summary.report_scorecard,
            rebuild_vs_rehab=legendary_report.deal_strategy.rebuild_vs_rehab_vs_leave,
            cold_outreach_script=legendary_report.investor_action.suggested_message_script
        )
        
        return PropertyReport(
            report_id=legendary_report.report_id,
            generated_at=legendary_report.generated_at,
            property_overview=property_overview,
            ownership_sale_history=ownership_sale_history,
            equity_position=equity_position,
            investment_strategy=investment_strategy,
            neighborhood_context=neighborhood_context,
            risk_red_flags=risk_red_flags,
            investor_snapshot=investor_snapshot,
            bonus_analytics=bonus_analytics
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
                    "description": "🔒 AI probability scores and grades + cold outreach script",
                    "data_sources": ["Claude AI"],
                    "fields": ["off_market_probability", "ai_grade", "rebuild_vs_rehab", "cold_outreach_script"]
                }
            }
        }
    
    def _map_property_type(self, property_type_str: Optional[str]) -> Optional[PropertyType]:
        """Map string property type to enum"""
        if not property_type_str:
            return None
        
        type_str = property_type_str.lower()
        if 'single family' in type_str or 'sfr' in type_str:
            return PropertyType.SINGLE_FAMILY
        elif 'duplex' in type_str:
            return PropertyType.DUPLEX
        elif 'condo' in type_str:
            return PropertyType.CONDO
        elif 'townhouse' in type_str or 'townhome' in type_str:
            return PropertyType.TOWNHOUSE
        elif 'multi' in type_str:
            return PropertyType.MULTI_FAMILY
        elif 'land' in type_str:
            return PropertyType.LAND
        elif 'commercial' in type_str:
            return PropertyType.COMMERCIAL
        else:
            return PropertyType.OTHER