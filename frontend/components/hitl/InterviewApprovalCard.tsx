"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  Users,
  CheckCircle2,
  XCircle,
  Sparkles,
  ShieldAlert,
  Send,
} from "lucide-react";
import { PendingAction, InterviewSchedulePayload } from "@/lib/types";

interface InterviewApprovalCardProps {
  action: PendingAction;
  onApprove: (
    actionId: string,
    updatedPayload?: InterviewSchedulePayload,
  ) => void;
  onReject: (actionId: string, reason?: string) => void;
}

export default function InterviewApprovalCard({
  action,
  onApprove,
  onReject,
}: InterviewApprovalCardProps) {
  const interviewData = action.payload.interview;
  const [editedDateTime, setEditedDateTime] = useState(
    interviewData?.dateTime || "",
  );

  if (!interviewData) return null;

  const isExecuted =
    action.status === "executed" || action.status === "approved";
  const isRejected = action.status === "rejected";

  const handleApprove = () => {
    const updated: InterviewSchedulePayload = {
      ...interviewData,
      dateTime: editedDateTime,
    };
    onApprove(action.id, updated);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900/90 to-slate-950/90 backdrop-blur-xl p-5 shadow-xl shadow-indigo-950/30 transition-all">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-600 text-white shadow-md shadow-blue-500/30">
            <Calendar className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-white">
                Interview Schedule Approval
              </h4>
              <span className="rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                HITL Gate Required
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Agent proposed calendar booking and meeting room generation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-500">Status:</span>
          {action.status === "pending_approval" && (
            <span className="flex items-center gap-1 font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
              Pending Confirmation
            </span>
          )}
          {isExecuted && (
            <span className="flex items-center gap-1 font-medium text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Scheduled & Dispatched
            </span>
          )}
          {isRejected && (
            <span className="flex items-center gap-1 font-medium text-rose-400">
              <XCircle className="h-3.5 w-3.5" /> Booking Cancelled
            </span>
          )}
        </div>
      </div>

      {/* AI Justification */}
      <div className="mt-3.5 rounded-xl bg-blue-950/30 border border-blue-500/20 p-3 text-xs text-blue-200/90">
        <div className="flex items-center gap-1.5 font-semibold text-blue-300 mb-1">
          <Sparkles className="h-3.5 w-3.5 text-blue-400" />
          <span>Scheduling Context & Conflict Check</span>
        </div>
        <p className="leading-relaxed text-slate-300">{action.llmReasoning}</p>
      </div>

      {/* Interview Details Card */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-slate-900/90 border border-white/10 p-3 space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs">
              {interviewData.candidateName.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-white">
                {interviewData.candidateName}
              </p>
              <p className="text-[11px] text-slate-400">
                {interviewData.candidateEmail}
              </p>
            </div>
          </div>
          <div className="text-[11px] text-slate-300 pt-1 border-t border-white/5">
            Target Role: <strong>{interviewData.roleTitle}</strong>
          </div>
        </div>

        <div className="rounded-xl bg-slate-900/90 border border-white/10 p-3 space-y-2">
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Time: <strong>{interviewData.dateTime}</strong> (
              {interviewData.durationMinutes} min)
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Video className="h-3.5 w-3.5 text-cyan-400" />
            <span>
              Platform: <strong>{interviewData.meetingPlatform}</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Users className="h-3.5 w-3.5 text-purple-400" />
            <span>
              Interviewers:{" "}
              <strong>{interviewData.interviewers.join(", ")}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      {action.status === "pending_approval" && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
            <span>
              Calendar invites will be sent to candidate and interviewers
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
              onClick={handleApprove}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Confirm & Send Calendar Invites</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
