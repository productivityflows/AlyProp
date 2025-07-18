#!/usr/bin/env python3
"""
Demo script for Legendary $5 AI Property Reports

This script demonstrates the enhanced real estate analysis capabilities
that generate mentor-style investment insights with cold outreach scripts.
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


def print_section_header(title: str, emoji: str = "📊"):
    """Print a formatted section header"""
    print(f"\n{emoji} {title}")
    print("=" * (len(title) + 4))


def print_subsection(title: str, content: str, max_length: int = 300):
    """Print a formatted subsection"""
    display_content = content
    if len(content) > max_length:
        display_content = content[:max_length] + "..."
    
    print(f"\n💡 {title}:")
    print(f"   {display_content}")


async def demo_legendary_reports():
    """Demonstrate the legendary property report generation"""
    
    print("🏠 LEGENDARY $5 AI PROPERTY REPORTS DEMO")
    print("=" * 55)
    print("Generating mentor-style investment analysis with cold outreach scripts")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Initialize report generator
    generator = ReportGenerator()
    
    # Check API keys status
    print_section_header("API Configuration Check", "🔑")
    print(f"   Estated API Key: {'✅ Configured' if settings.ESTATED_API_KEY else '❌ Missing'}")
    print(f"   Anthropic API Key: {'✅ Configured' if settings.ANTHROPIC_API_KEY else '❌ Missing'}")
    
    if not (settings.ESTATED_API_KEY and settings.ANTHROPIC_API_KEY):
        print("\n⚠️  Demo requires both API keys. Add them to your .env file:")
        print("   ESTATED_API_KEY=your_estated_key")
        print("   ANTHROPIC_API_KEY=your_anthropic_key")
        return
    
    # Test addresses for demo
    demo_addresses = [
        "1600 Amphitheatre Parkway, Mountain View, CA",  # Google HQ
        "123 Main Street, Nashville, TN",  # Generic address
        "555 Oak Avenue, Austin, TX",  # Another test address
    ]
    
    print_section_header("Health Check", "🏥")
    try:
        health = await generator.health_check()
        print(f"   System Status: {health.get('status', 'unknown').upper()}")
        print(f"   Estated Connection: {health.get('estated_api', 'unknown')}")
        print(f"   Report Cost: ${health.get('report_cost', 'unknown')}")
    except Exception as e:
        print(f"   ❌ Health check failed: {str(e)}")
        return
    
    print_section_header("Sample Report Structure", "📋")
    try:
        sample = generator.get_sample_report_structure()
        sections = sample.get('sections', {})
        print(f"   Report contains {len(sections)} comprehensive sections:")
        for section_key, section_info in sections.items():
            section_num = section_key.split('_')[0]
            print(f"   {section_num}. {section_info['description']}")
    except Exception as e:
        print(f"   ❌ Sample structure failed: {str(e)}")
    
    # Generate a legendary report
    print_section_header("Legendary Report Generation", "🎯")
    test_address = demo_addresses[0]  # Use first address for detailed demo
    
    print(f"Analyzing: {test_address}")
    print("Generating legendary mentor-style analysis...")
    
    try:
        start_time = datetime.now()
        report = await generator.generate_report(test_address)
        end_time = datetime.now()
        
        generation_time = (end_time - start_time).total_seconds()
        
        print(f"\n✅ LEGENDARY REPORT GENERATED!")
        print(f"   Report ID: {report.report_id}")
        print(f"   Generation Time: {generation_time:.2f} seconds")
        print(f"   Cost: ${report.cost}")
        print(f"   AI Grade: {report.bonus_analytics.ai_grade}")
        
        # Display key sections of the legendary report
        print_section_header("1. Property Snapshot", "🏠")
        print_subsection("AI Summary", report.property_overview.ai_summary)
        
        print_section_header("2. Ownership & Off-Market Potential", "👤")
        print_subsection("Motivation Analysis", report.ownership_sale_history.motivation_insight)
        print(f"   Ownership Duration: {report.ownership_sale_history.ownership_duration_years} years")
        print(f"   Absentee Owner: {'Yes' if report.ownership_sale_history.is_absentee_owner else 'No'}")
        
        print_section_header("3. Valuation & Equity Analysis", "💰")
        print_subsection("Tax vs AVM Analysis", report.equity_position.tax_vs_avm_analysis)
        if report.equity_position.equity_estimate:
            print(f"   Estimated Equity: ${report.equity_position.equity_estimate:,.0f}")
        
        print_section_header("4. Deal Strategy Scorecard", "📈")
        print_subsection("Flip Potential", report.investment_strategy.flip_potential_rating)
        print_subsection("Buy-Hold Assessment", report.investment_strategy.buy_hold_assessment)
        print_subsection("BRRRR Fit", report.investment_strategy.brrrr_fit_score)
        print_subsection("Strategy Recommendation", report.investment_strategy.strategy_recommendation)
        
        print_section_header("5. Location & Environmental Context", "📍")
        print_subsection("Walkability", report.neighborhood_context.walkability_estimate)
        print_subsection("Transit Access", report.neighborhood_context.transit_access)
        print_subsection("School Quality", report.neighborhood_context.school_zone_quality)
        print_subsection("Community Type", report.neighborhood_context.community_description)
        
        print_section_header("6. Red Flags & Deal Killers", "⚠️")
        print_subsection("Age/Rehab Risk", report.risk_red_flags.age_rehab_risk)
        print_subsection("Tax Risk", report.risk_red_flags.tax_underassessment_risk)
        print_subsection("Risk Summary", report.risk_red_flags.risk_summary)
        
        print_section_header("7. Investor Whisper Summary", "📜")
        print_subsection("Mentor Insight", report.investor_snapshot.investor_summary)
        print_subsection("Target Buyer", report.investor_snapshot.target_buyer_type)
        print_subsection("Motivation Score", report.investor_snapshot.motivation_to_sell)
        
        print_section_header("8. Bonus Analytics & Cold Outreach", "🔒")
        print(f"   Off-Market Probability: {report.bonus_analytics.off_market_probability}")
        print(f"   Overall AI Grade: {report.bonus_analytics.ai_grade}")
        print_subsection("Rebuild vs Rehab", report.bonus_analytics.rebuild_vs_rehab)
        
        print_section_header("COLD OUTREACH SCRIPT", "📝")
        print("Ready-to-send professional outreach message:")
        print("-" * 50)
        print(report.bonus_analytics.cold_outreach_script)
        print("-" * 50)
        
        print_section_header("Report Summary", "✨")
        print(f"This legendary report provides:")
        print(f"   ✅ 8 comprehensive analysis sections")
        print(f"   ✅ Mentor-style investment insights")
        print(f"   ✅ Ready-to-use cold outreach script")
        print(f"   ✅ Detailed risk assessment")
        print(f"   ✅ Strategic recommendations")
        print(f"   ✅ Off-market probability scoring")
        print(f"   ✅ Professional-grade analysis for ${report.cost}")
        
    except ValueError as e:
        print(f"   ❌ Property not found: {str(e)}")
        print("   💡 Try a different address or check Estated coverage")
    except Exception as e:
        print(f"   ❌ Report generation failed: {str(e)}")
        print("   💡 Check API keys and network connectivity")


async def demo_api_capabilities():
    """Demo additional API capabilities"""
    print_section_header("API Capabilities Demo", "🌐")
    
    try:
        import httpx
        
        base_url = "http://localhost:8000"
        timeout = httpx.Timeout(30.0)  # 30 second timeout
        
        async with httpx.AsyncClient(timeout=timeout) as client:
            print("Testing API endpoints...")
            
            # Test health endpoint
            try:
                response = await client.get(f"{base_url}/health")
                print(f"   Health Check: {response.status_code} - {response.json().get('status', 'unknown')}")
            except Exception as e:
                print(f"   Health Check: ❌ {str(e)}")
            
            # Test sample structure endpoint
            try:
                response = await client.get(f"{base_url}/property/sample")
                if response.status_code == 200:
                    sample_data = response.json()
                    print(f"   Sample Structure: ✅ {len(sample_data.get('sections', {}))} sections")
                else:
                    print(f"   Sample Structure: ❌ Status {response.status_code}")
            except Exception as e:
                print(f"   Sample Structure: ❌ {str(e)}")
            
    except ImportError:
        print("   📦 Install httpx to test API endpoints: pip install httpx")
    except Exception as e:
        print(f"   ❌ API test failed: {str(e)}")
        print("   💡 Make sure the server is running: python run.py")


def show_value_proposition():
    """Show the value proposition of legendary reports"""
    print_section_header("Value Proposition", "💎")
    
    comparison = {
        "Basic Property Report": {
            "price": "$20-50",
            "features": ["Basic property details", "Sales history", "Tax info"],
            "ai_insights": "None",
            "outreach_help": "None"
        },
        "PropStream Premium": {
            "price": "$100/month",
            "features": ["Property data", "Owner info", "Some analytics"],
            "ai_insights": "Basic",
            "outreach_help": "Templates only"
        },
        "AlyProp Legendary": {
            "price": "$5",
            "features": [
                "Complete property analysis",
                "Mentor-style AI insights", 
                "Investment strategy scoring",
                "Ready-to-send outreach scripts",
                "Risk assessment",
                "Off-market probability",
                "Professional grade analysis"
            ],
            "ai_insights": "Advanced mentor-style analysis",
            "outreach_help": "Custom scripts per property"
        }
    }
    
    print("Compare our legendary reports:")
    print()
    for service, details in comparison.items():
        print(f"📊 {service}")
        print(f"   💰 Price: {details['price']}")
        print(f"   🤖 AI Insights: {details['ai_insights']}")
        print(f"   📧 Outreach Help: {details['outreach_help']}")
        print(f"   ✨ Features: {len(details['features'])} items")
        print()


if __name__ == "__main__":
    print("🚀 Starting Legendary Property Reports Demo...")
    
    try:
        # Show value proposition first
        show_value_proposition()
        
        # Run main demo
        asyncio.run(demo_legendary_reports())
        
        # Test API capabilities
        asyncio.run(demo_api_capabilities())
        
        print_section_header("Demo Complete", "🎉")
        print("Ready to generate legendary $5 property reports!")
        print("Start the server with: python run.py")
        print("Then visit: http://localhost:8000/docs")
        
    except KeyboardInterrupt:
        print("\n👋 Demo interrupted by user")
    except Exception as e:
        print(f"\n❌ Demo failed: {str(e)}")
        print("Check your setup and try again.")
    
    print("\n✨ Thank you for trying Legendary Property Reports!")