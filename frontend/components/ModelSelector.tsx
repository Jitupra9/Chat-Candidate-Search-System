'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface Model {
  id: string
  name: string
  label: string
  description: string
}

interface ModelSelectorProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
}

const models: Model[] = [
  {
    id: 'claude-opus',
    name: 'Claude Opus',
    label: 'Most capable',
    description: 'Best for complex analysis',
  },
  {
    id: 'claude-sonnet',
    name: 'Claude Sonnet',
    label: 'Balanced',
    description: 'Fast and intelligent',
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    label: 'Advanced',
    description: 'Powerful reasoning',
  },
  {
    id: 'gpt-4-mini',
    name: 'GPT-4 Mini',
    label: 'Fast',
    description: 'Quick responses',
  },
  {
    id: 'gemini-pro',
    name: 'Gemini Pro',
    label: 'Versatile',
    description: 'Good all-rounder',
  },
]

export default function ModelSelector({
  selectedModel,
  onModelChange,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = models.find(m => m.id === selectedModel) || models[0]

  return (
    <div className="relative z-40">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors text-sm font-medium text-foreground"
      >
        {selected.label}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="fixed bottom-auto top-20 left-auto right-24 w-64 bg-card border border-border rounded-lg shadow-2xl overflow-hidden z-[100]">
          <div className="max-h-80 overflow-y-auto">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => {
                  onModelChange(model.id)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-3 border-b border-border/50 last:border-b-0 hover:bg-muted/50 transition-colors ${
                  selectedModel === model.id ? 'bg-primary/10' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-sm text-foreground">{model.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {model.description}
                    </p>
                  </div>
                  {selectedModel === model.id && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-1 flex-shrink-0" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
