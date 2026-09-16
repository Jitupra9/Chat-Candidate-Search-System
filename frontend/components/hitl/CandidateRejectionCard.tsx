"use client";

import React, { useState } from "react";
import {
  UserX,
  Mail,
  Archive,
  CheckCircle2,
  XCircle,
  HeartHandshake,
  Sparkles,
  Edit3,
} from "lucide-react";
import { CandidateRejectionPayload } from "@/lib/types";

interface CandidateRejectionCardProps {
  rejection: CandidateRejectionPayload;
  onApprove: () => void;
  onReject: () => void;
  isProcessing?: boolean;
}

export default function CandidateRejectionCard({
  rejection,
  onApprove,
  onReject,
  isProcessing,
}: CandidateRejectionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState(rejection.emailSubject);
  const [body, setBody] = useState(rejection.emailBody);
  const [keepInPool, setKeepInPool] = useState(rejection.keepInWarmTalentPool);
  const [talentPoolCategory, setTalentPoolCategory] = useState(
    rejection.talentPoolCategory,
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-5 space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-600 flex items-center justify-center text-white shadow-md">
            <UserX className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Empathetic Candidate Rejection & Talent Archiving
              </h3>
              <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-400 border border-rose-500/20">
                {rejection.stageReached}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Candidate:{" "}
              <span className="text-slate-200 font-semibold">
                {rejection.candidateName}
              </span>{" "}
              ({rejection.candidateEmail})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1">
            <HeartHandshake className="h-3 w-3 text-rose-400" />
            Empathetic Tone Safeguard
          </span>
        </div>
      </div>

      {/* AI Tone & Feedback summary */}
      <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3.5 space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>Feedback Context</span>
        </div>
        <p className="text-slate-400 leading-relaxed">
          {rejection.politeFeedbackSummary}
        </p>
      </div>

      {/* Email Subject & Body Preview / Edit */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Mail className="h-3.5 w-3.5 text-indigo-400" />
            Email Notification Draft
          </label>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Edit3 className="h-3 w-3" />
            {isEditing ? "Lock Draft" : "Customize Message"}
          </button>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Subject
            </span>
            {isEditing ? (
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white mt-1 focus:outline-none focus:border-indigo-500"
              />
            ) : (
              <p className="text-white font-medium">{subject}</p>
            )}
          </div>

          <div className="border-t border-white/5 pt-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
              Body
            </span>
            {isEditing ? (
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={5}
                className="w-full bg-slate-900 border border-white/10 rounded-lg p-2 text-xs text-slate-200 mt-1 focus:outline-none focus:border-indigo-500 font-sans"
              />
            ) : (
              <div className="text-slate-300 whitespace-pre-line text-[11px] leading-relaxed">
                {body}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Talent Pool Archiving Option */}
      <div className="p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <label className="flex items-center gap-2.5 text-slate-300 cursor-pointer">
          <input
            type="checkbox"
            checked={keepInPool}
            onChange={(e) => setKeepInPool(e.target.checked)}
            className="rounded bg-slate-950 border-white/20 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <div className="flex items-center gap-1.5">
            <Archive className="h-3.5 w-3.5 text-indigo-400" />
            <span>Retain in Future Talent Pool</span>
          </div>
        </label>

        {keepInPool && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400">Tag:</span>
            <input
              type="text"
              value={talentPoolCategory}
              onChange={(e) => setTalentPoolCategory(e.target.value)}
              className="bg-slate-950 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-indigo-300 focus:outline-none focus:border-indigo-500"
            />
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
        <span className="text-[10px] text-slate-400">
          Will archive profile for {rejection.archiveDuration}
        </span>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReject}
            disabled={isProcessing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            <XCircle className="h-4 w-4 text-slate-400" />
            <span>Cancel</span>
          </button>
          <button
            type="button"
            onClick={onApprove}
            disabled={isProcessing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-rose-600/20 transition-all cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {isProcessing ? "Sending..." : "Approve & Dispatch Rejection"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
