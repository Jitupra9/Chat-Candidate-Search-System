# TalentPulse AI — Recruiter Assistant Frontend

Enterprise-grade Next.js 16 frontend for **TalentPulse AI**, an autonomous AI HR Recruiter and Talent Acquisition Platform.

---

## 🚀 Quick Start Guide

### 1. Prerequisites

- **Node.js**: v18.17.0+ or v20+
- **Package Manager**: npm or pnpm

---

### 2. Installation & Setup

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Configure Environment**:
   Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
   ```

3. **Run Development Server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx                # Root layout & font configuration
│   ├── page.tsx                  # Main workspace router & state orchestration
│   └── globals.css               # Tailwind CSS rules & dark aesthetics
├── components/
│   ├── auth/
│   │   └── LoginView.tsx         # Enterprise corporate login with Google/SSO
│   ├── chat/
│   │   ├── AgentChatView.tsx     # Conversational AI recruiter stream & tool execution
│   │   ├── MarkdownContent.tsx   # Custom dark theme markdown formatter
│   │   └── ChatInputMenu.tsx     # Model selection & search mode configuration
│   ├── hitl/
│   │   ├── HITLActionQueueView.tsx        # Master Human-In-The-Loop action center
│   │   ├── InterviewScorecardCard.tsx     # Panel debrief & AI consensus card
│   │   ├── SalaryNegotiationCard.tsx      # Counter-offer & budget parity analyzer
│   │   ├── CandidateRejectionCard.tsx     # Empathetic rejection & talent pool archiving
│   │   ├── BGVTrackerCard.tsx             # Background verification status card
│   │   ├── OfferLetterApprovalCard.tsx    # Formal compensation offer card
│   │   ├── JoiningLetterApprovalCard.tsx  # Pre-boarding kit & Day 1 checklist
│   │   ├── InterviewRescheduleCard.tsx    # Automated conflict reschedule card
│   │   ├── LinkedInPostApprovalCard.tsx   # Social sourcing post approval card
│   │   ├── EmailApprovalCard.tsx          # Candidate email dispatch card
│   │   └── InterviewApprovalCard.tsx      # Interview calendar booking card
│   ├── analytics/
│   │   └── RecruitmentAnalyticsModal.tsx  # Conversion funnel & time-to-hire KPI dashboard
│   ├── requisitions/
│   │   └── JobRequisitionModal.tsx        # Guided role requisition generator
│   ├── upload/
│   │   └── IngestionPipelineModal.tsx     # Async resume parser & vector ingestion
│   ├── candidates/
│   │   ├── CandidatePipelineView.tsx      # Visual pipeline stage Kanban/Table
│   │   └── CandidateModal.tsx             # Candidate detail view with grounded citations
│   ├── linkedin/
│   │   └── LinkedInSourcingHub.tsx        # Social sourcing campaigns & lead intake
│   ├── inbox/
│   │   └── CandidateEmailInbox.tsx        # Inbound reply listener & intent tracker
│   ├── audit/
│   │   └── AuditLogView.tsx               # HR-understandable activity timeline
│   ├── profile/
│   │   └── UserProfileModal.tsx           # Recruiter settings & account manager
│   ├── UnifiedSidebar.tsx                 # Clean left navigation sidebar
│   └── TopHeader.tsx                      # Top command bar with live action triggers
└── lib/
    ├── types.ts                  # TypeScript interfaces for all recruitment payloads
    └── mockData.ts               # Initial state data and candidates
```

---

## 📄 Master Documentation & Architecture

For complete multi-agent specifications, database schema, and backend roadmap:
👉 **[`doc/project_plan.md`](../doc/project_plan.md)**
👉 **[`doc/project_plan.pdf`](../doc/project_plan.pdf)**
👉 **[`doc/project_architecture.pdf`](../doc/project_architecture.pdf)**
