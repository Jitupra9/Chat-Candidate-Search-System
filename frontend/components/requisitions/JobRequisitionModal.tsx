"use client";

import React, { useState } from "react";
import {
  X,
  Briefcase,
  Sparkles,
  DollarSign,
  MapPin,
  Clock,
  Layers,
  CheckCircle2,
  Send,
  Plus,
} from "lucide-react";

interface JobRequisitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequisition: (requisitionContext: string) => void;
}

export default function JobRequisitionModal({
  isOpen,
  onClose,
  onSubmitRequisition,
}: JobRequisitionModalProps) {
  const [roleTitle, setRoleTitle] = useState(
    "Senior AI & Machine Learning Engineer",
  );
  const [department, setDepartment] = useState("AI & Core Platform");
  const [minExperience, setMinExperience] = useState("5+ Years");
  const [salaryRange, setSalaryRange] = useState("$140,000 - $165,000 USD");
  const [workMode, setWorkMode] = useState<"Remote" | "Hybrid" | "On-site">(
    "Remote",
  );
  const [location, setLocation] = useState("Remote (US/EU Timezones)");
  const [skillsInput, setSkillsInput] = useState(
    "Python, FastAPI, PyTorch, ChromaDB, LangGraph, Docker",
  );
  const [responsibilities, setResponsibilities] = useState(
    "Build production LLM agent workflows, scale vector similarity search, design resilient API microservices, and integrate human-in-the-loop safety gates.",
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const structuredContext = `Please create a comprehensive recruitment & sourcing plan for this new job requisition:
- **Role Title**: ${roleTitle}
- **Department**: ${department}
- **Experience Level**: ${minExperience}
- **Compensation**: ${salaryRange}
- **Work Mode & Location**: ${workMode} (${location})
- **Required Tech Stack**: ${skillsInput}
- **Key Objectives & Responsibilities**: ${responsibilities}

Please:
1. Draft a formatted LinkedIn Requisition Post ready for my HITL approval.
2. Set up our Candidate Pipeline filter matching these skills and experience requirements.`;

    onSubmitRequisition(structuredContext);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden my-6">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5 bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30">
              <Briefcase className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Job Requisition & Sourcing Wizard
              </h2>
              <p className="text-xs text-slate-400">
                Provide role specifications. The AI Agent will draft social
                posts and configure candidate matching.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form Content */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-4 max-h-[75vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Role Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Target Role Title
              </label>
              <input
                type="text"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. Senior Backend Engineer"
              />
            </div>

            {/* Department */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Department / Team
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. Core Engineering"
              />
            </div>

            {/* Experience Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Minimum Experience
              </label>
              <input
                type="text"
                value={minExperience}
                onChange={(e) => setMinExperience(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. 5+ Years"
              />
            </div>

            {/* Salary Range */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Compensation / Salary Range
              </label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. $140,000 - $165,000 USD"
              />
            </div>
          </div>

          {/* Work Mode & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Work Arrangement
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["Remote", "Hybrid", "On-site"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setWorkMode(mode)}
                    className={`py-1.5 text-xs font-medium rounded-xl border transition-all ${
                      workMode === mode
                        ? "bg-indigo-600 text-white border-indigo-400 font-semibold shadow-md shadow-indigo-600/30"
                        : "bg-slate-950 text-slate-400 border-white/5 hover:text-white"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Location / Timezones
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g. Remote (US / EU)"
              />
            </div>
          </div>

          {/* Required Skills */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Required Technical Skills & Technologies (Comma-separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-white/10 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="e.g. Python, FastAPI, PyTorch, Docker, PostgreSQL"
            />
          </div>

          {/* Responsibilities & Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              Key Responsibilities & Project Context
            </label>
            <textarea
              rows={3}
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-white/10 p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans leading-relaxed"
              placeholder="Describe what the engineer will build..."
            />
          </div>

          {/* Footer Action */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-white transition-all"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate Requisition & Sourcing Plan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
