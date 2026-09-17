import os
import sys
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches

from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle, HRFlowable
)
from reportlab.pdfgen import canvas

class ArchitectureCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(ArchitectureCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_decorations(num_pages)
            super(ArchitectureCanvas, self).showPage()
        super(ArchitectureCanvas, self).save()

    def draw_decorations(self, page_count):
        self.saveState()
        # Header
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(colors.HexColor("#4338ca"))
        self.drawString(54, 8.5 * 72 - 28, "TalentPulse AI — System Architecture & Workflow Blueprint")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(54, 8.5 * 72 - 32, 11 * 72 - 54, 8.5 * 72 - 32)

        # Footer
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.drawString(54, 24, "ENTERPRISE BLUEPRINT — STRICT HUMAN-IN-THE-LOOP & COMPLIANCE GOVERNANCE")
        page_text = f"Diagram Page {self._pageNumber} of {page_count}"
        self.drawRightString(11 * 72 - 54, 24, page_text)
        self.line(54, 34, 11 * 72 - 54, 34)
        self.restoreState()

def create_diagram_1(output_img="diagram_1.png"):
    """Diagram 1: End-to-End System Topology"""
    fig, ax = plt.subplots(figsize=(11, 6.2), dpi=300)
    ax.set_facecolor('#0f172a')
    fig.patch.set_facecolor('#0f172a')
    ax.axis('off')

    ax.text(0.5, 0.96, "1. Master System Topology & Data Flow", color='#ffffff', fontsize=15, weight='bold', ha='center')
    ax.text(0.5, 0.92, "Next.js 16 Enterprise Frontend <-> FastAPI Gateway <-> LangGraph Multi-Agent <-> Dual Persistence", color='#94a3b8', fontsize=9, ha='center')

    def draw_box(x, y, w, h, title, subtitle, bg_color, border_color, title_color='#ffffff', sub_color='#cbd5e1'):
        rect = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.015,rounding_size=0.02",
                                      facecolor=bg_color, edgecolor=border_color, linewidth=1.5)
        ax.add_patch(rect)
        ax.text(x + w/2, y + h*0.62, title, color=title_color, fontsize=9.5, weight='bold', ha='center', va='center')
        ax.text(x + w/2, y + h*0.32, subtitle, color=sub_color, fontsize=7.5, ha='center', va='center')

    def draw_arrow(x1, y1, x2, y2, label=""):
        ax.annotate('', xy=(x2, y2), xytext=(x1, y1),
                    arrowprops=dict(arrowstyle="->", color="#818cf8", lw=1.5, mutation_scale=12))
        if label:
            ax.text((x1+x2)/2, (y1+y2)/2 + 0.02, label, color="#c7d2fe", fontsize=7, ha='center', weight='bold')

    # Top Row
    draw_box(0.04, 0.58, 0.24, 0.26, "HR Recruiter / User", "Next.js 16 App Router UI\n• Agent Chat & Stream\n• HITL Approval Queue\n• Pipeline Kanban & Audit", "#1e1b4b", "#6366f1")
    draw_box(0.36, 0.58, 0.26, 0.26, "FastAPI API Gateway", "Async Core & SSE Stream\n• Scoped MCP Tools\n• Auth & JWT Guard\n• Session Checkpointers", "#1e293b", "#38bdf8")
    draw_box(0.70, 0.58, 0.26, 0.26, "LangGraph Multi-Agent Core", "Claude 3.7 Sonnet / GPT-4o\n• Sourcing & Ranking\n• Scheduling & Scorecards\n• Offer & BGV Reasoning", "#311042", "#c084fc")

    draw_arrow(0.28, 0.71, 0.36, 0.71, "REST / SSE")
    draw_arrow(0.62, 0.71, 0.70, 0.71, "State Graph")

    # Bottom Row
    draw_box(0.04, 0.14, 0.26, 0.30, "PostgreSQL 16 (Relational)", "Structured Data:\n• Candidates & Skills\n• Scorecards & Offers\n• Immutable Audit Ledger", "#064e3b", "#34d399")
    draw_box(0.36, 0.14, 0.26, 0.30, "ChromaDB (Vector Store)", "Dense Embeddings:\n• Resume Semantic Chunks\n• Grounded Citations\n• Hybrid Query Cosine Search", "#0c4a6e", "#38bdf8")
    draw_box(0.68, 0.14, 0.28, 0.30, "Async Workers & Integrations", "Celery + Redis + APIs:\n• PyMuPDF Vision OCR\n• Google Calendar & Meet\n• LinkedIn & SendGrid SMTP", "#701a75", "#f472b6")

    draw_arrow(0.49, 0.58, 0.17, 0.44, "SQL Models")
    draw_arrow(0.49, 0.58, 0.49, 0.44, "Vector Search")
    draw_arrow(0.83, 0.58, 0.82, 0.44, "Dispatch API")

    plt.tight_layout()
    plt.savefig(output_img, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()

def create_diagram_2(output_img="diagram_2.png"):
    """Diagram 2: 10-Stage Multi-Agent Workflow Sequence"""
    fig, ax = plt.subplots(figsize=(11, 6.2), dpi=300)
    ax.set_facecolor('#080c14')
    fig.patch.set_facecolor('#080c14')
    ax.axis('off')

    ax.text(0.5, 0.96, "2. End-to-End 10-Stage Multi-Agent Decision Workflow", color='#ffffff', fontsize=15, weight='bold', ha='center')
    ax.text(0.5, 0.92, "Autonomous Pipeline Progression from Job Opening to Day 1 Welcome Kit", color='#94a3b8', fontsize=9, ha='center')

    stages = [
        ("1. Requisition", "JD & Salary Band", "#1e1b4b", "#6366f1", 0.05, 0.65),
        ("2. Sourcing", "LinkedIn Outreach", "#1e1b4b", "#6366f1", 0.24, 0.65),
        ("3. Ingestion", "Vision OCR & Sanitizer", "#064e3b", "#10b981", 0.43, 0.65),
        ("4. Hybrid Search", "Grounded Citations", "#064e3b", "#10b981", 0.62, 0.65),
        ("5. Scheduling", "Conflict Reschedule", "#701a75", "#ec4899", 0.81, 0.65),

        ("10. Welcome Kit", "Day 1 Orientation", "#064e3b", "#10b981", 0.05, 0.22),
        ("9. BGV Clearance", "KYC & Sanctions Check", "#064e3b", "#10b981", 0.24, 0.22),
        ("8. Offer Letter", "4-Yr Vesting Contract", "#1e1b4b", "#6366f1", 0.43, 0.22),
        ("7. Negotiation", "Counter-Ask & Parity", "#1e1b4b", "#6366f1", 0.62, 0.22),
        ("6. Scorecards", "Debrief & Consensus", "#701a75", "#ec4899", 0.81, 0.22),
    ]

    for title, subtitle, bg, border, x, y in stages:
        rect = patches.FancyBboxPatch((x, y), 0.14, 0.22, boxstyle="round,pad=0.015,rounding_size=0.02",
                                      facecolor=bg, edgecolor=border, linewidth=1.5)
        ax.add_patch(rect)
        ax.text(x + 0.07, y + 0.14, title, color='#ffffff', fontsize=8.5, weight='bold', ha='center')
        ax.text(x + 0.07, y + 0.07, subtitle, color='#cbd5e1', fontsize=7, ha='center')

    for i in range(4):
        x_start = 0.05 + i*0.19 + 0.14
        x_end = 0.05 + (i+1)*0.19
        ax.annotate('', xy=(x_end, 0.76), xytext=(x_start, 0.76),
                    arrowprops=dict(arrowstyle="->", color="#818cf8", lw=1.5, mutation_scale=10))

    ax.annotate('', xy=(0.88, 0.44), xytext=(0.88, 0.65),
                arrowprops=dict(arrowstyle="->", color="#f472b6", lw=1.5, mutation_scale=10))

    for i in range(4):
        x_start = 0.81 - i*0.19
        x_end = 0.81 - i*0.19 - 0.05
        ax.annotate('', xy=(x_end, 0.33), xytext=(x_start, 0.33),
                    arrowprops=dict(arrowstyle="->", color="#34d399", lw=1.5, mutation_scale=10))

    hitl_rect = patches.FancyBboxPatch((0.05, 0.04), 0.90, 0.10, boxstyle="round,pad=0.015,rounding_size=0.02",
                                       facecolor='#1e293b', edgecolor='#f59e0b', linewidth=1.5)
    ax.add_patch(hitl_rect)
    ax.text(0.5, 0.09, "[SAFETY GATE] HUMAN-IN-THE-LOOP (HITL) GOVERNANCE", color='#fbbf24', fontsize=9.5, weight='bold', ha='center')
    ax.text(0.5, 0.06, "Zero autonomous execution for external dispatches (Emails, Rescheduling, Offers, BGV, Social Posts). All actions require recruiter approval.", color='#94a3b8', fontsize=7.5, ha='center')

    plt.tight_layout()
    plt.savefig(output_img, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()

def create_diagram_3(output_img="diagram_3.png"):
    """Diagram 3: HITL Safety & Governance State Machine"""
    fig, ax = plt.subplots(figsize=(11, 6.2), dpi=300)
    ax.set_facecolor('#0f172a')
    fig.patch.set_facecolor('#0f172a')
    ax.axis('off')

    ax.text(0.5, 0.96, "3. Human-In-The-Loop (HITL) State Machine & Safety Guard", color='#ffffff', fontsize=15, weight='bold', ha='center')
    ax.text(0.5, 0.92, "State Transitions, Pre-Execution Gate Checks, and Immutable Audit Trails", color='#94a3b8', fontsize=9, ha='center')

    def draw_state(x, y, w, h, name, desc, bg, border):
        rect = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.015,rounding_size=0.02",
                                      facecolor=bg, edgecolor=border, linewidth=1.5)
        ax.add_patch(rect)
        ax.text(x + w/2, y + h*0.65, name, color='#ffffff', fontsize=9, weight='bold', ha='center')
        ax.text(x + w/2, y + h*0.35, desc, color='#cbd5e1', fontsize=7.5, ha='center')

    draw_state(0.04, 0.52, 0.18, 0.28, "1. Action Proposed", "AI Agent plans external\ntool execution payload", "#1e1b4b", "#6366f1")
    draw_state(0.28, 0.52, 0.20, 0.28, "2. Safety Verification", "• Pay Band Compliance\n• Calendar Conflict Check\n• PII Redaction Filter", "#311042", "#c084fc")
    draw_state(0.54, 0.52, 0.20, 0.28, "3. HITL Action Center", "Status = pending_approval\nRendered in Recruiter\nApproval Queue UI", "#78350f", "#f59e0b")
    draw_state(0.80, 0.65, 0.16, 0.20, "4A. Approved", "Status = executed\nDispatched via API", "#064e3b", "#10b981")
    draw_state(0.80, 0.38, 0.16, 0.20, "4B. Rejected", "Status = rejected\nBlocked by HR", "#881337", "#f43f5e")

    draw_state(0.25, 0.10, 0.50, 0.20, "5. Immutable Audit Trail", "Recorded in PostgreSQL AGENT_ACTION_LOGS with LLM reasoning, parameters, and operator sign-off.", "#0f172a", "#38bdf8")

    ax.annotate('', xy=(0.28, 0.66), xytext=(0.22, 0.66), arrowprops=dict(arrowstyle="->", color="#818cf8", lw=1.5))
    ax.annotate('', xy=(0.54, 0.66), xytext=(0.48, 0.66), arrowprops=dict(arrowstyle="->", color="#c084fc", lw=1.5))
    ax.annotate('', xy=(0.80, 0.75), xytext=(0.74, 0.70), arrowprops=dict(arrowstyle="->", color="#34d399", lw=1.5))
    ax.annotate('', xy=(0.80, 0.48), xytext=(0.74, 0.60), arrowprops=dict(arrowstyle="->", color="#f43f5e", lw=1.5))

    ax.annotate('', xy=(0.50, 0.30), xytext=(0.88, 0.65), arrowprops=dict(arrowstyle="->", color="#38bdf8", lw=1.2, ls='--'))
    ax.annotate('', xy=(0.50, 0.30), xytext=(0.88, 0.38), arrowprops=dict(arrowstyle="->", color="#38bdf8", lw=1.2, ls='--'))

    plt.tight_layout()
    plt.savefig(output_img, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()

def create_diagram_4(output_img="diagram_4.png"):
    """Diagram 4: Database ER & ChromaDB Vector Architecture"""
    fig, ax = plt.subplots(figsize=(11, 6.2), dpi=300)
    ax.set_facecolor('#0f172a')
    fig.patch.set_facecolor('#0f172a')
    ax.axis('off')

    ax.text(0.5, 0.96, "4. Relational Schema & Vector Store Architecture", color='#ffffff', fontsize=15, weight='bold', ha='center')
    ax.text(0.5, 0.92, "PostgreSQL 16 Relational Tables & ChromaDB Dense Vector Embeddings", color='#94a3b8', fontsize=9, ha='center')

    def draw_entity(x, y, w, h, table_name, fields, bg, border):
        rect = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.01,rounding_size=0.015",
                                      facecolor=bg, edgecolor=border, linewidth=1.2)
        ax.add_patch(rect)
        # Header bar
        head_rect = patches.FancyBboxPatch((x, y+h*0.75), w, h*0.25, boxstyle="round,pad=0.005,rounding_size=0.01",
                                           facecolor=border, edgecolor=border, linewidth=1)
        ax.add_patch(head_rect)
        ax.text(x + w/2, y + h*0.87, table_name, color='#ffffff', fontsize=8, weight='bold', ha='center', va='center')
        ax.text(x + 0.01, y + h*0.38, fields, color='#cbd5e1', fontsize=6.5, va='center', fontfamily='monospace')

    # Top Row Tables
    draw_entity(0.04, 0.50, 0.19, 0.36, "CANDIDATES", "id: UUID (PK)\nfull_name: VARCHAR\nemail: VARCHAR\nexperience: NUMERIC\nmatch_score: INT\nstatus: VARCHAR\nresume_url: TEXT", "#1e1b4b", "#6366f1")
    draw_entity(0.28, 0.50, 0.20, 0.36, "SCORECARDS", "id: UUID (PK)\ncandidate_id: UUID (FK)\nround: VARCHAR\nscore: NUMERIC(3,2)\nrecommendation: VARCHAR\nnotes: JSONB\nconsensus: TEXT", "#064e3b", "#10b981")
    draw_entity(0.52, 0.50, 0.20, 0.36, "OFFER_LETTERS", "id: UUID (PK)\ncandidate_id: UUID (FK)\nbase_salary: VARCHAR\nequity_grant: VARCHAR\nsign_on_bonus: VARCHAR\nstart_date: DATE\nstatus: VARCHAR", "#701a75", "#ec4899")
    draw_entity(0.76, 0.50, 0.20, 0.36, "BGV_RECORDS", "id: UUID (PK)\ncandidate_id: UUID (FK)\nagency: VARCHAR\nstatus: VARCHAR\nrisk_level: VARCHAR\nchecks: JSONB\ncompleted: DATE", "#0c4a6e", "#38bdf8")

    # Bottom Row Tables
    draw_entity(0.04, 0.08, 0.22, 0.34, "JOB_REQUISITIONS", "id: UUID (PK)\ntitle: VARCHAR\ndepartment: VARCHAR\nbudget_band: VARCHAR\nskills: JSONB\nstatus: VARCHAR", "#1e293b", "#94a3b8")
    draw_entity(0.30, 0.08, 0.22, 0.34, "AGENT_ACTION_LOGS", "id: UUID (PK)\naction_type: VARCHAR\ntool_name: VARCHAR\nllm_reasoning: TEXT\noperator: VARCHAR\ntimestamp: TIMESTAMP", "#1e293b", "#94a3b8")
    draw_entity(0.56, 0.08, 0.40, 0.34, "CHROMADB (VECTOR STORE)", "collection: 'resume_embeddings'\n• id: string (candidate_id)\n• embedding: vector(1536)\n• metadata: {skills, experience, citations}\n• document: raw_resume_text_chunks", "#0f172a", "#f59e0b")

    plt.tight_layout()
    plt.savefig(output_img, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()

def create_diagram_5(output_img="diagram_5.png"):
    """Diagram 5: Resume Ingestion Pipeline & Prompt-Injection Firewall"""
    fig, ax = plt.subplots(figsize=(11, 6.2), dpi=300)
    ax.set_facecolor('#0f172a')
    fig.patch.set_facecolor('#0f172a')
    ax.axis('off')

    ax.text(0.5, 0.96, "5. Multi-Modal Ingestion Pipeline & Prompt-Injection Firewall", color='#ffffff', fontsize=15, weight='bold', ha='center')
    ax.text(0.5, 0.92, "Adversarial Input Sanitization, Vision LLM Extraction, and Dual Persistence", color='#94a3b8', fontsize=9, ha='center')

    def draw_step(x, y, w, h, step_num, title, desc, bg, border):
        rect = patches.FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.015,rounding_size=0.02",
                                      facecolor=bg, edgecolor=border, linewidth=1.5)
        ax.add_patch(rect)
        ax.text(x + w/2, y + h*0.70, f"{step_num}. {title}", color='#ffffff', fontsize=8.5, weight='bold', ha='center')
        ax.text(x + w/2, y + h*0.35, desc, color='#cbd5e1', fontsize=7, ha='center')

    draw_step(0.04, 0.45, 0.16, 0.32, "1", "Raw Ingestion", "PDF / DOCX Upload\n• Multi-part stream\n• SHA-256 deduplication\n• S3 Raw Storage", "#1e1b4b", "#6366f1")
    draw_step(0.23, 0.45, 0.16, 0.32, "2", "Vision LLM OCR", "PyMuPDF + Vision\n• Multi-column layout\n• Table & header parser\n• Text normalization", "#064e3b", "#10b981")
    draw_step(0.42, 0.45, 0.18, 0.32, "3", "Prompt Guard", "Adversarial Firewall\n• Isolates untrusted text\n• Neutralizes jailbreaks\n• PII token redaction", "#881337", "#f43f5e")
    draw_step(0.63, 0.45, 0.16, 0.32, "4", "Structured Parse", "Pydantic Schema\n• Experience duration\n• Grounded skill list\n• Education validation", "#701a75", "#ec4899")
    draw_step(0.82, 0.45, 0.15, 0.32, "5", "Dual Storage", "Dual Persistence\n• SQL Relational\n• ChromaDB Vectors\n• Grounded Citations", "#0c4a6e", "#38bdf8")

    # Connecting Arrows
    for i in range(4):
        x_start = 0.04 + i*0.195 + 0.16
        x_end = 0.04 + (i+1)*0.195
        ax.annotate('', xy=(x_end, 0.61), xytext=(x_start, 0.61),
                    arrowprops=dict(arrowstyle="->", color="#818cf8", lw=1.5, mutation_scale=10))

    # Bottom Callout
    callout_rect = patches.FancyBboxPatch((0.04, 0.12), 0.93, 0.22, boxstyle="round,pad=0.015,rounding_size=0.02",
                                         facecolor='#1e293b', edgecolor='#38bdf8', linewidth=1.5)
    ax.add_patch(callout_rect)
    ax.text(0.5, 0.25, "GROUNDED EVIDENCE & CITATION SAFEGUARD", color='#38bdf8', fontsize=10, weight='bold', ha='center')
    ax.text(0.5, 0.17, "Every match score and skill claim links directly to line-numbered source snippets in the candidate's resume.\nEliminates hallucination in AI candidate evaluations and ensures fair, audit-ready recruiter reviews.", color='#cbd5e1', fontsize=7.5, ha='center')

    plt.tight_layout()
    plt.savefig(output_img, facecolor=fig.get_facecolor(), edgecolor='none', bbox_inches='tight')
    plt.close()

def build_architecture_pdf(filename="project_architecture.pdf"):
    doc = SimpleDocTemplate(
        filename,
        pagesize=landscape(letter),
        leftMargin=36,
        rightMargin=36,
        topMargin=36,
        bottomMargin=36
    )

    story = []

    img1 = os.path.join(os.path.dirname(__file__), "diagram_1.png")
    img2 = os.path.join(os.path.dirname(__file__), "diagram_2.png")
    img3 = os.path.join(os.path.dirname(__file__), "diagram_3.png")
    img4 = os.path.join(os.path.dirname(__file__), "diagram_4.png")
    img5 = os.path.join(os.path.dirname(__file__), "diagram_5.png")

    create_diagram_1(img1)
    create_diagram_2(img2)
    create_diagram_3(img3)
    create_diagram_4(img4)
    create_diagram_5(img5)

    story.append(Image(img1, width=10*inch, height=5.6*inch))
    story.append(PageBreak())

    story.append(Image(img2, width=10*inch, height=5.6*inch))
    story.append(PageBreak())

    story.append(Image(img3, width=10*inch, height=5.6*inch))
    story.append(PageBreak())

    story.append(Image(img4, width=10*inch, height=5.6*inch))
    story.append(PageBreak())

    story.append(Image(img5, width=10*inch, height=5.6*inch))

    doc.build(story, canvasmaker=ArchitectureCanvas)
    print(f"Generated {filename} successfully ({doc.page} diagram pages).")

if __name__ == "__main__":
    out_path = os.path.join(os.path.dirname(__file__), "project_architecture.pdf")
    build_architecture_pdf(out_path)

