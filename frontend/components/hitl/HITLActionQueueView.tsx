"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  Filter,
  Sparkles,
} from "lucide-react";
import {
  PendingAction,
  LinkedInPostPayload,
  EmailDispatchPayload,
  InterviewSchedulePayload,
} from "@/lib/types";
import LinkedInPostApprovalCard from "./LinkedInPostApprovalCard";
import EmailApprovalCard from "./EmailApprovalCard";
import InterviewApprovalCard from "./InterviewApprovalCard";
import OfferLetterApprovalCard from "./OfferLetterApprovalCard";
import JoiningLetterApprovalCard from "./JoiningLetterApprovalCard";
import InterviewRescheduleCard from "./InterviewRescheduleCard";
import InterviewScorecardCard from "./InterviewScorecardCard";
import CandidateRejectionCard from "./CandidateRejectionCard";
import SalaryNegotiationCard from "./SalaryNegotiationCard";
import BGVTrackerCard from "./BGVTrackerCard";

interface HITLActionQueueViewProps {
  actions: PendingAction[];
  onApproveAction: (actionId: string, updatedPayload?: any) => void;
  onRejectAction: (actionId: string, reason?: string) => void;
}

export default function HITLActionQueueView({
  actions,
  onApproveAction,
  onRejectAction,
}: HITLActionQueueViewProps) {
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending_approval" | "executed" | "rejected"
  >("all");

  const filteredActions = actions.filter((act) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pending_approval")
      return act.status === "pending_approval";
    if (filterStatus === "executed")
      return act.status === "executed" || act.status === "approved";
    if (filterStatus === "rejected") return act.status === "rejected";
    return true;
  });

  const pendingCount = actions.filter(
    (a) => a.status === "pending_approval",
  ).length;

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Human-in-the-Loop (HITL) Action Center
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Zero autonomous execution of destructive or external actions. All
            offer letters, joining kits, scorecards, salary negotiations,
            rejections, reschedules, and postings require recruiter
            confirmation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-white/10 p-1 rounded-xl text-xs">
          <button
            onClick={() => setFilterStatus("all")}
            className={`rounded-lg px-3 py-1 font-medium transition-all cursor-pointer ${
              filterStatus === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            All Actions ({actions.length})
          </button>
          <button
            onClick={() => setFilterStatus("pending_approval")}
            className={`flex items-center gap-1 rounded-lg px-3 py-1 font-medium transition-all cursor-pointer ${
              filterStatus === "pending_approval"
                ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Clock className="h-3 w-3" />
            <span>Pending ({pendingCount})</span>
          </button>
          <button
            onClick={() => setFilterStatus("executed")}
            className={`flex items-center gap-1 rounded-lg px-3 py-1 font-medium transition-all cursor-pointer ${
              filterStatus === "executed"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <CheckCircle2 className="h-3 w-3" />
            <span>Executed</span>
          </button>
        </div>
      </div>

      {/* Safety Notice Banner */}
      <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900/60 p-4 backdrop-blur-xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-white">
              Enterprise Safety & Compliance Guard Active
            </p>
            <p className="text-slate-300 mt-0.5">
              Every tool execution creates an immutable audit record with LLM
              reasoning, legal compensation checks, and recruiter authorization.
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards Queue */}
      {filteredActions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900/30 p-12 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-slate-600 mb-3" />
          <h3 className="text-sm font-semibold text-white">
            No actions in this queue
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            When the AI agent prepares an offer letter, joining letter,
            interview scorecard, counter-offer, or rejection, it will appear
            here for your approval.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredActions.map((action) => {
            if (action.type === "offer_letter") {
              return (
                <OfferLetterApprovalCard
                  key={action.id}
                  action={action}
                  onApprove={onApproveAction}
                  onReject={onRejectAction}
                />
              );
            }
            if (action.type === "joining_letter") {
              return (
                <JoiningLetterApprovalCard
                  key={action.id}
                  action={action}
                  onApprove={onApproveAction}
                  onReject={onRejectAction}
                />
              );
            }
            if (action.type === "interview_reschedule") {
              return (
                <InterviewRescheduleCard
                  key={action.id}
                  action={action}
                  onApprove={onApproveAction}
                  onReject={onRejectAction}
                />
              );
            }
            if (
              action.type === "interview_scorecard" &&
              action.payload.scorecard
            ) {
              return (
                <InterviewScorecardCard
                  key={action.id}
                  scorecard={action.payload.scorecard}
                  onApprove={() => onApproveAction(action.id)}
                  onReject={() => onRejectAction(action.id)}
                />
              );
            }
            if (
              action.type === "candidate_rejection" &&
              action.payload.rejection
            ) {
              return (
                <CandidateRejectionCard
                  key={action.id}
                  rejection={action.payload.rejection}
                  onApprove={() => onApproveAction(action.id)}
                  onReject={() => onRejectAction(action.id)}
                />
              );
            }
            if (
              action.type === "salary_negotiation" &&
              action.payload.negotiation
            ) {
              return (
                <SalaryNegotiationCard
                  key={action.id}
                  negotiation={action.payload.negotiation}
                  onApprove={() => onApproveAction(action.id)}
                  onReject={() => onRejectAction(action.id)}
                />
              );
            }
            if (action.type === "bgv_verification" && action.payload.bgv) {
              return (
                <BGVTrackerCard
                  key={action.id}
                  bgv={action.payload.bgv}
                  onApprove={() => onApproveAction(action.id)}
                  onReject={() => onRejectAction(action.id)}
                />
              );
            }
            if (action.type === "linkedin_post") {
              return (
                <LinkedInPostApprovalCard
                  key={action.id}
                  action={action}
                  onApprove={onApproveAction}
                  onReject={onRejectAction}
                />
              );
            }
            if (action.type === "email_dispatch") {
              return (
                <EmailApprovalCard
                  key={action.id}
                  action={action}
                  onApprove={onApproveAction}
                  onReject={onRejectAction}
                />
              );
            }
            if (action.type === "interview_schedule") {
              return (
                <InterviewApprovalCard
                  key={action.id}
                  action={action}
                  onApprove={onApproveAction}
                  onReject={onRejectAction}
                />
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
}
