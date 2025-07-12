import { NextRequest, NextResponse } from 'next/server'
import { generateId } from '@/lib/utils'
import type { ChatRequest, ChatResponse, ApiError } from '@/types'

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json()
    const { prompt, model, apiKey } = body

    if (!prompt || !model) {
      return NextResponse.json<ApiError>(
        { error: 'Prompt and model are required' },
        { status: 400 }
      )
    }

    if (!apiKey) {
      return NextResponse.json<ApiError>(
        { error: 'OpenRouter API key is required' },
        { status: 400 }
      )
    }

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://wingman-ai.app',
        'X-Title': 'Wingman AI'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      let errorMessage = 'An error occurred while processing your request.'
      
      if (response.status === 401) {
        errorMessage = 'Invalid API key. Please check your OpenRouter API key.'
      } else if (response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again later.'
      } else if (response.status === 400) {
        errorMessage = 'Invalid request. Please check your input.'
      }

      return NextResponse.json<ApiError>(
        { error: errorMessage },
        { status: response.status }
      )
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    const chatResponse: ChatResponse = {
      id: generateId(),
      response: aiResponse,
      model: model,
      timestamp: new Date().toISOString()
    }

    return NextResponse.json(chatResponse)

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json<ApiError>(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 