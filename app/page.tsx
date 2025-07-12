'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Heart, 
  MessageSquare, 
  Zap, 
  Shield, 
  Sparkles, 
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Globe,
  Target,
  TrendingUp,
  Key,
  Eye,
  EyeOff,
  Play,
  Award,
  Clock,
  Smartphone
} from 'lucide-react'
import { cn, validateApiKey } from '@/lib/utils'

export default function LandingPage() {
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Check if user already has a valid API key
    const savedApiKey = localStorage.getItem('wingman-api-key')
    if (savedApiKey && validateApiKey(savedApiKey)) {
      router.push('/dashboard')
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
        router.push('/dashboard')
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
      icon: <Heart className="w-8 h-8" />,
      title: 'Dating Strategy',
      description: 'Get personalized advice on approaching, flirting, and building attraction',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Conversation Skills',
      description: 'Learn how to have engaging conversations and create emotional connections',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Confidence Building',
      description: 'Develop self-confidence and overcome dating anxiety with proven techniques',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Relationship Growth',
      description: 'Navigate relationships, handle conflicts, and build lasting connections',
      gradient: 'from-green-500 to-blue-500'
    }
  ]

  const stats = [
    { label: 'Success Stories', value: '10,000+', icon: <Award className="w-5 h-5" /> },
    { label: 'Dating Tips', value: '500+', icon: <Star className="w-5 h-5" /> },
    { label: 'Confidence Boost', value: '95%', icon: <TrendingUp className="w-5 h-5" /> },
    { label: 'Active Users', value: '5,000+', icon: <Users className="w-5 h-5" /> }
  ]

  const benefits = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Availability',
      description: 'Get dating advice anytime, anywhere'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Mobile Friendly',
      description: 'Works perfectly on all your devices'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Private & Secure',
      description: 'Your conversations stay confidential'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Responses',
      description: 'Get advice in real-time'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-purple-100 dark:from-gray-900 dark:via-purple-900 dark:to-pink-900 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-red-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                  Wingman AI
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 -mt-1">Your Dating Coach</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <a 
                href="https://openrouter.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 hover:bg-white dark:hover:bg-gray-800 shadow-sm"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Powered by OpenRouter</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <div className="px-4 py-2 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-full border border-pink-200 dark:border-pink-800">
                <span className="text-sm font-medium text-pink-700 dark:text-pink-300 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Your Personal Dating Coach & Wingman</span>
                </span>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Master Your
              <span className="bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent"> Dating Life </span>
              <br />
              with AI
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Get personalized dating advice, conversation starters, and relationship strategies from your AI wingman. 
              Learn how to attract, connect, and build meaningful relationships.
            </p>

            {/* API Key Form */}
            <div className="max-w-lg mx-auto mb-16">
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 dark:border-gray-700/50">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Key className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Get Started in Seconds
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Enter your OpenRouter API key to access free AI models for your dating journey
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      OpenRouter API Key
                    </label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="apiKey"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="sk-..."
                        className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Get your free API key from{' '}
                      <a 
                        href="https://openrouter.ai/keys" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700 dark:text-pink-400 font-medium underline"
                      >
                        openrouter.ai
                      </a>
                      {' '}• We only use free models
                    </p>
                  </div>
                  
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                      <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isValidating || !apiKey}
                    className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    {isValidating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Validating...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" />
                        <span>Start Your Dating Journey</span>
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
              {stats.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                    <div className="text-pink-600 dark:text-pink-400">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Can Your AI Wingman Help You With?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Everything you need to transform your dating life and build better relationships
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-white/20 dark:border-gray-700/50 hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Wingman AI?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the future of dating advice with cutting-edge AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-pink-500/10 to-red-500/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
                  <div className="text-pink-600 dark:text-pink-400">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 to-red-600/20"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Dating Life?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
                Join thousands of users who are already improving their relationships with AI-powered dating advice
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <span className="text-lg font-medium">Personalized advice</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <span className="text-lg font-medium">24/7 availability</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <span className="text-lg font-medium">Proven strategies</span>
                </div>
              </div>
              <button
                onClick={() => document.getElementById('apiKey')?.focus()}
                className="bg-white text-pink-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">
                    Wingman AI
                  </span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your AI Dating Coach</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Transform your dating life with personalized AI-powered advice and strategies.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Dating Strategy</li>
                <li>• Conversation Skills</li>
                <li>• Confidence Building</li>
                <li>• Relationship Growth</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Powered By</h3>
              <a 
                href="https://openrouter.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Globe className="w-5 h-5" />
                <span>OpenRouter AI</span>
              </a>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Access to the world's best AI models
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              © 2024 Wingman AI. Your personal dating coach powered by artificial intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
} 