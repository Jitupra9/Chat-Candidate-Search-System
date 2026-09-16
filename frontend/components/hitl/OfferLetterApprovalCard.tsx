"use client";

import React, { useState } from "react";
import {
  FileCheck,
  DollarSign,
  Calendar,
  Building,
  CheckCircle2,
  XCircle,
  Edit3,
  Download,
  ShieldCheck,
  Sparkles,
  Award,
  Clock,
  User,
} from "lucide-react";
import { PendingAction, OfferLetterPayload } from "@/lib/types";

interface OfferLetterApprovalCardProps {
  action: PendingAction;
  onApprove: (actionId: string, updatedPayload?: OfferLetterPayload) => void;
  onReject: (actionId: string, reason?: string) => void;
}

export default function OfferLetterApprovalCard({
  action,
  onApprove,
  onReject,
}: OfferLetterApprovalCardProps) {
  const payload = action.payload.offer;

  const [isEditing, setIsEditing] = useState(false);
  const [baseSalary, setBaseSalary] = useState(
    payload?.baseSalary || "$150,000 USD",
  );
  const [equityGrant, setEquityGrant] = useState(
    payload?.equityGrant || "0.15% (15,000 RSUs)",
  );
  const [bonus, setBonus] = useState(
    payload?.bonus || "$15,000 Annual Performance Bonus",
  );
  const [startDate, setStartDate] = useState(
    payload?.startDate || "November 1, 2026",
  );
  const [expiryDate, setExpiryDate] = useState(
    payload?.expiryDate || "October 20, 2026",
  );
  const [reportingManager, setReportingManager] = useState(
    payload?.reportingManager || "Marcus Chen (VP of AI & Engineering)",
  );
  const [letterTemplate, setLetterTemplate] = useState(
    payload?.letterTemplate ||
      `Dear {{CandidateName}},\n\nOn behalf of TalentPulse AI, we are thrilled to offer you the position of {{RoleTitle}} in our {{Department}} team.\n\nWe were deeply impressed by your technical expertise and problem-solving skills throughout the interview process. We believe your contributions will be pivotal in shaping the future of our autonomous recruitment platform.\n\nSummary of Offer Terms:\n• Base Salary: {{BaseSalary}} per annum, paid semi-monthly\n• Equity Grant: {{EquityGrant}} with standard 4-year vesting and 1-year cliff\n• Performance Bonus: {{Bonus}}\n• Start Date: {{StartDate}}\n• Reporting To: {{ReportingManager}}\n• Benefits: Comprehensive Medical, Dental, Vision, 401(k) 4% match, and unlimited PTO\n\nThis offer is valid until {{ExpiryDate}}. Please sign below to indicate your acceptance.\n\nSincerely,\nSarah Jenkins\nLead Technical Recruiter, TalentPulse AI`,
  );

  if (!payload) return null;

  const isExecuted =
    action.status === "executed" || action.status === "approved";
  const isRejected = action.status === "rejected";

  const handleApprove = () => {
    const updated: OfferLetterPayload = {
      ...payload,
      baseSalary,
      equityGrant,
      bonus,
      startDate,
      expiryDate,
      reportingManager,
      letterTemplate,
    };
    onApprove(action.id, updated);
  };

  const formattedLetter = letterTemplate
    .replace(/{{CandidateName}}/g, payload.candidateName)
    .replace(/{{RoleTitle}}/g, payload.roleTitle)
    .replace(/{{Department}}/g, payload.department)
    .replace(/{{BaseSalary}}/g, baseSalary)
    .replace(/{{EquityGrant}}/g, equityGrant)
    .replace(/{{Bonus}}/g, bonus)
    .replace(/{{StartDate}}/g, startDate)
    .replace(/{{ReportingManager}}/g, reportingManager)
    .replace(/{{ExpiryDate}}/g, expiryDate);

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-slate-900/90 shadow-xl overflow-hidden backdrop-blur-xl">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-indigo-950/80 via-purple-950/50 to-slate-900 p-4 border-b border-indigo-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Official Offer Letter Generation
              </span>
              <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.2 text-[10px] font-semibold text-indigo-300">
                HITL Approval Required
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Employment Offer: {payload.candidateName} — {payload.roleTitle}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isExecuted && !isRejected && (
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{isEditing ? "Done Editing" : "Edit Terms"}</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4 text-xs">
        {/* LLM Justification */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-slate-300">
          <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-indigo-300 font-medium">
              AI Rationale:{" "}
            </strong>
            {action.llmReasoning}
          </p>
        </div>

        {/* Structured Terms Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
              <DollarSign className="h-3 w-3 text-emerald-400" /> Base Salary
            </span>
            {isEditing ? (
              <input
                type="text"
                value={baseSalary}
                onChange={(e) => setBaseSalary(e.target.value)}
                className="w-full bg-slate-900 border border-indigo-500/30 rounded px-2 py-1 text-xs text-emerald-400 font-semibold"
              />
            ) : (
              <p className="text-xs font-bold text-emerald-400 font-mono">
                {baseSalary}
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
              <Award className="h-3 w-3 text-purple-400" /> Equity / Stock
            </span>
            {isEditing ? (
              <input
                type="text"
                value={equityGrant}
                onChange={(e) => setEquityGrant(e.target.value)}
                className="w-full bg-slate-900 border border-indigo-500/30 rounded px-2 py-1 text-xs text-purple-300"
              />
            ) : (
              <p className="text-xs font-medium text-purple-300">
                {equityGrant}
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
              <Calendar className="h-3 w-3 text-indigo-400" /> Start Date
            </span>
            {isEditing ? (
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full bg-slate-900 border border-indigo-500/30 rounded px-2 py-1 text-xs text-slate-200"
              />
            ) : (
              <p className="text-xs font-medium text-slate-200">{startDate}</p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
              <Clock className="h-3 w-3 text-amber-400" /> Offer Expiry
            </span>
            {isEditing ? (
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full bg-slate-900 border border-indigo-500/30 rounded px-2 py-1 text-xs text-amber-300"
              />
            ) : (
              <p className="text-xs font-medium text-amber-300">{expiryDate}</p>
            )}
          </div>
        </div>

        {/* Offer Document Letterhead Preview */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <FileCheck className="h-3.5 w-3.5 text-indigo-400" />
              Official Offer Letter Document Preview
            </span>
            <span className="text-[10px] text-slate-500">
              Recipient: {payload.candidateEmail}
            </span>
          </div>

          {isEditing ? (
            <textarea
              rows={8}
              value={letterTemplate}
              onChange={(e) => setLetterTemplate(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-indigo-500/40 p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-sans text-xs text-slate-200 whitespace-pre-line leading-relaxed shadow-inner max-h-60 overflow-y-auto">
              {formattedLetter}
            </div>
          )}
        </div>

        {/* Benefits Checklist */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-1">
            Included Perks:
          </span>
          {payload.benefits.map((benefit, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-950 border border-white/5 text-[10px] text-slate-300 font-medium"
            >
              <CheckCircle2 className="h-2.5 w-2.5 text-emerald-400" />
              {benefit}
            </span>
          ))}
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/10 gap-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>
              Pre-signing legal check verified. Salary is within approved band
              ($140k-$165k).
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isExecuted && !isRejected ? (
              <>
                <button
                  onClick={() =>
                    onReject(
                      action.id,
                      "Rejected by recruiter for revised salary terms",
                    )
                  }
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Reject / Revise</span>
                </button>

                <button
                  onClick={handleApprove}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white px-4 py-2 text-xs font-bold shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Approve & Dispatch Offer Letter</span>
                </button>
              </>
            ) : isExecuted ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Offer Letter Dispatched to
                Candidate
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 text-xs font-bold text-rose-400">
                <XCircle className="h-4 w-4" /> Offer Letter Cancelled
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
