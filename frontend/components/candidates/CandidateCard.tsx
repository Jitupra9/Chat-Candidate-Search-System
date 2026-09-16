"use client";

import React from "react";
import {
  Sparkles,
  MapPin,
  Briefcase,
  GraduationCap,
  FileText,
  Mail,
  Calendar,
  ShieldCheck,
  Trash2,
  CheckCircle2,
  Eye,
  ChevronRight,
} from "lucide-react";
import { Candidate, CandidateStatus } from "@/lib/types";

interface CandidateCardProps {
  candidate: Candidate;
  onSelect: (candidate: Candidate) => void;
  onStatusChange?: (candidateId: string, newStatus: CandidateStatus) => void;
  onPurgePII?: (candidateId: string) => void;
  onDraftEmail?: (candidate: Candidate) => void;
}

export default function CandidateCard({
  candidate,
  onSelect,
  onStatusChange,
  onPurgePII,
  onDraftEmail,
}: CandidateCardProps) {
  const getStatusBadge = (status: CandidateStatus) => {
    switch (status) {
      case "shortlisted":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "interview_scheduled":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "screening":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "offered":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "rejected":
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default:
        return "bg-slate-800 text-slate-400 border-white/10";
    }
  };

  const getMatchScoreColor = (score: number) => {
    if (score >= 90)
      return "text-emerald-400 from-emerald-500/20 to-teal-500/10 border-emerald-500/30";
    if (score >= 80)
      return "text-indigo-400 from-indigo-500/20 to-blue-500/10 border-indigo-500/30";
    if (score >= 70)
      return "text-amber-400 from-amber-500/20 to-yellow-500/10 border-amber-500/30";
    return "text-rose-400 from-rose-500/20 to-red-500/10 border-rose-500/30";
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-4 sm:p-5 shadow-lg shadow-black/20 hover:border-indigo-500/40 hover:shadow-indigo-950/20 transition-all flex flex-col justify-between">
      <div>
        {/* Top Bar: Name, Match Score & Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 font-bold text-white shadow-md shadow-indigo-600/30 text-sm">
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors text-sm sm:text-base">
                  {candidate.name}
                </h3>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {candidate.title}
              </p>
              <p className="text-[11px] text-slate-400">
                {candidate.currentCompany}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            {/* Match Score Badge */}
            <div
              className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold bg-gradient-to-r ${getMatchScoreColor(candidate.matchScore)}`}
            >
              <Sparkles className="h-3 w-3" />
              <span>{candidate.matchScore}% Match</span>
            </div>

            {/* Status Pill */}
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${getStatusBadge(candidate.status)}`}
            >
              {candidate.status.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span className="font-medium">
              {candidate.experienceYears} Years Exp
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">{candidate.location}</span>
          </div>
        </div>

        {/* Grounded Citation Snippet */}
        {candidate.citations && candidate.citations.length > 0 && (
          <div className="mt-3 rounded-lg bg-indigo-950/20 border border-indigo-500/10 p-2 text-[11px] text-indigo-200/90">
            <div className="flex items-center gap-1 font-semibold text-indigo-300 mb-0.5 text-[10px] uppercase tracking-wider">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              <span>
                Grounded Evidence (
                {Math.round(candidate.citations[0].confidence * 100)}%
                confidence)
              </span>
            </div>
            <p className="text-slate-300 line-clamp-2 italic">
              "{candidate.citations[0].sourceSnippet}"
            </p>
          </div>
        )}

        {/* Skill Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {candidate.skills.slice(0, 5).map((skill, idx) => (
            <span
              key={idx}
              className="rounded-md bg-slate-800/90 border border-white/5 px-2 py-0.5 text-[11px] font-medium text-slate-300"
            >
              {skill}
            </span>
          ))}
          {candidate.skills.length > 5 && (
            <span className="rounded-md bg-slate-800/50 px-1.5 py-0.5 text-[10px] text-slate-400">
              +{candidate.skills.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Action Bar Footer */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/10 pt-3">
        <button
          onClick={() => onSelect(candidate)}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <Eye className="h-3.5 w-3.5" />
          <span>View Profile & CV</span>
        </button>

        <div className="flex items-center gap-1.5">
          {onDraftEmail && (
            <button
              onClick={() => onDraftEmail(candidate)}
              title="Draft Email with AI"
              className="rounded-lg bg-slate-800 hover:bg-slate-700 p-1.5 text-slate-300 hover:text-white transition-colors border border-white/5"
            >
              <Mail className="h-3.5 w-3.5" />
            </button>
          )}

          {onStatusChange && (
            <select
              value={candidate.status}
              onChange={(e) =>
                onStatusChange(candidate.id, e.target.value as CandidateStatus)
              }
              className="rounded-lg bg-slate-800 border border-white/10 px-2 py-1 text-[11px] font-medium text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            >
              <option value="applied">Applied</option>
              <option value="screening">Screening</option>
              <option value="shortlisted">Shortlist</option>
              <option value="interview_scheduled">Interview</option>
              <option value="offered">Offer</option>
              <option value="rejected">Reject</option>
            </select>
          )}

          {onPurgePII && (
            <button
              onClick={() => onPurgePII(candidate.id)}
              title="GDPR Right to Erasure (Purge SQL + Vector)"
              className="rounded-lg bg-rose-500/10 hover:bg-rose-500/20 p-1.5 text-rose-400 transition-colors border border-rose-500/20"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
