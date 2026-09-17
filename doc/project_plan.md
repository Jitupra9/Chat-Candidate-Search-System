# TalentPulse AI — Master Project Plan & System Documentation

## Enterprise Autonomous HR Recruitment, Pipeline Management & Candidate Lifecycle Assistant

---

## 1. Executive Summary & Vision

**TalentPulse AI** is an enterprise-grade autonomous AI HR Recruiter and Talent Acquisition Platform. It transforms hiring operations by automating the entire recruitment lifecycle—from role requisition and multi-modal resume parsing to hybrid semantic candidate matching, calendar conflict resolution, interview scorecard synthesis, salary negotiation, compliant offer letter dispatch, background verification (BGV), and onboarding welcome kits.

All operations are governed by a strict **Human-In-The-Loop (HITL)** architecture and immutable audit trails, ensuring zero unauthorized external actions, 100% pay parity compliance, and grounded, hallucination-free candidate evaluations.

---

## 2. Problem Statement & Enterprise Value Proposition

### 2.1 The Crisis in Modern Talent Acquisition

- **Recruiter Overload**: HR teams spend 60–70% of their working hours on low-leverage coordination tasks: drafting job posts, parsing varied multi-column resumes, coordinating multi-interviewer availability, compiling scorecards, and negotiating counter-offers.
- **Delayed Time-to-Hire**: The traditional hiring cycle averages 36 to 48 days, causing 42% of top-tier talent to drop out or accept competing offers.
- **Compliance & Bias Risks**: Inconsistent compensation formulas violate internal pay equity and legal salary transparency mandates, while unstructured screening invites unconscious demographic bias and resume prompt-injection vulnerabilities.

### 2.2 The TalentPulse Solution

1. **End-to-End Automation**: Replaces 6+ disjointed tools (ATS, calendars, signature tools, BGV portals) with a single intelligent copilot.
2. **Strict HITL Governance**: AI drafts communications, schedules, and binding agreements with complete explainability, but requires explicit recruiter approval before dispatch.
3. **Grounded Source Attribution**: Every match score, skill badge, and experience count is backed by verified citations extracted directly from the candidate's resume.
4. **Adversarial Safety**: All incoming resumes pass through an OCR and prompt-injection firewall before LLM reasoning.

---

## 3. End-to-End 10-Stage Recruitment Lifecycle

```
[1. Requisition Wizard] ────► [2. Social Sourcing (LinkedIn)] ────► [3. Multi-Modal Parsing]
                                                                            │
[6. Scorecard Synthesis] ◄──── [5. Conflict Reschedule] ◄──── [4. Hybrid Semantic Search]
          │
          ▼
[7. Salary Negotiation] ────► [8. Compliant Offer Letter] ────► [9. BGV & KYC Clearance]
                                                                            │
                                                                            ▼
                                                                [10. Day 1 Welcome Kit]
```

1. **Job Requisition & JD Generation**: Guided wizard configures role parameters, departments, experience thresholds, and salary budget bands.
2. **Social Sourcing (LinkedIn Integration)**: Generates social postings with role requirements, salary transparency tags, and tracks applicant comments/leads.
3. **Multi-Modal Resume Ingestion**: Parses PDFs and DOCX files using Vision LLM OCR, isolates untrusted text, and computes dense vector embeddings.
4. **Hybrid Semantic & SQL Search**: Fuses dense ChromaDB embeddings with structured relational criteria (`experience >= 5`, `location = 'Remote'`) with grounded citations.
5. **Interview Scheduling & Calendar Conflict Resolution**: Self-negotiating calendar coordination that automatically detects conflicts and shifts slots.
6. **Panel Scorecard Synthesis & AI Debrief**: Aggregates interviewer ratings, evaluates competencies, and produces a consensus debrief report (_Strong Hire / Hire / No Hire_).
7. **Compensation & Counter-Offer Analysis**: Analyzes candidate counter-asks against department salary bands ($140k–$165k) and recommends parity-compliant compensation packages.
8. **Offer Letter Generation & Compliance Dispatch**: Generates formal PDF employment agreements with digital signature blocks.
9. **Background Verification (BGV) & Pre-Boarding Tracker**: Monitors 4 core checks (Employment, Education, Criminal Records, Global Sanctions) with risk level scoring.
10. **Onboarding Kit & Welcome Dispatch**: Generates Day 1 orientation schedules, reporting instructions, and KYC document checklists.

---

## 4. System Architecture & Multi-Agent Framework

### 4.1 Technology Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, React-Markdown.
- **Backend**: Python 3.13, FastAPI (Async), Pydantic v2, SQLAlchemy 2.0, Alembic.
- **AI Orchestration**: LangGraph, LangChain, ReAct Agent Loops, Claude 3.7 Sonnet / GPT-4o.
- **Data Storage**:
  - **Relational DB**: PostgreSQL 16 (Structured Candidates, Jobs, Logs, Approvals).
  - **Vector Store**: ChromaDB / pgvector (Dense Semantic Embeddings).
  - **Cache & Message Broker**: Redis 7 (Celery Tasks, Session State).
- **Security & Auth**: OAuth2 with JWT, Single Sign-On (Okta / SAML / Google Workspace), AES-256 PII Encryption.

### 4.2 Multi-Agent Graph Roles

1. **Sourcing Agent**: Prepares job descriptions, role criteria, and social campaigns.
2. **Ingestion & Sanitization Agent**: Executes multi-modal OCR, removes prompt injections, and generates embeddings.
3. **Matching & Search Agent**: Executes hybrid queries and computes grounded match scores.
4. **Coordination Agent**: Manages calendar invites, tracks candidate email replies, and shifts conflicting slots.
5. **Debrief & Scorecard Agent**: Consolidates panel feedback and compiles hiring recommendations.
6. **Compensation & Negotiation Agent**: Evaluates pay parity and models counter-offer packages.
7. **Offer & Onboarding Agent**: Formulates binding offer contracts and pre-boarding welcome packages.
8. **Safety & Audit Guard**: Enforces HITL approval gates and records immutable audit logs.

---

## 5. Complete Step-by-Step Setup Guide

### 5.1 Prerequisites

- **Node.js**: `v18.17.0` or higher
- **Python**: `v3.11` to `v3.13`
- **PostgreSQL**: `v15` or `v16` (or Docker container)
- **Redis**: `v7.0+` (for async Celery worker)
- **Package Managers**: `npm` / `pnpm` (Frontend), `pip` / `uv` (Backend)

---

### 5.2 Frontend Setup & Execution

1. **Navigate to the frontend directory**:

   ```bash
   cd frontend
   ```

2. **Install frontend dependencies**:

   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in `frontend/`:

   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1
   NEXT_PUBLIC_APP_ENV=development
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm run start
   ```

---

### 5.3 Backend Setup & Execution

1. **Navigate to the backend directory**:

   ```bash
   cd backend
   ```

2. **Create and Activate Python Virtual Environment**:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv .venv
     .\.venv\Scripts\Activate.ps1
     ```
   - **Linux / macOS**:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```

3. **Install Backend Dependencies**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure Environment Variables**:
   Create a `.env` file in `backend/`:

   ```env
   # API & Security
   PROJECT_NAME="TalentPulse AI Backend"
   ENVIRONMENT="development"
   SECRET_KEY="your-super-secret-jwt-key"
   ALLOWED_ORIGINS="http://localhost:3000"

   # Database & Storage
   DATABASE_URL="postgresql+asyncpg://postgres:postgres@localhost:5432/talentpulse_db"
   CHROMA_PERSIST_DIR="./chroma_db"
   REDIS_URL="redis://localhost:6379/0"

   # AI LLM Providers
   ANTHROPIC_API_KEY="sk-ant-api..."
   OPENAI_API_KEY="sk-proj-..."
   EMBEDDING_MODEL="text-embedding-3-small"

   # External Connectors (Optional for mock mode)
   LINKEDIN_CLIENT_ID=""
   LINKEDIN_CLIENT_SECRET=""
   SENDGRID_API_KEY=""
   GOOGLE_CALENDAR_CREDENTIALS_JSON=""
   ```

5. **Run Database Migrations**:

   ```bash
   alembic upgrade head
   ```

6. **Start the FastAPI Server**:

   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   Interactive Swagger API docs available at: [http://localhost:8000/docs](http://localhost:8000/docs)

7. **Start the Async Ingestion Worker (Celery)**:
   ```bash
   celery -A app.core.celery_worker worker --loglevel=info
   ```

---

## 6. Database Schema (PostgreSQL)

```sql
-- Candidates Core Table
CREATE TABLE candidates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    experience_years NUMERIC(4, 1) NOT NULL,
    current_company VARCHAR(255),
    current_title VARCHAR(255),
    location VARCHAR(255),
    education VARCHAR(255),
    match_score INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'applied',
    resume_url TEXT,
    resume_sha256 VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Scorecards Table
CREATE TABLE scorecards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    interview_round VARCHAR(100) NOT NULL,
    overall_score NUMERIC(3, 2) NOT NULL,
    recommendation VARCHAR(50) NOT NULL,
    competency_ratings JSONB NOT NULL,
    interviewer_notes JSONB NOT NULL,
    ai_consensus_summary TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Salary Negotiations Table
CREATE TABLE salary_negotiations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    candidate_id UUID REFERENCES candidates(id) ON DELETE CASCADE,
    initial_offer VARCHAR(50) NOT NULL,
    candidate_counter_ask VARCHAR(50) NOT NULL,
    approved_budget_band VARCHAR(100) NOT NULL,
    within_band BOOLEAN NOT NULL,
    ai_strategy_analysis TEXT NOT NULL,
    suggested_counter_package JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'pending'
);

-- Human-In-The-Loop Action Center
CREATE TABLE hitl_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    action_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    llm_reasoning TEXT NOT NULL,
    payload JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'pending_approval',
    reviewer VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    reviewed_at TIMESTAMP WITH TIME ZONE
);
```

---

## 7. Future Goals & Strategic Roadmap

### Phase 1: Core Platform & Experience (Completed)

- Next.js 16 interactive workspace with Agent Chat, Pipeline Kanban, and Audit Timeline.
- Complete approval cards for Offer Letters, Interview Rescheduling, and Welcome Kits.
- Full support for Interview Scorecards, Salary Negotiation, and BGV Trackers.

### Phase 2: Backend Multi-Agent System (Current Milestone)

- FastAPI backend with LangGraph multi-agent loop and streaming SSE responses.
- Celery async resume ingestion pipeline with PyMuPDF OCR and prompt injection sanitizers.
- ChromaDB hybrid search integration with grounded source citations.

### Phase 3: External Ecosystem Integrations (Q3 2026)

- **LinkedIn Graph API**: Live post publishing and webhook intake for candidate comments.
- **Google Calendar & Microsoft Graph**: Bi-directional calendar sync with automated multi-interviewer scheduling.
- **SendGrid / Postmark**: Outbound email deliverability with click and open tracking.

### Phase 4: Enterprise Multi-Tenancy & Compliance (Q4 2026)

- Multi-tenant organization accounts with Role-Based Access Control (RBAC).
- Okta / SAML / Microsoft Entra Single Sign-On.
- Custom company compensation bands and legal approval hierarchies.

### Phase 5: Voice AI Screener & Video Synthesis (2027)

- Autonomous 10-minute real-time WebRTC AI phone/voice screening assistant.
- Automatic transcription, technical assessment scoring, and panel debrief preparation.

### Phase 6: Universal ATS Connectors (2027)

- Two-way synchronization with Greenhouse, Workday, Lever, and SAP SuccessFactors.
