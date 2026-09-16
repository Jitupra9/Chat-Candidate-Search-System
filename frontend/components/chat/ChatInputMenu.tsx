"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  Cpu,
  Upload,
  Brain,
  Search,
  Check,
  ChevronRight,
} from "lucide-react";

export interface ModelOption {
  id: string;
  name: string;
  badge: string;
  description: string;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "claude-3-7-sonnet",
    name: "Advanced AI Recruiter",
    badge: "Recommended",
    description:
      "Best for candidate ranking, nuanced matching, and email drafting",
  },
  {
    id: "gpt-4o",
    name: "Fast Recruiting Assistant",
    badge: "High Speed",
    description: "Quick resume queries and rapid summary generation",
  },
  {
    id: "deepseek-r1",
    name: "Deep Logic & Timeline Verifier",
    badge: "In-Depth",
    description: "Best for verifying work histories and career progression",
  },
  {
    id: "gemini-2-flash",
    name: "Visual Resume Reader",
    badge: "Multi-Page",
    description: "Fast parsing for multi-column and creative resume layouts",
  },
];

interface ChatInputMenuProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  onOpenUpload: () => void;
  isReasoningActive: boolean;
  onToggleReasoning: () => void;
  searchMode: "hybrid" | "semantic" | "sql";
  onChangeSearchMode: (mode: "hybrid" | "semantic" | "sql") => void;
}

export default function ChatInputMenu({
  selectedModel,
  onSelectModel,
  onOpenUpload,
  isReasoningActive,
  onToggleReasoning,
  searchMode,
  onChangeSearchMode,
}: ChatInputMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModelObj =
    AVAILABLE_MODELS.find((m) => m.id === selectedModel) || AVAILABLE_MODELS[0];

  const getSearchModeLabel = (mode: "hybrid" | "semantic" | "sql") => {
    switch (mode) {
      case "hybrid":
        return "Smart Match (Best)";
      case "semantic":
        return "Skills & Context Match";
      case "sql":
        return "Exact Attributes Only";
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 items-center gap-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-3 text-xs font-medium border border-white/10 transition-all shadow-sm"
        title="AI Settings & Upload"
      >
        <Plus
          className={`h-4 w-4 transition-transform ${isOpen ? "rotate-45 text-indigo-400" : ""}`}
        />
        <span className="hidden sm:inline font-medium text-[11px] text-indigo-300">
          {currentModelObj.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute bottom-12 left-0 w-80 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-2xl p-3.5 shadow-2xl z-50 space-y-3.5 animate-in fade-in slide-in-from-bottom-2">
          {/* Quick Upload Action */}
          <div>
            <button
              onClick={() => {
                onOpenUpload();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-200 transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <Upload className="h-4 w-4" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">
                    Upload New Resumes
                  </p>
                  <p className="text-[10px] text-slate-300">
                    Parse and add candidates to database
                  </p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-indigo-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Model Selector Section */}
          <div className="space-y-1.5 border-t border-white/5 pt-3">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              <span className="flex items-center gap-1">
                <Cpu className="h-3 w-3 text-indigo-400" />
                <span>AI Assistant Engine</span>
              </span>
            </div>

            <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
              {AVAILABLE_MODELS.map((model) => {
                const isSelected = selectedModel === model.id;
                return (
                  <button
                    key={model.id}
                    onClick={() => {
                      onSelectModel(model.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-start justify-between p-2 rounded-xl text-left transition-all border ${
                      isSelected
                        ? "bg-slate-900 border-indigo-500/50 text-white shadow-sm"
                        : "border-transparent text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-white">
                          {model.name}
                        </span>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-1.5 py-0.2 rounded">
                          {model.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {model.description}
                      </p>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Precision & Reasoning */}
          <div className="space-y-2 border-t border-white/5 pt-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              Search & Thinking Options
            </div>

            {/* Deep Reasoning Toggle */}
            <button
              onClick={onToggleReasoning}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-white/5 hover:bg-slate-900 text-xs transition-colors"
            >
              <div className="flex items-center gap-2">
                <Brain
                  className={`h-4 w-4 ${isReasoningActive ? "text-indigo-400" : "text-slate-500"}`}
                />
                <div className="text-left">
                  <p className="font-semibold text-slate-200 text-xs">
                    Show AI Step-by-Step Thinking
                  </p>
                  <p className="text-[10px] text-slate-400">
                    View explanation of matching logic
                  </p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isReasoningActive ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30" : "bg-slate-800 text-slate-500"}`}
              >
                {isReasoningActive ? "ON" : "OFF"}
              </span>
            </button>

            {/* Search Mode Selector */}
            <div className="p-2 rounded-xl bg-slate-900/60 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Search className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Matching Precision:</span>
                </span>
                <span className="text-[10px] text-slate-400">
                  {getSearchModeLabel(searchMode)}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-1 text-[10px]">
                <button
                  onClick={() => onChangeSearchMode("hybrid")}
                  className={`py-1 rounded-lg border font-medium transition-all ${
                    searchMode === "hybrid"
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold"
                      : "bg-slate-950 text-slate-400 border-transparent hover:text-white"
                  }`}
                >
                  Smart Match
                </button>
                <button
                  onClick={() => onChangeSearchMode("semantic")}
                  className={`py-1 rounded-lg border font-medium transition-all ${
                    searchMode === "semantic"
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold"
                      : "bg-slate-950 text-slate-400 border-transparent hover:text-white"
                  }`}
                >
                  Skill Focus
                </button>
                <button
                  onClick={() => onChangeSearchMode("sql")}
                  className={`py-1 rounded-lg border font-medium transition-all ${
                    searchMode === "sql"
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold"
                      : "bg-slate-950 text-slate-400 border-transparent hover:text-white"
                  }`}
                >
                  Exact Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
