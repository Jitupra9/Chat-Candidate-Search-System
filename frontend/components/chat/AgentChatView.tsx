"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Bot,
  User,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  CheckCircle2,
  Users,
  Search,
  Briefcase,
  Mail,
  Cpu,
  Clock,
  Copy,
  Check,
} from "lucide-react";
import {
  ChatMessageItem,
  Candidate,
  PendingAction,
  ToolExecutionStep,
} from "@/lib/types";
import LinkedInPostApprovalCard from "../hitl/LinkedInPostApprovalCard";
import EmailApprovalCard from "../hitl/EmailApprovalCard";
import InterviewApprovalCard from "../hitl/InterviewApprovalCard";
import OfferLetterApprovalCard from "../hitl/OfferLetterApprovalCard";
import JoiningLetterApprovalCard from "../hitl/JoiningLetterApprovalCard";
import InterviewRescheduleCard from "../hitl/InterviewRescheduleCard";
import InterviewScorecardCard from "../hitl/InterviewScorecardCard";
import CandidateRejectionCard from "../hitl/CandidateRejectionCard";
import SalaryNegotiationCard from "../hitl/SalaryNegotiationCard";
import BGVTrackerCard from "../hitl/BGVTrackerCard";
import CandidateCard from "../candidates/CandidateCard";
import ChatInputMenu from "./ChatInputMenu";
import MarkdownContent from "./MarkdownContent";

interface AgentChatViewProps {
  messages: ChatMessageItem[];
  pendingActions: PendingAction[];
  allCandidates: Candidate[];
  onSendMessage: (text: string) => void;
  onApproveAction: (actionId: string, updatedPayload?: any) => void;
  onRejectAction: (actionId: string, reason?: string) => void;
  onSelectCandidate: (candidate: Candidate) => void;
  onOpenUploadModal: () => void;
  onOpenRequisitionModal: () => void;
}

export default function AgentChatView({
  messages,
  pendingActions,
  allCandidates,
  onSendMessage,
  onApproveAction,
  onRejectAction,
  onSelectCandidate,
  onOpenUploadModal,
  onOpenRequisitionModal,
}: AgentChatViewProps) {
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [expandedTools, setExpandedTools] = useState<Record<string, boolean>>(
    {},
  );
  const [selectedModel, setSelectedModel] = useState("claude-3-7-sonnet");
  const [isReasoningActive, setIsReasoningActive] = useState(true);
  const [searchMode, setSearchMode] = useState<"hybrid" | "semantic" | "sql">(
    "hybrid",
  );
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMsgId(msgId);
    setTimeout(() => {
      setCopiedMsgId(null);
    }, 2000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing]);

  const toggleToolStep = (msgId: string) => {
    setExpandedTools((prev) => ({ ...prev, [msgId]: !prev[msgId] }));
  };

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;
    const text = inputValue.trim();
    setInputValue("");
    onSendMessage(text);
  };

  // Populate suggestion in input box without direct send so HR can review/edit
  const handleSelectSuggestion = (promptText: string) => {
    setInputValue(promptText);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Welcome starter workflows shown ONLY on fresh / new chat
  const isNewChat = messages.length <= 1;

  const starterWorkflows = [
    {
      icon: Briefcase,
      color:
        "from-indigo-600 to-purple-600 text-indigo-400 border-indigo-500/30",
      title: "Job Requisition & Sourcing Plan",
      desc: "Open the guided wizard to create job specifications and draft social posts.",
      action: onOpenRequisitionModal,
    },
    {
      icon: Search,
      color: "from-cyan-600 to-blue-600 text-cyan-400 border-cyan-500/30",
      title: "Find Qualified Candidates",
      desc: "Search for candidates with specific skills and minimum years of experience.",
      action: () =>
        handleSelectSuggestion(
          "Show me candidates with 5+ years of experience in Python and FastAPI.",
        ),
    },
    {
      icon: Mail,
      color: "from-purple-600 to-pink-600 text-purple-400 border-purple-500/30",
      title: "Draft Shortlist & Interview Emails",
      desc: "Generate personalized candidate invitation drafts for recruiter review.",
      action: () =>
        handleSelectSuggestion(
          "Draft shortlist interview invitation emails for Alex Rivera and Priya Sharma for Thursday 2 PM.",
        ),
    },
    {
      icon: Clock,
      color:
        "from-emerald-600 to-teal-600 text-emerald-400 border-emerald-500/30",
      title: "Review Candidate Replies",
      desc: "Check candidate responses to interview invitations and confirmations.",
      action: () =>
        handleSelectSuggestion(
          "Did any candidates reply to our interview invitations? Summarize their response.",
        ),
    },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#080C14]">
      {/* Messages Feed */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* If New Chat: Render Centered Welcome Canvas with Starter Suggestions */}
        {isNewChat && (
          <div className="max-w-3xl mx-auto my-6 space-y-6 animate-in fade-in slide-in-from-top-3">
            <div className="text-center space-y-2">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-xl shadow-indigo-600/30 text-white mb-2">
                <Sparkles className="h-6 w-6 animate-pulse" />
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                How can I assist your hiring pipeline today?
              </h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Click a guided workflow below to fill in the prompt, or type
                your request directly.
              </p>
            </div>

            {/* Guided Starter Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {starterWorkflows.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    onClick={item.action}
                    className="p-4 rounded-2xl border border-white/10 bg-slate-900/60 hover:bg-slate-900/90 hover:border-indigo-500/40 transition-all cursor-pointer shadow-lg group space-y-2 backdrop-blur-md"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-xl bg-slate-950 border ${item.color}`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Existing Messages */}
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          const linkedAction = msg.actionId
            ? pendingActions.find((a) => a.id === msg.actionId)
            : null;

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-4xl mx-auto ${isUser ? "justify-end" : "justify-start"}`}
            >
              {!isUser && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30">
                  <Bot className="h-5 w-5" />
                </div>
              )}

              <div className={`space-y-3 flex-1 ${isUser ? "max-w-xl" : ""}`}>
                {isUser ? (
                  <div className="rounded-2xl bg-indigo-600 px-4 py-3 text-xs sm:text-sm text-white shadow-lg shadow-indigo-600/20 ml-auto font-medium leading-relaxed">
                    <p>{msg.content}</p>
                    <p className="text-[10px] text-indigo-200 text-right mt-1">
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Tool Execution Accordion */}
                    {msg.toolSteps && msg.toolSteps.length > 0 && (
                      <div className="rounded-xl border border-white/10 bg-slate-900/90 overflow-hidden shadow-inner">
                        <button
                          onClick={() => toggleToolStep(msg.id)}
                          className="w-full flex items-center justify-between p-2.5 text-xs text-slate-300 hover:bg-slate-800/50 transition-colors font-medium"
                        >
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-indigo-400" />
                            <span>
                              AI Actions Completed ({msg.toolSteps.length} step
                              {msg.toolSteps.length > 1 ? "s" : ""})
                            </span>
                          </div>
                          {expandedTools[msg.id] ? (
                            <ChevronUp className="h-4 w-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                          )}
                        </button>

                        {expandedTools[msg.id] && (
                          <div className="p-3 bg-slate-950/80 border-t border-white/5 space-y-2 text-[11px]">
                            {msg.toolSteps.map((step, idx) => (
                              <div
                                key={idx}
                                className="flex items-start gap-2 text-slate-300"
                              >
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-indigo-300 font-semibold">
                                    {step.toolName.replace(/_/g, " ")}
                                  </span>
                                  {step.outputSummary && (
                                    <p className="text-slate-400 text-[11px] mt-0.5">
                                      {step.outputSummary}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Assistant Text Bubble */}
                    <div className="relative group rounded-2xl border border-white/10 bg-slate-900/80 p-4 sm:p-5 text-slate-200 shadow-xl backdrop-blur-xl">
                      <MarkdownContent content={msg.content} />

                      {/* Footer Info & Copy Action */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/5 text-[10px] text-slate-400">
                        <span className="font-mono">
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>

                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.content)}
                          className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-800 border border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                          title="Copy message text"
                        >
                          {copiedMsgId === msg.id ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              <span className="text-emerald-400 font-medium">
                                Copied
                              </span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Embedded Candidates Cards */}
                    {msg.embeddedCandidates &&
                      msg.embeddedCandidates.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span className="font-semibold text-white flex items-center gap-1.5">
                              <Users className="h-4 w-4 text-indigo-400" />
                              <span>
                                Top Matched Candidates (
                                {msg.embeddedCandidates.length})
                              </span>
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Ranked by Match Score & Verified Qualifications
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {msg.embeddedCandidates.map((cand) => (
                              <CandidateCard
                                key={cand.id}
                                candidate={cand}
                                onSelect={onSelectCandidate}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                    {/* Embedded HITL Confirmation Cards */}
                    {linkedAction && (
                      <div className="pt-2">
                        {linkedAction.type === "offer_letter" && (
                          <OfferLetterApprovalCard
                            action={linkedAction}
                            onApprove={onApproveAction}
                            onReject={onRejectAction}
                          />
                        )}
                        {linkedAction.type === "joining_letter" && (
                          <JoiningLetterApprovalCard
                            action={linkedAction}
                            onApprove={onApproveAction}
                            onReject={onRejectAction}
                          />
                        )}
                        {linkedAction.type === "interview_reschedule" && (
                          <InterviewRescheduleCard
                            action={linkedAction}
                            onApprove={onApproveAction}
                            onReject={onRejectAction}
                          />
                        )}
                        {linkedAction.type === "interview_scorecard" &&
                          linkedAction.payload.scorecard && (
                            <InterviewScorecardCard
                              scorecard={linkedAction.payload.scorecard}
                              onApprove={() => onApproveAction(linkedAction.id)}
                              onReject={() => onRejectAction(linkedAction.id)}
                            />
                          )}
                        {linkedAction.type === "candidate_rejection" &&
                          linkedAction.payload.rejection && (
                            <CandidateRejectionCard
                              rejection={linkedAction.payload.rejection}
                              onApprove={() => onApproveAction(linkedAction.id)}
                              onReject={() => onRejectAction(linkedAction.id)}
                            />
                          )}
                        {linkedAction.type === "salary_negotiation" &&
                          linkedAction.payload.negotiation && (
                            <SalaryNegotiationCard
                              negotiation={linkedAction.payload.negotiation}
                              onApprove={() => onApproveAction(linkedAction.id)}
                              onReject={() => onRejectAction(linkedAction.id)}
                            />
                          )}
                        {linkedAction.type === "bgv_verification" &&
                          linkedAction.payload.bgv && (
                            <BGVTrackerCard
                              bgv={linkedAction.payload.bgv}
                              onApprove={() => onApproveAction(linkedAction.id)}
                              onReject={() => onRejectAction(linkedAction.id)}
                            />
                          )}
                        {linkedAction.type === "linkedin_post" && (
                          <LinkedInPostApprovalCard
                            action={linkedAction}
                            onApprove={onApproveAction}
                            onReject={onRejectAction}
                          />
                        )}
                        {linkedAction.type === "email_dispatch" && (
                          <EmailApprovalCard
                            action={linkedAction}
                            onApprove={onApproveAction}
                            onReject={onRejectAction}
                          />
                        )}
                        {linkedAction.type === "interview_schedule" && (
                          <InterviewApprovalCard
                            action={linkedAction}
                            onApprove={onApproveAction}
                            onReject={onRejectAction}
                          />
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {isUser && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-800 border border-white/10 text-white text-xs font-bold shadow-md">
                  HR
                </div>
              )}
            </div>
          );
        })}

        {/* Processing Indicator */}
        {isProcessing && (
          <div className="flex gap-3 max-w-4xl mx-auto items-center text-xs text-indigo-400">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600/30 text-white">
              <Sparkles className="h-5 w-5 animate-spin" />
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-white/10 px-4 py-2 rounded-2xl shadow">
              <span className="h-2 w-2 rounded-full bg-indigo-400 animate-ping" />
              <span>Analyzing candidate records and qualifications...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Floating Soft Input Container */}
      <div className="p-4 sm:p-5 bg-gradient-to-t from-[#080C14] via-[#080C14]/90 to-transparent">
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 hover:border-white/20 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 p-2 shadow-2xl transition-all"
          >
            {/* Menu Options Button (Model Selector & Capabilities) */}
            <ChatInputMenu
              selectedModel={selectedModel}
              onSelectModel={setSelectedModel}
              onOpenUpload={onOpenUploadModal}
              isReasoningActive={isReasoningActive}
              onToggleReasoning={() => setIsReasoningActive(!isReasoningActive)}
              searchMode={searchMode}
              onChangeSearchMode={setSearchMode}
            />

            {/* Input Text Box */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask agent: 'Find Python devs 5+ yr exp', 'Draft LinkedIn post', 'Send shortlist emails'..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-transparent px-2 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isProcessing}
              className="flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:opacity-40 disabled:cursor-not-allowed px-4 text-xs font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all shrink-0"
            >
              <span>Send</span>
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
