"use client";

import React, { useState } from "react";
import {
  Mail,
  CheckCircle2,
  XCircle,
  Edit3,
  Sparkles,
  Users,
  Send,
  ShieldAlert,
  Calendar,
  Eye,
  FileText,
} from "lucide-react";
import { PendingAction, EmailDispatchPayload } from "@/lib/types";

interface EmailApprovalCardProps {
  action: PendingAction;
  onApprove: (actionId: string, updatedPayload?: EmailDispatchPayload) => void;
  onReject: (actionId: string, reason?: string) => void;
}

export default function EmailApprovalCard({
  action,
  onApprove,
  onReject,
}: EmailApprovalCardProps) {
  const emailData = action.payload.email;
  const [isEditing, setIsEditing] = useState(false);
  const [editedSubject, setEditedSubject] = useState(emailData?.subject || "");
  const [editedBody, setEditedBody] = useState(emailData?.bodyTemplate || "");
  const [selectedCandidatePreviewIndex, setSelectedCandidatePreviewIndex] =
    useState(0);

  if (!emailData) return null;

  const handleSaveAndApprove = () => {
    const updated: EmailDispatchPayload = {
      ...emailData,
      subject: editedSubject,
      bodyTemplate: editedBody,
    };
    onApprove(action.id, updated);
  };

  const isExecuted =
    action.status === "executed" || action.status === "approved";
  const isRejected = action.status === "rejected";

  const currentPreviewCandidate =
    emailData.candidates[selectedCandidatePreviewIndex] ||
    emailData.candidates[0];
  const previewBody = currentPreviewCandidate
    ? editedBody.replace(/\{\{CandidateName\}\}/g, currentPreviewCandidate.name)
    : editedBody;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-5 shadow-xl shadow-indigo-950/30 transition-all">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 text-white shadow-md shadow-indigo-500/30">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">
                Candidate Email Dispatch Approval
              </h4>
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                HITL Gate Required
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Personalized candidate communication awaiting HR verification
              before SMTP transmission.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500">Status:</span>
          {action.status === "pending_approval" && (
            <span className="flex items-center gap-1 font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              Pending Review ({emailData.candidates.length} recipients)
            </span>
          )}
          {isExecuted && (
            <span className="flex items-center gap-1 font-medium text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Dispatched via SMTP
            </span>
          )}
          {isRejected && (
            <span className="flex items-center gap-1 font-medium text-rose-400">
              <XCircle className="h-3.5 w-3.5" /> Dispatch Cancelled
            </span>
          )}
        </div>
      </div>

      {/* AI Justification Accordion */}
      <div className="mt-3.5 rounded-xl bg-purple-950/30 border border-purple-500/20 p-3 text-xs text-purple-200/90">
        <div className="flex items-center gap-1.5 font-semibold text-purple-300 mb-1">
          <Sparkles className="h-3.5 w-3.5 text-purple-400" />
          <span>Agent Match Justification</span>
        </div>
        <p className="leading-relaxed text-slate-300">{action.llmReasoning}</p>
      </div>

      {/* Recipients Selection Pills */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-indigo-400" />
            <span>Target Recipients ({emailData.candidates.length}):</span>
          </span>
          <span className="text-[11px] text-slate-500">
            Click candidate to preview their personalized email
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {emailData.candidates.map((cand, idx) => (
            <button
              key={cand.id}
              onClick={() => setSelectedCandidatePreviewIndex(idx)}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                selectedCandidatePreviewIndex === idx
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400"
                  : "bg-slate-800/80 text-slate-300 border border-white/5 hover:bg-slate-700/80"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{cand.name}</span>
              <span className="text-[10px] text-slate-400">({cand.email})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Live Email Preview Box */}
      <div className="mt-4 rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-inner space-y-3">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="space-y-1 w-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">To:</span>
              {!isExecuted && !isRejected && (
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>{isEditing ? "Cancel Edit" : "Edit Template"}</span>
                </button>
              )}
            </div>
            <p className="text-xs font-medium text-slate-200">
              {currentPreviewCandidate?.name} &lt;
              {currentPreviewCandidate?.email}&gt;
            </p>
          </div>
        </div>

        <div>
          <span className="text-[11px] text-slate-400 block mb-0.5">
            Subject:
          </span>
          {isEditing ? (
            <input
              type="text"
              value={editedSubject}
              onChange={(e) => setEditedSubject(e.target.value)}
              className="w-full rounded-lg bg-slate-950 border border-indigo-500/40 px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          ) : (
            <p className="text-xs font-semibold text-white">{editedSubject}</p>
          )}
        </div>

        {emailData.scheduledSlot && (
          <div className="flex items-center gap-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 text-xs text-indigo-300">
            <Calendar className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span>
              Proposed Interview Window:{" "}
              <strong>{emailData.scheduledSlot}</strong>
            </span>
          </div>
        )}

        <div>
          <span className="text-[11px] text-slate-400 block mb-1">
            Body Preview:
          </span>
          {isEditing ? (
            <div className="space-y-1.5">
              <textarea
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
                rows={8}
                className="w-full rounded-lg bg-slate-950 border border-indigo-500/40 p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 font-sans leading-relaxed"
              />
              <p className="text-[10px] text-slate-400">
                Tip: Use{" "}
                <code className="text-indigo-300 font-mono">
                  {"{{CandidateName}}"}
                </code>{" "}
                as dynamic replacement token.
              </p>
            </div>
          ) : (
            <div className="rounded-lg bg-slate-950/60 p-3.5 text-xs text-slate-200 whitespace-pre-wrap leading-relaxed border border-white/5 font-sans">
              {previewBody}
            </div>
          )}
        </div>
      </div>

      {/* Footer Controls */}
      {action.status === "pending_approval" && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
            <span>Emails will be delivered through configured SMTP server</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onReject(action.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-3.5 py-1.5 text-xs font-semibold text-rose-300 transition-all"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Reject</span>
            </button>

            <button
              onClick={handleSaveAndApprove}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Send className="h-3.5 w-3.5" />
              <span>
                Approve & Send {emailData.candidates.length} Email
                {emailData.candidates.length > 1 ? "s" : ""}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
