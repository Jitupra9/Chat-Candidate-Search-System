"use client";

import React, { useState } from "react";
import {
  Plus,
  Sparkles,
  Users,
  MessageSquare,
  Share2,
  TrendingUp,
  UserPlus,
  CheckCircle2,
  ExternalLink,
  Briefcase,
} from "lucide-react";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { LinkedInPost } from "@/lib/types";

interface LinkedInSourcingHubProps {
  posts: LinkedInPost[];
  onCreateNewPost: () => void;
  onImportLeadToDB: (leadId: string) => void;
}

export default function LinkedInSourcingHub({
  posts,
  onCreateNewPost,
  onImportLeadToDB,
}: LinkedInSourcingHubProps) {
  const [selectedPost, setSelectedPost] = useState<LinkedInPost | null>(
    posts[0] || null,
  );

  const totalImpressions = posts.reduce((acc, p) => acc + p.impressions, 0);
  const totalApplicants = posts.reduce((acc, p) => acc + p.applicantsCount, 0);
  const totalComments = posts.reduce((acc, p) => acc + p.commentsCount, 0);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-950 p-4 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A66C2] text-white shadow-md shadow-[#0A66C2]/30">
              <LinkedInIcon className="h-5 w-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              LinkedIn Sourcing & Lead Intake Hub
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Agent broadcasts job requisitions and captures inbound candidate
            leads from comments, DMs, and post engagements.
          </p>
        </div>

        <button
          onClick={onCreateNewPost}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all"
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>Ask Agent to Draft New Requisition</span>
        </button>
      </div>

      {/* Social Analytics Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Impressions</span>
            <TrendingUp className="h-4 w-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-bold text-white">
            {totalImpressions.toLocaleString()}
          </p>
          <p className="text-[11px] text-emerald-400 font-medium">
            +18% vs last week
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Direct Applicants</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalApplicants}</p>
          <p className="text-[11px] text-slate-400">Parsed & Vector Indexed</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-4 backdrop-blur-xl space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Lead Interactions (DMs & Comments)</span>
            <MessageSquare className="h-4 w-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalComments}</p>
          <p className="text-[11px] text-indigo-400 font-medium">
            Ready for 1-Click Intake
          </p>
        </div>
      </div>

      {/* Main Content: Active Posts & Lead Intake Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Posts List */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Active Requisition Posts ({posts.length})
          </h2>
          <div className="space-y-3">
            {posts.map((post) => {
              const isSelected = selectedPost?.id === post.id;
              return (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                    isSelected
                      ? "border-indigo-500/50 bg-slate-900 shadow-lg shadow-indigo-950/30"
                      : "border-white/10 bg-slate-900/60 hover:bg-slate-900/90"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {post.roleTitle}
                      </h3>
                      <p className="text-xs text-emerald-400 font-medium">
                        {post.salaryRange}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      Published
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 mt-2 font-sans">
                    {post.content}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    <span>Published {post.publishedAt}</span>
                    <span className="text-indigo-400 font-medium">
                      {post.leads.length} Leads Tracked
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Post Lead Stream & Live Intake */}
        {selectedPost && (
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Inbound Leads & Profile Interactions for "
                {selectedPost.roleTitle}"
              </h2>
              <span className="text-[11px] text-slate-500">
                Live LinkedIn Webhook Feed
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-5 space-y-4">
              {selectedPost.leads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-xl border border-white/5 bg-slate-950/80 p-4 space-y-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="h-7 w-7 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center text-xs font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <span className="text-sm font-semibold text-white">
                        {lead.name}
                      </span>
                      <a
                        href={lead.profileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:underline flex items-center gap-0.5"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span>Profile</span>
                      </a>
                    </div>
                    <p className="text-xs text-slate-300 italic pl-9">
                      "{lead.comment}"
                    </p>
                  </div>

                  <div className="shrink-0 pl-9 sm:pl-0">
                    {lead.imported ? (
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-lg">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Imported into Vector DB</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => onImportLeadToDB(lead.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3.5 py-1 text-xs font-semibold text-white shadow transition-all"
                      >
                        <UserPlus className="h-3.5 w-3.5" />
                        <span>1-Click Intake to Pipeline</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
