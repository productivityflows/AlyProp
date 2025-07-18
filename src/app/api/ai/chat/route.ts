import { NextRequest, NextResponse } from 'next/server'
import { claudeService } from '@/lib/claude'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context } = body

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get AI response from Claude
    const response = await claudeService.chatAssistant(message, context)

    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error in AI chat API:', error)
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'AI Chat Assistant is ready',
    capabilities: [
      'Property analysis and evaluation',
      'Investment strategy recommendations', 
      'Market trend insights',
      'Deal structure advice',
      'ROI calculations',
      'Risk assessment',
      'Financing options',
      'Real estate market questions'
    ]
  })
}