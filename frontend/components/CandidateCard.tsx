'use client'

import { Sparkles } from 'lucide-react'

interface CandidateCardProps {
  name: string
  role: string
  skills: string[]
  experience: number
  location: string
}

export default function CandidateCard({
  name,
  role,
  skills,
  experience,
  location,
}: CandidateCardProps) {
  return (
    <div className="bg-muted rounded-lg p-3 hover:bg-muted/80 transition-colors cursor-pointer">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <h4 className="font-semibold text-foreground text-sm">{name}</h4>
          <p className="text-xs text-muted-foreground">{role}</p>
        </div>
        <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex gap-2 flex-wrap">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-block px-2 py-1 bg-card text-foreground text-xs rounded border border-border"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="flex gap-3 text-xs text-muted-foreground pt-2 border-t border-border">
          <span>{experience}y exp</span>
          <span>•</span>
          <span>{location}</span>
        </div>
      </div>
    </div>
  )
}
