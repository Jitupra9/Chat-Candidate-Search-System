"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Clock,
  Search,
  Users,
  Mail,
  Calendar,
  Briefcase,
  FileText,
  ShieldCheck,
  Eye,
  Check,
  Sparkles,
} from "lucide-react";
import {
  AuditLogEntry,
  HRActivityCategory,
  HRActivityStatus,
} from "@/lib/types";

interface AuditLogViewProps {
  logs: AuditLogEntry[];
  onNavigateToTab?: (tab: string) => void;
}

export default function AuditLogView({
  logs,
  onNavigateToTab,
}: AuditLogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);

  // Normalize status for counting and display
  const isCompleted = (s: HRActivityStatus) =>
    s === "completed" || s === "success" || s === "approved";
  const isPending = (s: HRActivityStatus) => s === "pending_approval";
  const isActionRequired = (s: HRActivityStatus) =>
    s === "action_required" || s === "blocked" || s === "rejected";

  // Summary Metrics
  const totalCount = logs.length;
  const completedCount = logs.filter((l) => isCompleted(l.status)).length;
  const pendingCount = logs.filter((l) => isPending(l.status)).length;
  const actionRequiredCount = logs.filter((l) =>
    isActionRequired(l.status),
  ).length;

  // Filtered Logs
  const filteredLogs = logs.filter((log) => {
    // Status filter
    if (statusFilter === "completed" && !isCompleted(log.status)) return false;
    if (statusFilter === "pending" && !isPending(log.status)) return false;
    if (statusFilter === "action_required" && !isActionRequired(log.status))
      return false;

    // Category filter
    if (categoryFilter !== "all" && log.category !== categoryFilter)
      return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (log.title || "").toLowerCase().includes(q);
      const matchSummary = (log.summary || "").toLowerCase().includes(q);
      const matchCandidate = (log.candidateName || "")
        .toLowerCase()
        .includes(q);
      const matchRole = (log.jobRole || "").toLowerCase().includes(q);
      const matchActor = (log.actor || "").toLowerCase().includes(q);
      const matchDetails = (log.details || "").toLowerCase().includes(q);
      return (
        matchTitle ||
        matchSummary ||
        matchCandidate ||
        matchRole ||
        matchActor ||
        matchDetails
      );
    }
    return true;
  });

  const getCategoryBadge = (category: HRActivityCategory) => {
    switch (category) {
      case "outreach":
        return {
          label: "Candidate Outreach",
          icon: Mail,
          className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        };
      case "scheduling":
        return {
          label: "Interview & Calendar",
          icon: Calendar,
          className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
        };
      case "sourcing":
        return {
          label: "Job Post & Sourcing",
          icon: Briefcase,
          className: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        };
      case "screening":
        return {
          label: "Resume Screening",
          icon: FileText,
          className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        };
      case "pipeline":
        return {
          label: "Pipeline Updates",
          icon: Users,
          className: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      case "compliance":
        return {
          label: "Compliance & Policy",
          icon: ShieldCheck,
          className: "bg-slate-500/10 text-slate-300 border-slate-500/20",
        };
      default:
        return {
          label: "Recruitment Action",
          icon: FileSpreadsheet,
          className: "bg-slate-500/10 text-slate-400 border-white/10",
        };
    }
  };

  const formatTimestamp = (date: Date) => {
    try {
      const now = new Date();
      const diffMs = now.getTime() - new Date(date).getTime();
      const diffMins = Math.floor(diffMs / (1000 * 60));
      const diffHours = Math.floor(diffMins / 60);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      return new Date(date).toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Recent";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-md shadow-indigo-600/20 text-white">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Recruitment Activity History & Logs
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete timeline of candidate outreach, interview schedules,
                job postings, and recruiter decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-white/10 px-3.5 py-1.5 rounded-xl">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">
            Live Activity Ledger
          </span>
        </div>
      </div>

      {/* HR Executive KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        {/* Total Actions */}
        <button
          onClick={() => setStatusFilter("all")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === "all"
              ? "bg-slate-900 border-indigo-500/50 ring-1 ring-indigo-500/30"
              : "bg-slate-900/60 border-white/10 hover:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              Total Activities
            </span>
            <div className="h-7 w-7 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white mt-2 font-mono">
            {totalCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Recorded in current hiring cycle
          </p>
        </button>

        {/* Completed Actions */}
        <button
          onClick={() => setStatusFilter("completed")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === "completed"
              ? "bg-slate-900 border-emerald-500/50 ring-1 ring-emerald-500/30"
              : "bg-slate-900/60 border-white/10 hover:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400">
              Completed & Dispatched
            </span>
            <div className="h-7 w-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-2 font-mono">
            {completedCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Emails sent, posts & interviews locked
          </p>
        </button>

        {/* Pending Approval Actions */}
        <button
          onClick={() => setStatusFilter("pending")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === "pending"
              ? "bg-slate-900 border-amber-500/50 ring-1 ring-amber-500/30"
              : "bg-slate-900/60 border-white/10 hover:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-400">
              Pending Your Review
            </span>
            <div className="h-7 w-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-amber-400 mt-2 font-mono">
            {pendingCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Awaiting recruiter approval in queue
          </p>
        </button>

        {/* Action Required */}
        <button
          onClick={() => setStatusFilter("action_required")}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === "action_required"
              ? "bg-slate-900 border-rose-500/50 ring-1 ring-rose-500/30"
              : "bg-slate-900/60 border-white/10 hover:bg-slate-900"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-400">
              Action Required / Alerts
            </span>
            <div className="h-7 w-7 rounded-lg bg-rose-500/10 flex items-center justify-center text-rose-400">
              <AlertCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-rose-400 mt-2 font-mono">
            {actionRequiredCount}
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Reschedule requests & notifications
          </p>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/70 p-3 rounded-2xl border border-white/10">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              statusFilter === "all"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setStatusFilter("completed")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              statusFilter === "completed"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
            }`}
          >
            <Check className="h-3 w-3" /> Completed ({completedCount})
          </button>
          <button
            onClick={() => setStatusFilter("pending")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              statusFilter === "pending"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-400 hover:text-amber-400 hover:bg-slate-800"
            }`}
          >
            <Clock className="h-3 w-3" /> Pending Review ({pendingCount})
          </button>
          <button
            onClick={() => setStatusFilter("action_required")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 ${
              statusFilter === "action_required"
                ? "bg-rose-600 text-white shadow-sm"
                : "text-slate-400 hover:text-rose-400 hover:bg-slate-800"
            }`}
          >
            <AlertCircle className="h-3 w-3" /> Action Required (
            {actionRequiredCount})
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search candidate, role, action..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-white/10 pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-xl bg-slate-950 border border-white/10 px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 shrink-0"
          >
            <option value="all">All Categories</option>
            <option value="outreach">Candidate Outreach</option>
            <option value="scheduling">Interviews & Calendar</option>
            <option value="sourcing">Job Postings & Sourcing</option>
            <option value="screening">Resume Screening</option>
            <option value="pipeline">Pipeline Updates</option>
            <option value="compliance">Compliance & Policy</option>
          </select>
        </div>
      </div>

      {/* Activity Table */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="p-3.5">Time</th>
                <th className="p-3.5">Activity & Candidate</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Initiated By</th>
                <th className="p-3.5">Recruiter Summary</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No recruitment activities match your current filter.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => {
                  const catInfo = getCategoryBadge(log.category);
                  const CatIcon = catInfo.icon;
                  const completed = isCompleted(log.status);
                  const pending = isPending(log.status);
                  const actionReq = isActionRequired(log.status);

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLog(log)}
                    >
                      {/* Time */}
                      <td className="p-3.5 whitespace-nowrap text-slate-400 text-[11px] font-medium">
                        {formatTimestamp(log.timestamp)}
                      </td>

                      {/* Activity & Candidate */}
                      <td className="p-3.5 max-w-xs">
                        <div className="font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors text-xs">
                          {log.title || log.details || "Recruitment Action"}
                        </div>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          {log.candidateName && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-300 border border-white/5 font-medium">
                              <Users className="h-2.5 w-2.5 text-indigo-400" />
                              {log.candidateName}
                            </span>
                          )}
                          {log.jobRole && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400 border border-white/5">
                              <Briefcase className="h-2.5 w-2.5 text-purple-400" />
                              {log.jobRole}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-3.5 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-medium border ${catInfo.className}`}
                        >
                          <CatIcon className="h-3 w-3" />
                          {catInfo.label}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-3.5 whitespace-nowrap">
                        {completed && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                            <CheckCircle2 className="h-3 w-3" /> Completed
                          </span>
                        )}
                        {pending && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-amber-400">
                            <Clock className="h-3 w-3" /> Pending Review
                          </span>
                        )}
                        {actionReq && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-rose-400">
                            <AlertCircle className="h-3 w-3" /> Action Required
                          </span>
                        )}
                      </td>

                      {/* Initiated By */}
                      <td className="p-3.5 whitespace-nowrap text-slate-400 text-xs">
                        <div className="flex items-center gap-1.5">
                          {log.actor?.includes("Sarah") ? (
                            <div className="h-5 w-5 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                              SJ
                            </div>
                          ) : (
                            <div className="h-5 w-5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold shrink-0">
                              <Sparkles className="h-3 w-3" />
                            </div>
                          )}
                          <span className="truncate max-w-[120px]">
                            {log.actor || log.operator || "AI Assistant"}
                          </span>
                        </div>
                      </td>

                      {/* Summary */}
                      <td className="p-3.5 max-w-md text-slate-300 text-xs">
                        <p className="line-clamp-2 leading-relaxed">
                          {log.summary || log.llmReasoning || log.details}
                        </p>
                      </td>

                      {/* Action */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLog(log);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-white/5 px-2.5 py-1 text-xs text-indigo-300 font-medium transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>View Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* HR Activity Details Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold border ${
                      getCategoryBadge(selectedLog.category).className
                    }`}
                  >
                    {getCategoryBadge(selectedLog.category).label}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(selectedLog.timestamp).toLocaleString()}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">
                  {selectedLog.title || selectedLog.details}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 text-xs">
              {/* Status & Performed By Banner */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-white/5">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">
                    Current Status
                  </span>
                  {isCompleted(selectedLog.status) && (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  )}
                  {isPending(selectedLog.status) && (
                    <span className="inline-flex items-center gap-1 text-amber-400 font-semibold">
                      <Clock className="h-3.5 w-3.5" /> Pending Recruiter Review
                    </span>
                  )}
                  {isActionRequired(selectedLog.status) && (
                    <span className="inline-flex items-center gap-1 text-rose-400 font-semibold">
                      <AlertCircle className="h-3.5 w-3.5" /> Action Required
                    </span>
                  )}
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">
                    Initiator
                  </span>
                  <span className="font-semibold text-slate-200">
                    {selectedLog.actor ||
                      selectedLog.operator ||
                      "AI Assistant"}
                  </span>
                </div>
              </div>

              {/* What Happened */}
              <div>
                <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1 text-[10px]">
                  What Happened (Recruiter Summary)
                </span>
                <p className="p-3.5 rounded-xl bg-slate-950 border border-white/5 text-slate-200 leading-relaxed">
                  {selectedLog.summary ||
                    selectedLog.details ||
                    selectedLog.llmReasoning}
                </p>
              </div>

              {/* Business Impact */}
              {selectedLog.businessImpact && (
                <div>
                  <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1 text-[10px]">
                    Impact on Candidate / Hiring Pipeline
                  </span>
                  <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 leading-relaxed font-medium">
                    {selectedLog.businessImpact}
                  </div>
                </div>
              )}

              {/* Candidate / Job Context */}
              {(selectedLog.candidateName || selectedLog.jobRole) && (
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950 border border-white/5">
                  {selectedLog.candidateName && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">
                        Candidate
                      </span>
                      <span className="font-medium text-slate-200">
                        {selectedLog.candidateName}
                      </span>
                    </div>
                  )}
                  {selectedLog.jobRole && (
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold block mb-0.5">
                        Job Requisition
                      </span>
                      <span className="font-medium text-slate-200">
                        {selectedLog.jobRole}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Key Details / Metadata if present */}
              {selectedLog.metadata &&
                Object.keys(selectedLog.metadata).length > 0 && (
                  <div>
                    <span className="font-semibold text-slate-400 uppercase tracking-wider block mb-1 text-[10px]">
                      Action Attributes
                    </span>
                    <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-950 border border-white/5">
                      {Object.entries(selectedLog.metadata).map(
                        ([key, val]) => (
                          <div key={key} className="truncate">
                            <span className="text-[10px] text-slate-500 font-mono capitalize block">
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </span>
                            <span className="text-slate-300 font-medium">
                              {Array.isArray(val)
                                ? val.join(", ")
                                : typeof val === "object"
                                  ? JSON.stringify(val)
                                  : String(val)}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                {isPending(selectedLog.status) && (
                  <span className="text-amber-400 text-xs font-medium">
                    💡 You can approve or modify this draft in the Approvals
                    queue.
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedLog(null)}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
