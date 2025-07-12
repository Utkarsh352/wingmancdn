'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Bot, 
  Send, 
  Settings, 
  Moon, 
  Sun, 
  Copy, 
  Trash2, 
  LogOut,
  MessageSquare,
  Loader2
} from 'lucide-react'
import { cn, generateId, formatTimestamp, copyToClipboard, validateApiKey } from '@/lib/utils'
import type { Message, Model } from '@/types'

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [selectedModel, setSelectedModel] = useState('openai/gpt-4')
  const [models, setModels] = useState<Model[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [error, setError] = useState('')
  const [apiKey, setApiKey] = useState('')
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  // Load data from localStorage and check authentication
  useEffect(() => {
    const savedApiKey = localStorage.getItem('wingman-api-key')
    const savedMessages = localStorage.getItem('wingman-messages')
    const savedModel = localStorage.getItem('wingman-model')
    const savedDarkMode = localStorage.getItem('wingman-dark-mode')

    if (!savedApiKey || !validateApiKey(savedApiKey)) {
      router.push('/')
      return
    }

    setApiKey(savedApiKey)
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    }
    if (savedModel) {
      setSelectedModel(savedModel)
    }
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }

    loadModels(savedApiKey)
  }, [router])

  // Save data to localStorage when it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('wingman-messages', JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    localStorage.setItem('wingman-model', selectedModel)
  }, [selectedModel])

  useEffect(() => {
    localStorage.setItem('wingman-dark-mode', JSON.stringify(isDarkMode))
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const loadModels = async (key: string) => {
    try {
      const response = await fetch(`/api/models?apiKey=${encodeURIComponent(key)}`)
      const data = await response.json()
      setModels(data.models)
    } catch (error) {
      console.error('Failed to load models:', error)
    }
  }

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const userMessage: Message = {
      id: generateId(),
      prompt: inputValue.trim(),
      response: '',
      model: selectedModel,
      timestamp: new Date().toISOString(),
      isUser: true
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: userMessage.prompt,
          model: selectedModel,
          apiKey: apiKey
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response')
      }

      const aiMessage: Message = {
        id: data.id,
        prompt: userMessage.prompt,
        response: data.response,
        model: data.model,
        timestamp: data.timestamp,
        isUser: false
      }

      setMessages(prev => [...prev.slice(0, -1), aiMessage])

    } catch (error: any) {
      console.error('Error sending message:', error)
      setError(error.message)
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all conversation history?')) {
      setMessages([])
      localStorage.removeItem('wingman-messages')
    }
  }

  const handleCopyMessage = async (text: string) => {
    const success = await copyToClipboard(text)
    if (success) {
      // Show temporary success indicator
      const button = document.activeElement as HTMLElement
      if (button) {
        const originalText = button.innerHTML
        button.innerHTML = '<Copy className="w-4 h-4" />'
        button.classList.add('text-green-500')
        setTimeout(() => {
          button.innerHTML = originalText
          button.classList.remove('text-green-500')
        }, 2000)
      }
    }
  }

  const logout = () => {
    localStorage.removeItem('wingman-api-key')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Wingman AI
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={logout}
              className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="max-w-6xl mx-auto space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Settings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  OpenRouter API Key
                </label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your OpenRouter API key"
                  className="input-field"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Get your API key from <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">openrouter.ai</a>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Default Model
                </label>
                <select
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="input-field"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id}>
                      {model.name} ({model.provider})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={clearHistory}
                className="btn-secondary flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear History</span>
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 py-6">
        {/* Messages */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="flex-1 overflow-y-auto scrollbar-hide p-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                  <p className="text-lg font-medium">Start a conversation</p>
                  <p className="text-sm">Type a message below to begin chatting with AI</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={cn(
                      "max-w-[80%] rounded-lg px-4 py-3 shadow-sm",
                      message.isUser 
                        ? "bg-blue-500 text-white" 
                        : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    )}>
                      <div className="flex items-start space-x-2">
                        <div className="flex-1">
                          <p className="whitespace-pre-wrap">{message.prompt}</p>
                          {!message.isUser && message.response && (
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                              <p className="whitespace-pre-wrap">{message.response}</p>
                            </div>
                          )}
                        </div>
                        {!message.isUser && message.response && (
                          <button
                            onClick={() => handleCopyMessage(message.response)}
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                            aria-label="Copy response"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="mt-2 text-xs opacity-70">
                        {formatTimestamp(message.timestamp)} • {message.model}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-3 shadow-sm">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-gray-500 dark:text-gray-400" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}
        
        {/* Input Area */}
        <div className="mt-4 flex space-x-2">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
              className="input-field resize-none"
              rows={3}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            <span>Send</span>
          </button>
        </div>
        
        {/* Model Selector */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            AI Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="input-field"
            disabled={isLoading}
          >
            {models.map(model => (
              <option key={model.id} value={model.id}>
                {model.name} ({model.provider})
              </option>
            ))}
          </select>
        </div>
      </main>
    </div>
  )
} 