'use client'

import React, { useState } from 'react'
import {
  Mail,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  AlertCircle,
  Sparkles,
  Send,
  MessageSquare,
  Clock,
  ChevronRight
} from 'lucide-react'
import { EmailMessage } from '@/lib/types'

interface CandidateEmailInboxProps {
  messages: EmailMessage[]
  onReplyToCandidate: (candidateId: string, replyText: string) => void
  onAskAgentToHandle: (message: EmailMessage) => void
}

export default function CandidateEmailInbox({
  messages,
  onReplyToCandidate,
  onAskAgentToHandle
}: CandidateEmailInboxProps) {
  const [selectedThreadCandidateId, setSelectedThreadCandidateId] = useState<string>(
    messages[0]?.candidateId || ''
  )
  const [replyInput, setReplyInput] = useState('')

  // Group messages by candidate
  const candidateThreads = React.useMemo(() => {
    const map = new Map<string, EmailMessage[]>()
    messages.forEach(msg => {
      const arr = map.get(msg.candidateId) || []
      arr.push(msg)
      map.set(msg.candidateId, arr)
    })
    return Array.from(map.entries()).map(([candId, msgs]) => {
      const sorted = msgs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      const latest = sorted[0]
      return {
        candidateId: candId,
        candidateName: latest.candidateName,
        candidateEmail: latest.candidateEmail,
        latestMessage: latest,
        allMessages: sorted.reverse() // oldest to newest
      }
    })
  }, [messages])

  const activeThread = candidateThreads.find(t => t.candidateId === selectedThreadCandidateId) || candidateThreads[0]

  const getIntentBadge = (intent?: string) => {
    switch (intent) {
      case 'confirmed':
        return {
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          label: 'Interview Confirmed',
          icon: CheckCircle2
        }
      case 'reschedule_requested':
        return {
          bg: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
          label: 'Reschedule Requested',
          icon: Clock
        }
      case 'declined':
        return {
          bg: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
          label: 'Offer / Interview Declined',
          icon: AlertCircle
        }
      default:
        return {
          bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
          label: 'Inquiry / General',
          icon: MessageSquare
        }
    }
  }

  const handleSendReply = () => {
    if (!replyInput.trim() || !activeThread) return
    onReplyToCandidate(activeThread.candidateId, replyInput)
    setReplyInput('')
  }

  return (
    <div className="flex-1 overflow-hidden bg-slate-950 flex flex-col">
      {/* Top Banner */}
      <div className="border-b border-white/10 p-4 sm:p-6 bg-slate-950 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Mail className="h-4 w-4" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Candidate Email & Reply Listener
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Bi-directional candidate communications with real-time LLM intent classification (Interview Confirmations, Reschedules).
          </p>
        </div>
      </div>

      {/* Main Inbox Two-Column Layout */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
        {/* Left Column: Candidate Threads */}
        <div className="border-r border-white/10 bg-slate-900/40 overflow-y-auto p-3 space-y-2">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1">
            Candidate Conversations ({candidateThreads.length})
          </div>

          {candidateThreads.map((thread) => {
            const isSelected = activeThread?.candidateId === thread.candidateId
            const latest = thread.latestMessage
            const badge = getIntentBadge(latest.intent)
            const BadgeIcon = badge.icon

            return (
              <div
                key={thread.candidateId}
                onClick={() => setSelectedThreadCandidateId(thread.candidateId)}
                className={`p-3 rounded-xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500/50 shadow-md shadow-indigo-950/30'
                    : 'bg-slate-900/50 border-white/5 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                      {thread.candidateName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">{thread.candidateName}</p>
                      <p className="text-[10px] text-slate-400 truncate">{thread.candidateEmail}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {latest.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {latest.direction === 'inbound' && latest.intent && (
                  <div className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badge.bg}`}>
                    <BadgeIcon className="h-3 w-3" />
                    <span>{badge.label}</span>
                  </div>
                )}

                <p className="text-xs text-slate-300 line-clamp-1">
                  {latest.direction === 'inbound' ? 'Candidate: ' : 'You: '}
                  {latest.body}
                </p>
              </div>
            )
          })}
        </div>

        {/* Right Column: Selected Conversation & LLM Insights */}
        {activeThread && (
          <div className="md:col-span-2 flex flex-col bg-slate-950 overflow-hidden">
            {/* Thread Header */}
            <div className="border-b border-white/10 p-4 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center">
                  {activeThread.candidateName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">{activeThread.candidateName}</h3>
                  <p className="text-xs text-slate-400">{activeThread.candidateEmail}</p>
                </div>
              </div>

              {activeThread.latestMessage.aiSummary && (
                <button
                  onClick={() => onAskAgentToHandle(activeThread.latestMessage)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 text-xs font-semibold text-white shadow transition-all"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Agent: Auto-Handle Action</span>
                </button>
              )}
            </div>

            {/* AI Intent Summary Card */}
            {activeThread.latestMessage.aiSummary && (
              <div className="m-4 rounded-xl border border-indigo-500/20 bg-indigo-950/30 p-3 text-xs text-indigo-200">
                <div className="flex items-center gap-1.5 font-semibold text-indigo-300 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
                  <span>AI Inbound Intent Classification</span>
                </div>
                <p className="text-slate-200">{activeThread.latestMessage.aiSummary}</p>
              </div>
            )}

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {activeThread.allMessages.map((msg) => {
                const isInbound = msg.direction === 'inbound'
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isInbound ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-xl rounded-2xl p-4 text-xs space-y-1 shadow-md ${
                        isInbound
                          ? 'bg-slate-900 text-slate-200 border border-white/10'
                          : 'bg-indigo-600 text-white shadow-indigo-600/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 border-b border-white/10 pb-1 mb-1">
                        <span>{isInbound ? activeThread.candidateName : 'TalentPulse HR'}</span>
                        <span>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="font-semibold text-xs mb-1">{msg.subject}</p>
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.body}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Reply Box */}
            <div className="border-t border-white/10 p-4 bg-slate-900/80">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a response to candidate or instruct the agent..."
                  value={replyInput}
                  onChange={(e) => setReplyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
                  className="flex-1 rounded-xl bg-slate-950 border border-white/10 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  onClick={handleSendReply}
                  disabled={!replyInput.trim()}
                  className="rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed px-4 py-2.5 text-xs font-semibold text-white transition-all flex items-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

