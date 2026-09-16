"use client";

import React, { useState } from "react";
import {
  User,
  ShieldCheck,
  Building,
  Mail,
  CheckCircle2,
  Lock,
  LogOut,
  Sparkles,
  Settings,
  Bell,
  Check,
  Key,
} from "lucide-react";
import { UserProfile } from "@/lib/types";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSwitchUser?: (user: UserProfile) => void;
  onLogout?: () => void;
}

export const MOCK_PROFILES: UserProfile[] = [
  {
    id: "usr-1",
    name: "Sarah Jenkins",
    email: "sarah.jenkins@talentpulse.ai",
    role: "Lead Technical Recruiter",
    department: "Talent Acquisition",
    companyName: "TalentPulse AI",
    avatarInitials: "SJ",
    status: "active",
  },
  {
    id: "usr-2",
    name: "Alex Morgan",
    email: "alex.morgan@talentpulse.ai",
    role: "VP of Talent & People Ops",
    department: "Executive Recruiting",
    companyName: "TalentPulse AI",
    avatarInitials: "AM",
    status: "active",
  },
  {
    id: "usr-3",
    name: "Marcus Chen",
    email: "marcus.chen@talentpulse.ai",
    role: "Engineering Director & Hiring Manager",
    department: "AI & Platform Engineering",
    companyName: "TalentPulse AI",
    avatarInitials: "MC",
    status: "active",
  },
];

export default function UserProfileModal({
  isOpen,
  onClose,
  currentUser,
  onSwitchUser,
  onLogout,
}: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<
    "profile" | "settings" | "accounts"
  >("profile");
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [companyName, setCompanyName] = useState(currentUser.companyName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Settings states
  const [defaultPlatform, setDefaultPlatform] = useState<
    "Google Meet" | "Teams" | "Zoom"
  >("Google Meet");
  const [hitlStrict, setHitlStrict] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 font-bold text-white text-base shadow-lg shadow-indigo-600/30">
              {currentUser.avatarInitials}
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-slate-900"></span>
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {currentUser.name}
              </h3>
              <p className="text-xs text-indigo-300 font-medium">
                {currentUser.role} • {currentUser.companyName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-white/10 bg-slate-950/60 px-5 text-xs font-semibold text-slate-400">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "profile"
                ? "border-indigo-500 text-white"
                : "border-transparent hover:text-slate-200"
            }`}
          >
            Profile Info
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "settings"
                ? "border-indigo-500 text-white"
                : "border-transparent hover:text-slate-200"
            }`}
          >
            Preferences & Safeguards
          </button>
          <button
            onClick={() => setActiveTab("accounts")}
            className={`py-3 px-3 border-b-2 transition-all cursor-pointer ${
              activeTab === "accounts"
                ? "border-indigo-500 text-white"
                : "border-transparent hover:text-slate-200"
            }`}
          >
            Switch Recruiter Account
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-5 space-y-4 text-xs">
          {activeTab === "profile" && (
            <div className="space-y-3.5">
              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Corporate Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl bg-slate-950 border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <span>
                    HR Role: <strong>Enterprise Administrator</strong>
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Full Access
                </span>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-3.5">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-2">
                <span className="text-[11px] font-semibold text-slate-300 block">
                  Default Interview Meeting Platform
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {(["Google Meet", "Teams", "Zoom"] as const).map((plat) => (
                    <button
                      key={plat}
                      type="button"
                      onClick={() => setDefaultPlatform(plat)}
                      className={`p-2 rounded-xl text-center border font-medium text-xs transition-all cursor-pointer ${
                        defaultPlatform === plat
                          ? "bg-indigo-600/20 border-indigo-500 text-white"
                          : "bg-slate-900 border-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      {plat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">
                    Strict HITL Approval Safeguard
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Requires manual confirmation for all external emails,
                    LinkedIn posts, and offer letters.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={hitlStrict}
                  onChange={(e) => setHitlStrict(e.target.checked)}
                  className="rounded border-white/20 bg-slate-900 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-white/5 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-white">
                    Candidate Reply Notifications
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    Real-time desktop alerts when candidates confirm or request
                    interview reschedules.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="rounded border-white/20 bg-slate-900 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
              </div>
            </div>
          )}

          {activeTab === "accounts" && (
            <div className="space-y-2">
              <p className="text-[11px] text-slate-400 mb-2">
                Switch active recruiter persona to test different hiring
                permissions and approval roles:
              </p>
              {MOCK_PROFILES.map((profile) => (
                <div
                  key={profile.id}
                  onClick={() => onSwitchUser && onSwitchUser(profile)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    currentUser.id === profile.id
                      ? "bg-indigo-600/15 border-indigo-500 text-white"
                      : "bg-slate-950 border-white/5 text-slate-300 hover:bg-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                      {profile.avatarInitials}
                    </div>
                    <div>
                      <p className="font-bold text-xs">{profile.name}</p>
                      <p className="text-[10px] text-slate-400">
                        {profile.role}
                      </p>
                    </div>
                  </div>

                  {currentUser.id === profile.id ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                      <Check className="h-3 w-3" /> Active
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500 hover:text-white">
                      Switch
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer with Log Out and Save */}
        <div className="p-4 border-t border-white/10 bg-slate-950/80 flex items-center justify-between">
          <div>
            {onLogout && (
              <button
                onClick={onLogout}
                className="flex items-center gap-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 px-3.5 py-2 text-xs font-bold text-rose-400 transition-colors cursor-pointer"
                title="Log out of TalentPulse"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-indigo-600/30 cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <span>Save & Close</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
