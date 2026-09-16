'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Paperclip, Settings2, ChevronDown } from 'lucide-react'
import ChatMessage from './ChatMessage'
import ProviderSelector from './ProviderSelector'
import MessageInput from './MessageInput'

interface ChatInterfaceProps {
  documentsCount: number
  candidatesCount: number
}

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  mode?: string
}

export default function ChatInterface({ documentsCount, candidatesCount }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Welcome to the Candidate Search AI System! I can help you:\n\n• Search candidates by skills, experience, or location\n• Ask questions about your uploaded documents\n• Match candidates to job descriptions\n• Analyze candidate qualifications\n\nSelect a search mode and start asking questions.',
      timestamp: new Date(),
      mode: 'general',
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showProviderSettings, setShowProviderSettings] = useState(false)
  const [provider, setProvider] = useState('openai')
  const [model, setModel] = useState('gpt-4-turbo')
  const [temperature, setTemperature] = useState(0.7)
  const [searchMode, setSearchMode] = useState('hybrid')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      mode: searchMode,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I found relevant results. This is a simulated response. Your backend will stream actual results here.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  const modes = [
    { id: 'document', label: 'Document Search', icon: '📄' },
    { id: 'candidate', label: 'Candidate Search', icon: '👤' },
    { id: 'hybrid', label: 'Hybrid Search', icon: '🔄' },
    { id: 'jobmatch', label: 'Job Matching', icon: '🎯' },
  ]

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">AI Chat & Search</h1>
          <p className="text-sm text-muted-foreground">
            {documentsCount} documents • {candidatesCount} candidates
          </p>
        </div>
        <button
          onClick={() => setShowProviderSettings(!showProviderSettings)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
        >
          <Settings2 className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>

      {/* Provider Settings Panel */}
      {showProviderSettings && (
        <ProviderSelector
          provider={provider}
          model={model}
          temperature={temperature}
          onProviderChange={setProvider}
          onModelChange={setModel}
          onTemperatureChange={setTemperature}
          onClose={() => setShowProviderSettings(false)}
        />
      )}

      {/* Search Mode Selector */}
      <div className="border-b border-border bg-card px-6 py-3 flex gap-2 overflow-x-auto">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => setSearchMode(mode.id)}
            className={`px-3 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-colors flex items-center gap-2 ${
              searchMode === mode.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            <span>{mode.icon}</span>
            {mode.label}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="flex-1">
              <div className="bg-card rounded-lg p-4">
                <p className="text-muted-foreground text-sm">Searching...</p>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-6">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <button
            type="button"
            className="flex-shrink-0 p-3 rounded-lg bg-muted hover:bg-muted/80 text-foreground transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-5 h-5" />
          </button>
          <MessageInput
            value={inputValue}
            onChange={setInputValue}
            placeholder="Ask about candidates, documents, or search requirements..."
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="flex-shrink-0 px-4 py-3 rounded-lg bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground font-medium transition-colors flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>
    </div>
  )
}
