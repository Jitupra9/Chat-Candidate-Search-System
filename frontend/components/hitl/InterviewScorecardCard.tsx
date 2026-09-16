"use client";

import React, { useState } from "react";
import {
  Star,
  CheckCircle2,
  XCircle,
  Award,
  Users,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { InterviewScorecardPayload } from "@/lib/types";

interface InterviewScorecardCardProps {
  scorecard: InterviewScorecardPayload;
  onApprove: () => void;
  onReject: () => void;
  isProcessing?: boolean;
}

export default function InterviewScorecardCard({
  scorecard,
  onApprove,
  onReject,
  isProcessing,
}: InterviewScorecardCardProps) {
  const [showInterviewerNotes, setShowInterviewerNotes] = useState(false);

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case "Strong Hire":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Hire":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";
      case "Leaning No Hire":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      default:
        return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-5 space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Interview Scorecard & Panel Consensus
              </h3>
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20">
                {scorecard.interviewRound}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Candidate:{" "}
              <span className="text-slate-200 font-semibold">
                {scorecard.candidateName}
              </span>{" "}
              ({scorecard.roleTitle})
            </p>
          </div>
        </div>

        {/* Overall Recommendation */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1 bg-slate-950 px-3 py-1.5 rounded-xl border border-white/10">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
            <span className="text-xs font-extrabold text-white">
              {scorecard.overallScore.toFixed(1)} / 5.0
            </span>
          </div>
          <span
            className={`rounded-xl px-2.5 py-1 text-xs font-bold border ${getRecommendationBadge(
              scorecard.hiringRecommendation,
            )}`}
          >
            {scorecard.hiringRecommendation}
          </span>
        </div>
      </div>

      {/* AI Consensus Banner */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3.5 space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>AI Debrief Summary</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {scorecard.aiConsensusSummary}
        </p>
      </div>

      {/* Skills Category Breakdown */}
      <div className="space-y-2">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Competency Evaluation
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {scorecard.ratings.map((rating, i) => {
            const pct = (rating.score / rating.maxScore) * 100;
            return (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 space-y-1.5"
              >
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">
                    {rating.category}
                  </span>
                  <span className="text-white font-bold">
                    {rating.score.toFixed(1)} / {rating.maxScore}
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pct >= 85
                        ? "bg-emerald-500"
                        : pct >= 70
                          ? "bg-indigo-500"
                          : "bg-amber-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strengths and Concerns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
          <span className="font-bold text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="h-3.5 w-3.5" /> Key Strengths
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
            {scorecard.keyStrengths.map((str, idx) => (
              <li key={idx}>{str}</li>
            ))}
          </ul>
        </div>

        <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
          <span className="font-bold text-amber-400 flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" /> Growth / Notes
          </span>
          <ul className="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
            {scorecard.areasOfConcern.map((area, idx) => (
              <li key={idx}>{area}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collapsible Interviewer Notes */}
      <div className="border border-white/5 rounded-xl bg-slate-950/40 overflow-hidden text-xs">
        <button
          type="button"
          onClick={() => setShowInterviewerNotes(!showInterviewerNotes)}
          className="w-full flex items-center justify-between p-3 text-slate-300 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2 font-medium">
            <Users className="h-4 w-4 text-indigo-400" />
            Interview Panel Notes ({scorecard.interviewers.length} Interviewers)
          </span>
          {showInterviewerNotes ? (
            <ChevronUp className="h-4 w-4 text-slate-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-slate-400" />
          )}
        </button>

        {showInterviewerNotes && (
          <div className="p-3 pt-0 space-y-2 border-t border-white/5 mt-1">
            {scorecard.interviewers.map((int, i) => (
              <div
                key={i}
                className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-xs space-y-1"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold text-white">{int.name}</span>{" "}
                    <span className="text-[10px] text-slate-400">
                      ({int.title})
                    </span>
                  </div>
                  <span className="text-amber-400 font-bold">
                    ★ {int.score}/5.0
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 italic">
                  "{int.notes}"
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Decision Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2 text-[10px] text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Verified against Role Competency Matrix</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReject}
            disabled={isProcessing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            <XCircle className="h-4 w-4 text-rose-400" />
            <span>Request Panel Follow-up</span>
          </button>
          <button
            type="button"
            onClick={onApprove}
            disabled={isProcessing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {isProcessing ? "Processing..." : "Approve & Advance to Offer"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
