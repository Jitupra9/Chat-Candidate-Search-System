"use client";

import React, { useState } from "react";
import {
  FileText,
  Calendar,
  MapPin,
  Clock,
  UserCheck,
  CheckCircle2,
  XCircle,
  Edit3,
  ShieldCheck,
  Sparkles,
  Mail,
  Send,
} from "lucide-react";
import { PendingAction, JoiningLetterPayload } from "@/lib/types";

interface JoiningLetterApprovalCardProps {
  action: PendingAction;
  onApprove: (actionId: string, updatedPayload?: JoiningLetterPayload) => void;
  onReject: (actionId: string, reason?: string) => void;
}

export default function JoiningLetterApprovalCard({
  action,
  onApprove,
  onReject,
}: JoiningLetterApprovalCardProps) {
  const payload = action.payload.joining;

  const [isEditing, setIsEditing] = useState(false);
  const [joiningDate, setJoiningDate] = useState(
    payload?.joiningDate || "November 1, 2026",
  );
  const [reportingTime, setReportingTime] = useState(
    payload?.reportingTime || "09:30 AM EST",
  );
  const [workLocation, setWorkLocation] = useState(
    payload?.workLocation || "Remote (Virtual Onboarding via Zoom)",
  );
  const [welcomeMessage, setWelcomeMessage] = useState(
    payload?.welcomeMessage ||
      `Dear {{CandidateName}},\n\nWelcome to the TalentPulse AI team! We are thrilled to confirm your official start date as {{RoleTitle}} in {{Department}}.\n\nOnboarding Details:\n• Official Joining Date: {{JoiningDate}}\n• Day 1 Welcome Session: {{ReportingTime}}\n• Location: {{WorkLocation}}\n• Primary HR Partner: {{HRContactName}} ({{HRContactEmail}})\n\nPre-Joining Checklist:\nPlease ensure you have uploaded your signed Offer Letter, Identity proof, and Direct Deposit form to the secure portal before your start date.\n\nWe look forward to an incredible journey together!\n\nWarm regards,\nPeople Operations Team\nTalentPulse AI`,
  );

  if (!payload) return null;

  const isExecuted =
    action.status === "executed" || action.status === "approved";
  const isRejected = action.status === "rejected";

  const handleApprove = () => {
    const updated: JoiningLetterPayload = {
      ...payload,
      joiningDate,
      reportingTime,
      workLocation,
      welcomeMessage,
    };
    onApprove(action.id, updated);
  };

  const formattedMessage = welcomeMessage
    .replace(/{{CandidateName}}/g, payload.candidateName)
    .replace(/{{RoleTitle}}/g, payload.roleTitle)
    .replace(/{{Department}}/g, payload.department)
    .replace(/{{JoiningDate}}/g, joiningDate)
    .replace(/{{ReportingTime}}/g, reportingTime)
    .replace(/{{WorkLocation}}/g, workLocation)
    .replace(/{{HRContactName}}/g, payload.hrContactName)
    .replace(/{{HRContactEmail}}/g, payload.hrContactEmail);

  return (
    <div className="rounded-2xl border border-teal-500/30 bg-slate-900/90 shadow-xl overflow-hidden backdrop-blur-xl">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-teal-950/80 via-emerald-950/50 to-slate-900 p-4 border-b border-teal-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <UserCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Official Joining Letter & Onboarding Kit
              </span>
              <span className="rounded-full bg-teal-500/10 border border-teal-500/20 px-2 py-0.2 text-[10px] font-semibold text-teal-300">
                HR Verification Gate
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Welcome Onboarding Kit: {payload.candidateName} —{" "}
              {payload.roleTitle}
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
              <span>{isEditing ? "Done Editing" : "Edit Onboarding"}</span>
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4 text-xs">
        {/* LLM Justification */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-teal-500/5 border border-teal-500/10 text-slate-300">
          <Sparkles className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-teal-300 font-medium">
              AI Rationale:{" "}
            </strong>
            {action.llmReasoning}
          </p>
        </div>

        {/* Structured Onboarding Schedule Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
              <Calendar className="h-3 w-3 text-teal-400" /> Joining Date
            </span>
            {isEditing ? (
              <input
                type="text"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-full bg-slate-900 border border-teal-500/30 rounded px-2 py-1 text-xs text-teal-400 font-semibold"
              />
            ) : (
              <p className="text-xs font-bold text-teal-400">{joiningDate}</p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
              <Clock className="h-3 w-3 text-emerald-400" /> Reporting Time
            </span>
            {isEditing ? (
              <input
                type="text"
                value={reportingTime}
                onChange={(e) => setReportingTime(e.target.value)}
                className="w-full bg-slate-900 border border-teal-500/30 rounded px-2 py-1 text-xs text-emerald-300"
              />
            ) : (
              <p className="text-xs font-medium text-emerald-300">
                {reportingTime}
              </p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
              <MapPin className="h-3 w-3 text-indigo-400" /> Work Location
            </span>
            {isEditing ? (
              <input
                type="text"
                value={workLocation}
                onChange={(e) => setWorkLocation(e.target.value)}
                className="w-full bg-slate-900 border border-teal-500/30 rounded px-2 py-1 text-xs text-slate-200"
              />
            ) : (
              <p className="text-xs font-medium text-slate-200">
                {workLocation}
              </p>
            )}
          </div>
        </div>

        {/* Joining Letter Body Preview */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-teal-400" />
              Official Welcome & Joining Letter Preview
            </span>
            <span className="text-[10px] text-slate-500">
              Recipient: {payload.candidateEmail}
            </span>
          </div>

          {isEditing ? (
            <textarea
              rows={7}
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-teal-500/40 p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
          ) : (
            <div className="p-4 rounded-xl bg-slate-950 border border-white/10 font-sans text-xs text-slate-200 whitespace-pre-line leading-relaxed shadow-inner max-h-52 overflow-y-auto">
              {formattedMessage}
            </div>
          )}
        </div>

        {/* Required Documents Checklist */}
        <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Pre-Onboarding Compliance Documents:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {payload.requiredDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 text-[11px] text-slate-300"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                <span>{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/10 gap-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="h-4 w-4 text-teal-400" />
            <span>Candidate background check completed & verified.</span>
          </div>

          <div className="flex items-center gap-2">
            {!isExecuted && !isRejected ? (
              <>
                <button
                  onClick={() =>
                    onReject(
                      action.id,
                      "Joining letter held for date adjustment",
                    )
                  }
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Hold / Cancel</span>
                </button>

                <button
                  onClick={handleApprove}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white px-4 py-2 text-xs font-bold shadow-md shadow-teal-600/30 transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Approve & Dispatch Joining Kit</span>
                </button>
              </>
            ) : isExecuted ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30 px-3 py-1.5 text-xs font-bold text-teal-400">
                <CheckCircle2 className="h-4 w-4" /> Joining Letter & Welcome
                Kit Dispatched
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 text-xs font-bold text-rose-400">
                <XCircle className="h-4 w-4" /> Joining Dispatch Cancelled
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
