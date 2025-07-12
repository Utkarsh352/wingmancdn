import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

export function formatTimestamp(timestamp: string): string {
  return new Date(timestamp).toLocaleString()
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    
    try {
      document.execCommand('copy')
      textArea.remove()
      return Promise.resolve(true)
    } catch (err) {
      textArea.remove()
      return Promise.resolve(false)
    }
  }
}

export function validateApiKey(apiKey: string): boolean {
  return apiKey.length > 0 && apiKey.startsWith('sk-')
}

export const DEFAULT_MODELS = [
  { id: 'mistralai/mistral-small-3.2-24b-instruct:free', name: 'Mistral Small 3.2 24B (Free)', provider: 'Mistral AI', isFree: true },
  { id: 'moonshotai/kimi-dev-72b:free', name: 'Kimi Dev 72B (Free)', provider: 'Moonshot AI', isFree: true },
  { id: 'deepseek/deepseek-r1:free', name: 'DeepSeek R1 (Free)', provider: 'DeepSeek', isFree: true },
  { id: 'qwen/qwen3-32b:free', name: 'Qwen 3 32B (Free)', provider: 'Qwen', isFree: true },
  { id: 'google/gemini-2.5-pro-exp-03-25', name: 'Gemini 2.5 Pro (Free)', provider: 'Google', isFree: true },
  { id: 'google/gemini-1.5-flash:free', name: 'Gemini 1.5 Flash (Free)', provider: 'Google', isFree: true }
]

export const PAID_MODELS = [
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