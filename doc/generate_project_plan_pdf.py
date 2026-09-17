import os
import sys
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Top header on pages > 1
        if self._pageNumber > 1:
            self.setFont("Helvetica", 8)
            self.setFillColor(colors.HexColor("#64748b"))
            self.drawString(54, 11 * 72 - 36, "TalentPulse AI — Master Project Plan & System Specification")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(54, 11 * 72 - 42, 8.5 * 72 - 54, 11 * 72 - 42)

        # Footer on all pages
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(54, 36, "CONFIDENTIAL — FOR INTERNAL RECRUITMENT & ENGINEERING PLANNING")
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(8.5 * 72 - 54, 36, page_text)
        self.setStrokeColor(colors.HexColor("#e2e8f0"))
        self.setLineWidth(0.5)
        self.line(54, 48, 8.5 * 72 - 54, 48)
        self.restoreState()

def build_pdf(filename="project_plan.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#1e1b4b")  # Deep Indigo
    accent_color = colors.HexColor("#4f46e5")   # Indigo 600
    text_dark = colors.HexColor("#0f172a")      # Slate 900
    text_muted = colors.HexColor("#475569")     # Slate 600
    bg_light = colors.HexColor("#f8fafc")       # Slate 50
    border_color = colors.HexColor("#cbd5e1")   # Slate 300

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=primary_color,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=12,
        leading=16,
        textColor=accent_color,
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=19,
        textColor=primary_color,
        spaceBefore=16,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=accent_color,
        spaceBefore=10,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=text_dark,
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=text_dark,
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=3
    )

    callout_style = ParagraphStyle(
        'Callout_Text',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#1e293b")
    )

    table_header_style = ParagraphStyle(
        'TableHeader',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    )

    table_cell_style = ParagraphStyle(
        'TableCell',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=11,
        textColor=text_dark
    )

    table_cell_bold = ParagraphStyle(
        'TableCellBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8,
        leading=11,
        textColor=text_dark
    )

    code_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#0f172a")
    )

    story = []

    # -------------------------------------------------------------
    # COVER / HEADER
    # -------------------------------------------------------------
    story.append(Paragraph("TalentPulse AI", title_style))
    story.append(Paragraph("Master Project Plan: Autonomous Enterprise HR Recruitment & Lifecycle Platform", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=accent_color, spaceBefore=0, spaceAfter=12))

    meta_table_data = [
        [
            Paragraph("<b>Version:</b> 2.0 (Enterprise Release)", body_style),
            Paragraph("<b>Status:</b> Active Architecture & Development", body_style),
        ],
        [
            Paragraph("<b>Core Framework:</b> Next.js 16 + FastAPI + LangGraph", body_style),
            Paragraph("<b>Security:</b> SOC-2 Type II & HITL Guardrails", body_style)
        ]
    ]
    meta_table = Table(meta_table_data, colWidths=[240, 260])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 6),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 12))

    # -------------------------------------------------------------
    # 1. EXECUTIVE VISION & PROBLEM STATEMENT
    # -------------------------------------------------------------
    story.append(Paragraph("1. Executive Summary & Problem Statement", h1_style))
    story.append(Paragraph(
        "<b>TalentPulse AI</b> is an enterprise-grade autonomous AI recruitment platform designed to eliminate recruiter bottlenecks while maintaining strict <b>Human-In-The-Loop (HITL)</b> compliance. Modern recruitment operations are heavily fragmented across disconnected tools (ATS, email clients, calendars, LinkedIn, document signing, and background check portals).",
        body_style
    ))
    story.append(Paragraph("<b>Key Industry Pain Points Addressed:</b>", body_style))
    story.append(Paragraph("• <b>Recruiter Fatigue:</b> 65% of recruiter time is consumed by low-leverage coordination (scheduling, scorecard tallying, drafting postings).", bullet_style))
    story.append(Paragraph("• <b>Extended Time-to-Hire:</b> Traditional recruitment takes 36 to 48 days, causing high drop-off among top candidates.", bullet_style))
    story.append(Paragraph("• <b>Compensation & Parity Risks:</b> Manual salary negotiations frequently breach internal salary equity bands and equal pay regulations.", bullet_style))
    story.append(Paragraph("• <b>Prompt Injection & Untrusted Data:</b> Adversarial resume submissions attempting to trick ranking models are mitigated via vision OCR and strict input sanitization.", bullet_style))

    story.append(Spacer(1, 8))

    # -------------------------------------------------------------
    # 2. END-TO-END 10-STAGE RECRUITMENT LIFECYCLE
    # -------------------------------------------------------------
    story.append(Paragraph("2. End-to-End 10-Stage Recruitment Lifecycle", h1_style))
    story.append(Paragraph("TalentPulse AI covers the complete talent acquisition lifecycle across 10 unified stages:", body_style))

    stages_data = [
        [
            Paragraph("Stage", table_header_style),
            Paragraph("Operational Scope", table_header_style),
            Paragraph("AI Agent Functionality", table_header_style),
            Paragraph("HITL Gate", table_header_style)
        ],
        [
            Paragraph("<b>1. Requisition</b>", table_cell_bold),
            Paragraph("Role opening & JD formulation", table_cell_style),
            Paragraph("Generates role parameters, salary bands ($140k-$165k), and skill matrices", table_cell_style),
            Paragraph("No", table_cell_style)
        ],
        [
            Paragraph("<b>2. Social Sourcing</b>", table_cell_bold),
            Paragraph("LinkedIn campaign dispatch", table_cell_style),
            Paragraph("Drafts social posts, tracks comments, and imports inbound profile leads", table_cell_style),
            Paragraph("<b>Yes (Publish)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>3. Ingestion & OCR</b>", table_cell_bold),
            Paragraph("Resume parsing & sanitization", table_cell_style),
            Paragraph("Multi-column OCR via PyMuPDF + Vision LLM with prompt injection firewall", table_cell_style),
            Paragraph("No (Async)", table_cell_style)
        ],
        [
            Paragraph("<b>4. Hybrid Match</b>", table_cell_bold),
            Paragraph("Candidate ranking & discovery", table_cell_style),
            Paragraph("Fuses ChromaDB dense vectors with SQL filters; grounded source citations", table_cell_style),
            Paragraph("No (Read)", table_cell_style)
        ],
        [
            Paragraph("<b>5. Scheduling</b>", table_cell_bold),
            Paragraph("Interview coordination & conflicts", table_cell_style),
            Paragraph("Automated Google Calendar booking & autonomous reschedule conflict negotiation", table_cell_style),
            Paragraph("<b>Yes (Send)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>6. Scorecards</b>", table_cell_bold),
            Paragraph("Panel debrief & synthesis", table_cell_style),
            Paragraph("Aggregates ratings into an AI consensus debrief (Strong Hire / Hire / No Hire)", table_cell_style),
            Paragraph("<b>Yes (Advance)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>7. Negotiation</b>", table_cell_bold),
            Paragraph("Candidate counter-offer analysis", table_cell_style),
            Paragraph("Validates asks against budget band; models sign-on/equity counter-packages", table_cell_style),
            Paragraph("<b>Yes (Approve)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>8. Offer Letters</b>", table_cell_bold),
            Paragraph("Formal employment contract", table_cell_style),
            Paragraph("Generates binding offer letters with 4-year vesting and signature placeholders", table_cell_style),
            Paragraph("<b>Yes (Dispatch)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>9. BGV Clearance</b>", table_cell_bold),
            Paragraph("Background verification & KYC", table_cell_style),
            Paragraph("Tracks 4 checks (Employment, Degrees, Criminal, Sanctions) with risk scoring", table_cell_style),
            Paragraph("<b>Yes (Clear)</b>", table_cell_bold)
        ],
        [
            Paragraph("<b>10. Welcome Kit</b>", table_cell_bold),
            Paragraph("Day 1 onboarding preparation", table_cell_style),
            Paragraph("Dispatches orientation itinerary, reporting contact, and KYC document checklist", table_cell_style),
            Paragraph("<b>Yes (Dispatch)</b>", table_cell_bold)
        ]
    ]

    stages_table = Table(stages_data, colWidths=[80, 120, 220, 80])
    stages_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, bg_light]),
        ('PADDING', (0,0), (-1,-1), 4.5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(stages_table)

    story.append(PageBreak())

    # -------------------------------------------------------------
    # 3. SYSTEM ARCHITECTURE & TECH STACK
    # -------------------------------------------------------------
    story.append(Paragraph("3. Technical Architecture & Component Specifications", h1_style))

    arch_overview = """
    <b>Frontend Layer:</b> Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide Icons, and React-Markdown. Implements responsive sidebars, interactive HITL approval queues, real-time streaming chat, candidate pipeline Kanban, and activity audit trails.<br/><br/>
    <b>Backend Core:</b> FastAPI (Python 3.13), async SQLAlchemy 2.0, Alembic migrations, Pydantic v2 validation, and SSE streaming. Features Scoped MCP tool definitions ensuring least-privilege agent execution.<br/><br/>
    <b>Agent Orchestration:</b> LangGraph multi-agent state machines with ReAct tool-calling loops, session checkpointers, and prompt-injection firewalls.<br/><br/>
    <b>Data & Vector Persistence:</b> PostgreSQL 16 for relational models (Candidates, Scorecards, Negotiations, Offers, Logs) + ChromaDB for dense semantic vector search (768/1536-dim embeddings).
    """
    story.append(Paragraph(arch_overview, body_style))
    story.append(Spacer(1, 6))

    # Tech Stack Table
    tech_data = [
        [Paragraph("Component", table_header_style), Paragraph("Technology / Framework", table_header_style), Paragraph("Primary Purpose", table_header_style)],
        [Paragraph("UI & Experience", table_cell_bold), Paragraph("Next.js 16, React 19, Tailwind CSS", table_cell_style), Paragraph("Interactive recruiter dashboard, chat stream & HITL queue", table_cell_style)],
        [Paragraph("API Gateway", table_cell_bold), Paragraph("FastAPI, Uvicorn, SSE / WebSockets", table_cell_style), Paragraph("High-throughput async endpoint routing & streaming", table_cell_style)],
        [Paragraph("Agent Runtime", table_cell_bold), Paragraph("LangGraph, Claude 3.7 Sonnet / GPT-4o", table_cell_style), Paragraph("Autonomous multi-agent lifecycle planning & tool calling", table_cell_style)],
        [Paragraph("Relational Store", table_cell_bold), Paragraph("PostgreSQL 16, Asyncpg, SQLAlchemy", table_cell_style), Paragraph("ACID transaction logs, candidate records, audit ledger", table_cell_style)],
        [Paragraph("Vector Store", table_cell_bold), Paragraph("ChromaDB / pgvector", table_cell_style), Paragraph("Dense resume chunk embeddings & cosine similarity", table_cell_style)],
        [Paragraph("Async Worker", table_cell_bold), Paragraph("Celery, Redis 7", table_cell_style), Paragraph("Background PDF OCR, parsing & inbound email processing", table_cell_style)],
        [Paragraph("Security", table_cell_bold), Paragraph("OAuth2, JWT, AES-256, Prompt Guard", table_cell_style), Paragraph("PII masking, SOC-2 encryption & adversarial defense", table_cell_style)]
    ]
    tech_table = Table(tech_data, colWidths=[110, 160, 230])
    tech_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, bg_light]),
        ('PADDING', (0,0), (-1,-1), 4),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(tech_table)
    story.append(Spacer(1, 10))

    # -------------------------------------------------------------
    # 4. SETUP INSTRUCTIONS (FRONTEND & BACKEND)
    # -------------------------------------------------------------
    story.append(Paragraph("4. Installation & Environment Setup Guide", h1_style))

    story.append(Paragraph("<b>4.1 Frontend Setup (Next.js 16)</b>", h2_style))
    fe_code = """# 1. Navigate to frontend & install dependencies
cd frontend
npm install

# 2. Configure environment variables in .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api/v1

# 3. Start development server
npm run dev    # Accessible at http://localhost:3000

# 4. Production build verification
npm run build"""
    story.append(Table([[Paragraph(fe_code.replace('\n', '<br/>'), code_style)]], colWidths=[500], style=[
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 6)
    ]))
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>4.2 Backend Setup (FastAPI & LangGraph)</b>", h2_style))
    be_code = """# 1. Navigate to backend & create virtual environment
cd backend
python -m venv .venv
.\\.venv\\Scripts\\Activate.ps1   # Windows (or 'source .venv/bin/activate' on Linux)

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start FastAPI application
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
# Interactive Swagger Docs at http://localhost:8000/docs"""
    story.append(Table([[Paragraph(be_code.replace('\n', '<br/>'), code_style)]], colWidths=[500], style=[
        ('BACKGROUND', (0,0), (-1,-1), bg_light),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('PADDING', (0,0), (-1,-1), 6)
    ]))

    story.append(PageBreak())

    # -------------------------------------------------------------
    # 5. FUTURE ROADMAP & STRATEGIC MILESTONES
    # -------------------------------------------------------------
    story.append(Paragraph("5. Future Goals & Strategic Roadmap (2026 – 2027)", h1_style))

    roadmap_data = [
        [Paragraph("Milestone & Phase", table_header_style), Paragraph("Target Window", table_header_style), Paragraph("Key Deliverables & Enterprise Capabilities", table_header_style)],
        [
            Paragraph("<b>Phase 1: Core Platform</b>", table_cell_bold),
            Paragraph("Q1 2026 (Completed)", table_cell_style),
            Paragraph("Next.js 16 workspace, 10 HITL approval cards, Audit timeline, Requisition generator, Pipeline Kanban.", table_cell_style)
        ],
        [
            Paragraph("<b>Phase 2: Backend Core</b>", table_cell_bold),
            Paragraph("Q2 2026 (In Progress)", table_cell_style),
            Paragraph("FastAPI LangGraph multi-agent loop, PyMuPDF OCR async worker, ChromaDB hybrid search, prompt injection guard.", table_cell_style)
        ],
        [
            Paragraph("<b>Phase 3: Live Connectors</b>", table_cell_bold),
            Paragraph("Q3 2026", table_cell_style),
            Paragraph("LinkedIn Graph API live posting, Google & Microsoft Calendar 2-way sync, SendGrid SMTP deliverability tracking.", table_cell_style)
        ],
        [
            Paragraph("<b>Phase 4: Multi-Tenant SaaS</b>", table_cell_bold),
            Paragraph("Q4 2026", table_cell_style),
            Paragraph("Enterprise RBAC, Okta/SAML SSO, custom department salary bands, regional compliance auditing.", table_cell_style)
        ],
        [
            Paragraph("<b>Phase 5: Voice AI Screener</b>", table_cell_bold),
            Paragraph("Q1 2027", table_cell_style),
            Paragraph("Autonomous 10-minute real-time WebRTC AI phone screening agent with auto-scorecard compilation.", table_cell_style)
        ],
        [
            Paragraph("<b>Phase 6: ATS Ecosystem</b>", table_cell_bold),
            Paragraph("Q2 2027", table_cell_style),
            Paragraph("Bi-directional sync connectors for Workday, Greenhouse, Lever, and SAP SuccessFactors.", table_cell_style)
        ]
    ]

    roadmap_table = Table(roadmap_data, colWidths=[120, 90, 290])
    roadmap_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), primary_color),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, bg_light]),
        ('PADDING', (0,0), (-1,-1), 5),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(roadmap_table)
    story.append(Spacer(1, 14))

    # -------------------------------------------------------------
    # 6. QUALITY & EVALUATION BENCHMARKS
    # -------------------------------------------------------------
    story.append(Paragraph("6. Quality Benchmarks & SLA Targets", h1_style))
    story.append(Paragraph("• <b>Retrieval Precision@5:</b> 90%+ accuracy on benchmark queries matching structured criteria.", bullet_style))
    story.append(Paragraph("• <b>Hallucination Rate:</b> 0.0% ungrounded claims regarding candidate qualifications (all citations verified).", bullet_style))
    story.append(Paragraph("• <b>HITL Safety Interception:</b> 100.0% of external state-changing actions require human authorization.", bullet_style))
    story.append(Paragraph("• <b>Injection Defense:</b> Zero ranking skew or execution hijack from adversarial prompt injection in resumes.", bullet_style))
    story.append(Paragraph("• <b>Streaming Latency:</b> First token response &le; 600ms; complex multi-agent execution &le; 3.5s.", bullet_style))

    story.append(Spacer(1, 14))
    callout_data = [[
        Paragraph("<b>Document Sign-off:</b> Architecture reviewed and verified for Enterprise Deployment. Refer to <i>project_architecture.pdf</i> for complete system topology and workflow diagrams.", callout_style)
    ]]
    callout_table = Table(callout_data, colWidths=[500])
    callout_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor("#ede9fe")),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor("#8b5cf6")),
        ('PADDING', (0,0), (-1,-1), 8),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
    ]))
    story.append(callout_table)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated {filename} successfully ({doc.page} pages).")

if __name__ == "__main__":
    out_path = os.path.join(os.path.dirname(__file__), "project_plan.pdf")
    build_pdf(out_path)
