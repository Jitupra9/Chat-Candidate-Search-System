'use client'

import { Upload } from 'lucide-react'

interface HeaderProps {
  onUploadClick: () => void
}

export default function Header({ onUploadClick }: HeaderProps) {
  return (
    <div className="h-16 flex items-center justify-end px-6">
      <button
        onClick={onUploadClick}
        className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium text-sm hover:bg-accent/90 transition-colors flex items-center gap-2"
      >
        <Upload className="w-4 h-4" />
        Upload Resume
      </button>
    </div>
  )
}
