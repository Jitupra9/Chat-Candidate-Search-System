"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Plus,
  Upload,
  MessageSquare,
  Users,
  ShieldCheck,
  Mail,
  FileSpreadsheet,
  Search,
  Pin,
  Trash2,
  Briefcase,
  Layers,
  Database,
  CheckCircle2,
} from "lucide-react";
import { NavTab } from "./Navbar";
import { LinkedInIcon } from "./icons/LinkedInIcon";

export interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  isPinned: boolean;
  snippet: string;
}

interface UnifiedSidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  pendingActionsCount: number;
  inboundUnreadCount: number;
  onNewChat: () => void;
  currentChatId?: string | null;
  onSelectChatSession?: (chatId: string) => void;
}

export default function UnifiedSidebar({
  activeTab,
  onTabChange,
  pendingActionsCount,
  inboundUnreadCount,
  onNewChat,
  currentChatId,
  onSelectChatSession,
}: UnifiedSidebarProps) {
  const [chatSearch, setChatSearch] = useState("");
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: "session-1",
      title: "Senior AI Engineer Requisition",
      snippet: "Created job post & candidate filter 5+ yr exp",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isPinned: true,
    },
    {
      id: "session-2",
      title: "Shortlist Top Python Candidates",
      snippet: "Invited Alex Rivera & Priya Sharma for interview",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isPinned: true,
    },
    {
      id: "session-3",
      title: "Candidate Interview Replies",
      snippet: "Alex Rivera confirmed Oct 12 interview slot",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isPinned: false,
    },
  ]);

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setChatSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handleTogglePin = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setChatSessions((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPinned: !s.isPinned } : s)),
    );
  };

  const navItems = [
    {
      id: "chat" as NavTab,
      label: "AI Recruiter Assistant",
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
      label: "Approvals & Verification",
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
      label: "Messages & Replies",
      icon: Mail,
      badge: inboundUnreadCount > 0 ? inboundUnreadCount : null,
      badgeColor: "bg-emerald-500 text-slate-950 font-bold",
    },
    {
      id: "audit" as NavTab,
      label: "Activity History & Logs",
      icon: FileSpreadsheet,
      badge: null,
    },
  ];

  const filteredSessions = chatSessions.filter(
    (s) =>
      s.title.toLowerCase().includes(chatSearch.toLowerCase()) ||
      s.snippet.toLowerCase().includes(chatSearch.toLowerCase()),
  );

  return (
    <aside className="w-64 bg-slate-950 border-r border-white/10 flex flex-col h-screen shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 shadow-lg shadow-indigo-600/30">
            <Sparkles className="h-4 w-4 text-white animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold tracking-tight text-white">
                TalentPulse
              </h1>
              <span className="rounded-full bg-indigo-500/10 px-1.5 py-0.2 text-[9px] font-semibold text-indigo-400 border border-indigo-500/20">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Recruitment Assistant</p>
          </div>
        </div>
      </div>

      {/* Top Action: New Conversation */}
      <div className="p-3 border-b border-white/10">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 p-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New Conversation</span>
        </button>
      </div>

      {/* Main Workspace Navigation Menu */}
      <div className="p-3 border-b border-white/10">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 mb-1.5">
          Workspaces
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center justify-between rounded-xl px-2.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-600/90 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40 font-semibold"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon
                    className={`h-4 w-4 ${isActive ? "text-white" : "text-slate-400"}`}
                  />
                  <div className="text-left">
                    <p className="leading-none text-xs">{item.label}</p>
                  </div>
                </div>

                {item.badge !== null && (
                  <span
                    className={`flex h-4 min-w-4 items-center justify-center rounded-full px-1.5 text-[10px] ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Recent Chat Conversations Section (Full Height) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="flex items-center justify-between px-2 mb-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Conversations
          </span>
          <span className="text-[10px] text-indigo-400 font-medium">
            {chatSessions.length}
          </span>
        </div>

        {/* Quick Search */}
        <div className="relative mb-2">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            placeholder="Search history..."
            value={chatSearch}
            onChange={(e) => setChatSearch(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-white/5 pl-8 pr-3 py-1.5 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="space-y-1">
          {filteredSessions.map((session) => {
            const isSelected = currentChatId === session.id;
            return (
              <div
                key={session.id}
                onClick={() => {
                  onTabChange("chat");
                  if (onSelectChatSession) onSelectChatSession(session.id);
                }}
                className={`group relative flex items-start justify-between rounded-xl p-2.5 text-xs transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-slate-900 border-indigo-500/40 text-white shadow-sm"
                    : "border-transparent text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                }`}
              >
                <div className="min-w-0 flex-1 pr-1">
                  <div className="flex items-center gap-1.5">
                    {session.isPinned && (
                      <Pin className="h-3 w-3 text-amber-400 shrink-0 rotate-45" />
                    )}
                    <p className="font-medium text-xs truncate text-slate-200">
                      {session.title}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-500 truncate mt-0.5">
                    {session.snippet}
                  </p>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button
                    onClick={(e) => handleTogglePin(e, session.id)}
                    className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                    title={session.isPinned ? "Unpin" : "Pin"}
                  >
                    <Pin className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteSession(e, session.id)}
                    className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                    title="Delete Conversation"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
