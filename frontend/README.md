# Candidate Search AI System

# TalentPulse AI — Recruiter Assistant Frontend

A premium dark-themed, AI-powered candidate search and document RAG (Retrieval-Augmented Generation) chat system built with Next.js, TypeScript, and Tailwind CSS.
Modern, enterprise-grade Next.js frontend for **TalentPulse AI**, an autonomous AI HR Recruiter and Talent Acquisition Platform.

## Features

---

### 🎯 Core Capabilities

## 🚀 Quick Start

- **AI Chat & Search**: Unified chat interface supporting multiple search modes
  - Document Search: Query your uploaded PDFs and text documents
  - Candidate Search: Search candidates by skills, experience, and location
  - Hybrid Search: Combined document and candidate searching
  - Job Matching: Match candidates to job descriptions

- **Document Management**
  - Upload multiple PDF and TXT files
  - Drag-and-drop upload interface
  - Document status tracking (processing, done, failed)
  - Document list with metadata display

- **Candidate Management**
  - Upload candidate resumes or add manually
  - Manual candidate form with comprehensive fields
  - Candidate profile cards with skills and experience
  - Status tracking for resume processing
  - Skill-based candidate search

- **Model Configuration**
  - Dynamic LLM provider selection (OpenAI, Anthropic Claude, Google Gemini)
  - Multiple model options per provider
  - Adjustable temperature control (0.0-1.0)
  - Provider settings panel with live updates

### 🎨 Design

- **Premium Dark Theme**
  - Deep charcoal background (#0f0f0f)
  - Blue primary color (#3b82f6)
  - Cyan accent color (#06b6d4)
  - Clean, modern card-based layouts
  - Smooth transitions and hover effects

- **Responsive Layout**
  - Sidebar navigation with active state indication
  - Mobile-friendly grid layouts
  - Overflow handling for large content
  - Proper spacing and typography

## Project Structure

### 1. Install Dependencies

```bash
npm install
```

/app
├── layout.tsx # Root layout with dark theme setup
├── page.tsx # Main app page with state management
└── globals.css # Global styles and theme variables

/components
├── Sidebar.tsx # Navigation sidebar
├── ChatInterface.tsx # Main chat view with message history
├── ChatMessage.tsx # Individual message component
├── ProviderSelector.tsx # LLM provider/model settings
├── MessageInput.tsx # Textarea with auto-resize
├── DocumentUploadSection.tsx # Drag-drop document upload
├── DocumentList.tsx # Document list display
├── CandidateUploadSection.tsx # Resume/manual candidate entry
├── CandidateList.tsx # Candidate list display
└── CandidateCard.tsx # Candidate card in chat results

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technology Stack

- **Frontend Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Icons**: Lucide React icons
- **State Management**: React hooks (useState)
- **Package Manager**: pnpm

## Installation & Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Steps

1. **Install Dependencies**

   ```bash
   pnpm install
   ```

2. **Run Development Server**

   ```bash
   pnpm dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## Usage

### Chat & Search Tab

1. Select a search mode (Document, Candidate, Hybrid, or Job Match)
2. Configure LLM provider and settings in the Settings panel
3. Type your query in the message input
4. AI responses stream in the chat window

### Documents Tab

1. **Upload Documents**: Drag-drop or click "Choose Files"
2. **Supported Formats**: PDF (.pdf), Plain text (.txt)
3. **Status Tracking**: Watch documents move from processing → done/failed
4. **Document List**: View all uploaded documents with metadata

### Candidates Tab

1. **Upload Resumes**: Drag-drop resume files or click "Choose Files"
2. **Add Manually**: Click "Add Manually" to fill in candidate details form
   - Name, email, phone, location
   - Years of experience
   - Current role
   - Skills (comma-separated)
   - Expected salary, notice period
3. **Candidate List**: View all candidates with status and quick details

## Component Details

### ProviderSelector

Allows dynamic selection of:

- **Providers**: OpenAI, Anthropic Claude, Google Gemini
- **Models**: Provider-specific model options
- **Temperature**: 0.0 (Focused) to 1.0 (Creative)

Models available:

- **OpenAI**: gpt-4-turbo, gpt-4o, gpt-4o-mini
- **Anthropic**: claude-opus-4.1, claude-sonnet-4, claude-haiku-3
- **Google**: gemini-pro, gemini-pro-vision

### Search Modes

- 📄 **Document Search**: Query document content using RAG
- 👤 **Candidate Search**: Full-text search on candidate data
- 🔄 **Hybrid Search**: Search documents and candidates together
- 🎯 **Job Match**: Match candidates against job descriptions

## Theme Customization

The dark theme uses CSS custom properties defined in `/app/globals.css`:

````css
--background: #0f0f0f /* Page background */ --foreground: #fafafa
  /* Text color */ --card: #1a1a1a /* Card backgrounds */ --primary: #3b82f6
  /* Primary blue */ --accent: #06b6d4 /* Accent cyan */ --muted: #404040
  /* Muted backgrounds */ --border: #262626 /* Border color */ ###3 Production
  Build ```bash npm run build;
````

## UI Sections

---

### Sidebar

- Logo with app name
- Navigation buttons (Chat & Search, Documents, Candidates)
- Settings button at bottom

## 📁 Key Frontend Structure

### Chat Interface

- Header showing document/candidate counts
- Search mode selector with emoji indicators
- Message list with AI and user messages
- Input area with attachment button and message input
- Auto-expanding textarea for longer inputs

### Upload Sections

- Drag-drop zones with dashed borders
- File type indicators
- Upload button and alternate action buttons
- Empty states with helpful messages

### Lists

- Card-based display of documents/candidates
- Status badges with icons (processing, done, failed)
- Metadata display (date, file type, skills, etc.)
- Hover effects for interactivity

## Future Backend Integration

This UI is ready to connect to your backend:

### API Endpoints Needed

- `POST /api/documents/upload` - Upload documents
- `GET /api/documents` - List documents
- `POST /api/candidates` - Add candidates
- `GET /api/candidates` - List candidates
- `POST /api/chat` - Send message and get streaming response
- `GET /api/models` - Get available LLM models

### Data Structures

**Document**

```json
{
  "id": "doc_001",
  "fileName": "document.pdf",
  "fileType": "pdf",
  "status": "processing|done|failed",
  "uploadedAt": "2026-04-13T10:00:00Z",
  "pages": 12
}
```

**Candidate**

```json
{
  "id": "cand_001",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "location": "San Francisco",
  "experience": 5,
  "skills": ["Python", "FastAPI"],
  "role": "Senior Developer",
  "expectedSalary": "120k-150k",
  "noticePeriod": "30days",
  "resumeFile": "john_resume.pdf",
  "status": "processing|done|failed",
  "uploadedAt": "2026-04-13T10:10:00Z"
}
candidate-search-system-frontend/
├── app/
│   ├── layout.tsx                # Root layout & font configuration
│   ├── page.tsx                  # Main workspace router & state orchestration
│   └── globals.css               # Tailwind CSS rules & dark aesthetics
├── components/
│   ├── auth/
│   │   └── LoginView.tsx         # Enterprise corporate login with Google/SSO
│   ├── chat/
│   │   └── AgentChatView.tsx     # Conversational AI recruiter stream & tool execution
│   ├── hitl/
│   │   ├── HITLActionQueueView.tsx        # Master Human-In-The-Loop action center
│   │   ├── InterviewScorecardCard.tsx     # Panel debrief & AI consensus card
│   │   ├── SalaryNegotiationCard.tsx      # Counter-offer & budget parity analyzer
│   │   ├── CandidateRejectionCard.tsx     # Empathetic rejection & talent pool archiving
│   │   ├── BGVTrackerCard.tsx             # Background verification status card
│   │   ├── OfferLetterApprovalCard.tsx    # Formal compensation offer card
│   │   ├── JoiningLetterApprovalCard.tsx  # Pre-boarding kit & Day 1 checklist
│   │   └── InterviewRescheduleCard.tsx    # Automated conflict reschedule card
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

## Styling Notes

---

- Uses Tailwind CSS utility classes throughout
- Custom dark theme colors defined as CSS variables
- Lucide React icons (24px, 20px, 16px sizes)
- Smooth transitions on hover states
- Proper contrast ratios for accessibility
- Responsive grid layouts (mobile-first approach)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations

- Code splitting via Next.js App Router
- Client components for interactivity
- Lazy loading of components
- Efficient state management with hooks
- CSS custom properties for theme switching

## Accessibility

- Semantic HTML elements
- ARIA labels on buttons
- Keyboard navigation support
- Color contrast compliance
- Form labels properly associated

## Future Enhancements

- Real-time streaming responses
- File upload progress indicators
- Search result highlighting
- Candidate filtering/sorting
- Chat history persistence
- Dark/light theme toggle
- Mobile sidebar collapse
- Advanced analytics

## Environment Variables

No environment variables required for the UI. Backend connection will require:

- `NEXT_PUBLIC_API_URL` - Your backend API URL
- Provider API keys (to be handled by backend)

## License

MIT

## Support

For issues or questions about the UI design, refer to the component documentation or screenshot examples in this README.

## 📄 Master Architecture & Plans

For complete system architecture, multi-agent specifications, database schema, and backend roadmap, refer to the master plan in the root:
👉 **[`PROJECT_PLAN.md`](../PROJECT_PLAN.md)**
