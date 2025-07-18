from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class PropertyType(str, Enum):
    SFR = "Single Family Residential"
    CONDO = "Condominium"
    TOWNHOUSE = "Townhouse"
    MULTI_FAMILY = "Multi-Family"
    LAND = "Land"
    OTHER = "Other"

class InvestmentStrategy(str, Enum):
    FLIP = "Flip"
    BUY_AND_HOLD = "Buy and Hold"
    BRRRR = "BRRRR"
    WHOLESALE = "Wholesale"
    NOT_SUITABLE = "Not Suitable"

class PropertyOverview(BaseModel):
    full_address: str
    parcel_id: Optional[str] = None
    property_type: PropertyType
    year_built: Optional[int] = None
    square_footage: Optional[int] = None
    lot_size: Optional[float] = None
    bedrooms: Optional[int] = None
    bathrooms: Optional[float] = None
    legal_description: Optional[str] = None
    zoning: Optional[str] = None
    human_readable_summary: str = Field(description="AI-generated property summary")

class OwnershipHistory(BaseModel):
    owner_name: Optional[str] = None
    owner_mailing_address: Optional[str] = None
    last_sale_price: Optional[float] = None
    last_sale_date: Optional[datetime] = None
    ownership_duration_years: Optional[float] = Field(description="AI-calculated ownership duration")
    absentee_owner_status: bool = Field(description="AI-inferred absentee owner status")
    motivation_insight: str = Field(description="AI-generated motivation analysis")

class EquityPosition(BaseModel):
    estimated_value_avm: Optional[float] = None
    tax_assessed_value: Optional[float] = None
    property_tax_amount: Optional[float] = None
    equity_estimate: Optional[float] = Field(description="AI-calculated equity (AVM - sale price)")
    tax_vs_avm_comparison: str = Field(description="AI analysis of tax vs AVM discrepancy")

class InvestmentInsight(BaseModel):
    flip_potential_rating: str = Field(description="A-F rating for flip potential")
    buy_and_hold_assessment: str = Field(description="Buy and hold value assessment")
    brrrr_fit: str = Field(description="BRRRR strategy fit analysis")
    ownership_duration_logic: str = Field(description="Analysis of ownership duration implications")
    strategy_recommendation: InvestmentStrategy = Field(description="Recommended investment strategy")

class NeighborhoodContext(BaseModel):
    city: str
    zip_code: str
    county: str
    walkability_estimate: str = Field(description="AI-estimated walkability score/description")
    transit_access_likelihood: str = Field(description="AI-estimated transit access")
    school_zone_quality_guess: str = Field(description="AI-estimated school quality")
    community_type_description: str = Field(description="AI-generated community description")

class RiskFlags(BaseModel):
    age_rehab_risk: bool = Field(description="Old property + long ownership = rehab needed")
    tax_under_assessment: bool = Field(description="Tax value significantly under AVM")
    owner_non_residency: bool = Field(description="Owner appears to be non-resident")
    old_structure_flag: bool = Field(description="Structure is very old")
    risk_summary: str = Field(description="AI-generated risk summary")

class InvestorSnapshot(BaseModel):
    summary_paragraph: str = Field(description="AI-generated investor summary")
    target_buyer_type: str = Field(description="Who this property is good for")
    estimated_motivation_to_sell: str = Field(description="AI-estimated seller motivation")
    suggested_outreach_approach: str = Field(description="Recommended approach for contact")

class BonusAnalytics(BaseModel):
    off_market_probability_score: int = Field(ge=0, le=100, description="0-100 probability score")
    ai_grade: str = Field(description="Overall A-F grade for investment potential")
    rebuild_vs_rehab_guess: str = Field(description="AI recommendation: rebuild or rehab")

class PropertyReport(BaseModel):
    property_overview: PropertyOverview
    ownership_history: OwnershipHistory
    equity_position: EquityPosition
    investment_insight: InvestmentInsight
    neighborhood_context: NeighborhoodContext
    risk_flags: RiskFlags
    investor_snapshot: InvestorSnapshot
    bonus_analytics: BonusAnalytics
    report_generated_at: datetime = Field(default_factory=datetime.utcnow)
    cost_usd: float = Field(default=5.0, description="Report cost in USD")

class PropertySearchRequest(BaseModel):
    address: str = Field(description="Full property address to analyze")

class PropertySearchResponse(BaseModel):
    success: bool
    report: Optional[PropertyReport] = None
    error_message: Optional[str] = None
    credits_used: float = Field(default=5.0)