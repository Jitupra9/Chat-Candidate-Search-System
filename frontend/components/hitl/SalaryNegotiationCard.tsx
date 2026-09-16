"use client";

import React, { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Scale,
} from "lucide-react";
import { SalaryNegotiationPayload } from "@/lib/types";

interface SalaryNegotiationCardProps {
  negotiation: SalaryNegotiationPayload;
  onApprove: () => void;
  onReject: () => void;
  isProcessing?: boolean;
}

export default function SalaryNegotiationCard({
  negotiation,
  onApprove,
  onReject,
  isProcessing,
}: SalaryNegotiationCardProps) {
  const [base, setBase] = useState(
    negotiation.suggestedCounterPackage.baseSalary,
  );
  const [signOn, setSignOn] = useState(
    negotiation.suggestedCounterPackage.signOnBonus,
  );
  const [equity, setEquity] = useState(
    negotiation.suggestedCounterPackage.equityGrant,
  );

  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/90 p-5 space-y-4 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Candidate Counter-Offer Negotiation & Budget Analyzer
              </h3>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                L5 Band Verified
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Candidate:{" "}
              <span className="text-slate-200 font-semibold">
                {negotiation.candidateName}
              </span>{" "}
              ({negotiation.roleTitle})
            </p>
          </div>
        </div>

        {/* Band Status */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {negotiation.withinBand ? (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4" /> Within Approved Budget Band
            </span>
          ) : (
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" /> Requires VP Finance Approval
            </span>
          )}
        </div>
      </div>

      {/* Salary Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Initial Offered Base
          </span>
          <p className="text-sm font-bold text-slate-300">
            {negotiation.initialOfferBase}
          </p>
          <span className="text-[10px] text-slate-500">
            Standard market offer
          </span>
        </div>

        <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-500/20 space-y-1">
          <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider block">
            Candidate Counter Ask
          </span>
          <p className="text-sm font-bold text-white">
            {negotiation.candidateCounterAsk}
          </p>
          <span className="text-[10px] text-indigo-300/80">
            Competing offer leverage
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
          <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
            Approved Role Budget Band
          </span>
          <p className="text-sm font-bold text-emerald-400">
            {negotiation.approvedBudgetBand}
          </p>
          <span className="text-[10px] text-slate-500">
            Compensation committee limit
          </span>
        </div>
      </div>

      {/* AI Strategy & Equity Parity Analysis */}
      <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3.5 space-y-1.5 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-indigo-300">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>AI Compensation Strategy Recommendation</span>
        </div>
        <p className="text-slate-300 leading-relaxed">
          {negotiation.aiCompensationAnalysis}
        </p>
      </div>

      {/* Recommended Counter Package (Interactive) */}
      <div className="space-y-2 text-xs">
        <h4 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Scale className="h-3.5 w-3.5 text-indigo-400" />
          Optimized Counter Package Configuration
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              Base Salary ($/yr)
            </span>
            <input
              type="text"
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              Sign-on Bonus
            </span>
            <input
              type="text"
              value={signOn}
              onChange={(e) => setSignOn(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase">
              Equity Grant (RSUs)
            </span>
            <input
              type="text"
              value={equity}
              onChange={(e) => setEquity(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-white/5">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          <span>Complies with Equal Pay & Internal Equity Index</span>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReject}
            disabled={isProcessing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
          >
            <XCircle className="h-4 w-4 text-slate-400" />
            <span>Decline Counter-Ask</span>
          </button>
          <button
            type="button"
            onClick={onApprove}
            disabled={isProcessing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>
              {isProcessing ? "Updating..." : "Approve Revised Offer"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
