"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Edit3,
  Sparkles,
  DollarSign,
  MapPin,
  Briefcase,
  Share2,
  ShieldAlert,
  Save
} from 'lucide-react'
import { LinkedInIcon } from '@/components/icons/LinkedInIcon'
import { PendingAction, LinkedInPostPayload } from "@/lib/types";

interface LinkedInPostApprovalCardProps {
  action: PendingAction;
  onApprove: (actionId: string, updatedPayload?: LinkedInPostPayload) => void;
  onReject: (actionId: string, reason?: string) => void;
}

export default function LinkedInPostApprovalCard({
  action,
  onApprove,
  onReject,
}: LinkedInPostApprovalCardProps) {
  const postData = action.payload.linkedin;
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(postData?.content || "");
  const [editedSalary, setEditedSalary] = useState(postData?.salaryRange || "");
  const [editedRole, setEditedRole] = useState(postData?.roleTitle || "");

  if (!postData) return null;

  const handleSaveAndApprove = () => {
    const updated: LinkedInPostPayload = {
      ...postData,
      roleTitle: editedRole,
      salaryRange: editedSalary,
      content: editedContent,
    };
    onApprove(action.id, updated);
  };

  const isExecuted =
    action.status === "executed" || action.status === "approved";
  const isRejected = action.status === "rejected";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-5 shadow-xl shadow-indigo-950/30 transition-all">
      {/* Top Banner: HITL Confirmation Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-md shadow-[#0A66C2]/30">
            <LinkedInIcon className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">
                LinkedIn Job Post Approval
              </h4>
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                HITL Gate Required
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Agent prepared this requisition post. Requires HR authorization
              before live broadcast.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500">Status:</span>
          {action.status === "pending_approval" && (
            <span className="flex items-center gap-1 font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              Awaiting Approval
            </span>
          )}
          {isExecuted && (
            <span className="flex items-center gap-1 font-medium text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Published to LinkedIn
            </span>
          )}
          {isRejected && (
            <span className="flex items-center gap-1 font-medium text-rose-400">
              <XCircle className="h-3.5 w-3.5" /> Cancelled by HR
            </span>
          )}
        </div>
      </div>

      {/* AI Justification Accordion */}
      <div className="mt-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 p-3 text-xs text-indigo-200/90">
        <div className="flex items-center gap-1.5 font-semibold text-indigo-300 mb-1">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Agent Rationale & Parameters</span>
        </div>
        <p className="leading-relaxed text-slate-300">{action.llmReasoning}</p>
      </div>

      {/* Post Details & Editor */}
      <div className="mt-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-800/60 border border-white/5 p-2 text-slate-300">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
            <span className="font-medium truncate">{postData.roleTitle}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-800/60 border border-white/5 p-2 text-slate-300">
            <DollarSign className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span className="font-medium truncate">{postData.salaryRange}</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-800/60 border border-white/5 p-2 text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
            <span className="font-medium truncate">{postData.location}</span>
          </div>
        </div>

        {/* Live LinkedIn Mock Post Box */}
        <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                TP
              </div>
              <div>
                <p className="text-xs font-semibold text-white">
                  TalentPulse Careers
                </p>
                <p className="text-[10px] text-slate-400">
                  Post Preview • Visible to LinkedIn Network
                </p>
              </div>
            </div>

            {!isExecuted && !isRejected && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>{isEditing ? "Cancel Edit" : "Edit Copy"}</span>
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-2 mt-2">
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                rows={7}
                className="w-full rounded-lg bg-slate-950 border border-indigo-500/40 p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 font-sans leading-relaxed"
              />
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Characters: {editedContent.length}</span>
                <span className="text-indigo-400 font-medium">
                  Draft editing mode
                </span>
              </div>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-xs leading-relaxed text-slate-200 mt-2 font-sans">
              {editedContent}
            </div>
          )}

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
            {postData.hashtags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-md bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[10px] font-medium text-indigo-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      {action.status === "pending_approval" && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Clicking approve will trigger real-time LinkedIn Publishing tool
            </span>
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
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Approve & Post to LinkedIn</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
