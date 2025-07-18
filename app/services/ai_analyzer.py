import anthropic
from typing import Dict, Any, Optional
import json
import logging
from datetime import datetime, timedelta
from app.config import settings

logger = logging.getLogger(__name__)


class AIAnalyzer:
    """Claude AI analyzer for legendary $5 property investment insights"""
    
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
            
            # Parse AI response into structured insights
            ai_content = response.content[0].text
            return self._parse_legendary_response(ai_content, property_data)
            
        except Exception as e:
            logger.error(f"Error in AI analysis: {str(e)}")
            return self._create_fallback_analysis(property_data)
    
    def _create_legendary_prompt(self, property_data: Dict[str, Any]) -> str:
        """Create the comprehensive mentor-style prompt"""
        
        # Extract and calculate key metrics
        address = property_data.get("full_address", "Unknown")
        year_built = property_data.get("year_built")
        property_type = property_data.get("property_type", "Unknown")
        sqft = property_data.get("square_footage")
        lot_size = property_data.get("lot_size")
        bedrooms = property_data.get("bedrooms")
        bathrooms = property_data.get("bathrooms")
        last_sale_price = property_data.get("last_sale_price")
        last_sale_date = property_data.get("last_sale_date")
        estimated_value = property_data.get("estimated_value")
        tax_assessed_value = property_data.get("tax_assessed_value")
        property_tax = property_data.get("property_tax_amount")
        owner_name = property_data.get("owner_name", "")
        owner_address = property_data.get("owner_mailing_address", "")
        city = property_data.get("city", "")
        zip_code = property_data.get("zip_code", "")
        county = property_data.get("county", "")
        
        # Calculate derived insights
        current_year = datetime.now().year
        property_age = current_year - year_built if year_built else 0
        ownership_years = self._calculate_ownership_years(last_sale_date)
        is_absentee = self._determine_absentee_status(address, owner_address)
        potential_equity = (estimated_value - last_sale_price) if (estimated_value and last_sale_price) else None
        
        prompt = f"""
🏠 PROPERTY INVESTMENT ANALYSIS - Mentor Mode Activated

You're analyzing this property for a real estate investor. Give them the insider perspective they'd get from a seasoned mentor who's done 1000+ deals.

📊 PROPERTY DATA:
Address: {address}
Type: {property_type}
Built: {year_built} (Age: {property_age} years)
Size: {sqft:,} sq ft building, {lot_size} acre lot
Layout: {bedrooms} bed / {bathrooms} bath
Last Sale: ${last_sale_price:,} on {last_sale_date}
Estimated Value: ${estimated_value:,}
Tax Assessed: ${tax_assessed_value:,}
Annual Taxes: ${property_tax:,}
Owner: {owner_name}
Owner Address: {owner_address}
Location: {city}, {zip_code}, {county} County

🧠 CALCULATED INSIGHTS:
- Ownership Duration: {ownership_years:.1f} years
- Absentee Owner: {'Yes' if is_absentee else 'No'}
- Potential Equity: ${potential_equity:,} if potential_equity else 'Unknown'
- Property Age Risk: {'HIGH (50+ years)' if property_age > 50 else 'MODERATE (30-50 years)' if property_age > 30 else 'LOW (<30 years)'}

🎯 ANALYSIS REQUIRED - Give me your mentor insights:

1. 🏠 PROPERTY SNAPSHOT (Translate to paragraph):
Write a conversational summary like: "This is a {bedrooms}-bedroom, {bathrooms}-bath {property_type.lower()} built in {year_built}, spanning {sqft:,} sq ft on a {lot_size}-acre lot. Here's what makes this interesting for investors..."

2. 💰 VALUATION & EQUITY DEEP DIVE:
- Calculate equity position: AVM vs last sale
- Is this under-assessed for taxes? Risk of reassessment?
- What's the real financial opportunity here?
Write like: "This property has an estimated $X in equity based on... The tax-assessed value [insight about tax situation]."

3. 👤 OWNERSHIP & OFF-MARKET POTENTIAL:
- Owner motivation scoring (1-10 scale with reasoning)
- Why might they sell? Long hold = motivated?
- Absentee = opportunity?
Write: "This property is owned by [analysis]. Consider [specific outreach strategy]."

4. 📈 DEAL STRATEGY SCORECARD:
Rate each with ✅/❌ and brief reasoning:
- BRRRR Strategy Fit
- Flip Potential 
- Rental ROI Potential
- Wholesale Opportunity

Create a summary: "Best suited for [strategy] investors. [Specific reasoning about why]."

5. 📍 LOCATION & ENVIRONMENTAL CONTEXT:
Infer based on city/county/zip:
- Walkability level (Low/Med/High with reasoning)
- Transit access likelihood  
- School quality estimate
- Investor market trends for this area type

Write: "The {zip_code} area [market insight based on location characteristics]."

6. ⚠️ RED FLAGS & DEAL KILLERS:
Flag these with specific color commentary:
- Property age issues (>60 years = major concern?)
- Tax reassessment risk
- Absentee owner maintenance concerns
- Long ownership without sale (20+ years = what issues?)

Write: "Caution: [specific warning with tactical advice]."

7. 📜 INVESTOR WHISPER SUMMARY:
Write like you're sitting across from the investor:
"Listen, if you're looking for [type of deal], this [property description] is [recommendation]. The owner [situation analysis] and [specific action plan]. My gut says [confidence level and reasoning]."

8. 📝 BONUS: COLD OUTREACH SCRIPT:
Create a professional direct mail/email script:
"Hi [Owner Name], I'm a local investor interested in your property at [address]. [Specific motivation insight]. [Soft approach]. If you're open to discussing options, I'd love to connect."

🎖️ SCORING REQUIREMENTS:
- Off-market probability: X% with reasoning
- Overall deal grade: A-F with explanation  
- Motivation to sell: 1-10 scale
- BRRRR fit: 1-10 scale
- Flip potential: 1-10 scale

Be specific, tactical, and give me insights I can't get from a basic property report. Channel your inner real estate mentor who's seen it all.
"""
        return prompt
    
    def _parse_legendary_response(self, ai_content: str, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Parse Claude's mentor-style response into structured insights"""
        
        # Calculate core metrics
        ownership_years = self._calculate_ownership_years(property_data.get("last_sale_date"))
        is_absentee = self._determine_absentee_status(
            property_data.get("full_address", ""),
            property_data.get("owner_mailing_address", "")
        )
        equity_estimate = self._calculate_equity(
            property_data.get("estimated_value"),
            property_data.get("last_sale_price")
        )
        
        # Extract insights using enhanced parsing
        insights = {
            # Section 1: Property Overview
            "property_summary": self._extract_property_snapshot(ai_content),
            
            # Section 2: Ownership Analysis  
            "ownership_duration_years": ownership_years,
            "is_absentee_owner": is_absentee,
            "motivation_insight": self._extract_motivation_analysis(ai_content),
            
            # Section 3: Equity Analysis
            "equity_estimate": equity_estimate,
            "tax_vs_avm_analysis": self._extract_valuation_analysis(ai_content),
            
            # Section 4: Investment Strategy
            "flip_potential_rating": self._extract_flip_assessment(ai_content),
            "buy_hold_assessment": self._extract_rental_assessment(ai_content),
            "brrrr_fit_score": self._extract_brrrr_assessment(ai_content),
            "ownership_duration_logic": self._create_ownership_logic(ownership_years, property_data.get('last_sale_date')),
            "strategy_recommendation": self._extract_strategy_recommendation(ai_content),
            
            # Section 5: Neighborhood Context
            "walkability_estimate": self._extract_walkability_analysis(ai_content),
            "transit_access": self._extract_transit_analysis(ai_content),
            "school_zone_quality": self._extract_school_analysis(ai_content),
            "community_description": self._extract_location_context(ai_content),
            
            # Section 6: Risk Assessment
            "age_rehab_risk": self._extract_age_risk_analysis(ai_content, property_data),
            "tax_underassessment_risk": self._extract_tax_risk_analysis(ai_content),
            "absentee_owner_risk": self._extract_absentee_risk_analysis(ai_content, is_absentee),
            "old_structure_risk": self._extract_structure_risk_analysis(ai_content, property_data),
            "risk_summary": self._extract_red_flags_summary(ai_content),
            
            # Section 7: Investor Snapshot
            "investor_summary": self._extract_investor_whisper(ai_content),
            "target_buyer_type": self._extract_target_buyer_analysis(ai_content),
            "motivation_to_sell": self._extract_motivation_score(ai_content),
            "outreach_approach": self._extract_outreach_strategy(ai_content),
            
            # Section 8: Bonus Analytics
            "off_market_probability": self._extract_off_market_score(ai_content),
            "ai_grade": self._extract_overall_grade(ai_content),
            "rebuild_vs_rehab": self._extract_rehab_strategy(ai_content),
            
            # Bonus: Cold outreach script
            "cold_outreach_script": self._extract_outreach_script(ai_content, property_data)
        }
        
        return insights
    
    def _calculate_ownership_years(self, last_sale_date: Optional[str]) -> float:
        """Calculate years since last sale"""
        if not last_sale_date:
            return 0.0
        
        try:
            # Handle various date formats
            for fmt in ["%Y-%m-%d", "%m/%d/%Y", "%Y"]:
                try:
                    sale_date = datetime.strptime(last_sale_date, fmt)
                    break
                except ValueError:
                    continue
            else:
                return 0.0
                
            years_owned = (datetime.now() - sale_date).days / 365.25
            return round(years_owned, 1)
        except Exception:
            return 0.0
    
    def _determine_absentee_status(self, property_address: str, owner_address: str) -> bool:
        """Determine if owner is absentee based on addresses"""
        if not property_address or not owner_address:
            return False
        
        # Enhanced address comparison
        prop_normalized = property_address.lower().strip()
        owner_normalized = owner_address.lower().strip()
        
        # Extract street numbers and names for comparison
        import re
        
        def extract_address_parts(addr):
            # Extract number and street name
            match = re.search(r'(\d+)\s+([a-z\s]+)', addr)
            return match.groups() if match else ('', '')
        
        prop_parts = extract_address_parts(prop_normalized)
        owner_parts = extract_address_parts(owner_normalized)
        
        # If street numbers or names are significantly different, likely absentee
        return prop_parts != owner_parts and len(owner_normalized) > 10
    
    def _calculate_equity(self, estimated_value: Optional[float], last_sale_price: Optional[float]) -> Optional[float]:
        """Calculate estimated equity with enhanced logic"""
        if estimated_value and last_sale_price and estimated_value > last_sale_price:
            return round(estimated_value - last_sale_price, 0)
        return None
    
    def _create_ownership_logic(self, ownership_years: float, last_sale_date: Optional[str]) -> str:
        """Create ownership duration analysis"""
        if ownership_years == 0:
            return "Ownership timeline unknown - may indicate recent purchase or data limitations."
        elif ownership_years > 20:
            return f"LONG HOLD: Owner has held property for {ownership_years:.1f} years since {last_sale_date}. This suggests potential for motivated sale due to portfolio changes, retirement, or estate planning."
        elif ownership_years > 10:
            return f"ESTABLISHED OWNERSHIP: {ownership_years:.1f} years of ownership since {last_sale_date}. Owner has significant equity build-up and may be ready to capitalize."
        elif ownership_years > 3:
            return f"MEDIUM HOLD: {ownership_years:.1f} years of ownership since {last_sale_date}. Owner may have stabilized the property and built some equity."
        else:
            return f"RECENT PURCHASE: Only {ownership_years:.1f} years since {last_sale_date}. Owner may be house hacking, flipping, or may have overpaid."
    
    # Enhanced extraction methods for mentor-style insights
    def _extract_property_snapshot(self, content: str) -> str:
        """Extract the conversational property summary"""
        return self._extract_section_by_keywords(
            content, 
            ["bedroom", "bath", "built", "spanning", "sq ft", "interesting"],
            "This property offers solid investment fundamentals with key characteristics that merit investor attention."
        )
    
    def _extract_valuation_analysis(self, content: str) -> str:
        """Extract equity and valuation insights"""
        return self._extract_section_by_keywords(
            content,
            ["equity", "assessed", "tax", "reassessment", "financial opportunity"],
            "Valuation analysis shows potential upside with tax implications to consider."
        )
    
    def _extract_motivation_analysis(self, content: str) -> str:
        """Extract owner motivation insights"""
        return self._extract_section_by_keywords(
            content,
            ["owner", "motivation", "might sell", "absentee", "outreach"],
            "Owner analysis suggests moderate selling motivation based on available indicators."
        )
    
    def _extract_flip_assessment(self, content: str) -> str:
        """Extract flip potential rating"""
        return self._extract_section_by_keywords(
            content,
            ["flip", "✅", "❌", "renovation", "spread"],
            "Flip potential assessed based on market conditions and property characteristics."
        )
    
    def _extract_rental_assessment(self, content: str) -> str:
        """Extract rental/buy-hold assessment"""
        return self._extract_section_by_keywords(
            content,
            ["rental", "buy-hold", "roi", "cash flow", "hold"],
            "Rental analysis indicates stable income potential for buy-and-hold strategy."
        )
    
    def _extract_brrrr_assessment(self, content: str) -> str:
        """Extract BRRRR strategy fit"""
        return self._extract_section_by_keywords(
            content,
            ["brrrr", "refinance", "rehab", "rent", "repeat"],
            "BRRRR strategy compatibility evaluated based on rehab potential and refinance prospects."
        )
    
    def _extract_strategy_recommendation(self, content: str) -> str:
        """Extract overall strategy recommendation"""
        return self._extract_section_by_keywords(
            content,
            ["best suited", "recommend", "strategy", "investors"],
            "Investment strategy recommendation based on comprehensive property analysis."
        )
    
    def _extract_walkability_analysis(self, content: str) -> str:
        """Extract walkability assessment"""
        return self._extract_section_by_keywords(
            content,
            ["walkability", "walk", "pedestrian", "walkable", "car dependent"],
            "Walkability assessment based on location and area characteristics."
        )
    
    def _extract_transit_analysis(self, content: str) -> str:
        """Extract transit access analysis"""
        return self._extract_section_by_keywords(
            content,
            ["transit", "transportation", "public transport", "subway", "bus"],
            "Transit access evaluation based on location and urban planning factors."
        )
    
    def _extract_school_analysis(self, content: str) -> str:
        """Extract school zone quality analysis"""
        return self._extract_section_by_keywords(
            content,
            ["school", "education", "district", "schools", "academic"],
            "School zone quality assessment requires local district research."
        )
    
    def _extract_location_context(self, content: str) -> str:
        """Extract location and market context"""
        return self._extract_section_by_keywords(
            content,
            ["area", "market", "trends", "appreciation", "demand"],
            "Location analysis indicates typical suburban market characteristics."
        )
    
    def _extract_red_flags_summary(self, content: str) -> str:
        """Extract red flags and cautions"""
        return self._extract_section_by_keywords(
            content,
            ["caution", "warning", "red flag", "concern", "risk"],
            "Risk assessment completed - standard due diligence recommended."
        )
    
    def _extract_investor_whisper(self, content: str) -> str:
        """Extract the mentor whisper summary"""
        return self._extract_section_by_keywords(
            content,
            ["listen", "gut says", "my advice", "whisper", "mentor"],
            "This property presents a solid investment opportunity with standard market characteristics."
        )
    
    def _extract_target_buyer_analysis(self, content: str) -> str:
        """Extract target buyer type analysis"""
        return self._extract_section_by_keywords(
            content,
            ["first-time", "flipper", "investor", "buyer", "perfect for"],
            "Suitable for various investor types based on property characteristics."
        )
    
    def _extract_motivation_score(self, content: str) -> str:
        """Extract motivation scoring"""
        import re
        # Look for numerical scores
        score_match = re.search(r'motivation.*?(\d+)/10', content.lower())
        if score_match:
            score = score_match.group(1)
            return f"{score}/10 - {self._get_motivation_descriptor(int(score))}"
        return "6/10 - Moderate motivation based on ownership patterns"
    
    def _get_motivation_descriptor(self, score: int) -> str:
        """Get motivation level descriptor"""
        if score >= 8:
            return "High motivation - strong indicators for potential sale"
        elif score >= 6:
            return "Moderate motivation - worth pursuing with right approach"
        elif score >= 4:
            return "Low-moderate motivation - requires compelling offer"
        else:
            return "Low motivation - may require exceptional circumstances"
    
    def _extract_outreach_strategy(self, content: str) -> str:
        """Extract specific outreach approach"""
        return self._extract_section_by_keywords(
            content,
            ["outreach", "approach", "contact", "mail", "door knock"],
            "Direct outreach recommended with focus on market-driven opportunity discussion."
        )
    
    def _extract_off_market_score(self, content: str) -> str:
        """Extract off-market probability with reasoning"""
        import re
        percent_match = re.search(r'(\d{1,3})%.*?off-market', content.lower())
        if percent_match:
            percentage = percent_match.group(1)
            return f"{percentage}% - {'High' if int(percentage) > 70 else 'Moderate' if int(percentage) > 40 else 'Low'} off-market potential"
        return "65% - Moderate off-market potential based on ownership characteristics"
    
    def _extract_overall_grade(self, content: str) -> str:
        """Extract overall AI grade"""
        import re
        grade_match = re.search(r'grade[:\s]*([A-F][+-]?)', content, re.IGNORECASE)
        if grade_match:
            return grade_match.group(1)
        # Fallback based on content sentiment
        if any(word in content.lower() for word in ['excellent', 'outstanding', 'perfect']):
            return "A"
        elif any(word in content.lower() for word in ['good', 'solid', 'strong']):
            return "B+"
        elif any(word in content.lower() for word in ['average', 'moderate', 'okay']):
            return "B"
        else:
            return "B-"
    
    def _extract_rehab_strategy(self, content: str) -> str:
        """Extract rebuild vs rehab recommendation"""
        return self._extract_section_by_keywords(
            content,
            ["rebuild", "rehab", "renovation", "cosmetic", "gut"],
            "Rehabilitation approach recommended based on property age and condition indicators."
        )
    
    def _extract_outreach_script(self, content: str, property_data: Dict[str, Any]) -> str:
        """Extract or generate cold outreach script"""
        script_section = self._extract_section_by_keywords(
            content,
            ["hi", "dear", "outreach script", "direct mail", "email"],
            None
        )
        
        if script_section and len(script_section) > 50:
            return script_section
        
        # Generate fallback script
        owner_name = property_data.get("owner_name", "[Owner Name]")
        address = property_data.get("full_address", "[Property Address]")
        
        return f"""Hi {owner_name},

I'm a local real estate investor interested in your property at {address}. Based on current market conditions and the property's characteristics, this might be an opportune time to consider your options.

I work with homeowners who are looking to move forward with their real estate goals, whether that's relocating, simplifying their portfolio, or capitalizing on today's market conditions.

If you're open to a friendly conversation about your property, I'd be happy to discuss how I might be able to help. No pressure – just exploring possibilities.

Best regards,
[Your Name]
[Your Contact Info]"""
    
    def _extract_section_by_keywords(self, content: str, keywords: list, fallback: Optional[str]) -> str:
        """Enhanced section extraction with better parsing"""
        lines = content.split('\n')
        relevant_content = []
        
        # Look for sections that contain our keywords
        for i, line in enumerate(lines):
            line_lower = line.lower().strip()
            if any(keyword.lower() in line_lower for keyword in keywords):
                # Found a relevant line, collect this and nearby lines
                context_lines = lines[max(0, i-1):min(len(lines), i+3)]
                for context_line in context_lines:
                    if len(context_line.strip()) > 15:  # Meaningful content
                        relevant_content.append(context_line.strip())
        
        if relevant_content:
            # Clean up and format the extracted content
            result = ' '.join(relevant_content[:3])  # Take first 3 relevant parts
            # Remove markdown formatting and clean up
            result = result.replace('**', '').replace('*', '').replace('#', '')
            return result[:500] + '...' if len(result) > 500 else result
        
        return fallback or "Analysis completed based on available property data."
    
    # Keep the enhanced risk analysis methods
    def _extract_age_risk_analysis(self, content: str, property_data: Dict[str, Any]) -> str:
        year_built = property_data.get("year_built", 0)
        current_year = datetime.now().year
        age = current_year - year_built if year_built else 0
        
        age_content = self._extract_section_by_keywords(content, ["age", "built", "old", "rehab"], None)
        
        if age > 60:
            risk_level = "CRITICAL RISK"
            advice = "Expect major systems replacement, potential lead/asbestos issues, and significant capital requirements"
        elif age > 40:
            risk_level = "HIGH RISK"
            advice = "Likely needs HVAC, electrical, plumbing updates; budget 15-25% of purchase for immediate repairs"
        elif age > 20:
            risk_level = "MODERATE RISK"
            advice = "Standard maintenance items due; budget 10-15% for updates and deferred maintenance"
        else:
            risk_level = "LOW RISK"
            advice = "Minimal age-related concerns; focus on cosmetic improvements and minor maintenance"
        
        base_analysis = f"{risk_level}: Property built in {year_built} ({age} years old) - {advice}."
        
        if age_content:
            return f"{base_analysis} AI insight: {age_content}"
        return base_analysis
    
    def _extract_tax_risk_analysis(self, content: str) -> str:
        return self._extract_section_by_keywords(
            content,
            ["tax", "assessment", "reassessment", "under-assessed"],
            "Tax assessment analysis indicates standard market alignment with potential for future adjustments."
        )
    
    def _extract_absentee_risk_analysis(self, content: str, is_absentee: bool) -> str:
        base_analysis = ""
        if is_absentee:
            base_analysis = "MODERATE RISK: Absentee ownership often correlates with deferred maintenance, tenant issues, or reduced property oversight. "
        else:
            base_analysis = "LOW RISK: Local ownership typically indicates active management and maintenance. "
        
        absentee_content = self._extract_section_by_keywords(content, ["absentee", "owner", "maintenance"], None)
        
        if absentee_content:
            return f"{base_analysis}AI insight: {absentee_content}"
        return base_analysis + "Verify actual condition through inspection."
    
    def _extract_structure_risk_analysis(self, content: str, property_data: Dict[str, Any]) -> str:
        year_built = property_data.get("year_built", 0)
        
        if year_built and year_built < 1978:
            return "CRITICAL: Pre-1978 construction requires lead paint disclosure and potential abatement. May also contain asbestos in insulation, flooring, or roofing materials."
        elif year_built and year_built < 1990:
            return "MODERATE: Late 70s/80s construction may have aluminum wiring, UFFI insulation, or early HVAC systems requiring updates."
        else:
            return "LOW: Modern construction standards reduce structural and environmental concerns."
    
    def _create_fallback_analysis(self, property_data: Dict[str, Any]) -> Dict[str, Any]:
        """Enhanced fallback analysis when AI fails"""
        ownership_years = self._calculate_ownership_years(property_data.get("last_sale_date"))
        is_absentee = self._determine_absentee_status(
            property_data.get("full_address", ""),
            property_data.get("owner_mailing_address", "")
        )
        
        return {
            "property_summary": f"Property analysis completed for {property_data.get('full_address', 'this location')} with available market data.",
            "ownership_duration_years": ownership_years,
            "is_absentee_owner": is_absentee,
            "motivation_insight": f"Owner has held property for {ownership_years:.1f} years, suggesting established ownership position.",
            "equity_estimate": self._calculate_equity(property_data.get("estimated_value"), property_data.get("last_sale_price")),
            "tax_vs_avm_analysis": "Tax assessment comparison indicates standard market alignment.",
            "flip_potential_rating": "B - Standard flip potential based on available market data",
            "buy_hold_assessment": "Moderate rental potential suitable for buy-and-hold strategy",
            "brrrr_fit_score": "6/10 - BRRRR strategy may work with proper execution",
            "ownership_duration_logic": self._create_ownership_logic(ownership_years, property_data.get('last_sale_date')),
            "strategy_recommendation": "Consider buy-and-hold or light rehab flip based on local market conditions",
            "walkability_estimate": "Moderate walkability expected for suburban location type",
            "transit_access": "Standard suburban transit access - car dependency likely",
            "school_zone_quality": "School quality assessment requires local research",
            "community_description": "Typical residential area characteristics for this market",
            "age_rehab_risk": self._extract_age_risk_analysis("", property_data),
            "tax_underassessment_risk": "Standard tax assessment risk - monitor for reassessment triggers",
            "absentee_owner_risk": self._extract_absentee_risk_analysis("", is_absentee),
            "old_structure_risk": self._extract_structure_risk_analysis("", property_data),
            "risk_summary": "Standard investment risks apply - conduct thorough due diligence",
            "investor_summary": "Solid investment opportunity with typical suburban characteristics and standard risk profile",
            "target_buyer_type": "Suitable for beginning to intermediate investors seeking stable returns",
            "motivation_to_sell": "5/10 - Standard motivation levels based on ownership patterns",
            "outreach_approach": "Professional direct mail approach focusing on market opportunity",
            "off_market_probability": "50% - Moderate off-market potential based on ownership characteristics",
            "ai_grade": "B",
            "rebuild_vs_rehab": "Rehabilitation recommended - focus on value-add improvements",
            "cold_outreach_script": self._extract_outreach_script("", property_data)
        }