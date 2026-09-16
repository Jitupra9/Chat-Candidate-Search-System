export type CandidateStatus =
  | "applied"
  | "screening"
  | "shortlisted"
  | "interview_scheduled"
  | "offered"
  | "rejected";

export interface GroundedCitation {
  field: string;
  claimedValue: string;
  sourceSnippet: string;
  pageNumber?: number;
  confidence: number;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  currentCompany: string;
  location: string;
  experienceYears: number;
  education: string;
  skills: string[];
  matchScore: number; // 0-100
  status: CandidateStatus;
  appliedRole: string;
  appliedDate: string;
  resumeUrl: string;
  summary: string;
  citations: GroundedCitation[];
  notes?: string;
}

export type ActionType =
  | "linkedin_post"
  | "email_dispatch"
  | "interview_schedule"
  | "interview_reschedule"
  | "interview_scorecard"
  | "candidate_rejection"
  | "salary_negotiation"
  | "bgv_verification"
  | "offer_letter"
  | "joining_letter"
  | "pipeline_filter"
  | "candidate_purge";

export type ActionStatus =
  | "pending_approval"
  | "approved"
  | "executed"
  | "rejected";

export interface LinkedInPostPayload {
  roleTitle: string;
  department: string;
  location: string;
  salaryRange: string;
  content: string;
  hashtags: string[];
  postImage?: string;
}

export interface EmailDispatchPayload {
  candidateIds: string[];
  candidates: { id: string; name: string; email: string }[];
  subject: string;
  bodyTemplate: string;
  emailType: "shortlist" | "rejection" | "interview_invite" | "assessment";
  scheduledSlot?: string;
}

export interface InterviewSchedulePayload {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  dateTime: string;
  durationMinutes: number;
  interviewers: string[];
  meetingPlatform: "Google Meet" | "Microsoft Teams" | "Zoom";
  meetingLink: string;
}

export interface InterviewReschedulePayload {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  originalSlot: string;
  proposedSlot: string;
  reason: string;
  availableSlots: string[];
  interviewers: string[];
  meetingPlatform: "Google Meet" | "Microsoft Teams" | "Zoom";
  meetingLink: string;
  notifyCandidate: boolean;
  notifyInterviewer: boolean;
}

export interface InterviewScorecardPayload {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  interviewRound: string;
  interviewers: { name: string; title: string; score: number; notes: string }[];
  ratings: { category: string; score: number; maxScore: number }[];
  overallScore: number;
  hiringRecommendation:
    | "Strong Hire"
    | "Hire"
    | "Leaning No Hire"
    | "Definite No Hire";
  aiConsensusSummary: string;
  keyStrengths: string[];
  areasOfConcern: string[];
}

export interface CandidateRejectionPayload {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  stageReached: string;
  politeFeedbackSummary: string;
  emailSubject: string;
  emailBody: string;
  talentPoolCategory: string;
  keepInWarmTalentPool: boolean;
  archiveDuration: string;
}

export interface SalaryNegotiationPayload {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  initialOfferBase: string;
  candidateCounterAsk: string;
  approvedBudgetBand: string;
  withinBand: boolean;
  aiCompensationAnalysis: string;
  suggestedCounterPackage: {
    baseSalary: string;
    signOnBonus: string;
    equityGrant: string;
    performanceBonus: string;
  };
  justificationNotes: string;
}

export interface BGVVerificationPayload {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  joiningDate: string;
  agencyName: string;
  verificationStatus: "cleared" | "in_progress" | "flagged_discrepancy";
  checks: {
    name: string;
    status: "verified" | "pending" | "discrepancy";
    notes: string;
  }[];
  submittedDate: string;
  completedDate?: string;
  riskScore: "Low" | "Moderate" | "High";
}

export interface OfferLetterPayload {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  department: string;
  baseSalary: string;
  equityGrant?: string;
  bonus?: string;
  startDate: string;
  expiryDate: string;
  reportingManager: string;
  employmentType: "Full-Time" | "Contract" | "Part-Time";
  benefits: string[];
  letterTemplate: string;
}

export interface JoiningLetterPayload {
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  roleTitle: string;
  department: string;
  joiningDate: string;
  reportingTime: string;
  workLocation: string;
  hrContactName: string;
  hrContactEmail: string;
  requiredDocuments: string[];
  welcomeMessage: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  companyName: string;
  avatarInitials: string;
  status: "active" | "away" | "busy";
}

export interface PendingAction {
  id: string;
  type: ActionType;
  status: ActionStatus;
  title: string;
  description: string;
  llmReasoning: string;
  payload: {
    linkedin?: LinkedInPostPayload;
    email?: EmailDispatchPayload;
    interview?: InterviewSchedulePayload;
    reschedule?: InterviewReschedulePayload;
    scorecard?: InterviewScorecardPayload;
    rejection?: CandidateRejectionPayload;
    negotiation?: SalaryNegotiationPayload;
    bgv?: BGVVerificationPayload;
    offer?: OfferLetterPayload;
    joining?: JoiningLetterPayload;
    filterCriteria?: Record<string, any>;
    purgeCandidateId?: string;
  };
  createdAt: Date;
  reviewedAt?: Date;
  reviewer?: string;
}

export interface LinkedInPost {
  id: string;
  roleTitle: string;
  salaryRange: string;
  content: string;
  hashtags: string[];
  status: "draft" | "pending_approval" | "published";
  publishedAt?: string;
  applicantsCount: number;
  commentsCount: number;
  impressions: number;
  leads: {
    id: string;
    name: string;
    profileUrl: string;
    comment: string;
    imported: boolean;
  }[];
}

export interface EmailMessage {
  id: string;
  threadId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  direction: "inbound" | "outbound";
  subject: string;
  body: string;
  timestamp: Date;
  intent?:
    | "confirmed"
    | "reschedule_requested"
    | "declined"
    | "inquiry"
    | "general";
  aiSummary?: string;
}

export type HRActivityCategory =
  | "outreach"
  | "scheduling"
  | "sourcing"
  | "screening"
  | "pipeline"
  | "compliance";

export type HRActivityStatus =
  | "completed"
  | "pending_approval"
  | "action_required"
  | "blocked"
  | "success"
  | "approved"
  | "rejected";

export interface AuditLogEntry {
  id: string;
  timestamp: Date;
  title: string;
  category: HRActivityCategory;
  status: HRActivityStatus;
  actor: string;
  candidateName?: string;
  candidateId?: string;
  jobRole?: string;
  summary: string;
  businessImpact?: string;
  metadata?: Record<string, any>;
  // Backward compatibility fields:
  toolName?: string;
  actionType?: ActionType | "search" | "read";
  llmReasoning?: string;
  operator?: string;
  details?: string;
  parameters?: Record<string, any>;
}

export interface ToolExecutionStep {
  toolName: string;
  status: "running" | "completed" | "failed";
  input: Record<string, any>;
  outputSummary?: string;
  executionTimeMs?: number;
}

export interface ChatMessageItem {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
  toolSteps?: ToolExecutionStep[];
  actionId?: string; // Links to a PendingAction
  embeddedCandidates?: Candidate[];
  embeddedPostId?: string;
}
