'use client'

import { X } from 'lucide-react'

interface ActionModalProps {
  isOpen: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
  actions?: {
    label: string
    onClick: () => void
    variant?: 'primary' | 'destructive' | 'secondary'
  }[]
  size?: 'sm' | 'md' | 'lg'
}

export default function ActionModal({
  isOpen,
  title,
  children,
  onClose,
  actions,
  size = 'md',
}: ActionModalProps) {
  if (!isOpen) return null

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  }

  const getButtonStyles = (variant?: string) => {
    switch (variant) {
      case 'destructive':
        return 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
      case 'secondary':
        return 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      default:
        return 'bg-primary text-primary-foreground hover:bg-primary/90'
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className={`bg-card border border-border rounded-xl shadow-2xl w-full ${sizeClasses[size]}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-secondary rounded transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer Actions */}
        {actions && actions.length > 0 && (
          <div className="flex gap-3 p-6 border-t border-border">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-secondary transition-colors"
            >
              Cancel
            </button>
            {actions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.onClick}
                className={`flex-1 px-4 py-2 rounded-lg ${getButtonStyles(action.variant)} transition-colors`}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
