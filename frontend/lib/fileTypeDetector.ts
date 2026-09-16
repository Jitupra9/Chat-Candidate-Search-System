export type FileType = 'pdf' | 'excel' | 'csv' | 'word' | 'json' | 'text' | 'unknown'

interface FileMetadata {
  type: FileType
  size: string
  sizeBytes: number
  icon: string
  color: string
}

const SUPPORTED_TYPES = {
  pdf: ['application/pdf'],
  excel: [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/x-excel',
    'application/x-msexcel',
    'text/csv',
  ],
  csv: ['text/csv', 'application/csv', 'text/x-csv'],
  word: [
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
  ],
  json: ['application/json', 'text/json'],
  text: ['text/plain', 'text/txt'],
}

export function detectFileType(file: File): FileType {
  const mimeType = file.type.toLowerCase()
  const fileName = file.name.toLowerCase()

  // Check by MIME type first
  for (const [type, mimes] of Object.entries(SUPPORTED_TYPES)) {
    if (mimes.includes(mimeType)) {
      return type as FileType
    }
  }

  // Check by extension
  const ext = fileName.split('.').pop()?.toLowerCase()
  switch (ext) {
    case 'pdf':
      return 'pdf'
    case 'xls':
    case 'xlsx':
      return 'excel'
    case 'csv':
      return 'csv'
    case 'doc':
    case 'docx':
      return 'word'
    case 'json':
      return 'json'
    case 'txt':
      return 'text'
    default:
      return 'unknown'
  }
}

export function getFileMetadata(file: File): FileMetadata {
  const type = detectFileType(file)
  const sizeBytes = file.size
  const sizeKB = sizeBytes / 1024
  const sizeMB = sizeKB / 1024

  const size = sizeMB > 1 ? `${sizeMB.toFixed(2)} MB` : `${sizeKB.toFixed(1)} KB`

  const metadata: Record<FileType, { icon: string; color: string }> = {
    pdf: { icon: '📄', color: 'text-red-400' },
    excel: { icon: '📊', color: 'text-green-400' },
    csv: { icon: '📋', color: 'text-emerald-400' },
    word: { icon: '📝', color: 'text-blue-400' },
    json: { icon: '{}', color: 'text-yellow-400' },
    text: { icon: '📃', color: 'text-gray-400' },
    unknown: { icon: '📦', color: 'text-gray-400' },
  }

  return {
    type,
    size,
    sizeBytes,
    ...metadata[type],
  }
}

export function isValidFileType(file: File): boolean {
  return detectFileType(file) !== 'unknown'
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
