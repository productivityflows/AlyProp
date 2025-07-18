#!/usr/bin/env python3
"""
Test script for AlyProp Property Report API
"""

import asyncio
import json
from app.services.report_generator import ReportGenerator
from app.config import config

async def test_property_report():
    """Test the property report generation with a sample address"""
    
    # Test addresses - use real addresses for testing
    test_addresses = [
        "1600 Amphitheatre Parkway, Mountain View, CA",  # Google HQ
        "1 Apple Park Way, Cupertino, CA",  # Apple HQ
        "410 Terry Ave N, Seattle, WA"  # Amazon HQ
    ]
    
    print("🏠 AlyProp Property Report Test")
    print("=" * 50)
    
    try:
        # Validate configuration
        config.validate()
        print("✅ Configuration validated")
    except ValueError as e:
        print(f"❌ Configuration error: {e}")
        print("Please set ESTATED_API_KEY and ANTHROPIC_API_KEY in your .env file")
        return
    
    # Initialize report generator
    report_generator = ReportGenerator()
    
    for address in test_addresses:
        print(f"\n📍 Testing address: {address}")
        print("-" * 30)
        
        try:
            # Generate report
            response = await report_generator.generate_property_report(address)
            
            if response.success:
                print("✅ Report generated successfully!")
                print(f"💰 Cost: ${response.credits_used}")
                
                # Display key insights
                report = response.report
                print(f"🏠 Property: {report.property_overview.full_address}")
                print(f"🏗️  Type: {report.property_overview.property_type}")
                print(f"📅 Year Built: {report.property_overview.year_built}")
                print(f"📐 Square Feet: {report.property_overview.square_footage}")
                print(f"🛏️  Bedrooms: {report.property_overview.bedrooms}")
                print(f"🛁 Bathrooms: {report.property_overview.bathrooms}")
                print(f"\n💡 AI Summary: {report.property_overview.human_readable_summary}")
                print(f"📊 Investment Grade: {report.bonus_analytics.ai_grade}")
                print(f"🎯 Strategy: {report.investment_insight.strategy_recommendation}")
                print(f"📈 Off-market Score: {report.bonus_analytics.off_market_probability_score}%")
                
                # Save detailed report to file
                filename = f"report_{address.replace(',', '').replace(' ', '_')[:30]}.json"
                with open(filename, 'w') as f:
                    json.dump(response.dict(), f, indent=2, default=str)
                print(f"📄 Detailed report saved to: {filename}")
                
            else:
                print(f"❌ Report failed: {response.error_message}")
                
        except Exception as e:
            print(f"❌ Error testing {address}: {str(e)}")
        
        print("\n" + "=" * 50)

if __name__ == "__main__":
    print("Starting Property Report Test...")
    asyncio.run(test_property_report())