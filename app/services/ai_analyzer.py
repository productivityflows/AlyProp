import json
from typing import Dict, Any, Optional
from datetime import datetime, date
import anthropic
from app.config import config
from app.models import *
import logging

logger = logging.getLogger(__name__)

class AIAnalyzer:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)
    
    async def analyze_property(self, estated_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Generate AI insights and analysis for all sections of the property report
        """
        try:
            # Prepare the data for AI analysis
            analysis_prompt = self._build_analysis_prompt(estated_data)
            
            # Get AI analysis
            message = self.client.messages.create(
                model="claude-3-sonnet-20240229",
                max_tokens=4000,
                temperature=0.3,
                messages=[
                    {
                        "role": "user",
                        "content": analysis_prompt
                    }
                ]
            )
            
            # Parse the AI response
            ai_insights = self._parse_ai_response(message.content[0].text)
            
            # Calculate additional metrics
            calculated_metrics = self._calculate_metrics(estated_data)
            
            # Combine AI insights with calculated metrics
            return {**ai_insights, **calculated_metrics}
            
        except Exception as e:
            logger.error(f"Error in AI analysis: {str(e)}")
            return self._get_fallback_analysis()
    
    def _build_analysis_prompt(self, data: Dict[str, Any]) -> str:
        """
        Build a comprehensive prompt for Claude to analyze the property
        """
        current_year = datetime.now().year
        
        prompt = f"""
You are a real estate investment analyst. Analyze this property data and provide insights for investors and first-time homebuyers. 
Generate a JSON response with the following structure and be specific with data-driven insights.

Property Data:
{json.dumps(data, indent=2, default=str)}

Current Year: {current_year}

Please analyze and return a JSON object with these exact keys:

{{
  "human_readable_summary": "A 2-3 sentence overview of the property highlighting key features",
  "ownership_duration_years": "Calculate years since last sale (number)",
  "absentee_owner_status": "true/false - is owner mailing address different from property address?",
  "motivation_insight": "Analysis of why owner might sell (long ownership, property age, etc.)",
  "equity_estimate": "Calculate AVM minus last sale price (number or null)",
  "tax_vs_avm_comparison": "Compare tax assessed value vs AVM - under/over assessed and by how much",
  "flip_potential_rating": "A-F grade with reasoning",
  "buy_and_hold_assessment": "Good/Fair/Poor with rental potential analysis",
  "brrrr_fit": "Excellent/Good/Fair/Poor with rehab cost considerations",
  "ownership_duration_logic": "What the ownership duration tells us about the property/owner",
  "strategy_recommendation": "Flip, Buy and Hold, BRRRR, Wholesale, or Not Suitable",
  "walkability_estimate": "High/Medium/Low based on location and property type",
  "transit_access_likelihood": "Good/Fair/Poor based on city and area",
  "school_zone_quality_guess": "Above Average/Average/Below Average based on neighborhood",
  "community_type_description": "Urban/Suburban/Rural with demographics insight",
  "age_rehab_risk": "true/false - old property + long ownership = likely needs rehab",
  "tax_under_assessment": "true/false - tax value significantly under market",
  "owner_non_residency": "true/false - owner doesn't live at property",
  "old_structure_flag": "true/false - built before 1980",
  "risk_summary": "2-3 sentence summary of main investment risks",
  "summary_paragraph": "3-4 sentence investor summary highlighting opportunity and fit",
  "target_buyer_type": "First-time homebuyer, Experienced flipper, Buy-and-hold investor, etc.",
  "estimated_motivation_to_sell": "High/Medium/Low with reasoning",
  "suggested_outreach_approach": "Professional direct mail, cold call, letter campaign, etc.",
  "off_market_probability_score": "0-100 score of likelihood property could sell off-market",
  "ai_grade": "A-F overall investment grade",
  "rebuild_vs_rehab_guess": "Rehab, Rebuild, or Move-in Ready based on age and condition indicators"
}}

Focus on practical investment insights that matter to real estate investors. Be specific and data-driven.
"""
        return prompt
    
    def _parse_ai_response(self, response: str) -> Dict[str, Any]:
        """
        Parse Claude's JSON response and handle any formatting issues
        """
        try:
            # Try to extract JSON from the response
            start = response.find('{')
            end = response.rfind('}') + 1
            
            if start == -1 or end == 0:
                logger.error("No JSON found in AI response")
                return {}
            
            json_str = response[start:end]
            parsed = json.loads(json_str)
            
            # Convert string booleans to actual booleans
            bool_fields = [
                'absentee_owner_status', 'age_rehab_risk', 'tax_under_assessment',
                'owner_non_residency', 'old_structure_flag'
            ]
            
            for field in bool_fields:
                if field in parsed and isinstance(parsed[field], str):
                    parsed[field] = parsed[field].lower() == 'true'
            
            # Convert numeric fields
            numeric_fields = ['ownership_duration_years', 'equity_estimate', 'off_market_probability_score']
            for field in numeric_fields:
                if field in parsed and parsed[field] is not None:
                    try:
                        parsed[field] = float(parsed[field]) if '.' in str(parsed[field]) else int(parsed[field])
                    except (ValueError, TypeError):
                        parsed[field] = None
            
            return parsed
            
        except json.JSONDecodeError as e:
            logger.error(f"Failed to parse AI response as JSON: {e}")
            return {}
        except Exception as e:
            logger.error(f"Error parsing AI response: {e}")
            return {}
    
    def _calculate_metrics(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Calculate additional metrics not handled by AI
        """
        metrics = {}
        
        # Calculate ownership duration if not provided by AI
        if data.get('last_sale_date'):
            try:
                if isinstance(data['last_sale_date'], str):
                    sale_date = datetime.fromisoformat(data['last_sale_date'].replace('Z', '+00:00'))
                else:
                    sale_date = data['last_sale_date']
                
                years_owned = (datetime.now() - sale_date).days / 365.25
                metrics['calculated_ownership_years'] = round(years_owned, 1)
            except Exception as e:
                logger.error(f"Error calculating ownership duration: {e}")
                metrics['calculated_ownership_years'] = None
        
        # Calculate equity estimate
        avm = data.get('estimated_value_avm')
        sale_price = data.get('last_sale_price')
        
        if avm and sale_price:
            metrics['calculated_equity'] = avm - sale_price
        
        return metrics
    
    def _get_fallback_analysis(self) -> Dict[str, Any]:
        """
        Provide fallback analysis if AI fails
        """
        return {
            "human_readable_summary": "Property analysis unavailable - please try again",
            "ownership_duration_years": None,
            "absentee_owner_status": False,
            "motivation_insight": "Unable to determine motivation",
            "equity_estimate": None,
            "tax_vs_avm_comparison": "Analysis unavailable",
            "flip_potential_rating": "C - Analysis needed",
            "buy_and_hold_assessment": "Analysis needed",
            "brrrr_fit": "Analysis needed",
            "ownership_duration_logic": "Unable to analyze",
            "strategy_recommendation": "Not Suitable",
            "walkability_estimate": "Medium",
            "transit_access_likelihood": "Fair",
            "school_zone_quality_guess": "Average",
            "community_type_description": "Analysis unavailable",
            "age_rehab_risk": False,
            "tax_under_assessment": False,
            "owner_non_residency": False,
            "old_structure_flag": False,
            "risk_summary": "Analysis unavailable - manual review required",
            "summary_paragraph": "Property analysis failed - please retry or contact support",
            "target_buyer_type": "Analysis needed",
            "estimated_motivation_to_sell": "Medium",
            "suggested_outreach_approach": "Standard approach",
            "off_market_probability_score": 50,
            "ai_grade": "C",
            "rebuild_vs_rehab_guess": "Analysis needed"
        }