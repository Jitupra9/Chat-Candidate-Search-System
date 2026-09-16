"use client";

import React from "react";
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  ShieldCheck,
  Building,
  GraduationCap,
  Scale,
  UserCheck,
} from "lucide-react";
import { BGVVerificationPayload } from "@/lib/types";

interface BGVTrackerCardProps {
  bgv: BGVVerificationPayload;
  onApprove: () => void;
  onReject: () => void;
  isProcessing?: boolean;
}

export default function BGVTrackerCard({
  bgv,
  onApprove,
  onReject,
  isProcessing,
}: BGVTrackerCardProps) {
  const getCheckIcon = (name: string) => {
    if (name.toLowerCase().includes("employment"))
      return <Building className="h-4 w-4" />;
    if (name.toLowerCase().includes("education"))
      return <GraduationCap className="h-4 w-4" />;
    if (name.toLowerCase().includes("criminal"))
      return <Scale className="h-4 w-4" />;
    return <UserCheck className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="h-3 w-3" /> Verified
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            <Clock className="h-3 w-3" /> In Progress
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-full">
            <AlertCircle className="h-3 w-3" /> Discrepancy
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-5 space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <FileCheck2 className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Background Verification (BGV) & Pre-Boarding Check
              </h3>
              <span className="rounded-full bg-teal-500/10 px-2 py-0.5 text-[10px] font-bold text-teal-400 border border-teal-500/20">
                {bgv.agencyName}
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Candidate:{" "}
              <span className="text-slate-200 font-semibold">
                {bgv.candidateName}
              </span>{" "}
              (Joining: {bgv.joiningDate})
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" /> Risk Assessment: {bgv.riskScore}
          </span>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="space-y-2 text-xs">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Verification Verification Breakdown
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {bgv.checks.map((check, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-200 font-bold">
                  <div className="text-indigo-400">
                    {getCheckIcon(check.name)}
                  </div>
                  <span>{check.name}</span>
                </div>
                {getStatusBadge(check.status)}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {check.notes}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pre-Joining Timeline info */}
      <div className="p-3 rounded-xl bg-slate-950/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400">
        <div>
          Submitted to Agency:{" "}
          <span className="text-slate-200 font-medium">
            {bgv.submittedDate}
          </span>
        </div>
        {bgv.completedDate && (
          <div>
            Completed on:{" "}
            <span className="text-emerald-400 font-medium">
              {bgv.completedDate}
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Complies with ISO 27001 & Enterprise Hiring Standards</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReject}
            disabled={isProcessing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            <XCircle className="h-4 w-4 text-slate-400" />
            <span>Flag for HR Review</span>
          </button>
          <button
            type="button"
            onClick={onApprove}
            disabled={isProcessing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-teal-600/20 transition-all cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {isProcessing
                ? "Processing..."
                : "Clear BGV & Authorize Onboarding"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
