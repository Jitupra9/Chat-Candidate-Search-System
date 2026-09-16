'use client'

import { Trash2, CheckCircle, AlertCircle, Loader } from 'lucide-react'

interface UploadProgressItemProps {
  fileName: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
  speed?: string
  timeRemaining?: string
  error?: string
  onCancel: () => void
}

export default function UploadProgressItem({
  fileName,
  progress,
  status,
  speed,
  timeRemaining,
  error,
  onCancel,
}: UploadProgressItemProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'bg-green-500/20 border-green-500/50'
      case 'error':
        return 'bg-red-500/20 border-red-500/50'
      case 'uploading':
        return 'bg-blue-500/20 border-blue-500/50'
      default:
        return 'bg-yellow-500/20 border-yellow-500/50'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle size={18} className="text-green-400" />
      case 'error':
        return <AlertCircle size={18} className="text-red-400" />
      case 'uploading':
        return <Loader size={18} className="text-blue-400 animate-spin" />
      default:
        return <Loader size={18} className="text-yellow-400" />
    }
  }

  return (
    <div className={`border rounded-lg p-4 ${getStatusColor()} backdrop-blur-sm`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-start gap-3 flex-1">
          {getStatusIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{fileName}</p>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
          </div>
        </div>
        {(status === 'uploading' || status === 'pending') && (
          <button
            onClick={onCancel}
            className="p-1 hover:bg-black/20 rounded transition-colors flex-shrink-0"
            title="Cancel upload"
          >
            <Trash2 size={16} className="text-destructive" />
          </button>
        )}
      </div>

      {status !== 'error' && status !== 'success' && (
        <>
          <div className="w-full bg-black/30 rounded-full h-1.5 mb-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{progress}%</span>
            <div className="flex gap-3">
              {speed && <span>{speed}</span>}
              {timeRemaining && <span>{timeRemaining}</span>}
            </div>
          </div>
        </>
      )}

      {status === 'success' && (
        <p className="text-xs text-green-400">Upload complete</p>
      )}
    </div>
  )
}
