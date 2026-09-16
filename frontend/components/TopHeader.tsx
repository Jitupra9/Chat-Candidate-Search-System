"use client";

import React from "react";
import {
  Briefcase,
  Upload,
  ShieldCheck,
  Mail,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { NavTab } from "./Navbar";
import { UserProfile } from "@/lib/types";

interface TopHeaderProps {
  activeTab: NavTab;
  onTabChange?: (tab: NavTab) => void;
  pendingActionsCount: number;
  inboundUnreadCount: number;
  onNewJobRequisition?: () => void;
  onOpenUpload?: () => void;
  onOpenAnalytics?: () => void;
  onOpenProfile?: () => void;
  currentUser?: UserProfile;
}

export default function TopHeader({
  activeTab,
  onTabChange,
  pendingActionsCount,
  inboundUnreadCount,
  onNewJobRequisition,
  onOpenUpload,
  onOpenAnalytics,
  onOpenProfile,
  currentUser,
}: TopHeaderProps) {
  const getTabInfo = (tab: NavTab) => {
    switch (tab) {
      case "chat":
        return {
          title: "AI Recruiting Assistant",
          subtitle:
            "Search candidates in natural language, draft job posts, and manage hiring workflows",
        };
      case "pipeline":
        return {
          title: "Candidate Talent Pipeline",
          subtitle:
            "Filter and review candidate profiles by skills, experience, and match score",
        };
      case "hitl":
        return {
          title: "Action Approvals & Verification",
          subtitle:
            "Review and approve all emails, job postings, and interview invitations before they are sent",
        };
      case "linkedin":
        return {
          title: "LinkedIn Sourcing & Requisitions",
          subtitle:
            "Create job posts and review incoming candidate inquiries from LinkedIn",
        };
      case "inbox":
        return {
          title: "Candidate Messages & Replies",
          subtitle:
            "Track candidate email conversations and interview confirmations",
        };
      case "audit":
        return {
          title: "Recruitment Activity History & Logs",
          subtitle:
            "Complete timeline of candidate outreach, interview schedules, job postings, and recruiter decisions",
        };
    }
  };

  const info = getTabInfo(activeTab);

  return (
    <header className="h-16 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-20">
      {/* Active Workspace Title & Subtitle */}
      <div className="min-w-0 flex-1 mr-4">
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
          {info.title}
        </h2>
        <p className="text-[11px] text-slate-400 hidden sm:block truncate mt-0.5">
          {info.subtitle}
        </p>
      </div>

      {/* Right Controls & Quick Action Command Bar */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Quick Action: Pipeline Analytics Funnel Modal */}
        {onOpenAnalytics && (
          <button
            onClick={onOpenAnalytics}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer"
            title="View Recruitment Velocity & Conversion Funnel"
          >
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span className="hidden md:inline">Analytics</span>
          </button>
        )}

        {/* Quick Action: Job Requisition Modal */}
        {onNewJobRequisition && (
          <button
            onClick={onNewJobRequisition}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer"
            title="Create a new job requisition"
          >
            <Briefcase className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden md:inline">Job Requisition</span>
            <span className="md:hidden">Requisition</span>
          </button>
        )}

        {/* Quick Action: Upload Resumes Modal */}
        {onOpenUpload && (
          <button
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:text-white transition-all shadow-sm cursor-pointer"
            title="Upload and process resumes"
          >
            <Upload className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden md:inline">Upload Resumes</span>
            <span className="md:hidden">Upload</span>
          </button>
        )}

        {/* Pending HITL Approvals Alert Badge */}
        {pendingActionsCount > 0 && (
          <button
            onClick={() => onTabChange && onTabChange("hitl")}
            className="flex items-center gap-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 text-xs font-semibold text-amber-400 transition-all cursor-pointer shadow-sm"
            title="Review pending human-in-the-loop approvals"
          >
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
            <span>{pendingActionsCount} Pending Review</span>
          </button>
        )}

        {/* Inbound Candidate Replies Alert Badge */}
        {inboundUnreadCount > 0 && (
          <button
            onClick={() => onTabChange && onTabChange("inbox")}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-semibold text-emerald-400 transition-all cursor-pointer shadow-sm"
            title="View candidate replies"
          >
            <Mail className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">
              {inboundUnreadCount} New Reply
            </span>
          </button>
        )}

        {/* Divider */}
        <div className="h-6 w-px bg-white/10 hidden sm:block" />

        {/* Interactive Recruiter Profile Chip */}
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-2 pl-1 py-1 rounded-xl hover:bg-slate-900 border border-transparent hover:border-white/10 transition-all cursor-pointer"
          title="Open Profile Settings & Switch Account"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 font-bold text-white text-xs shadow-md shadow-indigo-500/20">
            {currentUser?.avatarInitials || "SJ"}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 border border-slate-950"></span>
            </span>
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-white leading-tight">
              {currentUser?.name || "Sarah Jenkins"}
            </p>
            <p className="text-[10px] text-slate-400 leading-tight">
              {currentUser?.role || "Lead Recruiter"}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}
