import anthropic
from typing import Dict, Any, Optional, List
import json
import logging
from datetime import datetime, timedelta
from app.config import settings

logger = logging.getLogger(__name__)


class LegendaryAIAnalyzer:
    """Enhanced Claude AI analyzer for comprehensive 10-section legendary property reports"""
    
    def __init__(self):
        self.client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
    
    async def analyze_property_legendary(self, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate comprehensive 10-section AI analysis with bonus extras
        
        Args:
            property_data: Raw property data from Estated
            
        Returns:
            Dictionary containing all AI-generated insights for legendary format
        """
        try:
            # Create the comprehensive legendary analysis prompt
            analysis_prompt = self._create_comprehensive_legendary_prompt(property_data)
            
            # Get AI analysis with enhanced context for all 10 sections
            response = await self.client.messages.create(
                model="claude-3-sonnet-20241022",
                max_tokens=8000,  # Increased for comprehensive analysis
                system="""You are a seasoned real estate investment mentor with 25+ years of experience across residential, commercial, and alternative investment strategies. You analyze properties with the depth of a top-tier real estate investment firm, providing strategic insights that professional investors pay thousands for.

Your legendary analysis should:
- Cover ALL 10 sections comprehensively with specific, actionable insights
- Provide quantitative estimates when possible (rental income, rehab costs, ROI)
- Flag both obvious and subtle risks that amateur investors miss
- Include specific cold outreach scripts tailored to the property/owner profile
- Assess market context and timing factors
- Provide multiple exit strategy scenarios with profit projections
- Include regulatory and natural disaster risk assessments
- Generate ready-to-use marketing copy and pitch materials

Write as a trusted advisor who sees opportunities and risks others overlook. Be specific, tactical, and confidence-inspiring while maintaining intellectual honesty about uncertainties.""",
                messages=[
                    {
                        "role": "user",
                        "content": analysis_prompt
                    }
                ]
            )
            
            # Parse the comprehensive response
            ai_content = response.content[0].text if response.content else ""
            
            # Extract structured insights for all 10 sections + bonus extras
            return self._parse_legendary_analysis(ai_content, property_data)
            
        except Exception as e:
            logger.error(f"Legendary AI analysis failed: {str(e)}")
            return self._generate_fallback_legendary_analysis(property_data)
    
    def _create_comprehensive_legendary_prompt(self, property_data: Dict[str, Any]) -> str:
        """Create comprehensive analysis prompt for all 10 sections"""
        
        # Extract key property details for context
        address = property_data.get('address', {})
        property_details = property_data.get('property', {})
        owner_info = property_data.get('owner', {})
        valuation = property_data.get('valuation', {})
        
        prompt = f"""
# LEGENDARY PROPERTY ANALYSIS REQUEST

Analyze this property comprehensively across ALL 10 sections below. Provide specific, actionable insights for each section.

## PROPERTY DATA:
- **Address**: {address.get('formatted_address', 'N/A')}
- **Property Type**: {property_details.get('property_type', 'N/A')}
- **Year Built**: {property_details.get('year_built', 'N/A')}
- **Square Footage**: {property_details.get('sqft', 'N/A')} sq ft
- **Lot Size**: {property_details.get('lot_size', 'N/A')}
- **Bedrooms**: {property_details.get('bedrooms', 'N/A')}
- **Bathrooms**: {property_details.get('bathrooms', 'N/A')}
- **AVM Value**: ${valuation.get('avm', 'N/A')}
- **Last Sale**: ${property_details.get('last_sale_price', 'N/A')} on {property_details.get('last_sale_date', 'N/A')}
- **Owner**: {owner_info.get('name', 'N/A')}
- **Owner Address**: {owner_info.get('mailing_address', 'N/A')}
- **ZIP Code**: {address.get('zip', 'N/A')}
- **County**: {address.get('county', 'N/A')}

## REQUIRED ANALYSIS SECTIONS:

### 1. 🧱 PROPERTY IDENTITY & PHYSICAL OVERVIEW
Provide:
- Structure condition assessment (inferred from age, type, area)
- Property age classification (new/mature/vintage/antique)
- Exterior material/style inference
- Zoning compatibility analysis
- Human-readable property summary

### 2. 🏦 VALUATION & EQUITY INSIGHTS
Calculate and analyze:
- Price per sq ft (current vs historical estimate)
- Estimated equity position
- Assessed undervaluation risk
- Tax vs AVM discrepancy analysis
- Forecasted appreciation (ZIP/city level)
- Price trend vs area averages

### 3. 💡 DEAL TYPE & STRATEGY RECOMMENDATIONS
Score and recommend:
- Flip potential (A-F with reasoning)
- BRRRR potential assessment
- Buy-and-hold rental fit
- Wholesaling viability
- Rebuild vs rehab vs leave alone
- Income property conversion potential
- TOP strategy recommendation with logic
- Suggested purchase price based on strategy
- Holding cost estimates
- ROI projections

### 4. 🧠 OWNERSHIP PROFILE & MOTIVATION TO SELL
Analyze:
- Absentee owner detection and implications
- Time held calculation and significance
- Owner occupancy likelihood
- Long-term hold score
- Owner type (investor vs resident)
- Motivation to sell score (1-10)
- Top reason they might sell

### 5. 💬 INVESTOR ACTION SECTION
Provide:
- Recommended approach (mail/text/door knock)
- Specific cold outreach script for this property/owner
- Suggested offer range with logic
- Counter-offer preparation
- Contact urgency assessment

### 6. 🌍 NEIGHBORHOOD, SCHOOL & INFRASTRUCTURE
Assess:
- Neighborhood type (urban/suburban/rural)
- School zone quality (inferred from area)
- Transit access level
- Walkability estimate
- Distance to commercial areas
- Road type significance
- Parking availability
- Development trends in area

### 7. 🌪 RISK FLAGS & REGULATORY RED ALERTS
Identify:
- Age + no remodel rehab needs
- AVM vs tax reassessment risk
- Structural age concerns
- Flip speculation warnings
- Ownership pattern red flags
- Natural disaster risks (flood/tornado/earthquake/wildfire)
- Historical disaster proximity

### 8. 💸 FINANCIAL BREAKDOWN + FORECASTING
Estimate:
- Rental income (ZIP-based market rates)
- CAP rate calculation
- Rehab cost brackets
- Total project budget scenarios
- Exit price scenarios (pessimistic/realistic/aggressive)
- Profit potential by strategy
- Monthly carrying costs
- NOI estimates
- Cash-on-cash returns

### 9. ⚠️ MARKET CONTEXT
Analyze:
- City appreciation trends (1/5/10 year)
- Median home price comparison
- Average holding periods in ZIP
- Investor activity levels
- Appreciation rate vs market
- Gentrification likelihood

### 10. 📜 EXECUTIVE SUMMARY
Conclude with:
- Plain-English "worth it or not" verdict
- Top 3 deal strengths
- Top 3 weaknesses/flags
- Recommended next step
- Report quality scorecard
- Time-sensitive insights

### 📎 BONUS EXTRAS
Generate:
- Investor pitch deck summary text
- Marketing copy for buyer/seller outreach
- Shareable 1-pager summary in markdown
- Custom report name suggestion

## OUTPUT FORMAT:
Provide detailed analysis for each section. Be specific with numbers, timelines, and actionable advice. Include confidence levels where appropriate.
"""
        
        return prompt
    
    def _parse_legendary_analysis(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Parse AI response into structured legendary insights"""
        
        # This is a comprehensive parser that extracts insights for all 10 sections
        # In a production system, you might want to use structured output or fine-tuned extraction
        
        insights = {
            # Section 1: Property Identity & Physical
            "property_identity": self._extract_property_identity_insights(ai_content, property_data),
            
            # Section 2: Valuation & Equity
            "valuation_equity": self._extract_valuation_insights(ai_content, property_data),
            
            # Section 3: Deal Strategy
            "deal_strategy": self._extract_strategy_insights(ai_content, property_data),
            
            # Section 4: Ownership Profile
            "ownership_profile": self._extract_ownership_insights(ai_content, property_data),
            
            # Section 5: Investor Action
            "investor_action": self._extract_action_insights(ai_content, property_data),
            
            # Section 6: Neighborhood Infrastructure
            "neighborhood_infrastructure": self._extract_neighborhood_insights(ai_content, property_data),
            
            # Section 7: Risk Flags
            "risk_flags": self._extract_risk_insights(ai_content, property_data),
            
            # Section 8: Financial Breakdown
            "financial_breakdown": self._extract_financial_insights(ai_content, property_data),
            
            # Section 9: Market Context
            "market_context": self._extract_market_insights(ai_content, property_data),
            
            # Section 10: Executive Summary
            "executive_summary": self._extract_executive_insights(ai_content, property_data),
            
            # Bonus Extras
            "bonus_extras": self._extract_bonus_insights(ai_content, property_data)
        }
        
        return insights
    
    def _extract_property_identity_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract property identity and physical insights"""
        property_details = property_data.get('property', {})
        
        return {
            "structure_condition": self._extract_section(ai_content, "structure condition", "Good condition based on age and type"),
            "property_age_classification": self._classify_property_age(property_details.get('year_built')),
            "exterior_material_style": self._extract_section(ai_content, "exterior material", "Traditional style typical of era"),
            "zoning_compatibility_issues": self._extract_section(ai_content, "zoning", "No apparent zoning conflicts"),
            "human_readable_summary": self._extract_section(ai_content, "property summary", f"Property analysis for {property_data.get('address', {}).get('formatted_address', 'this property')}")
        }
    
    def _extract_valuation_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract valuation and equity insights"""
        valuation = property_data.get('valuation', {})
        property_details = property_data.get('property', {})
        
        avm = valuation.get('avm', 0)
        last_sale = property_details.get('last_sale_price', 0)
        sqft = property_details.get('sqft', 1)
        
        return {
            "price_per_sqft_current": round(avm / sqft, 2) if avm and sqft else None,
            "price_per_sqft_historical": round(last_sale / sqft, 2) if last_sale and sqft else None,
            "estimated_equity": avm - last_sale if avm and last_sale else None,
            "assessed_undervaluation_risk": self._extract_section(ai_content, "undervaluation", "Moderate risk based on market trends"),
            "tax_vs_avm_discrepancy": self._extract_section(ai_content, "tax vs avm", "Typical variance for area"),
            "forecasted_appreciation": self._extract_section(ai_content, "appreciation", "Steady appreciation expected"),
            "price_trend_comparison": self._extract_section(ai_content, "price trend", "Aligned with market averages")
        }
    
    def _extract_strategy_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract deal strategy insights"""
        return {
            "flip_potential_score": self._extract_section(ai_content, "flip potential", "B - Good flip potential"),
            "brrrr_potential": self._extract_section(ai_content, "brrrr", "Moderate BRRRR potential"),
            "buy_hold_rental_fit": self._extract_section(ai_content, "rental fit", "Good rental property candidate"),
            "wholesaling_viability": self._extract_section(ai_content, "wholesale", "Limited wholesale appeal"),
            "rebuild_vs_rehab_vs_leave": self._extract_section(ai_content, "rehab vs rebuild", "Light rehab recommended"),
            "income_property_conversion": self._extract_section(ai_content, "conversion", "No conversion needed"),
            "top_strategy_recommendation": self._extract_section(ai_content, "top strategy", "Buy and hold for rental income"),
            "suggested_purchase_price": self._extract_numeric_section(ai_content, "purchase price"),
            "holding_cost_estimate": self._extract_section(ai_content, "holding costs", "$2,000-3,000 monthly"),
            "roi_estimate": self._extract_section(ai_content, "roi", "8-12% cash-on-cash return")
        }
    
    def _extract_ownership_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract ownership profile insights"""
        owner_info = property_data.get('owner', {})
        property_details = property_data.get('property', {})
        
        return {
            "absentee_owner_flag": self._detect_absentee_owner(owner_info, property_data.get('address', {})),
            "time_held_years": self._calculate_ownership_duration(property_details.get('last_sale_date')),
            "owner_occupancy_likelihood": self._extract_section(ai_content, "occupancy", "Likely owner-occupied"),
            "long_term_hold_score": self._extract_section(ai_content, "hold score", "High - 8/10"),
            "owner_type_inference": self._extract_section(ai_content, "owner type", "Residential owner"),
            "motivation_to_sell_score": self._extract_numeric_section(ai_content, "motivation", default=5),
            "top_reason_might_sell": self._extract_section(ai_content, "sell reason", "Life changes or financial needs")
        }
    
    def _extract_action_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract investor action insights"""
        return {
            "recommended_approach": self._extract_section(ai_content, "approach", "Direct mail campaign"),
            "suggested_message_script": self._extract_section(ai_content, "script", "Hi [Owner], I'm a local investor interested in purchasing your property at [Address]. Would you consider a cash offer?"),
            "suggested_offer_range": self._extract_section(ai_content, "offer range", "75-85% of AVM"),
            "counter_offer_logic": self._extract_section(ai_content, "counter offer", "Be prepared to justify offer with comps"),
            "contact_urgency_estimate": self._extract_section(ai_content, "urgency", "Medium - contact within 2 weeks")
        }
    
    def _extract_neighborhood_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract neighborhood infrastructure insights"""
        return {
            "neighborhood_type": self._extract_section(ai_content, "neighborhood type", "Suburban residential"),
            "school_zone_quality": self._extract_section(ai_content, "school quality", "Average to good schools"),
            "transit_access_level": self._extract_section(ai_content, "transit", "Moderate transit access"),
            "walkability_estimate": self._extract_section(ai_content, "walkability", "Car-dependent area"),
            "distance_to_commercial": self._extract_section(ai_content, "commercial", "2-5 miles to major retail"),
            "road_type": self._extract_section(ai_content, "road type", "Residential street"),
            "parking_availability": self._extract_section(ai_content, "parking", "Adequate parking available"),
            "development_trend": self._extract_section(ai_content, "development", "Stable established area")
        }
    
    def _extract_risk_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract risk flags and regulatory alerts"""
        return {
            "age_no_remodel_flag": self._extract_section(ai_content, "age remodel", "Low risk - reasonable age"),
            "avm_vs_tax_flag": self._extract_section(ai_content, "avm tax", "Normal variance"),
            "structure_age_risk": self._extract_section(ai_content, "age risk", "Low structural risk"),
            "flip_speculation_warning": self._extract_section(ai_content, "speculation", "No speculation warning"),
            "ownership_cluster_warning": self._extract_section(ai_content, "cluster", "No ownership clustering detected"),
            "flood_zone_inference": self._extract_section(ai_content, "flood", "Low flood risk area"),
            "tornado_risk_inference": self._extract_section(ai_content, "tornado", "Standard regional risk"),
            "earthquake_risk_inference": self._extract_section(ai_content, "earthquake", "Low earthquake risk"),
            "wildfire_proximity_inference": self._extract_section(ai_content, "wildfire", "Low wildfire risk"),
            "historical_disaster_proximity": self._extract_section(ai_content, "disaster", "No significant disaster history")
        }
    
    def _extract_financial_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract financial breakdown insights"""
        return {
            "estimated_rental_income": self._extract_numeric_section(ai_content, "rental income"),
            "estimated_cap_rate": self._extract_numeric_section(ai_content, "cap rate"),
            "rehab_cost_estimate": self._extract_section(ai_content, "rehab cost", "$15,000-25,000"),
            "total_project_budget": self._extract_section(ai_content, "project budget", "$200,000-250,000"),
            "exit_price_scenarios": self._extract_section(ai_content, "exit price", "Conservative: $X, Realistic: $Y, Aggressive: $Z"),
            "profit_potential_per_strategy": self._extract_section(ai_content, "profit potential", "Rental: $X/month, Flip: $Y profit"),
            "monthly_carrying_costs": self._extract_section(ai_content, "carrying costs", "$2,500-3,000/month"),
            "noi_estimate": self._extract_numeric_section(ai_content, "noi"),
            "cash_on_cash_return": self._extract_section(ai_content, "cash return", "8-12% annually")
        }
    
    def _extract_market_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract market context insights"""
        return {
            "city_appreciation_trend": self._extract_section(ai_content, "appreciation trend", "3-5% annually"),
            "median_home_price_vs_subject": self._extract_section(ai_content, "median price", "Above/below median by X%"),
            "average_holding_period_zip": self._extract_section(ai_content, "holding period", "7-10 years average"),
            "investor_activity_score": self._extract_section(ai_content, "investor activity", "Moderate - 6/10"),
            "neighborhood_appreciation_rate": self._extract_section(ai_content, "neighborhood appreciation", "Tracking with market"),
            "gentrification_likelihood": self._extract_section(ai_content, "gentrification", "Low to moderate likelihood")
        }
    
    def _extract_executive_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract executive summary insights"""
        return {
            "worth_it_verdict": self._extract_section(ai_content, "verdict", "Solid investment opportunity with moderate risk"),
            "top_3_strengths": self._extract_list_section(ai_content, "strengths", ["Good location", "Fair price", "Rental potential"]),
            "top_3_weaknesses": self._extract_list_section(ai_content, "weaknesses", ["Age concerns", "Market competition", "Rehab needs"]),
            "recommended_next_step": self._extract_section(ai_content, "next step", "Conduct property inspection and verify comps"),
            "report_scorecard": self._extract_section(ai_content, "scorecard", "B+ overall investment grade"),
            "time_sensitive_insight": self._extract_section(ai_content, "time sensitive", "Market conditions favor prompt action")
        }
    
    def _extract_bonus_insights(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract bonus extras insights"""
        address = property_data.get('address', {}).get('formatted_address', 'Property')
        property_details = property_data.get('property', {})
        bedrooms = property_details.get('bedrooms', '')
        property_type = property_details.get('property_type', '').replace('Single Family Residential', 'SFR')
        
        return {
            "investor_pitch_deck_text": self._extract_section(ai_content, "pitch deck", f"Investment Opportunity: {address} - Strong rental potential with value-add opportunities"),
            "marketing_copy": self._extract_section(ai_content, "marketing copy", f"Discover the potential of {address} - Perfect for investors seeking steady returns"),
            "shareable_summary": self._extract_section(ai_content, "summary", f"## {address}\n**Investment Grade:** B+\n**Strategy:** Buy & Hold\n**Est. ROI:** 8-12%"),
            "custom_report_name": f"{bedrooms}BR {property_type} - {property_data.get('address', {}).get('city', 'Investment')}"
        }
    
    # Helper methods for extraction and calculation
    def _extract_section(self, content: str, section_key: str, default: str = "Analysis not available") -> str:
        """Extract specific section from AI content"""
        # Simple keyword-based extraction - in production, use more sophisticated parsing
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if section_key.lower() in line.lower():
                # Return next few lines as the content
                return ' '.join(lines[i:i+3]).strip()
        return default
    
    def _extract_numeric_section(self, content: str, section_key: str, default: Optional[float] = None) -> Optional[float]:
        """Extract numeric value from AI content"""
        section_text = self._extract_section(content, section_key, "")
        # Simple regex extraction for numbers
        import re
        numbers = re.findall(r'\$?(\d{1,3}(?:,\d{3})*(?:\.\d{2})?)', section_text)
        if numbers:
            try:
                return float(numbers[0].replace(',', ''))
            except:
                pass
        return default
    
    def _extract_list_section(self, content: str, section_key: str, default: List[str]) -> List[str]:
        """Extract list from AI content"""
        section_text = self._extract_section(content, section_key, "")
        # Simple list extraction
        import re
        items = re.findall(r'[•\-\*]\s*([^\n]+)', section_text)
        return items[:3] if items else default
    
    def _classify_property_age(self, year_built: Optional[int]) -> str:
        """Classify property age"""
        if not year_built:
            return "Age unknown"
        
        current_year = datetime.now().year
        age = current_year - year_built
        
        if age < 10:
            return "New (0-10 years)"
        elif age < 30:
            return "Mature (10-30 years)"
        elif age < 50:
            return "Vintage (30-50 years)"
        else:
            return "Antique (50+ years)"
    
    def _detect_absentee_owner(self, owner_info: Dict, property_address: Dict) -> bool:
        """Detect if owner is absentee"""
        owner_address = owner_info.get('mailing_address', '')
        prop_address = property_address.get('formatted_address', '')
        
        # Simple comparison - in production, use address normalization
        if owner_address and prop_address:
            return owner_address.lower() not in prop_address.lower()
        return False
    
    def _calculate_ownership_duration(self, last_sale_date: Optional[str]) -> Optional[float]:
        """Calculate ownership duration in years"""
        if not last_sale_date:
            return None
        
        try:
            from datetime import datetime
            sale_date = datetime.strptime(last_sale_date, '%Y-%m-%d')
            duration = datetime.now() - sale_date
            return round(duration.days / 365.25, 1)
        except:
            return None
    
    def _generate_fallback_legendary_analysis(self, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate fallback analysis if AI fails"""
        return {
            "property_identity": {
                "structure_condition": "Condition assessment unavailable",
                "property_age_classification": "Age classification unavailable",
                "exterior_material_style": "Style analysis unavailable",
                "zoning_compatibility_issues": "Zoning analysis unavailable",
                "human_readable_summary": "Comprehensive analysis temporarily unavailable"
            },
            "valuation_equity": {
                "price_per_sqft_current": None,
                "price_per_sqft_historical": None,
                "estimated_equity": None,
                "assessed_undervaluation_risk": "Risk assessment unavailable",
                "tax_vs_avm_discrepancy": "Discrepancy analysis unavailable",
                "forecasted_appreciation": "Forecast unavailable",
                "price_trend_comparison": "Trend analysis unavailable"
            },
            # ... (similar fallback structure for all other sections)
        }


# Legacy AI Analyzer for backward compatibility
class AIAnalyzer:
    """Legacy Claude AI analyzer for 8-section property investment insights"""
    
    def __init__(self):
        self.client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
    
    async def analyze_property(self, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate comprehensive AI analysis that feels like a real estate mentor
        
        Args:
            property_data: Raw property data from Estated
            
        Returns:
            Dictionary containing all AI-generated insights
        """
        try:
            # Create the legendary analysis prompt
            analysis_prompt = self._create_legendary_prompt(property_data)
            
            # Get AI analysis with enhanced context
            response = await self.client.messages.create(
                model="claude-3-sonnet-20241022",
                max_tokens=4000,
                system="""You are a seasoned real estate investment mentor with 20+ years of experience. You analyze properties like you're whispering strategic insights to your protégé. 

Your analysis should:
- Be conversational yet authoritative
- Include specific tactical advice
- Flag red flags and opportunities others miss
- Provide ready-to-use outreach scripts
- Give insider perspectives on market dynamics
- Score everything with confidence and reasoning

Write as if you're sitting across from an investor, giving them the real insider perspective on this deal.""",
                messages=[
                    {
                        "role": "user",
                        "content": analysis_prompt
                    }
                ]
            )
            
            # Parse the response into structured format
            ai_content = response.content[0].text if response.content else ""
            
            return self._parse_ai_analysis(ai_content, property_data)
            
        except Exception as e:
            logger.error(f"AI analysis failed: {str(e)}")
            # Return fallback analysis
            return self._generate_fallback_analysis(property_data)

    def _create_legendary_prompt(self, property_data: Dict[str, Any]) -> str:
        """Create enhanced analysis prompt for legendary insights"""
        
        # Extract key details for analysis
        address = property_data.get('address', {})
        property_details = property_data.get('property', {})
        owner_info = property_data.get('owner', {})
        valuation = property_data.get('valuation', {})
        
        prompt = f"""
# LEGENDARY $5 PROPERTY ANALYSIS

Analyze this property like a seasoned real estate mentor. Provide insights that feel like getting insider advice from a 20-year veteran.

## Property Details:
- **Address**: {address.get('formatted_address', 'N/A')}
- **Type**: {property_details.get('property_type', 'N/A')}
- **Year Built**: {property_details.get('year_built', 'N/A')}
- **Size**: {property_details.get('sqft', 'N/A')} sq ft
- **Lot**: {property_details.get('lot_size', 'N/A')}
- **Bed/Bath**: {property_details.get('bedrooms', 'N/A')}/{property_details.get('bathrooms', 'N/A')}
- **AVM**: ${valuation.get('avm', 'N/A')}
- **Last Sale**: ${property_details.get('last_sale_price', 'N/A')} on {property_details.get('last_sale_date', 'N/A')}
- **Owner**: {owner_info.get('name', 'N/A')}
- **Owner Address**: {owner_info.get('mailing_address', 'N/A')}

## Analysis Sections Needed:

### 1. Property Overview & AI Summary
Provide a conversational summary highlighting investment appeal.

### 2. Ownership Analysis & Motivation
Analyze owner profile, absentee status, motivation to sell (1-10 score).

### 3. Equity Analysis 
Calculate equity position, compare tax vs AVM values.

### 4. Investment Strategy Scoring
Rate flip potential (A-F), BRRRR fit, buy-hold assessment, recommend primary strategy.

### 5. Neighborhood Context
Assess walkability, transit, schools, community type.

### 6. Risk Flags
Identify age/rehab risks, tax risks, structural concerns.

### 7. Investor Action Plan
Provide motivation assessment, outreach approach, suggested messaging.

### 8. Bonus Analytics & Cold Script
Give off-market probability, AI grade, ready-to-use cold outreach script.

Provide mentor-level insights with specific tactical advice. Include confidence levels and reasoning behind assessments.
"""
        
        return prompt

    def _parse_ai_analysis(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Parse AI response into structured insights"""
        
        # Enhanced parsing logic for legendary insights
        insights = {
            "property_overview": self._extract_overview_insights(ai_content, property_data),
            "ownership_analysis": self._extract_ownership_analysis(ai_content, property_data),
            "equity_analysis": self._extract_equity_analysis(ai_content, property_data),
            "investment_strategy": self._extract_strategy_analysis(ai_content, property_data),
            "neighborhood_context": self._extract_neighborhood_analysis(ai_content, property_data),
            "risk_assessment": self._extract_risk_analysis(ai_content, property_data),
            "investor_action": self._extract_action_analysis(ai_content, property_data),
            "bonus_analytics": self._extract_bonus_analysis(ai_content, property_data)
        }
        
        return insights

    def _extract_overview_insights(self, content: str, property_data: Dict[str, Any]) -> Dict[str, str]:
        """Extract property overview insights"""
        return {
            "ai_summary": self._extract_section_content(content, "property overview", "This property offers solid investment potential with its established location and fundamentals."),
            "investment_appeal": self._extract_section_content(content, "investment appeal", "Moderate appeal for rental income strategy."),
            "property_highlights": self._extract_section_content(content, "highlights", "Good bones, established neighborhood, rental potential.")
        }

    def _extract_ownership_analysis(self, content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract ownership motivation insights"""
        owner_info = property_data.get('owner', {})
        property_address = property_data.get('address', {}).get('formatted_address', '')
        owner_address = owner_info.get('mailing_address', '')
        
        # Calculate ownership duration
        ownership_years = self._calculate_ownership_years(property_data.get('property', {}).get('last_sale_date'))
        
        # Detect absentee owner
        is_absentee = self._is_absentee_owner(property_address, owner_address)
        
        return {
            "ownership_duration_years": ownership_years,
            "is_absentee_owner": is_absentee,
            "motivation_score": self._extract_motivation_score(content),
            "motivation_insight": self._extract_section_content(content, "motivation", "Owner may be motivated by portfolio simplification or market timing."),
            "seller_profile": self._extract_section_content(content, "seller profile", "Long-term owner, likely looking for exit opportunity.")
        }

    def _extract_equity_analysis(self, content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Extract equity and valuation insights"""
        valuation = property_data.get('valuation', {})
        property_details = property_data.get('property', {})
        
        avm = valuation.get('avm', 0)
        last_sale = property_details.get('last_sale_price', 0)
        
        return {
            "estimated_equity": avm - last_sale if avm and last_sale else None,
            "equity_percentage": round((avm - last_sale) / avm * 100, 1) if avm and last_sale and avm > 0 else None,
            "tax_vs_avm_analysis": self._extract_section_content(content, "tax vs avm", "Tax assessment appears reasonable relative to market value."),
            "valuation_confidence": self._extract_section_content(content, "valuation confidence", "Moderate confidence in AVM accuracy.")
        }

    def _extract_strategy_analysis(self, content: str, property_data: Dict[str, Any]) -> Dict[str, str]:
        """Extract investment strategy insights"""
        return {
            "flip_potential_rating": self._extract_section_content(content, "flip potential", "B - Good flip potential"),
            "buy_hold_assessment": self._extract_section_content(content, "buy and hold", "Solid rental income opportunity"),
            "brrrr_fit_score": self._extract_section_content(content, "brrrr", "Moderate BRRRR potential"),
            "strategy_recommendation": self._extract_section_content(content, "strategy recommendation", "Buy and hold for steady cash flow"),
            "ownership_duration_logic": self._extract_section_content(content, "duration logic", "Long ownership suggests good market timing for approach.")
        }

    def _extract_neighborhood_analysis(self, content: str, property_data: Dict[str, Any]) -> Dict[str, str]:
        """Extract neighborhood context insights"""
        address = property_data.get('address', {})
        
        return {
            "walkability_estimate": self._extract_section_content(content, "walkability", "Moderate walkability - some amenities within reach"),
            "transit_access": self._extract_section_content(content, "transit", "Basic transit access available"),
            "school_zone_quality": self._extract_section_content(content, "schools", "Average to good school district"),
            "community_description": self._extract_section_content(content, "community", "Established residential neighborhood with good infrastructure"),
            "neighborhood_trend": self._extract_section_content(content, "trend", "Stable area with steady demand")
        }

    def _extract_risk_analysis(self, content: str, property_data: Dict[str, Any]) -> Dict[str, str]:
        """Extract risk assessment insights"""
        return {
            "age_rehab_risk": self._extract_section_content(content, "age risk", "Moderate rehab needs based on property age"),
            "tax_underassessment_risk": self._extract_section_content(content, "tax risk", "Low risk of significant tax reassessment"),
            "absentee_owner_risk": self._extract_section_content(content, "absentee", "Absentee ownership may indicate deferred maintenance"),
            "old_structure_risk": self._extract_section_content(content, "structure", "Age-appropriate maintenance expected"),
            "risk_summary": self._extract_section_content(content, "risk summary", "Moderate risk profile typical for property type and age")
        }

    def _extract_action_analysis(self, content: str, property_data: Dict[str, Any]) -> Dict[str, str]:
        """Extract investor action insights"""
        return {
            "motivation_to_sell": self._extract_section_content(content, "motivation sell", "Moderate motivation based on ownership profile"),
            "outreach_approach": self._extract_section_content(content, "outreach", "Direct mail with equity-focused messaging"),
            "suggested_messaging": self._extract_section_content(content, "messaging", "Highlight cash offer benefits and quick closing"),
            "contact_timing": self._extract_section_content(content, "timing", "Good timing for owner outreach")
        }

    def _extract_bonus_analysis(self, content: str, property_data: Dict[str, Any]) -> Dict[str, str]:
        """Extract bonus analytics insights"""
        return {
            "off_market_probability": self._extract_section_content(content, "off market", "6/10 - Moderate off-market potential"),
            "ai_grade": self._extract_section_content(content, "ai grade", "B - Solid investment opportunity"),
            "rebuild_vs_rehab": self._extract_section_content(content, "rebuild rehab", "Rehab recommended over rebuild"),
            "cold_outreach_script": self._generate_cold_script(property_data)
        }

    def _generate_cold_script(self, property_data: Dict[str, Any]) -> str:
        """Generate personalized cold outreach script"""
        address = property_data.get('address', {}).get('formatted_address', 'your property')
        owner_name = property_data.get('owner', {}).get('name', 'Property Owner')
        
        return f"""Hi {owner_name},

I'm a local real estate investor and I noticed your property at {address}. I work with homeowners who are considering selling and can offer:

• Cash purchase (no financing delays)
• Quick 2-week closing
• No agent commissions or fees
• Purchase as-is (no repairs needed)

Would you be interested in a no-obligation cash offer? I'd be happy to discuss your options.

Best regards,
[Your Name]
[Your Phone]"""

    # Helper methods
    def _extract_section_content(self, content: str, section_keyword: str, default: str) -> str:
        """Extract content from a specific section"""
        lines = content.split('\n')
        for i, line in enumerate(lines):
            if section_keyword.lower() in line.lower():
                # Look for content in next few lines
                section_content = []
                for j in range(i+1, min(i+4, len(lines))):
                    if lines[j].strip() and not lines[j].startswith('#'):
                        section_content.append(lines[j].strip())
                
                if section_content:
                    return ' '.join(section_content)
        
        return default

    def _extract_motivation_score(self, content: str) -> int:
        """Extract motivation score from content"""
        import re
        # Look for motivation score patterns
        score_match = re.search(r'motivation.*?(\d+)/10', content, re.IGNORECASE)
        if score_match:
            return int(score_match.group(1))
        
        # Default scoring logic based on keywords
        if 'high motivation' in content.lower():
            return 8
        elif 'moderate motivation' in content.lower():
            return 6
        elif 'low motivation' in content.lower():
            return 3
        
        return 5  # Default moderate score

    def _calculate_ownership_years(self, last_sale_date: Optional[str]) -> Optional[float]:
        """Calculate years of ownership"""
        if not last_sale_date:
            return None
        
        try:
            from datetime import datetime
            sale_date = datetime.strptime(last_sale_date, '%Y-%m-%d')
            years = (datetime.now() - sale_date).days / 365.25
            return round(years, 1)
        except:
            return None

    def _is_absentee_owner(self, property_address: str, owner_address: str) -> bool:
        """Determine if owner is absentee"""
        if not property_address or not owner_address:
            return False
        
        # Simple comparison - in production, use proper address normalization
        prop_parts = property_address.lower().split()
        owner_parts = owner_address.lower().split()
        
        # Check if addresses share common elements
        common_elements = set(prop_parts) & set(owner_parts)
        return len(common_elements) < 2  # Rough heuristic

    def _generate_fallback_analysis(self, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Generate fallback analysis when AI is unavailable"""
        return {
            "property_overview": {
                "ai_summary": "Property analysis is temporarily unavailable. Please try again later.",
                "investment_appeal": "Analysis pending",
                "property_highlights": "Data processing in progress"
            },
            "ownership_analysis": {
                "ownership_duration_years": None,
                "is_absentee_owner": False,
                "motivation_score": 5,
                "motivation_insight": "Owner motivation analysis unavailable",
                "seller_profile": "Profile analysis pending"
            },
            "equity_analysis": {
                "estimated_equity": None,
                "equity_percentage": None,
                "tax_vs_avm_analysis": "Valuation analysis unavailable",
                "valuation_confidence": "Analysis pending"
            },
            "investment_strategy": {
                "flip_potential_rating": "C - Analysis pending",
                "buy_hold_assessment": "Assessment unavailable",
                "brrrr_fit_score": "Score pending",
                "strategy_recommendation": "Recommendation unavailable",
                "ownership_duration_logic": "Logic analysis pending"
            },
            "neighborhood_context": {
                "walkability_estimate": "Assessment unavailable",
                "transit_access": "Analysis pending",
                "school_zone_quality": "Quality assessment unavailable",
                "community_description": "Description unavailable",
                "neighborhood_trend": "Trend analysis pending"
            },
            "risk_assessment": {
                "age_rehab_risk": "Risk assessment unavailable",
                "tax_underassessment_risk": "Assessment pending",
                "absentee_owner_risk": "Risk analysis unavailable",
                "old_structure_risk": "Assessment pending",
                "risk_summary": "Summary unavailable"
            },
            "investor_action": {
                "motivation_to_sell": "Assessment unavailable",
                "outreach_approach": "Approach recommendation pending",
                "suggested_messaging": "Messaging unavailable",
                "contact_timing": "Timing analysis pending"
            },
            "bonus_analytics": {
                "off_market_probability": "Probability assessment unavailable",
                "ai_grade": "C - Analysis pending",
                "rebuild_vs_rehab": "Recommendation unavailable",
                "cold_outreach_script": "Script generation unavailable"
            }
        }