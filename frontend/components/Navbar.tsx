"use client";

import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Upload,
  MessageSquare,
  Users,
  CheckCircle2,
  Mail,
  FileSpreadsheet,
  Plus,
} from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";

export type NavTab =
  | "chat"
  | "pipeline"
  | "hitl"
  | "linkedin"
  | "inbox"
  | "audit";

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingActionsCount: number;
  inboundUnreadCount: number;
  onOpenUpload: () => void;
  onNewJobRequisition: () => void;
}

export default function Navbar({
  activeTab,
  onTabChange,
  pendingActionsCount,
  inboundUnreadCount,
  onOpenUpload,
  onNewJobRequisition,
}: NavbarProps) {
  const navItems = [
    {
      id: "chat" as NavTab,
      label: "AI Recruiter Agent",
      icon: MessageSquare,
      badge: null,
    },
    {
      id: "pipeline" as NavTab,
      label: "Candidate Pipeline",
      icon: Users,
      badge: null,
    },
    {
      id: "hitl" as NavTab,
      label: "HITL Approvals",
      icon: ShieldCheck,
      badge: pendingActionsCount > 0 ? pendingActionsCount : null,
      badgeColor: "bg-amber-500 text-slate-950 font-bold",
    },
    {
      id: "linkedin" as NavTab,
      label: "LinkedIn Sourcing",
      icon: LinkedInIcon,
      badge: null,
    },
    {
      id: "inbox" as NavTab,
      label: "Email & Replies",
      icon: Mail,
      badge: inboundUnreadCount > 0 ? inboundUnreadCount : null,
      badgeColor: "bg-emerald-500 text-slate-950 font-bold",
    },
    {
      id: "audit" as NavTab,
      label: "Audit & Compliance",
      icon: FileSpreadsheet,
      badge: null,
    },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand & Agent Status */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
            <Sparkles className="h-5 w-5 text-white animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold tracking-tight text-white">
                TalentPulse AI
              </span>
              <span className="rounded-full bg-indigo-500/10 px-2 py-0.5 text-[10px] font-semibold text-indigo-400 border border-indigo-500/20">
                Agent v2.4
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>HITL Guard Active</span>
              <span className="text-slate-600">•</span>
              <span>Vector + SQL Synced</span>
            </div>
          </div>
        </div>

        {/* Workspace Tab Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`relative flex items-center gap-2 rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`}
                />
                <span>{item.label}</span>
                {item.badge !== null && (
                  <span
                    className={`ml-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onNewJobRequisition}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 transition-all shadow-sm"
          >
            <Plus className="h-3.5 w-3.5 text-indigo-400" />
            <span>New Requisition</span>
          </button>

          <button
            onClick={onOpenUpload}
            className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Upload className="h-3.5 w-3.5 text-white" />
            <span>Upload Resumes</span>
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Secondary Nav */}
      <div className="flex lg:hidden overflow-x-auto px-4 py-2 bg-slate-900/60 border-t border-white/5 gap-1.5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 bg-slate-800/50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
              {item.badge !== null && (
                <span
                  className={`ml-0.5 flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-1 text-[9px] ${item.badgeColor}`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
