#!/usr/bin/env python3
"""
Test script for AlyProp $5 AI Property Report Service

This script tests the property report generation functionality.
"""

import asyncio
import json
import sys
import os
from datetime import datetime

# Add the current directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.services.report_generator import ReportGenerator
from app.config import settings


async def test_report_generation():
    """Test the property report generation"""
    print("🧪 Testing AlyProp $5 AI Property Report Service")
    print("=" * 60)
    
    # Initialize report generator
    generator = ReportGenerator()
    
    # Test addresses
    test_addresses = [
        "1600 Amphitheatre Parkway, Mountain View, CA",
        "1 Apple Park Way, Cupertino, CA",
        "123 Main Street, Anytown, USA"
    ]
    
    print(f"🔑 API Keys Status:")
    print(f"   Estated API Key: {'✅ Set' if settings.ESTATED_API_KEY else '❌ Missing'}")
    print(f"   Anthropic API Key: {'✅ Set' if settings.ANTHROPIC_API_KEY else '❌ Missing'}")
    print()
    
    # Test health check
    print("🏥 Testing Health Check...")
    try:
        health = await generator.health_check()
        print(f"   Status: {health['status']}")
        print(f"   Estated API: {health.get('estated_api', 'unknown')}")
        print(f"   API Keys: {health.get('api_keys', 'unknown')}")
        print(f"   Report Cost: ${health.get('report_cost', 'unknown')}")
    except Exception as e:
        print(f"   ❌ Health check failed: {str(e)}")
    
    print()
    
    # Test sample report structure
    print("📋 Testing Sample Report Structure...")
    try:
        sample = generator.get_sample_report_structure()
        print(f"   ✅ Sample structure contains {len(sample.get('sections', {}))} sections")
        for section_key, section_info in sample.get('sections', {}).items():
            print(f"      {section_info['description']}")
    except Exception as e:
        print(f"   ❌ Sample structure failed: {str(e)}")
    
    print()
    
    # Test report generation (if API keys are available)
    if settings.ESTATED_API_KEY and settings.ANTHROPIC_API_KEY:
        print("🏠 Testing Property Report Generation...")
        for i, address in enumerate(test_addresses[:1], 1):  # Test only first address
            print(f"\n   Test {i}: {address}")
            try:
                print("      📡 Generating report...")
                start_time = datetime.now()
                
                report = await generator.generate_report(address)
                
                end_time = datetime.now()
                duration = (end_time - start_time).total_seconds()
                
                print(f"      ✅ Report generated successfully!")
                print(f"      📊 Report ID: {report.report_id}")
                print(f"      💰 Cost: ${report.cost}")
                print(f"      ⏱️  Generation time: {duration:.2f} seconds")
                print(f"      🏠 Property: {report.property_overview.full_address}")
                print(f"      📈 AI Grade: {report.bonus_analytics.ai_grade}")
                
                # Show key insights
                print(f"      🔍 Key Insights:")
                print(f"         Investment Strategy: {report.investment_strategy.strategy_recommendation[:50]}...")
                print(f"         Risk Summary: {report.risk_red_flags.risk_summary[:50]}...")
                print(f"         Off-Market Probability: {report.bonus_analytics.off_market_probability}")
                
                break  # Only test one for demo
                
            except ValueError as e:
                print(f"      ❌ Property not found: {str(e)}")
            except Exception as e:
                print(f"      ❌ Report generation failed: {str(e)}")
    else:
        print("⚠️  Skipping report generation - API keys not configured")
        print("   To test report generation:")
        print("   1. Copy .env.example to .env")
        print("   2. Add your Estated and Anthropic API keys")
        print("   3. Run this test again")
    
    print()
    print("🎉 Test completed!")
    print("=" * 60)


async def test_api_endpoints():
    """Test the API endpoints using httpx"""
    try:
        import httpx
        print("\n🌐 Testing API Endpoints...")
        
        base_url = "http://localhost:8000"
        
        async with httpx.AsyncClient() as client:
            # Test root endpoint
            print("   Testing GET /")
            response = await client.get(f"{base_url}/")
            print(f"   Status: {response.status_code}")
            
            # Test health endpoint
            print("   Testing GET /health")
            response = await client.get(f"{base_url}/health")
            print(f"   Status: {response.status_code}")
            
            # Test sample endpoint
            print("   Testing GET /property/sample")
            response = await client.get(f"{base_url}/property/sample")
            print(f"   Status: {response.status_code}")
            
        print("   ✅ API endpoints accessible")
        
    except ImportError:
        print("   ⚠️  httpx not available - skipping API endpoint tests")
    except Exception as e:
        print(f"   ❌ API endpoint test failed: {str(e)}")
        print("   💡 Make sure the server is running: python run.py")


if __name__ == "__main__":
    print("Starting AlyProp Property Report Tests...")
    print(f"Timestamp: {datetime.now().isoformat()}")
    print()
    
    # Run the tests
    asyncio.run(test_report_generation())
    
    # Optionally test API endpoints
    try:
        asyncio.run(test_api_endpoints())
    except KeyboardInterrupt:
        print("\n👋 Test interrupted by user")
    except Exception as e:
        print(f"\n❌ Test failed: {str(e)}")
    
    print("\n✨ All tests completed!")