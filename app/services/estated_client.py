import httpx
import asyncio
from typing import Dict, Any, Optional
from app.config import config
import logging

logger = logging.getLogger(__name__)

class EstatedClient:
    def __init__(self):
        self.api_key = config.ESTATED_API_KEY
        self.base_url = config.ESTATED_BASE_URL
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def search_property(self, address: str) -> Optional[Dict[str, Any]]:
        """
        Search for property data using Estated's property search endpoint
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/property",
                    params={"freeform": address},
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    logger.info(f"Successfully fetched property data for {address}")
                    return data
                else:
                    logger.error(f"Estated API error: {response.status_code} - {response.text}")
                    return None
                    
        except httpx.TimeoutException:
            logger.error(f"Timeout when searching for property: {address}")
            return None
        except Exception as e:
            logger.error(f"Error searching property {address}: {str(e)}")
            return None
    
    async def get_property_details(self, parcel_id: str) -> Optional[Dict[str, Any]]:
        """
        Get detailed property information using parcel ID
        """
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/property/{parcel_id}",
                    headers=self.headers,
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    logger.info(f"Successfully fetched detailed data for parcel {parcel_id}")
                    return data
                else:
                    logger.error(f"Estated API error for parcel {parcel_id}: {response.status_code}")
                    return None
                    
        except Exception as e:
            logger.error(f"Error fetching property details for {parcel_id}: {str(e)}")
            return None
    
    def extract_property_data(self, raw_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Extract and normalize property data from Estated API response
        """
        if not raw_data or 'data' not in raw_data:
            return {}
        
        property_data = raw_data.get('data', {})
        
        # Extract core property information
        extracted = {
            'full_address': property_data.get('address', {}).get('formatted_street_address', ''),
            'parcel_id': property_data.get('parcel', {}).get('apn_unformatted', ''),
            'property_type': self._map_property_type(property_data.get('structure', {}).get('style', '')),
            'year_built': property_data.get('structure', {}).get('year_built'),
            'square_footage': property_data.get('structure', {}).get('total_area_sq_ft'),
            'lot_size': property_data.get('parcel', {}).get('area_acres'),
            'bedrooms': property_data.get('structure', {}).get('beds_count'),
            'bathrooms': property_data.get('structure', {}).get('baths'),
            'legal_description': property_data.get('parcel', {}).get('legal_description', ''),
            'zoning': property_data.get('parcel', {}).get('zoning', ''),
            
            # Location data
            'city': property_data.get('address', {}).get('city', ''),
            'zip_code': property_data.get('address', {}).get('zip_code', ''),
            'county': property_data.get('address', {}).get('county', ''),
            
            # Ownership data
            'owner_name': property_data.get('owner', {}).get('name', ''),
            'owner_mailing_address': self._format_mailing_address(property_data.get('owner', {}).get('mailing_address', {})),
            
            # Financial data
            'last_sale_price': property_data.get('valuation', {}).get('sale_price'),
            'last_sale_date': property_data.get('valuation', {}).get('sale_date'),
            'estimated_value_avm': property_data.get('valuation', {}).get('estimate_value'),
            'tax_assessed_value': property_data.get('valuation', {}).get('assessed_value'),
            'property_tax_amount': property_data.get('valuation', {}).get('tax_amount'),
        }
        
        return extracted
    
    def _map_property_type(self, style: str) -> str:
        """Map Estated property style to our PropertyType enum"""
        style_lower = style.lower() if style else ''
        
        if 'single' in style_lower or 'detached' in style_lower:
            return 'Single Family Residential'
        elif 'condo' in style_lower or 'condominium' in style_lower:
            return 'Condominium'
        elif 'town' in style_lower:
            return 'Townhouse'
        elif 'multi' in style_lower or 'duplex' in style_lower:
            return 'Multi-Family'
        elif 'land' in style_lower or 'vacant' in style_lower:
            return 'Land'
        else:
            return 'Other'
    
    def _format_mailing_address(self, mailing_data: Dict[str, Any]) -> str:
        """Format mailing address from Estated data"""
        if not mailing_data:
            return ''
        
        parts = []
        if mailing_data.get('street_address'):
            parts.append(mailing_data['street_address'])
        if mailing_data.get('city'):
            parts.append(mailing_data['city'])
        if mailing_data.get('state'):
            parts.append(mailing_data['state'])
        if mailing_data.get('zip_code'):
            parts.append(mailing_data['zip_code'])
        
        return ', '.join(parts)