"use client";

import React, { useState } from "react";
import UnifiedSidebar from "@/components/UnifiedSidebar";
import TopHeader from "@/components/TopHeader";
import { NavTab } from "@/components/Navbar";
import AgentChatView from "@/components/chat/AgentChatView";
import CandidatePipelineView from "@/components/candidates/CandidatePipelineView";
import HITLActionQueueView from "@/components/hitl/HITLActionQueueView";
import LinkedInSourcingHub from "@/components/linkedin/LinkedInSourcingHub";
import CandidateEmailInbox from "@/components/inbox/CandidateEmailInbox";
import AuditLogView from "@/components/audit/AuditLogView";
import IngestionPipelineModal from "@/components/upload/IngestionPipelineModal";
import JobRequisitionModal from "@/components/requisitions/JobRequisitionModal";
import CandidateModal from "@/components/candidates/CandidateModal";
import UserProfileModal, {
  MOCK_PROFILES,
} from "@/components/profile/UserProfileModal";
import LoginView from "@/components/auth/LoginView";
import RecruitmentAnalyticsModal from "@/components/analytics/RecruitmentAnalyticsModal";
import {
  INITIAL_CANDIDATES,
  INITIAL_ACTIONS,
  INITIAL_LINKEDIN_POSTS,
  INITIAL_EMAIL_MESSAGES,
  INITIAL_AUDIT_LOGS,
  INITIAL_CHAT_MESSAGES,
} from "@/lib/mockData";
import {
  Candidate,
  PendingAction,
  LinkedInPost,
  EmailMessage,
  AuditLogEntry,
  ChatMessageItem,
  CandidateStatus,
  LinkedInPostPayload,
  EmailDispatchPayload,
  InterviewSchedulePayload,
  InterviewReschedulePayload,
  InterviewScorecardPayload,
  CandidateRejectionPayload,
  SalaryNegotiationPayload,
  BGVVerificationPayload,
  OfferLetterPayload,
  JoiningLetterPayload,
  UserProfile,
} from "@/lib/types";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [activeTab, setActiveTab] = useState<NavTab>("chat");
  const [currentUser, setCurrentUser] = useState<UserProfile>(MOCK_PROFILES[0]);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [pendingActions, setPendingActions] =
    useState<PendingAction[]>(INITIAL_ACTIONS);
  const [linkedinPosts, setLinkedinPosts] = useState<LinkedInPost[]>(
    INITIAL_LINKEDIN_POSTS,
  );
  const [emailMessages, setEmailMessages] = useState<EmailMessage[]>(
    INITIAL_EMAIL_MESSAGES,
  );
  const [auditLogs, setAuditLogs] =
    useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [chatMessages, setChatMessages] = useState<ChatMessageItem[]>(
    INITIAL_CHAT_MESSAGES,
  );

  // Modals state
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isRequisitionOpen, setIsRequisitionOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );

  // Counter badges
  const pendingActionsCount = pendingActions.filter(
    (a) => a.status === "pending_approval",
  ).length;
  const inboundUnreadCount = emailMessages.filter(
    (m) => m.direction === "inbound" && m.intent === "confirmed",
  ).length;

  // Helper to append HR activity and audit logs
  const logAudit = (
    toolName: string,
    actionType: any,
    status:
      | "completed"
      | "success"
      | "blocked_by_guard"
      | "pending_approval"
      | "approved"
      | "rejected"
      | "action_required",
    llmReasoning: string,
    operator: string,
    details: string,
    parameters: Record<string, any>,
    hrInfo?: {
      title?: string;
      candidateName?: string;
      jobRole?: string;
      summary?: string;
      businessImpact?: string;
    },
  ) => {
    // Derive intuitive HR category
    let category:
      | "outreach"
      | "scheduling"
      | "sourcing"
      | "screening"
      | "pipeline"
      | "compliance" = "screening";
    if (
      toolName.includes("email") ||
      toolName.includes("reply") ||
      actionType === "email_dispatch"
    )
      category = "outreach";
    else if (toolName.includes("linkedin") || actionType === "linkedin_post")
      category = "sourcing";
    else if (
      toolName.includes("interview") ||
      toolName.includes("schedule") ||
      actionType === "interview_schedule"
    )
      category = "scheduling";
    else if (toolName.includes("purge") || toolName.includes("compliance"))
      category = "compliance";
    else if (toolName.includes("status") || toolName.includes("filter"))
      category = "pipeline";

    let displayStatus: any = status;
    if (status === "success" || status === "approved")
      displayStatus = "completed";

    // Clean up technical tool name into readable title if needed
    const cleanTitle =
      hrInfo?.title ||
      details ||
      toolName.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const newLog: AuditLogEntry = {
      id: `act-log-${Date.now()}`,
      timestamp: new Date(),
      title: cleanTitle,
      category,
      status: displayStatus,
      actor: operator || "AI Recruiter Assistant",
      candidateName: hrInfo?.candidateName,
      jobRole: hrInfo?.jobRole || "Senior AI Engineer",
      summary: hrInfo?.summary || details || llmReasoning,
      businessImpact:
        hrInfo?.businessImpact || `Activity recorded by ${operator}.`,
      metadata: parameters,
      toolName,
      actionType,
      llmReasoning,
      operator,
      details,
      parameters,
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Handle HR chat commands with intelligent agentic mock workflows
  const handleSendMessage = (userText: string) => {
    const userMsg: ChatMessageItem = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: userText,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, userMsg]);

    const lower = userText.toLowerCase();

    // Scenario 1: Offer Letter Generation & Legal Check
    if (
      lower.includes("offer") ||
      lower.includes("extend offer") ||
      lower.includes("compensation package")
    ) {
      setTimeout(() => {
        const actionId = `act-${Date.now()}`;
        const targetCand =
          candidates.find((c) => c.name.toLowerCase().includes("alex")) ||
          candidates[0];
        const newAction: PendingAction = {
          id: actionId,
          type: "offer_letter",
          status: "pending_approval",
          title: `Generate Official Employment Offer: ${targetCand.name}`,
          description: `Formal compensation package for ${targetCand.name} (${targetCand.title}): $155,000 USD base salary + 0.15% equity grant.`,
          llmReasoning: `Verified candidate performance ratings and compensation budget. $155,000 base salary complies with requisition limits ($140,000 - $165,000). Generated formal offer agreement held in HITL gate for HR sign-off.`,
          payload: {
            offer: {
              candidateId: targetCand.id,
              candidateName: targetCand.name,
              candidateEmail: targetCand.email,
              roleTitle: targetCand.appliedRole || "Senior AI Engineer",
              department: "AI & Platform Engineering",
              baseSalary: "$155,000 USD",
              equityGrant: "0.15% (15,000 Stock Options)",
              bonus: "$15,000 Annual Target Bonus",
              startDate: "November 1, 2026",
              expiryDate: "October 20, 2026",
              reportingManager: "Marcus Chen (VP of AI & Engineering)",
              employmentType: "Full-Time",
              benefits: [
                "Comprehensive Health, Dental & Vision (100% covered)",
                "401(k) with 4% Employer Match",
                "Unlimited Paid Time Off (PTO)",
                "$3,000 Annual Tech Stipend",
              ],
              letterTemplate: `Dear ${targetCand.name},\n\nOn behalf of TalentPulse AI, we are thrilled to extend an official offer of employment for the position of ${targetCand.appliedRole || "Senior AI Engineer"}.\n\nTerms of Employment:\n• Base Compensation: $155,000 USD per year\n• Stock Equity: 0.15% (15,000 Stock Options) with 4-year vesting schedule\n• Target Bonus: $15,000 USD\n• Official Start Date: November 1, 2026\n• Reporting Manager: Marcus Chen (VP of AI & Engineering)\n\nThis offer is valid until October 20, 2026. Please review and sign below to confirm your acceptance.\n\nWarm regards,\nSarah Jenkins\nLead Technical Recruiter, TalentPulse AI`,
            },
          },
          createdAt: new Date(),
        };

        setPendingActions((prev) => [newAction, ...prev]);
        logAudit(
          "generate_offer_letter",
          "offer_letter",
          "pending_approval",
          `Generated offer letter for ${targetCand.name}. Pre-signing compliance checked against $140k-$165k salary band.`,
          "AI Recruiter Assistant",
          `Drafted formal offer letter for ${targetCand.name} ($155,000 base + 0.15% equity).`,
          {
            candidate_id: targetCand.id,
            base_salary: "$155,000",
            equity: "0.15%",
          },
          {
            title: `Employment Offer Prepared: ${targetCand.name}`,
            candidateName: targetCand.name,
            jobRole: targetCand.appliedRole || "Senior AI Engineer",
            summary: `Prepared official offer letter for ${targetCand.name} with $155k base + equity. Awaiting recruiter sign-off.`,
            businessImpact: "Candidate moved to Final Offer Decision stage.",
          },
        );

        const assistantMsg: ChatMessageItem = {
          id: `msg-asst-${Date.now()}`,
          role: "assistant",
          content: `📄 **Official Offer Letter Draft Prepared!**\n\nI have generated the formal employment offer package for **${targetCand.name}** (${targetCand.appliedRole || "Senior AI Engineer"}):\n\n• **Base Salary**: \`$155,000 USD / yr\` (within budget band $140k-$165k ✅)\n• **Equity**: \`0.15% Stock Options\` (4-yr vesting, 1-yr cliff)\n• **Start Date**: \`November 1, 2026\`\n• **Manager**: Marcus Chen (VP of AI & Engineering)\n\nReview the document terms below in your **HITL Approval Card**, make any edits if necessary, and click **Approve & Dispatch Offer Letter** to send.`,
          timestamp: new Date(),
          actionId,
          toolSteps: [
            {
              toolName: "verify_compensation_budget",
              status: "completed",
              input: { salary: 155000, band_max: 165000 },
              outputSummary:
                "Salary approved: 100% compliant with department budget.",
            },
            {
              toolName: "draft_offer_letter",
              status: "completed",
              input: { candidate_id: targetCand.id, start_date: "Nov 1, 2026" },
              outputSummary:
                "Generated formal PDF offer agreement with digital signature block.",
            },
          ],
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }, 700);
      return;
    }

    // Scenario 2: Interview Reschedule & Failure Recovery
    if (
      lower.includes("reschedule") ||
      lower.includes("conflict") ||
      lower.includes("delay") ||
      lower.includes("push back")
    ) {
      setTimeout(() => {
        const actionId = `act-${Date.now()}`;
        const targetCand =
          candidates.find((c) => c.name.toLowerCase().includes("david")) ||
          candidates[0];
        const newAction: PendingAction = {
          id: actionId,
          type: "interview_reschedule",
          status: "pending_approval",
          title: `Reschedule Technical Screen: ${targetCand.name}`,
          description: `Candidate requested shifting interview to 3:30 PM EST. Resolved schedule conflict with Engineering Director.`,
          llmReasoning: `Contacted candidate and recruiter calendar API. Verified that Thursday, Oct 12 at 3:30 PM EST is open for both candidate ${targetCand.name} and interviewer Marcus Chen. Prepared revised meeting link.`,
          payload: {
            reschedule: {
              candidateId: targetCand.id,
              candidateName: targetCand.name,
              candidateEmail: targetCand.email,
              roleTitle: targetCand.appliedRole || "Senior AI Engineer",
              originalSlot: "Thursday, Oct 12 at 2:00 PM EST",
              proposedSlot: "Thursday, Oct 12 at 3:30 PM EST",
              reason: "Current employer sprint release conflict",
              availableSlots: [
                "Thursday, Oct 12 at 3:30 PM EST",
                "Friday, Oct 13 at 11:00 AM EST",
                "Friday, Oct 13 at 2:00 PM EST",
              ],
              interviewers: [
                "Marcus Chen (Engineering Director)",
                "Sarah Jenkins (Lead Recruiter)",
              ],
              meetingPlatform: "Google Meet",
              meetingLink: "https://meet.google.com/pulse-tech-david",
              notifyCandidate: true,
              notifyInterviewer: true,
            },
          },
          createdAt: new Date(),
        };

        setPendingActions((prev) => [newAction, ...prev]);
        logAudit(
          "reschedule_interview_negotiation",
          "interview_reschedule",
          "pending_approval",
          `Resolved schedule conflict for ${targetCand.name}. Identified 3 open slots across both calendars.`,
          "AI Calendar Assistant",
          `Proposed new slot Thursday Oct 12 at 3:30 PM EST for ${targetCand.name}.`,
          { candidate_id: targetCand.id, slot: "Thursday 3:30 PM EST" },
          {
            title: `Meeting Reschedule Resolved: ${targetCand.name}`,
            candidateName: targetCand.name,
            jobRole: targetCand.appliedRole || "Senior AI Engineer",
            summary: `Automated calendar conflict resolution found 3:30 PM EST open for ${targetCand.name} & Engineering Director.`,
            businessImpact:
              "Calendar hold updated to avoid interview cancellation.",
          },
        );

        const assistantMsg: ChatMessageItem = {
          id: `msg-asst-${Date.now()}`,
          role: "assistant",
          content: `📅 **Interview Reschedule Handled!**\n\nI processed the schedule conflict for **${targetCand.name}** and cross-referenced your hiring team's calendars:\n\n• **Original Slot**: ~~Thursday, Oct 12 at 2:00 PM EST~~ (Conflict)\n• **Recommended New Slot**: **Thursday, Oct 12 at 3:30 PM EST** (Both Candidate & Tech Lead Free ✅)\n• **Platform**: Google Meet (\`meet.google.com/pulse-tech-david\`)\n\nReview the reschedule details below and approve to send the updated calendar invite to both parties.`,
          timestamp: new Date(),
          actionId,
          toolSteps: [
            {
              toolName: "calendar_conflict_resolver",
              status: "completed",
              input: {
                candidate_id: targetCand.id,
                requested_shift: "+30 mins",
              },
              outputSummary:
                "Verified 3:30 PM EST is completely open with zero attendee conflicts.",
            },
          ],
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }, 700);
      return;
    }

    // Scenario 3: Joining Letter & Welcome Onboarding Kit
    if (
      lower.includes("joining") ||
      lower.includes("onboarding") ||
      lower.includes("welcome letter") ||
      lower.includes("welcome kit")
    ) {
      setTimeout(() => {
        const actionId = `act-${Date.now()}`;
        const targetCand =
          candidates.find((c) => c.name.toLowerCase().includes("sophia")) ||
          candidates[0];
        const newAction: PendingAction = {
          id: actionId,
          type: "joining_letter",
          status: "pending_approval",
          title: `Dispatch Joining Letter & Welcome Kit: ${targetCand.name}`,
          description: `Welcome packet, Day 1 orientation schedule, and compliance document checklist for ${targetCand.name}.`,
          llmReasoning: `Offer accepted by candidate. Background check completed. Prepared Day 1 welcome package with virtual onboarding details.`,
          payload: {
            joining: {
              candidateId: targetCand.id,
              candidateName: targetCand.name,
              candidateEmail: targetCand.email,
              roleTitle: targetCand.appliedRole || "Senior AI Engineer",
              department: "AI & Platform Engineering",
              joiningDate: "November 1, 2026",
              reportingTime: "09:30 AM EST",
              workLocation: "Remote (Virtual Onboarding via Zoom)",
              hrContactName: "Sarah Jenkins",
              hrContactEmail: "sarah.jenkins@talentpulse.ai",
              requiredDocuments: [
                "Signed Offer Letter & IP Agreement",
                "Government ID / Passport Copy",
                "Direct Deposit / Banking Form",
                "Emergency Contact Information",
              ],
              welcomeMessage: `Dear ${targetCand.name},\n\nWe are delighted to officially welcome you to TalentPulse AI as ${targetCand.appliedRole || "Senior AI Engineer"}!\n\nYour first day will be on November 1, 2026 starting at 09:30 AM EST with a live virtual welcome session with our People Team and your Engineering Director Marcus Chen.\n\nPlease upload your completed onboarding documents to the secure employee portal prior to your start date.\n\nWelcome to the team!\n\nWarm regards,\nPeople Operations Team\nTalentPulse AI`,
            },
          },
          createdAt: new Date(),
        };

        setPendingActions((prev) => [newAction, ...prev]);
        logAudit(
          "dispatch_joining_kit",
          "joining_letter",
          "pending_approval",
          `Prepared welcome onboarding package for ${targetCand.name}.`,
          "AI Recruiter Assistant",
          `Generated joining letter & pre-joining compliance checklist for ${targetCand.name}.`,
          { candidate_id: targetCand.id, joining_date: "Nov 1, 2026" },
          {
            title: `Joining Kit Prepared: ${targetCand.name}`,
            candidateName: targetCand.name,
            jobRole: targetCand.appliedRole || "Senior AI Engineer",
            summary: `Prepared onboarding kit for ${targetCand.name} starting Nov 1, 2026.`,
            businessImpact:
              "Candidate transitioned to Pre-Onboarding pipeline stage.",
          },
        );

        const assistantMsg: ChatMessageItem = {
          id: `msg-asst-${Date.now()}`,
          role: "assistant",
          content: `🎉 **Joining Letter & Onboarding Kit Generated!**\n\nI have prepared the official welcome package for **${targetCand.name}**:\n\n• **Official Start Date**: \`November 1, 2026\`\n• **Orientation**: \`09:30 AM EST\` (Virtual Onboarding)\n• **Required Documents**: Signed Offer Letter, ID Proof, Direct Deposit Form\n\nReview the welcome letter and compliance checklist in the **HITL Approval Card** below to approve dispatch.`,
          timestamp: new Date(),
          actionId,
          toolSteps: [
            {
              toolName: "generate_onboarding_package",
              status: "completed",
              input: { candidate_id: targetCand.id, start_date: "Nov 1, 2026" },
              outputSummary:
                "Created pre-joining compliance packet and welcome guide.",
            },
          ],
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }, 700);
      return;
    }

    // Scenario 4: LinkedIn Requisition Posting
    if (
      lower.includes("linkedin") ||
      lower.includes("post") ||
      lower.includes("hire") ||
      lower.includes("requisition")
    ) {
      setTimeout(() => {
        const actionId = `act-${Date.now()}`;
        const newAction: PendingAction = {
          id: actionId,
          type: "linkedin_post",
          status: "pending_approval",
          title: "Publish LinkedIn Job Posting: Senior AI Engineer",
          description:
            "Requisition post for Senior AI Engineer ($140k-$165k, Remote) awaiting recruiter review.",
          llmReasoning:
            "Parsed recruiter requisition parameters. Generated structured copy with hashtags and role qualifications. Holding in HITL gate prior to LinkedIn API broadcast.",
          payload: {
            linkedin: {
              roleTitle: "Senior AI / Machine Learning Engineer",
              department: "AI & Core Engineering",
              location: "Remote (US/EU)",
              salaryRange: "$140,000 - $165,000 USD + Equity",
              content: `🚀 We are hiring a Senior AI Engineer to scale our autonomous recruitment platform!\n\nWhat you'll work on:\n• Building agentic multi-tool workflows with LangGraph & FastAPI\n• ChromaDB vector indexing and hybrid RAG pipelines\n• Low-latency LLM inference architectures\n\nRequirements:\n✓ 5+ years Python development with FastAPI / PyTorch\n✓ Strong system design and Vector DB experience\n\n💼 Compensation: $140k - $165k USD (Remote)\n👉 Apply directly or drop a comment / DM to connect!`,
              hashtags: [
                "#AIEngineer",
                "#Python",
                "#PyTorch",
                "#LangGraph",
                "#RemoteJobs",
              ],
            },
          },
          createdAt: new Date(),
        };

        setPendingActions((prev) => [newAction, ...prev]);
        logAudit(
          "draft_linkedin_job_post",
          "linkedin_post",
          "pending_approval",
          "Drafted formatted LinkedIn job posting. Placed in Human-In-The-Loop gate.",
          "AI Assistant",
          "Generated requisition post for Senior AI Engineer.",
          { role: "Senior AI Engineer", salary: "$140k-$165k" },
        );

        const assistantMsg: ChatMessageItem = {
          id: `msg-asst-${Date.now()}`,
          role: "assistant",
          content: `I've prepared the LinkedIn job posting draft for the **Senior AI Engineer** role ($140k-$165k, Remote).\n\nBecause this takes a live external action, I've placed it in your **Human-In-The-Loop Approval Gate** below. You can edit the text directly and click **Approve & Post to LinkedIn** when you're ready.`,
          timestamp: new Date(),
          actionId,
          toolSteps: [
            {
              toolName: "draft_linkedin_job_post",
              status: "completed",
              input: {
                role_title: "Senior AI Engineer",
                salary_range: "$140k-$165k",
              },
              outputSummary: "Generated post copy and 5 targeted hashtags.",
            },
          ],
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }, 700);
      return;
    }

    // Scenario 2: Dynamic Pipeline Filtering (e.g. "remove under 6 years" or "filter")
    if (
      lower.includes("remove") ||
      (lower.includes("filter") &&
        (lower.includes("year") || lower.includes("exp")))
    ) {
      setTimeout(() => {
        const minYears = lower.includes("6") ? 6.0 : 5.0;
        const filtered = candidates.filter(
          (c) => c.experienceYears >= minYears,
        );

        logAudit(
          "filter_active_pipeline",
          "search",
          "success",
          `Applied dynamic pipeline filter: experienceYears >= ${minYears}.`,
          "HR Recruiter via Agent",
          `Active pipeline reduced to ${filtered.length} candidates.`,
          { min_experience: minYears },
        );

        const assistantMsg: ChatMessageItem = {
          id: `msg-asst-${Date.now()}`,
          role: "assistant",
          content: `⚡ **Dynamic Pipeline Filter Applied!**\n\nI have updated your active pipeline to only include candidates with **${minYears}+ years of experience**. Candidates with less experience (such as Elena Rostova - 2.8 yrs) have been filtered out of the active review list.\n\nHere are the top candidates remaining in your refined pipeline:`,
          timestamp: new Date(),
          embeddedCandidates: filtered.slice(0, 3),
          toolSteps: [
            {
              toolName: "filter_active_pipeline",
              status: "completed",
              input: {
                min_experience: minYears,
                current_pipeline_count: candidates.length,
              },
              outputSummary: `Filtered pipeline from ${candidates.length} down to ${filtered.length} matching candidates.`,
            },
          ],
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }, 700);
      return;
    }

    // Scenario 3: Email Shortlisting & Interview Invites
    if (
      lower.includes("email") ||
      lower.includes("shortlist") ||
      lower.includes("invite")
    ) {
      setTimeout(() => {
        const topCandidates = candidates
          .filter((c) => c.matchScore >= 94)
          .slice(0, 2);
        const actionId = `act-${Date.now()}`;

        const newAction: PendingAction = {
          id: actionId,
          type: "email_dispatch",
          status: "pending_approval",
          title: `Dispatch Technical Interview Invites (${topCandidates.length} Candidates)`,
          description: `Personalized interview emails for ${topCandidates.map((c) => c.name).join(", ")}.`,
          llmReasoning: `Identified top-matched candidates (Alex Rivera 96%, Priya Sharma 94%). Prepared personalized email drafts with grounded project citations. Awaiting recruiter approval prior to SMTP dispatch.`,
          payload: {
            email: {
              candidateIds: topCandidates.map((c) => c.id),
              candidates: topCandidates.map((c) => ({
                id: c.id,
                name: c.name,
                email: c.email,
              })),
              subject:
                "Invitation to Technical Interview: Senior AI Engineer at TalentPulse",
              bodyTemplate: `Hi {{CandidateName}},\n\nThank you for applying for the Senior AI Engineer role at TalentPulse! Our engineering team was particularly impressed by your proven experience with high-throughput FastAPI microservices and vector indexing architectures.\n\nWe would like to invite you for a 45-minute technical discussion with our Lead AI Architect on Thursday, Oct 12 at 2:00 PM EST.\n\nPlease reply directly to this email to confirm if this slot works for you, or let us know alternative timings.\n\nBest regards,\nSarah Jenkins\nLead Technical Recruiter, TalentPulse AI`,
              emailType: "interview_invite",
              scheduledSlot: "Thursday, Oct 12 at 2:00 PM EST",
            },
          },
          createdAt: new Date(),
        };

        setPendingActions((prev) => [newAction, ...prev]);
        logAudit(
          "draft_candidate_email",
          "email_dispatch",
          "pending_approval",
          "Drafted personalized shortlist emails with grounded citations.",
          "AI Assistant",
          `Prepared batch invite for ${topCandidates.length} candidates.`,
          { candidate_count: topCandidates.length },
        );

        const assistantMsg: ChatMessageItem = {
          id: `msg-asst-${Date.now()}`,
          role: "assistant",
          content: `I have drafted personalized technical interview invitations for your top 2 candidates (**Alex Rivera** and **Priya Sharma**).\n\nBelow is the **HITL Email Approval Card**. You can review individual personalized previews, edit the subject or body, and approve the dispatch.`,
          timestamp: new Date(),
          actionId,
          toolSteps: [
            {
              toolName: "draft_candidate_email",
              status: "completed",
              input: {
                candidate_ids: topCandidates.map((c) => c.id),
                slot: "Thursday 2 PM EST",
              },
              outputSummary:
                "Generated personalized email drafts with token replacements.",
            },
          ],
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }, 700);
      return;
    }

    // Scenario 4: Check candidate replies / inbox
    if (
      lower.includes("reply") ||
      lower.includes("replies") ||
      lower.includes("inbox") ||
      lower.includes("status")
    ) {
      setTimeout(() => {
        logAudit(
          "get_inbound_replies",
          "read",
          "success",
          "Queried IMAP / Inbound webhook listener for latest candidate email responses.",
          "AI Agent Listener",
          "Retrieved 2 candidate reply threads with LLM intent analysis.",
          { unread_count: 1 },
        );

        const assistantMsg: ChatMessageItem = {
          id: `msg-asst-${Date.now()}`,
          role: "assistant",
          content: `📬 **Latest Candidate Reply Summary:**\n\n1. **Alex Rivera** (${"alex.rivera@example.com"})\n   • **Intent**: \`Interview Confirmed\` ✅\n   • **Message**: *"Thursday, Oct 12 at 2:00 PM EST works perfectly for me. Looking forward to speaking with the team!"*\n   • **Action Taken**: Candidate pipeline stage updated to \`Interview Scheduled\`.\n\n2. **David Kim** (${"david.kim@example.com"})\n   • **Intent**: \`Reschedule Requested\` ⏱️\n   • **Message**: *"Could we push our discussion back by 30 minutes to 3:30 PM EST?"*\n\nWould you like me to adjust David's calendar invite to 3:30 PM and send a confirmation?`,
          timestamp: new Date(),
          toolSteps: [
            {
              toolName: "parse_inbound_reply",
              status: "completed",
              input: { message_id: "em-002" },
              outputSummary: 'Intent: "confirmed" (99% confidence).',
            },
          ],
        };
        setChatMessages((prev) => [...prev, assistantMsg]);
      }, 700);
      return;
    }

    // Default Scenario: Semantic & Hybrid Candidate Search
    setTimeout(() => {
      const matched = candidates.filter(
        (c) => c.skills.includes("Python") && c.experienceYears >= 5.0,
      );
      logAudit(
        "search_candidates",
        "search",
        "success",
        `Executed hybrid search (ChromaDB dense vectors + SQL filter) for query "${userText}".`,
        "AI Assistant",
        `Matched ${matched.length} candidates exceeding relevance threshold.`,
        { query: userText, matched_count: matched.length },
      );

      const assistantMsg: ChatMessageItem = {
        id: `msg-asst-${Date.now()}`,
        role: "assistant",
        content: `🔍 Based on your query, I performed a **hybrid vector similarity search** on ChromaDB and verified structured attributes in the PostgreSQL candidate database.\n\nFound **${matched.length} top candidates** matching your requirements. Each candidate includes **grounded evidence citations** from their parsed resume to prevent hallucination:`,
        timestamp: new Date(),
        embeddedCandidates: matched,
        toolSteps: [
          {
            toolName: "hybrid_candidate_search",
            status: "completed",
            input: { query: userText, min_score: 0.8 },
            outputSummary: `Returned ${matched.length} candidates with high semantic match score.`,
          },
          {
            toolName: "verify_grounded_citations",
            status: "completed",
            input: { candidate_count: matched.length },
            outputSummary:
              "Verified years of experience and core skills against extracted raw text.",
          },
        ],
      };
      setChatMessages((prev) => [...prev, assistantMsg]);
    }, 700);
  };

  // Handle Approving a Human-In-The-Loop Action
  const handleApproveAction = (actionId: string, updatedPayload?: any) => {
    setPendingActions((prev) =>
      prev.map((act) => {
        if (act.id === actionId) {
          const updated = {
            ...act,
            status: "executed" as const,
            reviewedAt: new Date(),
            reviewer: "Sarah Jenkins (Lead Recruiter)",
          };
          if (updatedPayload) {
            if (act.type === "linkedin_post")
              updated.payload.linkedin = updatedPayload;
            if (act.type === "email_dispatch")
              updated.payload.email = updatedPayload;
            if (act.type === "interview_schedule")
              updated.payload.interview = updatedPayload;
            if (act.type === "interview_reschedule")
              updated.payload.reschedule = updatedPayload;
            if (act.type === "offer_letter")
              updated.payload.offer = updatedPayload;
            if (act.type === "joining_letter")
              updated.payload.joining = updatedPayload;
          }
          return updated;
        }
        return act;
      }),
    );

    const targetAction = pendingActions.find((a) => a.id === actionId);
    if (!targetAction) return;

    let auditTool = "send_candidate_email";
    if (targetAction.type === "linkedin_post")
      auditTool = "publish_linkedin_job_post";
    else if (targetAction.type === "offer_letter")
      auditTool = "dispatch_offer_letter";
    else if (targetAction.type === "joining_letter")
      auditTool = "send_joining_kit";
    else if (targetAction.type === "interview_reschedule")
      auditTool = "confirm_interview_reschedule";

    logAudit(
      auditTool,
      targetAction.type,
      "approved",
      `Recruiter authorized state-changing execution for action: ${targetAction.title}.`,
      `${currentUser.name} (${currentUser.role})`,
      "Action dispatched successfully to candidate and external systems.",
      targetAction.payload,
      {
        title: `Executed: ${targetAction.title}`,
        summary: `Action authorized by ${currentUser.name}. Candidate pipeline & integrations updated.`,
        businessImpact: "Live recruitment state updated across databases.",
      },
    );

    if (targetAction.type === "linkedin_post") {
      const payload = updatedPayload || targetAction.payload.linkedin;
      if (payload) {
        const newPost: LinkedInPost = {
          id: `post-${Date.now()}`,
          roleTitle: payload.roleTitle,
          salaryRange: payload.salaryRange,
          content: payload.content,
          hashtags: payload.hashtags,
          status: "published",
          publishedAt: "Just now",
          applicantsCount: 0,
          commentsCount: 0,
          impressions: 1,
          leads: [],
        };
        setLinkedinPosts((prev) => [newPost, ...prev]);
      }
    }

    if (targetAction.type === "email_dispatch") {
      const emailData = updatedPayload || targetAction.payload.email;
      if (emailData) {
        setCandidates((prev) =>
          prev.map((c) =>
            emailData.candidateIds.includes(c.id)
              ? { ...c, status: "shortlisted" }
              : c,
          ),
        );
      }
    }

    if (targetAction.type === "offer_letter") {
      const offerData = updatedPayload || targetAction.payload.offer;
      if (offerData) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === offerData.candidateId || c.name === offerData.candidateName
              ? { ...c, status: "offered" }
              : c,
          ),
        );
      }
    }

    if (targetAction.type === "interview_reschedule") {
      const reschedData = updatedPayload || targetAction.payload.reschedule;
      if (reschedData) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === reschedData.candidateId ||
            c.name === reschedData.candidateName
              ? { ...c, status: "interview_scheduled" }
              : c,
          ),
        );
      }
    }

    if (targetAction.type === "joining_letter") {
      const joiningData = updatedPayload || targetAction.payload.joining;
      if (joiningData) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === joiningData.candidateId ||
            c.name === joiningData.candidateName
              ? { ...c, status: "offered" }
              : c,
          ),
        );
      }
    }

    if (targetAction.type === "interview_scorecard") {
      const scorecard = targetAction.payload.scorecard;
      if (scorecard) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === scorecard.candidateId || c.name === scorecard.candidateName
              ? { ...c, status: "shortlisted" }
              : c,
          ),
        );
      }
    }

    if (targetAction.type === "candidate_rejection") {
      const rejection = targetAction.payload.rejection;
      if (rejection) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === rejection.candidateId || c.name === rejection.candidateName
              ? { ...c, status: "rejected" }
              : c,
          ),
        );
      }
    }

    if (targetAction.type === "salary_negotiation") {
      const negotiation = targetAction.payload.negotiation;
      if (negotiation) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === negotiation.candidateId || c.name === negotiation.candidateName
              ? { ...c, status: "offered" }
              : c,
          ),
        );
      }
    }

    if (targetAction.type === "bgv_verification") {
      const bgv = targetAction.payload.bgv;
      if (bgv) {
        setCandidates((prev) =>
          prev.map((c) =>
            c.id === bgv.candidateId || c.name === bgv.candidateName
              ? { ...c, status: "offered" }
              : c,
          ),
        );
      }
    }

    const confirmMsg: ChatMessageItem = {
      id: `msg-confirm-${Date.now()}`,
      role: "assistant",
      content: `✅ **Action Confirmed & Executed!**\n\nThe action **"${targetAction.title}"** has been authorized and dispatched. Audit ledger entry \`AUD-${Date.now().toString().slice(-4)}\` has been recorded.`,
      timestamp: new Date(),
    };
    setChatMessages((prev) => [...prev, confirmMsg]);
  };

  // Handle Rejecting a Human-In-The-Loop Action
  const handleRejectAction = (actionId: string, reason?: string) => {
    setPendingActions((prev) =>
      prev.map((act) =>
        act.id === actionId
          ? {
              ...act,
              status: "rejected" as const,
              reviewedAt: new Date(),
              reviewer: "Sarah Jenkins",
            }
          : act,
      ),
    );

    logAudit(
      "reject_agent_action",
      "email_dispatch",
      "rejected",
      `Recruiter cancelled pending action ${actionId}.`,
      "Sarah Jenkins",
      "Action blocked from external dispatch.",
      { actionId, reason: reason || "Dismissed by recruiter" },
    );
  };

  // Handle Candidate Status Change
  const handleStatusChange = (
    candidateId: string,
    newStatus: CandidateStatus,
  ) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId ? { ...c, status: newStatus } : c)),
    );
    logAudit(
      "update_candidate_status",
      "search",
      "success",
      `Candidate status manually changed to "${newStatus}".`,
      "Sarah Jenkins",
      `Updated candidate ID ${candidateId} to ${newStatus}.`,
      { candidateId, newStatus },
    );
  };

  // Handle GDPR / CCPA Right to Erasure Purge
  const handlePurgePII = (candidateId: string) => {
    const cand = candidates.find((c) => c.id === candidateId);
    if (!cand) return;

    if (
      confirm(
        `GDPR Compliance: Are you sure you want to permanently purge all PII and vector embeddings for ${cand.name}? This will remove records from both PostgreSQL and ChromaDB.`,
      )
    ) {
      setCandidates((prev) => prev.filter((c) => c.id !== candidateId));
      logAudit(
        "purge_candidate_pii",
        "candidate_purge",
        "approved",
        `GDPR Right to Erasure executed for candidate ${cand.name} (${cand.email}). Purged from relational database and ChromaDB vector store.`,
        "Sarah Jenkins (Compliance Admin)",
        `Synchronously deleted SQL row and vector ID ${candidateId}.`,
        { candidateId, email: cand.email },
      );
    }
  };

  // Handle Single Candidate Draft Email trigger
  const handleDraftEmailSingle = (candidate: Candidate) => {
    setActiveTab("chat");
    handleSendMessage(
      `Draft a technical interview invitation email for ${candidate.name} (${candidate.title}) for Thursday at 2 PM EST.`,
    );
  };

  // Handle Bulk Email trigger
  const handleTriggerBulkEmail = (candidateIds: string[]) => {
    const selected = candidates.filter((c) => candidateIds.includes(c.id));
    setActiveTab("chat");
    handleSendMessage(
      `Draft shortlist interview emails for ${selected.map((c) => c.name).join(" and ")} for Thursday 2 PM.`,
    );
  };

  // Handle 1-Click Lead Intake from LinkedIn
  const handleImportLeadToDB = (leadId: string) => {
    setLinkedinPosts((prev) =>
      prev.map((p) => ({
        ...p,
        leads: p.leads.map((l) =>
          l.id === leadId ? { ...l, imported: true } : l,
        ),
      })),
    );

    const newCandidate: Candidate = {
      id: `cand-lead-${Date.now()}`,
      name: "Carlos Mendez",
      email: "carlos.mendez@example.com",
      phone: "+1 (555) 678-1234",
      title: "Senior Python Backend Developer",
      currentCompany: "LinkedIn Inbound Lead",
      location: "Remote (US)",
      experienceYears: 6.0,
      education: "B.S. Computer Engineering, Texas A&M",
      skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis"],
      matchScore: 93,
      status: "applied",
      appliedRole: "Senior AI Engineer",
      appliedDate: new Date().toISOString().split("T")[0],
      resumeUrl: "/resumes/carlos_mendez.pdf",
      summary:
        "6 years Python backend development experience. Ingested via LinkedIn social sourcing webhook.",
      citations: [
        {
          field: "Sourcing Source",
          claimedValue: "LinkedIn Inbound Engagement",
          sourceSnippet:
            'Commented on Senior AI Engineer post: "6 yrs Python backend experience here. Would love to connect!"',
          pageNumber: 1,
          confidence: 0.99,
        },
      ],
    };

    setCandidates((prev) => [newCandidate, ...prev]);
    logAudit(
      "ingest_social_lead",
      "search",
      "success",
      "Imported candidate profile from LinkedIn lead stream into relational DB & vector index.",
      "AI Sourcing Ingestion Worker",
      "Created candidate profile for Carlos Mendez.",
      { leadId, name: "Carlos Mendez" },
    );
  };

  // Handle Ingest Success from Upload Modal
  const handleIngestSuccess = (newCand: Candidate) => {
    setCandidates((prev) => [newCand, ...prev]);
    logAudit(
      "ingest_resume_pipeline",
      "search",
      "success",
      `Processed resume ${newCand.name}. OCR extraction, Vision LLM parsing, prompt injection check, and dual persistence completed in 3.4s.`,
      "Async Ingestion Worker",
      `Added candidate ${newCand.name} to vector & SQL databases.`,
      { candidate_id: newCand.id, match_score: newCand.matchScore },
    );
  };

  // Handle Reply to candidate from Inbox
  const handleReplyToCandidate = (candidateId: string, replyText: string) => {
    const cand = candidates.find((c) => c.id === candidateId);
    const newMsg: EmailMessage = {
      id: `em-${Date.now()}`,
      threadId: `th-${candidateId}`,
      candidateId,
      candidateName: cand ? cand.name : "Candidate",
      candidateEmail: cand ? cand.email : "",
      direction: "outbound",
      subject: "Re: Interview Confirmation & Details",
      body: replyText,
      timestamp: new Date(),
    };
    setEmailMessages((prev) => [...prev, newMsg]);
    logAudit(
      "send_candidate_email",
      "email_dispatch",
      "approved",
      `Direct reply sent to candidate ${cand?.name}.`,
      "Sarah Jenkins",
      "Dispatched email via SMTP.",
      { candidateId, body: replyText },
    );
  };

  const handleNewChat = () => {
    setActiveTab("chat");
    setChatMessages([
      {
        id: `msg-init-${Date.now()}`,
        role: "assistant",
        content: `👋 **Started new AI Recruiter session.** Ready to search candidates, draft LinkedIn posts, filter pipelines, or send interview invites. How can I assist you?`,
        timestamp: new Date(),
      },
    ]);
  };

  if (!isAuthenticated) {
    return (
      <LoginView
        onLogin={(user) => {
          setCurrentUser(user);
          setIsAuthenticated(true);
        }}
      />
    );
  }

  return (
    <div className="flex h-screen w-full font-sans antialiased overflow-hidden bg-[#080C14] text-slate-100">
      {/* Left Master Sidebar */}
      <UnifiedSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingActionsCount={pendingActionsCount}
        inboundUnreadCount={inboundUnreadCount}
        onNewChat={handleNewChat}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Command Bar */}
        <TopHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingActionsCount={pendingActionsCount}
          inboundUnreadCount={inboundUnreadCount}
          onNewJobRequisition={() => setIsRequisitionOpen(true)}
          onOpenUpload={() => setIsUploadOpen(true)}
          onOpenAnalytics={() => setIsAnalyticsOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          currentUser={currentUser}
        />

        {/* Dynamic Workspace Router */}
        <main className="flex-1 flex overflow-hidden">
          {activeTab === "chat" && (
            <AgentChatView
              messages={chatMessages}
              pendingActions={pendingActions}
              allCandidates={candidates}
              onSendMessage={handleSendMessage}
              onApproveAction={handleApproveAction}
              onRejectAction={handleRejectAction}
              onSelectCandidate={setSelectedCandidate}
              onOpenUploadModal={() => setIsUploadOpen(true)}
              onOpenRequisitionModal={() => setIsRequisitionOpen(true)}
            />
          )}

          {activeTab === "pipeline" && (
            <CandidatePipelineView
              candidates={candidates}
              onStatusChange={handleStatusChange}
              onPurgePII={handlePurgePII}
              onTriggerBulkEmail={handleTriggerBulkEmail}
              onDraftEmailSingle={handleDraftEmailSingle}
            />
          )}

          {activeTab === "hitl" && (
            <HITLActionQueueView
              actions={pendingActions}
              onApproveAction={handleApproveAction}
              onRejectAction={handleRejectAction}
            />
          )}

          {activeTab === "linkedin" && (
            <LinkedInSourcingHub
              posts={linkedinPosts}
              onCreateNewPost={() => setIsRequisitionOpen(true)}
              onImportLeadToDB={handleImportLeadToDB}
            />
          )}

          {activeTab === "inbox" && (
            <CandidateEmailInbox
              messages={emailMessages}
              onReplyToCandidate={handleReplyToCandidate}
              onAskAgentToHandle={(msg) => {
                setActiveTab("chat");
                handleSendMessage(
                  `Candidate ${msg.candidateName} sent a reply: "${msg.body}". Please parse their intent and recommend the next action.`,
                );
              }}
            />
          )}

          {activeTab === "audit" && <AuditLogView logs={auditLogs} />}
        </main>
      </div>

      {/* Recruitment Analytics & Funnel Modal */}
      <RecruitmentAnalyticsModal
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />

      {/* Recruiter User Profile & Account Switcher Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        currentUser={currentUser}
        onSwitchUser={(user) => {
          setCurrentUser(user);
          setIsProfileOpen(false);
        }}
        onLogout={() => {
          setIsAuthenticated(false);
          setIsProfileOpen(false);
        }}
      />

      {/* Resume Ingestion Pipeline Modal */}
      <IngestionPipelineModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onIngestSuccess={handleIngestSuccess}
      />

      {/* Guided Job Requisition Wizard Modal */}
      <JobRequisitionModal
        isOpen={isRequisitionOpen}
        onClose={() => setIsRequisitionOpen(false)}
        onSubmitRequisition={(context) => {
          setActiveTab("chat");
          handleSendMessage(context);
        }}
      />

      {/* Candidate Full Profile Inspection Modal */}
      <CandidateModal
        candidate={selectedCandidate}
        isOpen={!!selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onStatusChange={handleStatusChange}
        onDraftEmail={handleDraftEmailSingle}
        onPurgeCandidate={handlePurgePII}
      />
    </div>
  );
}
