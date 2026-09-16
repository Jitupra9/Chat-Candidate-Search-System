'use client'

import { useState } from 'react'
import { X, Upload, CheckCircle, AlertCircle } from 'lucide-react'

interface UploadingFile {
  id: string
  name: string
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
}

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload?: (files: File[]) => void
}

export default function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([])
  const [showSuccess, setShowSuccess] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(e.type === 'dragenter' || e.type === 'dragover')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    processFiles(e.dataTransfer.files)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      processFiles(e.target.files)
    }
  }

  const processFiles = (files: FileList) => {
    const validFiles = Array.from(files).filter(file =>
      file.type === 'application/pdf' || file.name.endsWith('.txt')
    )

    const newFiles: UploadingFile[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      progress: 0,
      status: 'pending' as const,
    }))

    setUploadingFiles([...uploadingFiles, ...newFiles])

    // Simulate upload progress
    newFiles.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 40
        if (progress >= 100) {
          progress = 100
          setUploadingFiles(prev =>
            prev.map(f =>
              f.id === file.id ? { ...f, progress: 100, status: 'success' } : f
            )
          )
          clearInterval(interval)
        } else {
          setUploadingFiles(prev =>
            prev.map(f =>
              f.id === file.id ? { ...f, progress, status: 'uploading' } : f
            )
          )
        }
      }, 500)
    })
  }

  const handleRemoveFile = (id: string) => {
    setUploadingFiles(uploadingFiles.filter(f => f.id !== id))
  }

  const handleClearAll = () => {
    setUploadingFiles([])
    setShowSuccess(false)
    onClose()
  }

  const handleContinue = () => {
    setShowSuccess(true)
    setTimeout(() => {
      handleClearAll()
    }, 2000)
  }

  const allFilesSuccess = uploadingFiles.length > 0 && uploadingFiles.every(f => f.status === 'success')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Upload Resume</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {showSuccess ? (
            <div className="text-center py-12 space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Successfully Uploaded!</h3>
              <p className="text-sm text-muted-foreground">
                {uploadingFiles.length} resume{uploadingFiles.length !== 1 ? 's' : ''} uploaded successfully. You can now search and analyze candidates.
              </p>
            </div>
          ) : uploadingFiles.length === 0 ? (
            <>
              {/* Upload Zone */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  dragActive
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">
                  Drop resume here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  Supports PDF and TXT files (Max 10MB)
                </p>
                <label>
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
            </>
          ) : (
            <>
              {/* Uploading Files */}
              <div className="space-y-3">
                {uploadingFiles.map((file) => (
                  <div key={file.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      {file.status === 'success' && (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      )}
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          file.status === 'success'
                            ? 'bg-green-500'
                            : file.status === 'error'
                            ? 'bg-red-500'
                            : 'bg-primary'
                        }`}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        {file.progress}%
                      </p>
                      {file.status === 'success' && (
                        <p className="text-xs text-green-500 font-medium">Uploaded</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Button */}
              {uploadingFiles.every(f => f.status === 'success') && (
                <button
                  onClick={() => setUploadingFiles([])}
                  className="w-full px-3 py-2 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-muted/80 transition-colors"
                >
                  Upload More
                </button>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!showSuccess && (
          <div className="p-6 border-t border-border flex gap-3">
            <button
              onClick={handleClearAll}
              className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm hover:bg-muted/80 transition-colors"
            >
              {uploadingFiles.length === 0 ? 'Close' : 'Done'}
            </button>
            {allFilesSuccess && (
              <button
                onClick={handleContinue}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
