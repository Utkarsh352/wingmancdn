import { NextRequest, NextResponse } from 'next/server'
import { DEFAULT_MODELS } from '@/lib/utils'
import type { ModelsResponse, ApiError } from '@/types'

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const apiKey = searchParams.get('apiKey')

    if (!apiKey) {
      return NextResponse.json<ModelsResponse>({
        models: DEFAULT_MODELS,
        message: 'Using default models (no API key provided)'
      })
    }

    const response = await fetch(`${OPENROUTER_BASE_URL}/models`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Failed to fetch models from OpenRouter:', response.status)
      return NextResponse.json<ModelsResponse>({
        models: DEFAULT_MODELS,
        message: 'Using default models (API error)'
      })
    }

    const data = await response.json()
    const models = data.data.map((model: any) => ({
      id: model.id,
      name: model.name || model.id,
      provider: model.context_length ? 'OpenRouter' : 'Unknown'
    }))

    return NextResponse.json<ModelsResponse>({ models })

  } catch (error) {
    console.error('Models API error:', error)
    return NextResponse.json<ModelsResponse>({
      models: DEFAULT_MODELS,
      message: 'Using default models (network error)'
    })
  }
} 