from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid


class PropertyType(str, Enum):
    SINGLE_FAMILY = "Single Family Residential"
    DUPLEX = "Duplex"
    CONDO = "Condominium"
    TOWNHOUSE = "Townhouse"
    MULTI_FAMILY = "Multi-Family"
    LAND = "Land"
    COMMERCIAL = "Commercial"
    OTHER = "Other"


class PropertyIdentityPhysical(BaseModel):
    """Section 1: 🧱 Property Identity & Physical Overview"""
    # Estated Data
    full_address: str = Field(..., description="Complete property address")
    apn: Optional[str] = Field(None, description="Assessor Parcel Number")
    parcel_id: Optional[str] = Field(None, description="Parcel ID from Estated")
    property_type: Optional[PropertyType] = Field(None, description="Property type (SFR, Duplex, Condo, etc.)")
    structure_sqft: Optional[int] = Field(None, description="Building square footage")
    lot_sqft: Optional[int] = Field(None, description="Lot size in square feet")
    lot_dimensions: Optional[str] = Field(None, description="Lot dimensions if available")
    bedrooms: Optional[int] = Field(None, description="Number of bedrooms")
    bathrooms: Optional[float] = Field(None, description="Number of bathrooms")
    year_built: Optional[int] = Field(None, description="Year the property was built")
    stories: Optional[int] = Field(None, description="Number of stories")
    garage_type: Optional[str] = Field(None, description="Garage type and parking")
    legal_land_use: Optional[str] = Field(None, description="Legal land use (e.g., R1, C2)")
    
    # Claude AI Inferences
    structure_condition: str = Field(..., description="AI inferred structure condition")
    property_age_classification: str = Field(..., description="AI property age classification")
    exterior_material_style: str = Field(..., description="AI inferred exterior material or style")
    zoning_compatibility_issues: str = Field(..., description="AI analysis of zoning compatibility")
    human_readable_summary: str = Field(..., description="Human-readable property summary")


class ValuationEquityInsights(BaseModel):
    """Section 2: 🏦 Valuation & Equity Insights"""
    # Estated Data
    avm_value: Optional[float] = Field(None, description="Automated Valuation Model estimate")
    last_sale_price: Optional[float] = Field(None, description="Last sale price")
    last_sale_date: Optional[str] = Field(None, description="Last sale date")
    assessed_tax_value: Optional[float] = Field(None, description="Assessed tax value")
    property_tax_amount: Optional[float] = Field(None, description="Annual property tax amount")
    
    # Claude AI Calculations
    price_per_sqft_current: Optional[float] = Field(None, description="Current price per sq ft")
    price_per_sqft_historical: Optional[float] = Field(None, description="Historical price per sq ft")
    estimated_equity: Optional[float] = Field(None, description="Estimated equity (AVM - last sale)")
    assessed_undervaluation_risk: str = Field(..., description="AI assessed undervaluation risk analysis")
    tax_vs_avm_discrepancy: str = Field(..., description="AI tax vs AVM discrepancy analysis")
    forecasted_appreciation: str = Field(..., description="AI forecasted appreciation (ZIP/city level)")
    price_trend_comparison: str = Field(..., description="Price trend vs city/county average")


class DealTypeStrategyRecommendations(BaseModel):
    """Section 3: 💡 Deal Type & Strategy Recommendations"""
    flip_potential_score: str = Field(..., description="AI flip potential score (A-F)")
    brrrr_potential: str = Field(..., description="AI BRRRR potential assessment")
    buy_hold_rental_fit: str = Field(..., description="AI buy-and-hold rental fit analysis")
    wholesaling_viability: str = Field(..., description="AI wholesaling viability assessment")
    rebuild_vs_rehab_vs_leave: str = Field(..., description="AI rebuild vs rehab vs leave alone recommendation")
    income_property_conversion: str = Field(..., description="AI income property conversion potential")
    top_strategy_recommendation: str = Field(..., description="Top strategy recommendation with logic")
    suggested_purchase_price: Optional[float] = Field(None, description="AI suggested purchase price based on strategy")
    holding_cost_estimate: str = Field(..., description="AI holding cost estimate (taxes, rehab, etc.)")
    roi_estimate: str = Field(..., description="AI ROI estimate based on inferred rents")


class OwnershipProfileMotivation(BaseModel):
    """Section 4: 🧠 Ownership Profile & Motivation to Sell"""
    # Estated Data
    owner_names: Optional[List[str]] = Field(None, description="Owner name(s)")
    owner_mailing_address: Optional[str] = Field(None, description="Owner mailing address")
    
    # Claude AI Analysis
    absentee_owner_flag: bool = Field(..., description="AI absentee owner detection")
    time_held_years: Optional[float] = Field(None, description="AI calculated time held in years")
    owner_occupancy_likelihood: str = Field(..., description="AI owner-occupancy likelihood assessment")
    long_term_hold_score: str = Field(..., description="AI long-term hold score")
    owner_type_inference: str = Field(..., description="AI owner type inference (investor vs resident)")
    motivation_to_sell_score: int = Field(..., description="AI motivation to sell score (1-10)")
    top_reason_might_sell: str = Field(..., description="AI top reason they might sell")


class InvestorActionSection(BaseModel):
    """Section 5: 💬 Investor Action Section"""
    recommended_approach: str = Field(..., description="AI recommended approach (mail, text, door knock)")
    suggested_message_script: str = Field(..., description="AI suggested message or cold script")
    suggested_offer_range: str = Field(..., description="AI suggested offer range")
    counter_offer_logic: str = Field(..., description="AI counter-offer logic preparation")
    contact_urgency_estimate: str = Field(..., description="AI contact urgency estimate")


class NeighborhoodSchoolInfrastructure(BaseModel):
    """Section 6: 🌍 Neighborhood, School & Infrastructure"""
    # Estated Data
    zip_code: Optional[str] = Field(None, description="ZIP code")
    county: Optional[str] = Field(None, description="County")
    census_data_basic: Optional[str] = Field(None, description="Basic census data")
    
    # Claude AI Inferences
    neighborhood_type: str = Field(..., description="AI inferred neighborhood type (urban/suburban/etc.)")
    school_zone_quality: str = Field(..., description="AI inferred school zone quality (based on city/ZIP)")
    transit_access_level: str = Field(..., description="AI transit access level (basic/inferred)")
    walkability_estimate: str = Field(..., description="AI walkability estimate")
    distance_to_commercial: str = Field(..., description="AI distance to commercial corridors")
    road_type: str = Field(..., description="AI road type (main road vs cul-de-sac)")
    parking_availability: str = Field(..., description="AI parking scarcity or ease assessment")
    development_trend: str = Field(..., description="AI development trend in ZIP or street")


class RiskFlagsRegulatoryAlerts(BaseModel):
    """Section 7: 🌪 Risk Flags & Regulatory Red Alerts"""
    age_no_remodel_flag: str = Field(..., description="AI age + no remodel = rehab flag")
    avm_vs_tax_flag: str = Field(..., description="AI AVM too high vs tax = reassessment flag")
    structure_age_risk: str = Field(..., description="AI structure too old = structural risk")
    flip_speculation_warning: str = Field(..., description="AI flip within 1 year = speculation warning")
    ownership_cluster_warning: str = Field(..., description="AI ownership cluster warning (LLC spam)")
    flood_zone_inference: str = Field(..., description="AI inferred flood zone (based on city/ZIP)")
    tornado_risk_inference: str = Field(..., description="AI inferred tornado risk (geo-based)")
    earthquake_risk_inference: str = Field(..., description="AI inferred earthquake risk (CA/NV/WA zones)")
    wildfire_proximity_inference: str = Field(..., description="AI inferred wildfire proximity")
    historical_disaster_proximity: str = Field(..., description="AI historical disaster proximity (regional)")


class FinancialBreakdownForecasting(BaseModel):
    """Section 8: 💸 Financial Breakdown + Forecasting"""
    estimated_rental_income: Optional[float] = Field(None, description="AI estimated rental income (ZIP-based avg)")
    estimated_cap_rate: Optional[float] = Field(None, description="AI estimated CAP rate")
    rehab_cost_estimate: str = Field(..., description="AI rehab cost bracket estimate")
    total_project_budget: str = Field(..., description="AI total project budget estimate (if flipped)")
    exit_price_scenarios: str = Field(..., description="AI exit price scenarios (pessimistic/realistic/aggressive)")
    profit_potential_per_strategy: str = Field(..., description="AI profit potential for each strategy")
    monthly_carrying_costs: str = Field(..., description="AI monthly tax + insurance + maintenance")
    noi_estimate: Optional[float] = Field(None, description="AI NOI (net operating income) estimate")
    cash_on_cash_return: str = Field(..., description="AI cash-on-cash return (for rental)")


class MarketContext(BaseModel):
    """Section 9: ⚠️ Market Context"""
    city_appreciation_trend: str = Field(..., description="AI city-level appreciation trend (1/5/10 yrs)")
    median_home_price_vs_subject: str = Field(..., description="AI median home price vs subject comparison")
    average_holding_period_zip: str = Field(..., description="AI average holding period in ZIP")
    investor_activity_score: str = Field(..., description="AI investor activity score (ZIP-level)")
    neighborhood_appreciation_rate: str = Field(..., description="AI neighborhood appreciation vs average")
    gentrification_likelihood: str = Field(..., description="AI ZIP gentrification likelihood")


class ExecutiveSummary(BaseModel):
    """Section 10: 📜 Executive Summary"""
    worth_it_verdict: str = Field(..., description="AI plain-English 'worth it or not' verdict")
    top_3_strengths: List[str] = Field(..., description="AI top 3 strengths of the deal")
    top_3_weaknesses: List[str] = Field(..., description="AI top 3 weaknesses or flags")
    recommended_next_step: str = Field(..., description="AI recommended next step")
    report_scorecard: str = Field(..., description="AI report readability grade/scorecard")
    time_sensitive_insight: str = Field(..., description="AI time-sensitive insight (e.g., 'act quickly')")


class BonusExtras(BaseModel):
    """📎 Bonus Extras"""
    investor_pitch_deck_text: str = Field(..., description="Claude-generated investor pitch deck text")
    marketing_copy: str = Field(..., description="AI-generated marketing copy for buyer/seller")
    shareable_summary: str = Field(..., description="Shareable 1-pager summary (Markdown/HTML)")
    custom_report_name: str = Field(..., description="Custom-named report file (e.g., '3BR Queens Rehab')")


class LegendaryPropertyReport(BaseModel):
    """Complete Legendary Property Report - 10 Sections + Bonus Extras"""
    # Report Metadata
    report_id: str = Field(..., description="Unique report identifier")
    generated_at: datetime = Field(..., description="Report generation timestamp")
    address_analyzed: str = Field(..., description="Property address that was analyzed")
    
    # 10 Main Sections
    property_identity: PropertyIdentityPhysical
    valuation_equity: ValuationEquityInsights
    deal_strategy: DealTypeStrategyRecommendations
    ownership_profile: OwnershipProfileMotivation
    investor_action: InvestorActionSection
    neighborhood_infrastructure: NeighborhoodSchoolInfrastructure
    risk_flags: RiskFlagsRegulatoryAlerts
    financial_breakdown: FinancialBreakdownForecasting
    market_context: MarketContext
    executive_summary: ExecutiveSummary
    
    # Bonus Extras
    bonus_extras: BonusExtras


# Legacy Models for Backward Compatibility
class PropertyOverview(BaseModel):
    """Legacy Section 1: 🏠 Property Overview"""
    full_address: str = Field(..., description="Complete property address")
    parcel_id: Optional[str] = Field(None, description="Parcel ID / APN from Estated")
    property_type: Optional[PropertyType] = Field(None, description="Property type classification")
    year_built: Optional[int] = Field(None, description="Year the property was built")
    square_footage: Optional[int] = Field(None, description="Building square footage")
    lot_size: Optional[float] = Field(None, description="Lot size in acres")
    bedrooms: Optional[int] = Field(None, description="Number of bedrooms")
    bathrooms: Optional[float] = Field(None, description="Number of bathrooms")
    legal_description: Optional[str] = Field(None, description="Legal description and zoning")
    ai_summary: str = Field(..., description="Human-readable AI summary")


class OwnershipSaleHistory(BaseModel):
    """Legacy Section 2: 👤 Ownership & Sale History"""
    owner_name: Optional[str] = Field(None, description="Current owner name")
    owner_mailing_address: Optional[str] = Field(None, description="Owner mailing address")
    last_sale_price: Optional[float] = Field(None, description="Last sale price")
    last_sale_date: Optional[str] = Field(None, description="Last sale date")
    ownership_duration_years: Optional[float] = Field(None, description="AI calculated ownership duration")
    is_absentee_owner: Optional[bool] = Field(None, description="AI inferred absentee status")
    motivation_insight: str = Field(..., description="AI analysis of owner motivation")


class EquityPosition(BaseModel):
    """Legacy Section 3: 💵 Estimated Equity Position"""
    estimated_value: Optional[float] = Field(None, description="AVM estimated value")
    tax_assessed_value: Optional[float] = Field(None, description="Tax assessed value")
    property_tax_amount: Optional[float] = Field(None, description="Annual property tax")
    equity_estimate: Optional[float] = Field(None, description="AI calculated equity (AVM - sale)")
    tax_vs_avm_analysis: str = Field(..., description="AI comparison of tax vs AVM")


class InvestmentStrategy(BaseModel):
    """Legacy Section 4: 🔁 Investment Strategy Insight"""
    flip_potential_rating: str = Field(..., description="AI flip potential rating (A-F)")
    buy_hold_assessment: str = Field(..., description="Buy-and-hold value assessment")
    brrrr_fit_score: str = Field(..., description="BRRRR strategy fit assessment")
    ownership_duration_logic: str = Field(..., description="Logic behind ownership duration analysis")
    strategy_recommendation: str = Field(..., description="Recommended strategy (rent/flip)")


class NeighborhoodContext(BaseModel):
    """Legacy Section 5: 🧭 Neighborhood & Walkability Context"""
    city: Optional[str] = Field(None, description="City name")
    zip_code: Optional[str] = Field(None, description="ZIP code")
    county: Optional[str] = Field(None, description="County name")
    walkability_estimate: str = Field(..., description="AI walkability assessment")
    transit_access: str = Field(..., description="AI transit access likelihood")
    school_zone_quality: str = Field(..., description="AI school zone quality guess")
    community_description: str = Field(..., description="AI community type description")


class RiskRedFlags(BaseModel):
    """Legacy Section 6: ⚠️ Risk & Red Flags"""
    age_rehab_risk: str = Field(..., description="Age + long ownership rehab risk")
    tax_underassessment_risk: str = Field(..., description="Tax under-assessment analysis")
    absentee_owner_risk: str = Field(..., description="Owner non-residency risk")
    old_structure_risk: str = Field(..., description="Old structure risk flag")
    risk_summary: str = Field(..., description="Overall risk summary")


class InvestorSnapshot(BaseModel):
    """Legacy Section 7: 📊 AI Investor Snapshot Summary"""
    investor_summary: str = Field(..., description="Summary paragraph for investors")
    target_buyer_type: str = Field(..., description="Who it's good for (first-time, flipper)")
    motivation_to_sell: str = Field(..., description="Estimated motivation to sell")
    outreach_approach: str = Field(..., description="Suggested outreach approach")


class BonusAnalytics(BaseModel):
    """Legacy Section 8: 🔒 Bonus Inferred Analytics"""
    off_market_probability: str = Field(..., description="Off-market probability score")
    ai_grade: str = Field(..., description="AI grade (A-F)")
    rebuild_vs_rehab: str = Field(..., description="Rebuild vs rehab recommendation")
    cold_outreach_script: str = Field(..., description="Ready-to-use cold outreach script")


class PropertyReport(BaseModel):
    """Legacy Property Report (8 sections)"""
    report_id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    generated_at: datetime = Field(default_factory=datetime.now)
    property_overview: PropertyOverview
    ownership_sale_history: OwnershipSaleHistory
    equity_position: EquityPosition
    investment_strategy: InvestmentStrategy
    neighborhood_context: NeighborhoodContext
    risk_red_flags: RiskRedFlags
    investor_snapshot: InvestorSnapshot
    bonus_analytics: BonusAnalytics


class PropertyReportRequest(BaseModel):
    """Request model for property report generation"""
    address: str = Field(..., description="Property address to analyze")
    legendary_format: bool = Field(default=False, description="Generate 10-section legendary format")


class LegendaryReportRequest(BaseModel):
    """Request model for legendary property report generation"""
    address: str = Field(..., description="Property address to analyze")


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str
    detail: Optional[str] = None