"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Globe,
  Sun,
  Moon,
  Sparkles,
  Check,
  ChevronDown,
  Palette,
} from "lucide-react";
import { Language, SUPPORTED_LANGUAGES, TRANSLATIONS } from "@/lib/i18n";

export type ThemeMode = "dark" | "light" | "midnight";

interface ThemeLanguageMenuProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
}

export default function ThemeLanguageMenu({
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeChange,
}: ThemeLanguageMenuProps) {
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

  const currentLangObj =
    SUPPORTED_LANGUAGES.find((l) => l.code === currentLang) ||
    SUPPORTED_LANGUAGES[0];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/10 px-2.5 py-1.5 text-xs text-slate-300 hover:text-white transition-all shadow-sm"
        title="Change Language & Theme"
      >
        <span className="text-sm">{currentLangObj.flag}</span>
        <span className="font-medium text-xs hidden sm:inline">
          {currentLangObj.name}
        </span>
        {currentTheme === "light" ? (
          <Sun className="h-3.5 w-3.5 text-amber-400 ml-0.5" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-indigo-400 ml-0.5" />
        )}
        <ChevronDown className="h-3 w-3 text-slate-400 ml-0.5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-slate-950/95 backdrop-blur-xl p-3 shadow-2xl z-50 space-y-3">
          {/* Theme Selector Section */}
          <div className="space-y-1.5 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
              <Palette className="h-3 w-3 text-indigo-400" />
              <span>Appearance & Theme</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                onClick={() => {
                  onThemeChange("dark");
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium transition-all ${
                  currentTheme === "dark"
                    ? "bg-indigo-600/30 border-indigo-500 text-indigo-300 font-bold"
                    : "bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Moon className="h-4 w-4 mb-1 text-indigo-400" />
                <span className="text-[10px]">Dark</span>
              </button>

              <button
                onClick={() => {
                  onThemeChange("light");
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium transition-all ${
                  currentTheme === "light"
                    ? "bg-indigo-600/30 border-indigo-500 text-indigo-300 font-bold"
                    : "bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Sun className="h-4 w-4 mb-1 text-amber-400" />
                <span className="text-[10px]">Light</span>
              </button>

              <button
                onClick={() => {
                  onThemeChange("midnight");
                }}
                className={`flex flex-col items-center justify-center p-2 rounded-xl border text-xs font-medium transition-all ${
                  currentTheme === "midnight"
                    ? "bg-indigo-600/30 border-indigo-500 text-indigo-300 font-bold"
                    : "bg-slate-900 border-white/5 text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Sparkles className="h-4 w-4 mb-1 text-cyan-400" />
                <span className="text-[10px]">Midnight</span>
              </button>
            </div>
          </div>

          {/* Language Selector Section */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 mb-1">
              <Globe className="h-3 w-3 text-emerald-400" />
              <span>Language (8 Languages)</span>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1">
              {SUPPORTED_LANGUAGES.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      onLanguageChange(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? "bg-indigo-600 text-white font-semibold"
                        : "text-slate-300 hover:bg-slate-900 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </div>
                    {isSelected && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
