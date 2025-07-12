import { NextRequest, NextResponse } from 'next/server'
import { DEFAULT_MODELS, PAID_MODELS } from '@/lib/utils'
import type { ModelsResponse, ApiError } from '@/types'

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const apiKey = searchParams.get('apiKey')

    if (!apiKey) {
      return NextResponse.json<ModelsResponse>({
        models: [...DEFAULT_MODELS, ...PAID_MODELS],
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
        models: [...DEFAULT_MODELS, ...PAID_MODELS],
        message: 'Using default models (API error)'
      })
    }

    const data = await response.json()
    
    // Define top models by accuracy and performance
    const TOP_FREE_MODELS = [
      'mistralai/mistral-small-3.2-24b-instruct:free',
      'moonshotai/kimi-dev-72b:free',
      'deepseek/deepseek-r1:free',
      'qwen/qwen3-32b:free',
      'google/gemini-2.5-pro-exp-03-25',
      'google/gemini-1.5-flash:free'
    ]
    
    const TOP_PAID_MODELS = [
      'openai/gpt-4o',
      'anthropic/claude-3-5-sonnet',
      'openai/gpt-4o-mini',
      'anthropic/claude-3-5-haiku',
      'google/gemini-1.5-pro',
      'meta-llama/llama-3.1-70b-instruct',
      'openai/gpt-4-turbo',
      'anthropic/claude-3-opus',
      'google/gemini-1.5-flash',
      'meta-llama/llama-3.1-405b-instruct'
    ]
    
    // Process all models and categorize them
    const processedModels = data.data.map((model: any) => {
      // Check if the model is free by looking at pricing
      let isFree = false
      
      if (!model.pricing) {
        isFree = true
      } else if (model.pricing.input === 0 && model.pricing.output === 0) {
        isFree = true
      } else if (model.pricing.input === null && model.pricing.output === null) {
        isFree = true
      } else if (model.pricing.input === 0 && model.pricing.output === null) {
        isFree = true
      } else if (model.pricing.input === null && model.pricing.output === 0) {
        isFree = true
      }
      
      // Also check for models with ":free" suffix
      if (model.id.includes(':free')) {
        isFree = true
      }
      
      return {
        id: model.id,
        name: `${model.name || model.id} (${isFree ? 'Free' : 'Paid'})`,
        provider: model.context_length ? 'OpenRouter' : 'Unknown',
        isFree: isFree
      }
    })
    
    // Filter to only include top models
    const topFreeModels = processedModels.filter((model: any) => 
      model.isFree && TOP_FREE_MODELS.includes(model.id)
    )
    
    const topPaidModels = processedModels.filter((model: any) => 
      !model.isFree && TOP_PAID_MODELS.includes(model.id)
    )
    
    // Combine top models, prioritizing the ones that exist in the API response
    const filteredModels = [...topFreeModels, ...topPaidModels]

    // If no models found, use defaults
    if (filteredModels.length === 0) {
      return NextResponse.json<ModelsResponse>({
        models: [...DEFAULT_MODELS, ...PAID_MODELS],
        message: 'No top models found, using default models'
      })
    }

    return NextResponse.json<ModelsResponse>({ 
      models: filteredModels,
      message: `Found ${filteredModels.length} top models (${filteredModels.filter(m => m.isFree).length} free, ${filteredModels.filter(m => !m.isFree).length} paid)`
    })

  } catch (error) {
    console.error('Models API error:', error)
    return NextResponse.json<ModelsResponse>({
      models: [...DEFAULT_MODELS, ...PAID_MODELS],
      message: 'Using default models (network error)'
    })
  }
} 