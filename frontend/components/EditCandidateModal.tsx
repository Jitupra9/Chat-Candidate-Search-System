'use client'

import { useState } from 'react'
import ActionModal from './ActionModal'

interface Candidate {
  id: string
  name: string
  email: string
  phone?: string
  position: string
  experience: number
  skills: string[]
  status: 'applied' | 'shortlisted' | 'interviewed' | 'rejected'
  resumeUrl?: string
  uploadDate: Date
}

interface EditCandidateModalProps {
  isOpen: boolean
  candidate: Candidate
  onClose: () => void
  onSave: (updates: Partial<Candidate>) => void
}

export default function EditCandidateModal({
  isOpen,
  candidate,
  onClose,
  onSave,
}: EditCandidateModalProps) {
  const [formData, setFormData] = useState({
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone || '',
    position: candidate.position,
    experience: candidate.experience,
    skills: candidate.skills.join(', '),
    status: candidate.status,
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    onSave({
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim()),
      experience: parseInt(formData.experience.toString()),
    })
  }

  return (
    <ActionModal
      isOpen={isOpen}
      title="Edit Candidate"
      onClose={onClose}
      size="lg"
      actions={[
        {
          label: 'Save Changes',
          onClick: handleSave,
          variant: 'primary',
        },
      ]}
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Phone
          </label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Position Applied
          </label>
          <input
            type="text"
            value={formData.position}
            onChange={(e) => handleChange('position', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => handleChange('experience', parseInt(e.target.value))}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleChange('status', e.target.value)}
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          >
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewed">Interviewed</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-foreground mb-2">
            Skills (comma separated)
          </label>
          <input
            type="text"
            value={formData.skills}
            onChange={(e) => handleChange('skills', e.target.value)}
            placeholder="Python, React, Node.js"
            className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
          />
        </div>
      </div>
    </ActionModal>
  )
}
