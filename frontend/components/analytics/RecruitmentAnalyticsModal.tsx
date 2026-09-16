"use client";

import React, { useState } from "react";
import {
  X,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  Award,
  ArrowRight,
  Filter,
  Download,
  Building,
} from "lucide-react";

interface RecruitmentAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RecruitmentAnalyticsModal({
  isOpen,
  onClose,
}: RecruitmentAnalyticsModalProps) {
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");

  if (!isOpen) return null;

  const funnelStages = [
    {
      name: "Applied / Sourced",
      count: 482,
      conversion: "100%",
      color: "bg-indigo-500",
    },
    {
      name: "Screening Passed",
      count: 184,
      conversion: "38.2%",
      color: "bg-blue-500",
    },
    {
      name: "Technical Interview",
      count: 76,
      conversion: "41.3%",
      color: "bg-purple-500",
    },
    {
      name: "Final Panel Debrief",
      count: 28,
      conversion: "36.8%",
      color: "bg-amber-500",
    },
    {
      name: "Offer Extended",
      count: 14,
      conversion: "50.0%",
      color: "bg-emerald-500",
    },
    {
      name: "Joined / Onboarded",
      count: 12,
      conversion: "85.7%",
      color: "bg-teal-500",
    },
  ];

  const sourceData = [
    {
      source: "Autonomous AI Search / Ingestion",
      count: 210,
      pct: 43.6,
      color: "bg-indigo-500",
    },
    {
      source: "LinkedIn Recruiter Outreach",
      count: 142,
      pct: 29.5,
      color: "bg-blue-500",
    },
    {
      source: "Employee Referral Network",
      count: 86,
      pct: 17.8,
      color: "bg-emerald-500",
    },
    {
      source: "Inbound Career Portal",
      count: 44,
      pct: 9.1,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-slate-900/95 text-slate-100 shadow-2xl p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Talent Acquisition Velocity & Pipeline Funnel
              </h2>
              <p className="text-xs text-slate-400">
                Live recruitment conversion metrics and operational insights
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Top KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-indigo-400" />
              Avg Time-to-Hire
            </span>
            <p className="text-2xl font-extrabold text-white">18.4 Days</p>
            <span className="text-[10px] text-emerald-400 font-medium">
              ↓ 4.2 days vs Q2 avg
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              Offer Acceptance
            </span>
            <p className="text-2xl font-extrabold text-emerald-400">85.7%</p>
            <span className="text-[10px] text-slate-400 font-medium">
              12 of 14 offers accepted
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-purple-400" />
              Active Pipeline
            </span>
            <p className="text-2xl font-extrabold text-purple-400">118</p>
            <span className="text-[10px] text-slate-400 font-medium">
              Across 8 open roles
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5 space-y-1">
            <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block flex items-center gap-1.5">
              <Award className="h-3.5 w-3.5 text-amber-400" />
              Candidate CSAT
            </span>
            <p className="text-2xl font-extrabold text-amber-400">4.9 / 5.0</p>
            <span className="text-[10px] text-emerald-400 font-medium">
              Empathetic engagement
            </span>
          </div>
        </div>

        {/* Pipeline Funnel Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-indigo-400" />
              Recruitment Conversion Funnel
            </h3>
            <span className="text-[11px] text-slate-400">
              Total volume: 482 candidate profiles
            </span>
          </div>

          <div className="space-y-2">
            {funnelStages.map((stage, idx) => {
              const maxCount = funnelStages[0].count;
              const barWidth = Math.max((stage.count / maxCount) * 100, 12);

              return (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2"
                >
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-indigo-400" />
                      <span className="font-bold text-white">{stage.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-200">
                        {stage.count} candidates
                      </span>
                      <span className="text-[10px] text-indigo-300 font-semibold bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                        {stage.conversion} pass rate
                      </span>
                    </div>
                  </div>

                  <div className="h-2.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${stage.color} transition-all duration-500`}
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sourcing Channel Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Building className="h-4 w-4 text-indigo-400" />
            Candidate Sourcing Efficiency
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {sourceData.map((src, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-300">
                    {src.source}
                  </span>
                  <span className="font-bold text-white">{src.pct}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${src.color}`}
                    style={{ width: `${src.pct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>{src.count} Sourced</span>
                  <span className="text-emerald-400">High Quality Rating</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
          <span className="text-slate-400 text-[11px]">
            Data auto-refreshed via TalentPulse ATS Sync Engine
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                alert("Recruitment Analytics Report exported as CSV.")
              }
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-800 hover:bg-slate-700 px-3.5 py-2 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
            >
              <Download className="h-3.5 w-3.5 text-indigo-400" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
