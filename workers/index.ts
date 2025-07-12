// Inline the necessary functions and data to avoid import issues
const AI_PERSONALITIES = [
  {
    id: 'long-term',
    name: 'Long-term Relationship Coach',
    description: 'Focused on building lasting, meaningful relationships',
    systemPrompt: 'You are a relationship coach who helps people build long-term, committed relationships. Focus on emotional connection, shared values, and building trust.',
    color: 'blue'
  },
  {
    id: 'casual',
    name: 'Casual Dating Expert',
    description: 'Perfect for fun, lighthearted dating experiences',
    systemPrompt: 'You are a casual dating coach who helps people enjoy dating without pressure. Focus on having fun, meeting new people, and keeping things light.',
    color: 'green'
  },
  {
    id: 'confidence',
    name: 'Confidence Builder',
    description: 'Build self-confidence and overcome dating anxiety',
    systemPrompt: 'You are a confidence coach who helps people overcome dating anxiety and build self-esteem. Focus on self-improvement, positive mindset, and authentic self-expression.',
    color: 'purple'
  },
  {
    id: 'pickup',
    name: 'Pickup Artist',
    description: 'Learn attraction and seduction techniques',
    systemPrompt: 'You are a pickup artist coach who teaches attraction and seduction techniques. Focus on body language, conversation skills, and creating attraction.',
    color: 'red'
  }
]

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

const DEFAULT_MODELS = [
  { id: 'mistralai/mistral-small-3.2-24b-instruct:free', name: 'Mistral Small 3.2 24B (Free)', provider: 'Mistral AI', isFree: true },
  { id: 'moonshotai/kimi-dev-72b:free', name: 'Kimi Dev 72B (Free)', provider: 'Moonshot AI', isFree: true },
  { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1 (Free)', provider: 'DeepSeek', isFree: true },
  { id: 'qwen/qwen3-32b:free', name: 'Qwen 3 32B (Free)', provider: 'Qwen', isFree: true },
  { id: 'google/gemini-2.5-pro-exp-03-25', name: 'Gemini 2.5 Pro (Free)', provider: 'Google', isFree: true },
  { id: 'google/gemini-1.5-flash:free', name: 'Gemini 1.5 Flash (Free)', provider: 'Google', isFree: true }
]

const PAID_MODELS = [
  { id: 'openai/gpt-4o', name: 'GPT-4o (Paid)', provider: 'OpenAI', isFree: false },
  { id: 'anthropic/claude-3-5-sonnet', name: 'Claude 3.5 Sonnet (Paid)', provider: 'Anthropic', isFree: false },
  { id: 'openai/gpt-4o-mini', name: 'GPT-4o Mini (Paid)', provider: 'OpenAI', isFree: false },
  { id: 'anthropic/claude-3-5-haiku', name: 'Claude 3.5 Haiku (Paid)', provider: 'Anthropic', isFree: false },
  { id: 'google/gemini-1.5-pro', name: 'Gemini 1.5 Pro (Paid)', provider: 'Google', isFree: false },
  { id: 'meta-llama/llama-3.1-70b-instruct', name: 'Llama 3.1 70B Instruct (Paid)', provider: 'Meta', isFree: false },
  { id: 'openai/gpt-4-turbo', name: 'GPT-4 Turbo (Paid)', provider: 'OpenAI', isFree: false },
  { id: 'anthropic/claude-3-opus', name: 'Claude 3 Opus (Paid)', provider: 'Anthropic', isFree: false },
  { id: 'google/gemini-1.5-flash', name: 'Gemini 1.5 Flash (Paid)', provider: 'Google', isFree: false },
  { id: 'meta-llama/llama-3.1-405b-instruct', name: 'Llama 3.1 405B Instruct (Paid)', provider: 'Meta', isFree: false }
]

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle CORS preflight requests
function handleCORS(request: Request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }
}

// Chat API endpoint
async function handleChat(request: Request) {
  try {
    const body = await request.json()
    const { message, personality, context, apiKey, model = 'mistralai/mistral-7b-instruct', conversationHistory = [] } = body

    if (!message || !personality || !apiKey) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: message, personality, apiKey'
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const selectedPersonality = AI_PERSONALITIES.find(p => p.id === personality)
    if (!selectedPersonality) {
      return new Response(JSON.stringify({
        error: 'Invalid personality selected'
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const systemPrompt = `You are a dating coach. I'll tell you about the girl, analyze and guide me on it.

Personality: ${selectedPersonality.name}
${selectedPersonality.systemPrompt}

IMPORTANT:
- Give practical, actionable advice
- Be direct and honest
- Analyze the situation clearly
- Provide specific guidance
- Stay true to the ${selectedPersonality.name} approach
- Remember our previous conversation and build on it

Context: ${context || 'No additional context provided'}

Previous conversation:
${conversationHistory.length > 0 ? conversationHistory.map((msg: any) => `${msg.role === 'user' ? 'You' : 'Coach'}: ${msg.content}`).join('\n') : 'No previous conversation'}

My question: "${message}"

Analyze and guide me:`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
        max_tokens: 1000,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('OpenRouter API error:', errorData)
      return new Response(JSON.stringify({
        error: errorData.error?.message || 'Failed to get response from AI'
      }), { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.'

    return new Response(JSON.stringify({
      id: generateId(),
      response: aiResponse,
      model: model,
      timestamp: new Date().toISOString()
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

// Reply API endpoint
async function handleReply(request: Request) {
  try {
    const body = await request.json()
    const { message, personality, context, apiKey, model = 'mistralai/mistral-7b-instruct', conversationHistory = [] } = body

    if (!message || !personality || !apiKey) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: message, personality, apiKey'
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const selectedPersonality = AI_PERSONALITIES.find(p => p.id === personality)
    if (!selectedPersonality) {
      return new Response(JSON.stringify({
        error: 'Invalid personality selected'
      }), { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
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
${conversationHistory.length > 0 ? conversationHistory.map((msg: any) => `${msg.role === 'user' ? 'You' : 'Her'}: ${msg.content}`).join('\n') : 'No previous conversation'}

Her message: "${message}"

Generate a brief, confident reply:`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
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
      return new Response(JSON.stringify({
        error: errorData.error?.message || 'Failed to generate reply'
      }), { 
        status: response.status, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const data = await response.json()
    const reply = data.choices[0]?.message?.content?.trim() || 'Sorry, I could not generate a reply.'

    return new Response(JSON.stringify({
      id: generateId(),
      reply: reply,
      model: model,
      timestamp: new Date().toISOString()
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Reply API error:', error)
    return new Response(JSON.stringify({
      error: 'Internal server error'
    }), { 
      status: 500, 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

// Models API endpoint
async function handleModels(request: Request) {
  try {
    const url = new URL(request.url)
    const apiKey = url.searchParams.get('apiKey')



    if (!apiKey) {
      return new Response(JSON.stringify({
        models: [...DEFAULT_MODELS, ...PAID_MODELS],
        message: 'Using default models (no API key provided)'
      }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    const response = await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      console.error('Failed to fetch models from OpenRouter:', response.status)
      return new Response(JSON.stringify({
        models: [...DEFAULT_MODELS, ...PAID_MODELS],
        message: 'Using default models (API error)'
      }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
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
      return new Response(JSON.stringify({
        models: [...DEFAULT_MODELS, ...PAID_MODELS],
        message: 'No top models found, using default models'
      }), { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }

    return new Response(JSON.stringify({ 
      models: filteredModels,
      message: `Found ${filteredModels.length} top models (${filteredModels.filter(m => m.isFree).length} free, ${filteredModels.filter(m => !m.isFree).length} paid)`
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })

  } catch (error) {
    console.error('Models API error:', error)
    return new Response(JSON.stringify({
      models: [...DEFAULT_MODELS, ...PAID_MODELS],
      message: 'Using default models (network error)'
    }), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }
}

// Main request handler
export default {
  async fetch(request: Request, env: any, ctx: any) {
    const url = new URL(request.url)
    const path = url.pathname

    // Handle CORS
    const corsResponse = handleCORS(request)
    if (corsResponse) return corsResponse

    // Route requests
    if (path === '/api/chat' && request.method === 'POST') {
      return handleChat(request)
    } else if (path === '/api/reply' && request.method === 'POST') {
      return handleReply(request)
    } else if (path === '/api/models' && request.method === 'GET') {
      return handleModels(request)
    } else {
      return new Response('Not Found', { 
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      })
    }
  }
} 