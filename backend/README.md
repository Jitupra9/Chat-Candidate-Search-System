# TalentPulse AI — Backend Microservices & Multi-Agent Core

Autonomous AI HR Recruiter Backend powered by **FastAPI**, **LangGraph**, **PostgreSQL**, and **ChromaDB**.

---

## 🚀 Quick Start Guide

### 1. Prerequisites

- **Python**: 3.11, 3.12, or 3.13
- **PostgreSQL**: 15+ (Local or Docker)
- **Redis**: 7+ (For Celery async workers)

---

### 2. Environment Setup

#### Create & Activate Virtual Environment

- **Windows (PowerShell)**:

  ```powershell
  python -m venv .venv
  .\.venv\Scripts\Activate.ps1
  ```

- **macOS / Linux**:
  ```bash
  python3 -m venv .venv
  source .venv/bin/activate
  ```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 3. Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Application Settings
PROJECT_NAME="TalentPulse AI Backend"
ENVIRONMENT="development"
SECRET_KEY="your-secret-key-change-in-production"
ALLOWED_ORIGINS="http://localhost:3000"

# Database Configuration
DATABASE_URL="postgresql+asyncpg://postgres:postgres@localhost:5432/talentpulse_db"
CHROMA_PERSIST_DIR="./chroma_db"
REDIS_URL="redis://localhost:6379/0"

# AI LLM Provider Keys
ANTHROPIC_API_KEY="sk-ant-..."
OPENAI_API_KEY="sk-proj-..."
EMBEDDING_MODEL="text-embedding-3-small"
```

---

### 4. Running the Backend Server

#### Start FastAPI Server with Auto-Reload:

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

- **Interactive Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc Documentation**: [http://localhost:8000/redoc](http://localhost:8000/redoc)

#### Start the Async Resume Ingestion Worker (Celery):

```bash
celery -A app.core.celery_worker worker --loglevel=info
```

---

## 📁 Architecture Overview

```
backend/
├── app/
│   ├── api/
│   │   ├── v1/
│   │   │   ├── chat.py           # Streaming conversational agent endpoints (SSE)
│   │   │   ├── candidates.py     # Candidate search, filter & resume upload
│   │   │   ├── hitl.py           # Human-in-the-loop action queue & approvals
│   │   │   ├── scorecards.py     # Interview scorecard synthesis
│   │   │   ├── compensation.py   # Salary negotiation & budget analyzer
│   │   │   ├── offers.py         # Offer letters & joining kit generation
│   │   │   └── analytics.py      # Funnel & time-to-hire metrics
│   ├── agents/
│   │   ├── graph.py              # Master LangGraph state machine & router
│   │   ├── sourcing_agent.py     # Job requisition & social post agent
│   │   ├── matching_agent.py     # Hybrid semantic matching agent
│   │   ├── coordination_agent.py # Scheduling & conflict resolution agent
│   │   └── debrief_agent.py      # Scorecard & hiring consensus agent
│   ├── core/
│   │   ├── config.py             # App settings & env loading
│   │   ├── security.py           # JWT, PII masking & prompt injection firewall
│   │   └── database.py           # Async SQLAlchemy engine & session
│   ├── models/                   # PostgreSQL ORM models
│   ├── schemas/                  # Pydantic v2 request/response schemas
│   └── services/
│       ├── vector_service.py     # ChromaDB vector indexing & hybrid search
│       ├── ocr_service.py        # PyMuPDF & Vision LLM resume parser
│       └── email_service.py      # SMTP / SendGrid connector
├── requirements.txt
└── README.md
```

---

## 📄 Master Documentation & Plans

For complete architectural diagrams, database ER schemas, and roadmap:
👉 **[`doc/project_plan.md`](../doc/project_plan.md)**
