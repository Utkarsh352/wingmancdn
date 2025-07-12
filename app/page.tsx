'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Bot, 
  MessageSquare, 
  Zap, 
  Shield, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Globe
} from 'lucide-react'
import { cn, validateApiKey } from '@/lib/utils'

export default function LandingPage() {
  const [apiKey, setApiKey] = useState('')
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user already has a valid API key
    const savedApiKey = localStorage.getItem('wingman-api-key')
    if (savedApiKey && validateApiKey(savedApiKey)) {
      router.push('/chat')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsValidating(true)

    if (!validateApiKey(apiKey)) {
      setError('Please enter a valid OpenRouter API key (starts with sk-)')
      setIsValidating(false)
      return
    }

    try {
      // Test the API key by fetching models
      const response = await fetch(`/api/models?apiKey=${encodeURIComponent(apiKey)}`)
      
      if (response.ok) {
        localStorage.setItem('wingman-api-key', apiKey)
        router.push('/chat')
      } else {
        setError('Invalid API key. Please check your OpenRouter API key.')
      }
    } catch (err) {
      setError('Failed to validate API key. Please try again.')
    } finally {
      setIsValidating(false)
    }
  }

  const features = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'Multiple AI Models',
      description: 'Access GPT-4, Claude, Llama, Mistral, and more through OpenRouter'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Smart Conversations',
      description: 'Engage in natural conversations with advanced language models'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Lightning Fast',
      description: 'Get instant responses with optimized API routing'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Private',
      description: 'Your API keys stay local, conversations are private'
    }
  ]

  const stats = [
    { label: 'AI Models', value: '8+' },
    { label: 'Response Time', value: '<2s' },
    { label: 'Uptime', value: '99.9%' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gradient">Wingman AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <a 
                href="https://openrouter.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Powered by OpenRouter
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                The Ultimate AI Chat Experience
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your AI
              <span className="text-gradient"> Conversation </span>
              Partner
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Experience the power of multiple AI models in one beautiful, intuitive interface. 
              Chat with GPT-4, Claude, Llama, and more through OpenRouter.
            </p>

            {/* API Key Form */}
            <div className="max-w-md mx-auto mb-12">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    OpenRouter API Key
                  </label>
                  <input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="input-field"
                    required
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Get your free API key from{' '}
                    <a 
                      href="https://openrouter.ai/keys" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
                    >
                      openrouter.ai
                    </a>
                  </p>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isValidating || !apiKey}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isValidating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Validating...</span>
                    </>
                  ) : (
                    <>
                      <span>Start Chatting</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Wingman AI?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need for the perfect AI chat experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="card p-6 text-center hover:shadow-lg transition-shadow duration-200"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600 dark:text-blue-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="card p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of users who are already experiencing the future of AI conversations
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Free to use</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">No registration</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-gradient">Wingman AI</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
              <a 
                href="https://openrouter.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Powered by OpenRouter
              </a>
              <span>•</span>
              <span>Built with Next.js & Tailwind</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 