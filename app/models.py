from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum


class PropertyType(str, Enum):
    SINGLE_FAMILY = "Single Family Residential"
    CONDO = "Condominium"
    TOWNHOUSE = "Townhouse"
    MULTI_FAMILY = "Multi-Family"
    LAND = "Land"
    COMMERCIAL = "Commercial"
    OTHER = "Other"


class PropertyOverview(BaseModel):
    """Section 1: 🏠 Property Overview"""
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
    """Section 2: 👤 Ownership & Sale History"""
    owner_name: Optional[str] = Field(None, description="Current owner name")
    owner_mailing_address: Optional[str] = Field(None, description="Owner mailing address")
    last_sale_price: Optional[float] = Field(None, description="Last sale price")
    last_sale_date: Optional[str] = Field(None, description="Last sale date")
    ownership_duration_years: Optional[float] = Field(None, description="AI calculated ownership duration")
    is_absentee_owner: Optional[bool] = Field(None, description="AI inferred absentee status")
    motivation_insight: str = Field(..., description="AI analysis of owner motivation")


class EquityPosition(BaseModel):
    """Section 3: 💵 Estimated Equity Position"""
    estimated_value: Optional[float] = Field(None, description="AVM estimated value")
    tax_assessed_value: Optional[float] = Field(None, description="Tax assessed value")
    property_tax_amount: Optional[float] = Field(None, description="Annual property tax")
    equity_estimate: Optional[float] = Field(None, description="AI calculated equity (AVM - sale)")
    tax_vs_avm_analysis: str = Field(..., description="AI comparison of tax vs AVM")


class InvestmentStrategy(BaseModel):
    """Section 4: 🔁 Investment Strategy Insight"""
    flip_potential_rating: str = Field(..., description="AI flip potential rating (A-F)")
    buy_hold_assessment: str = Field(..., description="Buy-and-hold value assessment")
    brrrr_fit_score: str = Field(..., description="BRRRR strategy fit assessment")
    ownership_duration_logic: str = Field(..., description="Logic behind ownership duration analysis")
    strategy_recommendation: str = Field(..., description="Recommended strategy (rent/flip)")


class NeighborhoodContext(BaseModel):
    """Section 5: 🧭 Neighborhood & Walkability Context"""
    city: Optional[str] = Field(None, description="City name")
    zip_code: Optional[str] = Field(None, description="ZIP code")
    county: Optional[str] = Field(None, description="County name")
    walkability_estimate: str = Field(..., description="AI walkability assessment")
    transit_access: str = Field(..., description="AI transit access likelihood")
    school_zone_quality: str = Field(..., description="AI school zone quality guess")
    community_description: str = Field(..., description="AI community type description")


class RiskRedFlags(BaseModel):
    """Section 6: ⚠️ Risk & Red Flags"""
    age_rehab_risk: str = Field(..., description="Age + long ownership rehab risk")
    tax_underassessment_risk: str = Field(..., description="Tax under-assessment analysis")
    absentee_owner_risk: str = Field(..., description="Owner non-residency risk")
    old_structure_risk: str = Field(..., description="Old structure risk flag")
    risk_summary: str = Field(..., description="Overall risk summary")


class InvestorSnapshot(BaseModel):
    """Section 7: 📊 AI Investor Snapshot Summary"""
    investor_summary: str = Field(..., description="Summary paragraph for investors")
    target_buyer_type: str = Field(..., description="Who it's good for (first-time, flipper)")
    motivation_to_sell: str = Field(..., description="Estimated motivation to sell")
    outreach_approach: str = Field(..., description="Suggested outreach approach")


class BonusAnalytics(BaseModel):
    """Section 8: 🔒 Bonus Inferred Analytics"""
    off_market_probability: str = Field(..., description="Off-market probability score")
    ai_grade: str = Field(..., description="AI grade (A-F)")
    rebuild_vs_rehab: str = Field(..., description="Rebuild vs rehab recommendation")
    cold_outreach_script: str = Field(..., description="Ready-to-use cold outreach script")


class PropertyReportRequest(BaseModel):
    """Request model for property report generation"""
    address: str = Field(..., description="Property address to analyze")


class PropertyReport(BaseModel):
    """Complete $5 AI Property Report"""
    report_id: str = Field(..., description="Unique report identifier")
    generated_at: datetime = Field(default_factory=datetime.now)
    cost: float = Field(default=5.00, description="Report cost")
    
    # 8 Main Sections
    property_overview: PropertyOverview
    ownership_sale_history: OwnershipSaleHistory
    equity_position: EquityPosition
    investment_strategy: InvestmentStrategy
    neighborhood_context: NeighborhoodContext
    risk_red_flags: RiskRedFlags
    investor_snapshot: InvestorSnapshot
    bonus_analytics: BonusAnalytics


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str
    detail: Optional[str] = None