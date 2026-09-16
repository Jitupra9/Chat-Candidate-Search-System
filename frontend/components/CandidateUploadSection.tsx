'use client'

import { useState } from 'react'
import { Upload, User } from 'lucide-react'

interface CandidateUploadSectionProps {
  onUpload: (candidates: any[]) => void
}

export default function CandidateUploadSection({ onUpload }: CandidateUploadSectionProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    const resumes = files
      .filter((file) => file.type === 'application/pdf' || file.type === 'text/plain')
      .map((file) => ({
        id: `cand_${Date.now()}_${Math.random()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        email: 'candidate@example.com',
        phone: '9999999999',
        location: 'Unknown',
        experience: 0,
        skills: [],
        role: 'Not Specified',
        resumeFile: file.name,
        status: 'processing',
        uploadedAt: new Date().toISOString(),
      }))

    if (resumes.length > 0) {
      onUpload(resumes)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const resumes = files
      .filter((file) => file.type === 'application/pdf' || file.type === 'text/plain')
      .map((file) => ({
        id: `cand_${Date.now()}_${Math.random()}`,
        name: file.name.replace(/\.[^/.]+$/, ''),
        email: 'candidate@example.com',
        phone: '9999999999',
        location: 'Unknown',
        experience: 0,
        skills: [],
        role: 'Not Specified',
        resumeFile: file.name,
        status: 'processing',
        uploadedAt: new Date().toISOString(),
      }))

    if (resumes.length > 0) {
      onUpload(resumes)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors flex-1 flex flex-col items-center justify-center ${
            dragActive ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
          }`}
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">Upload Resumes</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop resume files or click to browse
          </p>
          <label className="relative">
            <input
              type="file"
              multiple
              accept=".pdf,.txt"
              onChange={handleFileInput}
              className="hidden"
            />
            <span className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm cursor-pointer hover:bg-primary/90 transition-colors inline-block">
              Choose Files
            </span>
          </label>
        </div>
    </div>
  )
}
