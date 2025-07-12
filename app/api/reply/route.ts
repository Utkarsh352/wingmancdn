import { NextRequest, NextResponse } from 'next/server'
import { AI_PERSONALITIES } from '@/lib/personalities'
import { generateId } from '@/lib/utils'
import type { ReplyRequest, ApiError } from '@/types'

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1'

export async function POST(request: NextRequest) {
  try {
    const body: ReplyRequest = await request.json()
    const { message, personality, context, apiKey, model = 'mistralai/mistral-7b-instruct', conversationHistory = [] } = body

    if (!message || !personality || !apiKey) {
      return NextResponse.json<ApiError>({
        error: 'Missing required fields: message, personality, apiKey'
      }, { status: 400 })
    }

    const selectedPersonality = AI_PERSONALITIES.find(p => p.id === personality)
    if (!selectedPersonality) {
      return NextResponse.json<ApiError>({
        error: 'Invalid personality selected'
      }, { status: 400 })
    }

    const systemPrompt = `You are a reply generator. I'll tell you her texts, generate a suitable, brief reply to her texts so she stays interested in me.

Personality: ${selectedPersonality.name}
${selectedPersonality.systemPrompt}

IMPORTANT:
- Keep replies brief and natural (1-2 sentences max)
- Be confident, not desperate
- Match her energy level
- Stay true to the ${selectedPersonality.name} personality
- Don't be overly eager or pushy
- Remember the conversation context and build on previous messages

Context: ${context || 'No additional context provided'}

Previous conversation:
${conversationHistory.length > 0 ? conversationHistory.map(msg => `${msg.role === 'user' ? 'You' : 'Her'}: ${msg.content}`).join('\n') : 'No previous conversation'}

Her message: "${message}"

Generate a brief, confident reply:`

    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://wingman-ai.vercel.app',
        'X-Title': 'Wingman AI'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          ...conversationHistory,
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 200,
        temperature: 0.8
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenRouter API error:', errorData)
      return NextResponse.json<ApiError>({
        error: errorData.error?.message || 'Failed to generate reply'
      }, { status: response.status })
    }

    const data = await response.json()
    const reply = data.choices[0]?.message?.content?.trim() || 'Sorry, I could not generate a reply.'

    return NextResponse.json({
      id: generateId(),
      reply: reply,
      model: model,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Reply API error:', error)
    return NextResponse.json<ApiError>({
      error: 'Internal server error'
    }, { status: 500 })
  }
} 