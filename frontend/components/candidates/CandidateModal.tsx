"use client";

import React from "react";
import {
  X,
  FileText,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  Download,
  Calendar,
  Trash2,
  Send,
  ExternalLink,
} from "lucide-react";
import { Candidate, CandidateStatus } from "@/lib/types";

interface CandidateModalProps {
  candidate: Candidate | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (candidateId: string, status: CandidateStatus) => void;
  onDraftEmail: (candidate: Candidate) => void;
  onPurgeCandidate: (candidateId: string) => void;
}

export default function CandidateModal({
  candidate,
  isOpen,
  onClose,
  onStatusChange,
  onDraftEmail,
  onPurgeCandidate,
}: CandidateModalProps) {
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-6 bg-slate-950/60">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-xl font-bold text-white shadow-lg shadow-indigo-500/20">
              {candidate.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">
                  {candidate.name}
                </h2>
                <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                  {candidate.matchScore}% Match
                </span>
              </div>
              <p className="text-sm text-slate-300">
                {candidate.title} • {candidate.currentCompany}
              </p>
              <p className="text-xs text-slate-400">
                Applied on {candidate.appliedDate} for {candidate.appliedRole}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Contact & Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-800/60 border border-white/5 p-3 text-xs text-slate-300">
              <Mail className="h-4 w-4 text-indigo-400 shrink-0" />
              <span className="truncate">{candidate.email}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-800/60 border border-white/5 p-3 text-xs text-slate-300">
              <Phone className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>{candidate.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-slate-800/60 border border-white/5 p-3 text-xs text-slate-300">
              <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
              <span className="truncate">{candidate.location}</span>
            </div>
          </div>

          {/* AI Executive Summary */}
          <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/20 p-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300 mb-1.5 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>AI Candidate Profile Summary</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-200">
              {candidate.summary}
            </p>
          </div>

          {/* Grounded Evidence Citations (Hallucination Defense) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Grounded Resume Evidence & Citations</span>
            </div>
            <div className="space-y-2">
              {candidate.citations.map((citation, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-white/5 bg-slate-950/60 p-3 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-300">
                      {citation.field}:{" "}
                      <span className="text-indigo-400">
                        {citation.claimedValue}
                      </span>
                    </span>
                    <span className="text-emerald-400 font-medium">
                      Confidence: {Math.round(citation.confidence * 100)}%
                    </span>
                  </div>
                  <p className="text-slate-400 italic bg-slate-900/80 p-2 rounded-lg border border-white/5 font-mono text-[11px]">
                    "{citation.sourceSnippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills & Education */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <Briefcase className="h-4 w-4 text-indigo-400" />
                <span>Extracted Technical Skills</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {candidate.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 text-xs font-medium text-indigo-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-white/5 bg-slate-800/40 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <GraduationCap className="h-4 w-4 text-purple-400" />
                <span>Education Background</span>
              </div>
              <p className="text-xs text-slate-200 font-medium">
                {candidate.education}
              </p>
              <p className="text-[11px] text-slate-400">
                Total Verified Experience: {candidate.experienceYears} Years
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5 bg-slate-950/80">
          <button
            onClick={() => onPurgeCandidate(candidate.id)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-400 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Purge PII (GDPR/CCPA)</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onDraftEmail(candidate)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 transition-all"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Draft Interview Email</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
