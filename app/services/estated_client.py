import httpx
from typing import Optional, Dict, Any
import logging
from app.config import settings

logger = logging.getLogger(__name__)


class EstatedClient:
    """Client for Estated API integration"""
    
    def __init__(self):
        self.base_url = settings.ESTATED_BASE_URL
        self.api_key = settings.ESTATED_API_KEY
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
    
    async def get_property_data(self, address: str) -> Optional[Dict[str, Any]]:
        """
        Fetch comprehensive property data from Estated API
        
        Args:
            address: Property address to lookup
            
        Returns:
            Dictionary containing property data or None if not found
        """
        try:
            async with httpx.AsyncClient() as client:
                # Use Estated's property search endpoint
                response = await client.get(
                    f"{self.base_url}/property",
                    headers=self.headers,
                    params={"address": address}
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return self._parse_property_response(data)
                elif response.status_code == 404:
                    logger.warning(f"Property not found for address: {address}")
                    return None
                else:
                    logger.error(f"Estated API error: {response.status_code} - {response.text}")
                    return None
                    
        except Exception as e:
            logger.error(f"Error fetching property data: {str(e)}")
            return None
    
    def _parse_property_response(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Parse and standardize Estated API response
        
        Args:
            data: Raw API response
            
        Returns:
            Standardized property data dictionary
        """
        try:
            # Handle both single property and array responses
            if isinstance(data, list) and len(data) > 0:
                property_data = data[0]
            elif isinstance(data, dict):
                property_data = data
            else:
                return {}
            
            # Extract standardized fields
            parsed_data = {
                # Basic property info
                "full_address": property_data.get("address", {}).get("formatted_street_address", ""),
                "parcel_id": property_data.get("parcel", {}).get("apn_original", ""),
                "property_type": self._map_property_type(property_data.get("structure", {}).get("property_type", "")),
                "year_built": property_data.get("structure", {}).get("year_built"),
                "square_footage": property_data.get("structure", {}).get("total_area_sq_ft"),
                "lot_size": property_data.get("parcel", {}).get("area_acres"),
                "bedrooms": property_data.get("structure", {}).get("beds_count"),
                "bathrooms": property_data.get("structure", {}).get("baths_total"),
                "legal_description": property_data.get("parcel", {}).get("legal_description", ""),
                
                # Location info
                "city": property_data.get("address", {}).get("city", ""),
                "zip_code": property_data.get("address", {}).get("zip_code", ""),
                "county": property_data.get("address", {}).get("county", ""),
                
                # Ownership info
                "owner_name": property_data.get("owner", {}).get("name", ""),
                "owner_mailing_address": self._format_owner_address(property_data.get("owner", {})),
                
                # Financial info
                "last_sale_price": property_data.get("valuation", {}).get("last_sale_price"),
                "last_sale_date": property_data.get("valuation", {}).get("last_sale_date"),
                "estimated_value": property_data.get("valuation", {}).get("estimate"),
                "tax_assessed_value": property_data.get("tax", {}).get("assessed_value"),
                "property_tax_amount": property_data.get("tax", {}).get("total_taxes"),
                
                # Raw data for AI analysis
                "raw_data": property_data
            }
            
            return parsed_data
            
        except Exception as e:
            logger.error(f"Error parsing property response: {str(e)}")
            return {}
    
    def _map_property_type(self, estated_type: str) -> str:
        """Map Estated property types to our standard types"""
        type_mapping = {
            "single_family": "Single Family Residential",
            "condominium": "Condominium",
            "townhouse": "Townhouse",
            "multi_family": "Multi-Family",
            "vacant_land": "Land",
            "commercial": "Commercial"
        }
        return type_mapping.get(estated_type.lower(), "Other")
    
    def _format_owner_address(self, owner_data: Dict[str, Any]) -> str:
        """Format owner mailing address from Estated data"""
        try:
            address_parts = []
            
            if owner_data.get("mailing_address"):
                mail_addr = owner_data["mailing_address"]
                if mail_addr.get("street"):
                    address_parts.append(mail_addr["street"])
                if mail_addr.get("city"):
                    address_parts.append(mail_addr["city"])
                if mail_addr.get("state"):
                    address_parts.append(mail_addr["state"])
                if mail_addr.get("zip_code"):
                    address_parts.append(mail_addr["zip_code"])
            
            return ", ".join(address_parts) if address_parts else ""
            
        except Exception:
            return ""
    
    async def health_check(self) -> bool:
        """Check if Estated API is accessible"""
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/health",
                    headers=self.headers,
                    timeout=10.0
                )
                return response.status_code == 200
        except Exception:
            return False