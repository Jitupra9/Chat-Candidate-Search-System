'use client'

import { Copy, Check, ThumbsUp, ThumbsDown, RotateCcw } from 'lucide-react'
import { useState, useEffect } from 'react'

interface ChatMessageProps {
  message: {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: Date
  }
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const [formattedTime, setFormattedTime] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null)
  const [showActions, setShowActions] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const time = message.timestamp.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
    setFormattedTime(time)
  }, [message.timestamp])

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleFeedback = (type: 'positive' | 'negative') => {
    setFeedback(feedback === type ? null : type)
  }

  const handleReload = () => {
    // This would typically trigger a message regeneration
    console.log('[v0] Reloading message:', message.id)
  }

  if (message.role === 'user') {
    return (
      <div className="flex justify-end mb-4">
        <div className="bg-primary text-primary-foreground rounded-xl px-4 py-3 max-w-2xl">
          <p className="text-sm leading-relaxed">{message.content}</p>
          <p className="text-xs opacity-70 mt-2 text-right">
            {isMounted ? formattedTime : '--:--'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start mb-4 gap-3 group">
      <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 text-accent-foreground font-bold text-xs">
        AI
      </div>
      <div className="flex-1 max-w-2xl">
        <div
          className="bg-card rounded-xl px-4 py-3 border border-border"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {isMounted ? formattedTime : '--:--'}
            </p>
            <div className="flex items-center gap-1">
              {showActions && (
                <>
                  <button
                    onClick={() => handleFeedback('positive')}
                    className={`p-1 rounded transition-colors ${
                      feedback === 'positive'
                        ? 'bg-green-500/20 text-green-500'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                    title="Good response"
                  >
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleFeedback('negative')}
                    className={`p-1 rounded transition-colors ${
                      feedback === 'negative'
                        ? 'bg-red-500/20 text-red-500'
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                    title="Bad response"
                  >
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleReload}
                    className="p-1 text-muted-foreground hover:bg-muted rounded transition-colors"
                    title="Regenerate response"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </>
              )}
              <button
                onClick={handleCopy}
                className="p-1 hover:bg-muted rounded transition-colors"
                title="Copy message"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-accent" />
                ) : (
                  <Copy className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
