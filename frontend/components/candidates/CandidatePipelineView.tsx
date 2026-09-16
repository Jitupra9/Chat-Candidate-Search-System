"use client";

import React, { useState, useMemo } from "react";
import {
  Users,
  Search,
  Filter,
  Sparkles,
  SlidersHorizontal,
  Download,
  Mail,
  CheckCircle2,
  Trash2,
  Layers,
  ArrowUpDown,
  RefreshCw,
} from "lucide-react";
import { Candidate, CandidateStatus } from "@/lib/types";
import CandidateCard from "./CandidateCard";
import CandidateModal from "./CandidateModal";

interface CandidatePipelineViewProps {
  candidates: Candidate[];
  onStatusChange: (candidateId: string, newStatus: CandidateStatus) => void;
  onPurgePII: (candidateId: string) => void;
  onTriggerBulkEmail: (candidateIds: string[]) => void;
  onDraftEmailSingle: (candidate: Candidate) => void;
  onSyncAgentFilter?: (criteria: {
    minExp: number;
    requiredSkills: string[];
  }) => void;
}

export default function CandidatePipelineView({
  candidates,
  onStatusChange,
  onPurgePII,
  onTriggerBulkEmail,
  onDraftEmailSingle,
}: CandidatePipelineViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusTab, setSelectedStatusTab] = useState<
    "all" | CandidateStatus
  >("all");
  const [minExpFilter, setMinExpFilter] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [selectedCandidateIds, setSelectedCandidateIds] = useState<string[]>(
    [],
  );

  // Extract unique skills from all candidates
  const allAvailableSkills = useMemo(() => {
    const set = new Set<string>();
    candidates.forEach((c) => c.skills.forEach((s) => set.add(s)));
    return Array.from(set).sort();
  }, [candidates]);

  // Filtered Candidates
  const filteredCandidates = useMemo(() => {
    return candidates.filter((cand) => {
      // Status filter
      if (selectedStatusTab !== "all" && cand.status !== selectedStatusTab) {
        return false;
      }
      // Experience filter
      if (cand.experienceYears < minExpFilter) {
        return false;
      }
      // Skills filter
      if (selectedSkills.length > 0) {
        const hasAll = selectedSkills.every((s) => cand.skills.includes(s));
        if (!hasAll) return false;
      }
      // Text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = cand.name.toLowerCase().includes(q);
        const matchTitle = cand.title.toLowerCase().includes(q);
        const matchSkill = cand.skills.some((s) => s.toLowerCase().includes(q));
        if (!matchName && !matchTitle && !matchSkill) return false;
      }
      return true;
    });
  }, [
    candidates,
    selectedStatusTab,
    minExpFilter,
    selectedSkills,
    searchQuery,
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  const toggleSelectCandidate = (id: string) => {
    setSelectedCandidateIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const selectAll = () => {
    if (selectedCandidateIds.length === filteredCandidates.length) {
      setSelectedCandidateIds([]);
    } else {
      setSelectedCandidateIds(filteredCandidates.map((c) => c.id));
    }
  };

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: candidates.length };
    candidates.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    return counts;
  }, [candidates]);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* Top Banner & Stats Overview */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Candidate Talent Pipeline</span>
            <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-0.5 text-xs text-indigo-400 font-semibold">
              {filteredCandidates.length} of {candidates.length} Loaded
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Intelligent Candidate Search & Multi-Attribute Skill Matching
            Pipeline
          </p>
        </div>

        {selectedCandidateIds.length > 0 && (
          <div className="flex items-center gap-2 bg-indigo-950/60 border border-indigo-500/30 rounded-xl px-3 py-1.5 shadow-lg">
            <span className="text-xs font-semibold text-indigo-300">
              {selectedCandidateIds.length} Selected
            </span>
            <button
              onClick={() => onTriggerBulkEmail(selectedCandidateIds)}
              className="inline-flex items-center gap-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1 text-xs font-medium text-white shadow transition-all"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Draft Batch Email (HITL)</span>
            </button>
          </div>
        )}
      </div>

      {/* Dynamic Filter Controls & Search */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-xl p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, role, or specific tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Min Experience Slider */}
          <div className="flex items-center gap-3 w-full sm:w-auto bg-slate-950/60 border border-white/10 px-3 py-2 rounded-xl text-xs text-slate-300">
            <span className="whitespace-nowrap text-slate-400 font-medium">
              Min Exp:
            </span>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={minExpFilter}
              onChange={(e) => setMinExpFilter(Number(e.target.value))}
              className="w-24 accent-indigo-500 cursor-pointer"
            />
            <span className="font-bold text-indigo-400 min-w-8">
              {minExpFilter}+ yrs
            </span>
            {minExpFilter > 0 && (
              <button
                onClick={() => setMinExpFilter(0)}
                className="text-[10px] text-slate-500 hover:text-slate-300"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Skill Tag Filters */}
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
            <span className="flex items-center gap-1">
              <Filter className="h-3 w-3 text-indigo-400" />
              <span>Filter by Skills:</span>
            </span>
            {selectedSkills.length > 0 && (
              <button
                onClick={() => setSelectedSkills([])}
                className="text-[10px] text-indigo-400 hover:underline"
              >
                Clear all skill filters ({selectedSkills.length})
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {allAvailableSkills.map((skill) => {
              const active = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    active
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400"
                      : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200 border border-white/5"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex overflow-x-auto gap-1.5 pt-2 border-t border-white/5 scrollbar-none">
          {[
            { id: "all", label: "All Candidates" },
            { id: "applied", label: "Applied" },
            { id: "screening", label: "Screening" },
            { id: "shortlisted", label: "Shortlisted" },
            { id: "interview_scheduled", label: "Interview Scheduled" },
            { id: "offered", label: "Offered" },
            { id: "rejected", label: "Rejected" },
          ].map((tab) => {
            const active = selectedStatusTab === tab.id;
            const count = statusCounts[tab.id] || 0;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedStatusTab(tab.id as any)}
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  active
                    ? "bg-indigo-600 text-white shadow-sm font-semibold"
                    : "bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] ${active ? "bg-indigo-900 text-white" : "bg-slate-900 text-slate-400"}`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Candidates Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/30 p-12 text-center">
          <Users className="mx-auto h-12 w-12 text-slate-600 mb-3" />
          <h3 className="text-sm font-semibold text-white">
            No candidates match your current filter
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting the experience slider, clearing skill filters, or
            asking the AI agent to broaden the search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCandidates.map((cand) => (
            <CandidateCard
              key={cand.id}
              candidate={cand}
              onSelect={(c) => setSelectedCandidate(c)}
              onStatusChange={onStatusChange}
              onPurgePII={onPurgePII}
              onDraftEmail={onDraftEmailSingle}
            />
          ))}
        </div>
      )}

      {/* Candidate Full Profile Inspection Modal */}
      <CandidateModal
        candidate={selectedCandidate}
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onStatusChange={onStatusChange}
        onDraftEmail={(c) => {
          setSelectedCandidate(null);
          onDraftEmailSingle(c);
        }}
        onPurgeCandidate={(id) => {
          onPurgePII(id);
          setSelectedCandidate(null);
        }}
      />
    </div>
  );
}
