'use client'

import { useState } from 'react'
import { Trash2, Eye, Download, Edit2, Users } from 'lucide-react'
import EditCandidateModal from './EditCandidateModal'

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

interface EnhancedCandidateListProps {
  candidates: Candidate[]
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Candidate>) => void
}

export default function EnhancedCandidateList({
  candidates,
  onDelete,
  onUpdate,
}: EnhancedCandidateListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const editingCandidate = candidates.find(c => c.id === editingId)

  const getStatusBadge = (status: string) => {
    const badges = {
      applied: 'bg-blue-500/20 text-blue-400 border border-blue-500/50',
      shortlisted: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50',
      interviewed: 'bg-purple-500/20 text-purple-400 border border-purple-500/50',
      rejected: 'bg-red-500/20 text-red-400 border border-red-500/50',
    }
    return badges[status as keyof typeof badges] || badges.applied
  }

  return (
    <div className="space-y-4">
      {candidates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Users size={48} className="mx-auto mb-3 opacity-50" />
          <p>No candidates added yet</p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col max-h-96 overflow-y-auto">
          <div className="sticky top-0 bg-secondary/50 border-b border-border">
            <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-muted-foreground">
              <div className="col-span-3">Name</div>
              <div className="col-span-2">Position</div>
              <div className="col-span-2">Skills</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Actions</div>
            </div>
          </div>

          <div className="divide-y divide-border">
            {candidates.map(candidate => (
              <div
                key={candidate.id}
                onMouseEnter={() => setHoveredId(candidate.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-secondary/30 transition-colors"
              >
                <div className="col-span-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.email}</p>
                  </div>
                </div>

                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">{candidate.position}</p>
                  <p className="text-xs text-muted-foreground">{candidate.experience}y exp</p>
                </div>

                <div className="col-span-2">
                  <div className="flex gap-1 flex-wrap">
                    {candidate.skills.slice(0, 2).map((skill, idx) => (
                      <span key={idx} className="text-xs px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 2 && (
                      <span className="text-xs px-2 py-0.5 bg-muted text-muted-foreground rounded">
                        +{candidate.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-span-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(candidate.status)}`}>
                    {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                  </span>
                </div>

                <div className="col-span-3 flex gap-1 justify-end">
                  {hoveredId === candidate.id && (
                    <div className="flex gap-1">
                      <button
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                        title="View profile"
                      >
                        <Eye size={16} className="text-blue-400" />
                      </button>
                      <button
                        onClick={() => setEditingId(candidate.id)}
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} className="text-cyan-400" />
                      </button>
                      <button
                        className="p-1.5 hover:bg-secondary rounded transition-colors"
                        title="Download resume"
                      >
                        <Download size={16} className="text-green-400" />
                      </button>
                      <button
                        onClick={() => onDelete(candidate.id)}
                        className="p-1.5 hover:bg-red-500/20 rounded transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} className="text-red-400" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editingCandidate && (
        <EditCandidateModal
          isOpen={!!editingId}
          candidate={editingCandidate}
          onClose={() => setEditingId(null)}
          onSave={(updates) => {
            onUpdate(editingCandidate.id, updates)
            setEditingId(null)
          }}
        />
      )}
    </div>
  )
}
