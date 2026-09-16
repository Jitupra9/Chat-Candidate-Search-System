"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Video,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Sparkles,
  Users,
  Send,
  RefreshCw,
} from "lucide-react";
import { PendingAction, InterviewReschedulePayload } from "@/lib/types";

interface InterviewRescheduleCardProps {
  action: PendingAction;
  onApprove: (
    actionId: string,
    updatedPayload?: InterviewReschedulePayload,
  ) => void;
  onReject: (actionId: string, reason?: string) => void;
}

export default function InterviewRescheduleCard({
  action,
  onApprove,
  onReject,
}: InterviewRescheduleCardProps) {
  const payload = action.payload.reschedule;

  const [selectedSlot, setSelectedSlot] = useState(
    payload?.proposedSlot || "Thursday, Oct 12 at 3:30 PM EST",
  );
  const [meetingPlatform, setMeetingPlatform] = useState<
    "Google Meet" | "Microsoft Teams" | "Zoom"
  >(payload?.meetingPlatform || "Google Meet");
  const [notifyCandidate, setNotifyCandidate] = useState(true);
  const [notifyInterviewer, setNotifyInterviewer] = useState(true);

  if (!payload) return null;

  const isExecuted =
    action.status === "executed" || action.status === "approved";
  const isRejected = action.status === "rejected";

  const handleApprove = () => {
    const updated: InterviewReschedulePayload = {
      ...payload,
      proposedSlot: selectedSlot,
      meetingPlatform,
      notifyCandidate,
      notifyInterviewer,
    };
    onApprove(action.id, updated);
  };

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-slate-900/90 shadow-xl overflow-hidden backdrop-blur-xl">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-amber-950/80 via-orange-950/50 to-slate-900 p-4 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <RefreshCw className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Interview Reschedule & Calendar Conflict
              </span>
              <span className="rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.2 text-[10px] font-semibold text-amber-300">
                Candidate Negotiation
              </span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">
              Reschedule Technical Screen: {payload.candidateName} —{" "}
              {payload.roleTitle}
            </h3>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 space-y-4 text-xs">
        {/* Reason Alert Banner */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-200">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-300">
              Reschedule Request Reason:
            </p>
            <p className="text-slate-300 mt-0.5">{payload.reason}</p>
          </div>
        </div>

        {/* AI Analysis / LLM Justification */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950 border border-white/5 text-slate-300">
          <Sparkles className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-indigo-300 font-medium">
              AI Calendar Resolution:{" "}
            </strong>
            {action.llmReasoning}
          </p>
        </div>

        {/* Time Comparison: Original vs Proposed */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Original Slot */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-rose-500/20 space-y-1">
            <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
              <Clock className="h-3 w-3" /> Original Scheduled Slot (Conflict)
            </span>
            <p className="text-xs font-semibold text-slate-400 line-through">
              {payload.originalSlot}
            </p>
          </div>

          {/* New Proposed Slot */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-1 ring-1 ring-emerald-500/20">
            <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> Proposed New Slot (Confirmed
              Open)
            </span>
            <p className="text-xs font-bold text-emerald-300">{selectedSlot}</p>
          </div>
        </div>

        {/* AI Alternative Open Slots Picker */}
        {payload.availableSlots && payload.availableSlots.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Alternative Free Slots (Checked against Interviewer & Candidate
              Calendars):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {payload.availableSlots.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    selectedSlot === slot
                      ? "bg-indigo-600/20 border-indigo-500 text-white ring-1 ring-indigo-500/50"
                      : "bg-slate-950 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  }`}
                >
                  <p className="text-[11px] font-semibold">{slot}</p>
                  <span className="text-[9px] text-emerald-400">
                    ✓ Both Available
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Meeting Details & Attendees */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-white/5">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <Users className="h-3 w-3 text-indigo-400" /> Interviewers on
              Invite:
            </span>
            <div className="flex flex-wrap gap-1">
              {payload.interviewers.map((inv, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded-md bg-slate-900 border border-white/10 text-[10px] text-slate-300"
                >
                  {inv}
                </span>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1 flex items-center gap-1">
              <Video className="h-3 w-3 text-purple-400" /> Platform & Link:
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">
                {meetingPlatform}
              </span>
              <span className="text-[10px] text-indigo-400 font-mono underline truncate">
                {payload.meetingLink}
              </span>
            </div>
          </div>
        </div>

        {/* Notification Checkboxes */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={notifyCandidate}
              onChange={(e) => setNotifyCandidate(e.target.checked)}
              className="rounded border-white/20 bg-slate-950 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
            />
            <span>
              Send updated calendar invite to candidate (
              {payload.candidateEmail})
            </span>
          </label>

          <label className="flex items-center gap-2 text-slate-300 cursor-pointer text-xs">
            <input
              type="checkbox"
              checked={notifyInterviewer}
              onChange={(e) => setNotifyInterviewer(e.target.checked)}
              className="rounded border-white/20 bg-slate-950 text-indigo-600 focus:ring-indigo-500 h-3.5 w-3.5"
            />
            <span>Update Google Calendar / Outlook for Interviewers</span>
          </label>
        </div>

        {/* Bottom Actions Bar */}
        <div className="flex flex-wrap items-center justify-between pt-3 border-t border-white/10 gap-2">
          <div className="text-[11px] text-slate-400">
            <span>
              Updating slot will automatically release previous calendar hold.
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isExecuted && !isRejected ? (
              <>
                <button
                  onClick={() =>
                    onReject(
                      action.id,
                      "Candidate requested alternate offline follow up",
                    )
                  }
                  className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 text-slate-300 px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <XCircle className="h-3.5 w-3.5" />
                  <span>Cancel Meeting</span>
                </button>

                <button
                  onClick={handleApprove}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white px-4 py-2 text-xs font-bold shadow-md shadow-amber-600/30 transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Approve & Lock New Slot</span>
                </button>
              </>
            ) : isExecuted ? (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" /> Reschedule Confirmed &
                Calendar Updated
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 text-xs font-bold text-rose-400">
                <XCircle className="h-4 w-4" /> Reschedule Cancelled
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
