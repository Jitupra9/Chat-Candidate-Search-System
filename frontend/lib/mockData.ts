import {
  Candidate,
  PendingAction,
  LinkedInPost,
  EmailMessage,
  AuditLogEntry,
  ChatMessageItem,
} from "./types";

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "cand-001",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 234-5678",
    title: "Senior AI & Backend Engineer",
    currentCompany: "NeuralCloud Inc.",
    location: "San Francisco, CA (Remote)",
    experienceYears: 6.5,
    education: "M.S. Computer Science, Stanford University",
    skills: [
      "Python",
      "FastAPI",
      "PyTorch",
      "LangChain",
      "PostgreSQL",
      "Docker",
      "AWS",
    ],
    matchScore: 96,
    status: "shortlisted",
    appliedRole: "Senior AI Engineer",
    appliedDate: "2026-09-02",
    resumeUrl: "/resumes/alex_rivera_cv.pdf",
    summary:
      "6+ years building scalable Python microservices & LLM agent pipelines with FastAPI and PyTorch. Architected high-throughput vector search for 2M+ docs.",
    citations: [
      {
        field: "Years of Experience",
        claimedValue: "6.5 years",
        sourceSnippet:
          "NeuralCloud Inc. (2020-Present): 4 yrs; DataVibe Labs (2018-2020): 2.5 yrs backend engineering",
        pageNumber: 1,
        confidence: 0.98,
      },
      {
        field: "Core Frameworks",
        claimedValue: "FastAPI, PyTorch",
        sourceSnippet:
          "Designed & deployed low-latency inference services using FastAPI and PyTorch serving 450 RPS.",
        pageNumber: 1,
        confidence: 0.99,
      },
    ],
  },
  {
    id: "cand-002",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+1 (555) 345-6789",
    title: "Lead Python / ML Infrastructure Engineer",
    currentCompany: "QuantumScale Systems",
    location: "Austin, TX (Hybrid)",
    experienceYears: 7.2,
    education: "B.Tech Computer Science, IIT Bombay",
    skills: [
      "Python",
      "FastAPI",
      "PyTorch",
      "Kubernetes",
      "Redis",
      "ChromaDB",
      "GCP",
    ],
    matchScore: 94,
    status: "shortlisted",
    appliedRole: "Senior AI Engineer",
    appliedDate: "2026-09-03",
    resumeUrl: "/resumes/priya_sharma_cv.pdf",
    summary:
      "7+ years Python distributed systems experience with heavy focus on ML production pipelines, Kubernetes deployments, and vector database orchestration.",
    citations: [
      {
        field: "Experience",
        claimedValue: "7.2 years",
        sourceSnippet:
          "QuantumScale (2021-Present): Lead Engineer 3.5 yrs; CogniTech (2019-2021): 2 yrs; FinTech Corp (2017-2019): 1.7 yrs",
        pageNumber: 1,
        confidence: 0.97,
      },
      {
        field: "Vector DBs",
        claimedValue: "ChromaDB, Pinecone",
        sourceSnippet:
          "Implemented ChromaDB semantic clustering reducing retrieval latency by 42%.",
        pageNumber: 2,
        confidence: 0.95,
      },
    ],
  },
  {
    id: "cand-003",
    name: "Marcus Vance",
    email: "marcus.vance@example.com",
    phone: "+1 (555) 456-7890",
    title: "Full Stack Python Developer",
    currentCompany: "OmniFlow Solutions",
    location: "Seattle, WA (Remote)",
    experienceYears: 5.0,
    education: "B.S. Software Engineering, University of Washington",
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "React",
      "PostgreSQL",
      "TypeScript",
    ],
    matchScore: 88,
    status: "screening",
    appliedRole: "Senior AI Engineer",
    appliedDate: "2026-09-04",
    resumeUrl: "/resumes/marcus_vance_cv.pdf",
    summary:
      "5 years building full-stack web applications with Python/FastAPI backends and Next.js/React frontends.",
    citations: [
      {
        field: "Experience",
        claimedValue: "5.0 years",
        sourceSnippet:
          "OmniFlow (2022-Present): 3 yrs; DevStudio (2020-2022): 2 yrs",
        pageNumber: 1,
        confidence: 0.96,
      },
    ],
  },
  {
    id: "cand-004",
    name: "Elena Rostova",
    email: "elena.rostova@example.com",
    phone: "+1 (555) 567-8901",
    title: "Junior ML Engineer",
    currentCompany: "DataSprint",
    location: "New York, NY (Onsite)",
    experienceYears: 2.8,
    education: "M.S. Data Science, Columbia University",
    skills: ["Python", "TensorFlow", "scikit-learn", "SQL", "Flask"],
    matchScore: 68,
    status: "applied",
    appliedRole: "Senior AI Engineer",
    appliedDate: "2026-09-05",
    resumeUrl: "/resumes/elena_rostova_cv.pdf",
    summary:
      "Data scientist and ML engineer with 2.8 years experience focusing on predictive modeling and statistical analysis.",
    citations: [
      {
        field: "Experience",
        claimedValue: "2.8 years",
        sourceSnippet:
          "DataSprint (2023-Present): 2.8 yrs junior data science role",
        pageNumber: 1,
        confidence: 0.99,
      },
    ],
  },
  {
    id: "cand-005",
    name: "David Kim",
    email: "david.kim@example.com",
    phone: "+1 (555) 678-9012",
    title: "Senior Backend Architect",
    currentCompany: "Apex Cloud Systems",
    location: "Denver, CO (Remote)",
    experienceYears: 8.5,
    education: "B.S. Electrical & Computer Engineering, UC Berkeley",
    skills: [
      "Python",
      "Golang",
      "FastAPI",
      "Distributed Systems",
      "Kafka",
      "PostgreSQL",
    ],
    matchScore: 91,
    status: "interview_scheduled",
    appliedRole: "Senior AI Engineer",
    appliedDate: "2026-09-01",
    resumeUrl: "/resumes/david_kim_cv.pdf",
    summary:
      "8.5 years architecting enterprise distributed microservices in Python and Go with real-time streaming architectures.",
    citations: [
      {
        field: "Experience",
        claimedValue: "8.5 years",
        sourceSnippet:
          "Apex Cloud (2021-Present): 4.5 yrs; CloudScale (2017-2021): 4 yrs",
        pageNumber: 1,
        confidence: 0.99,
      },
    ],
  },
  {
    id: "cand-006",
    name: "Sophia Zhang",
    email: "sophia.zhang@example.com",
    phone: "+1 (555) 789-0123",
    title: "AI Research & Applications Engineer",
    currentCompany: "Cerebral AI Labs",
    location: "Boston, MA (Remote)",
    experienceYears: 5.5,
    education: "Ph.D. Candidate / M.S. AI, MIT",
    skills: [
      "Python",
      "PyTorch",
      "Transformers",
      "FastAPI",
      "ChromaDB",
      "CUDA",
    ],
    matchScore: 95,
    status: "applied",
    appliedRole: "Senior AI Engineer",
    appliedDate: "2026-09-06",
    resumeUrl: "/resumes/sophia_zhang_cv.pdf",
    summary:
      "5.5 years specializing in transformer fine-tuning, RAG retrieval pipelines, and high-performance LLM deployment.",
    citations: [
      {
        field: "Experience",
        claimedValue: "5.5 years",
        sourceSnippet:
          "Cerebral AI (2022-Present): 3.5 yrs; AI Institute (2020-2022): 2 yrs research fellow",
        pageNumber: 1,
        confidence: 0.96,
      },
    ],
  },
];

export const INITIAL_ACTIONS: PendingAction[] = [
  {
    id: "act-001",
    type: "linkedin_post",
    status: "pending_approval",
    title: "Publish LinkedIn Job Posting",
    description:
      "Post Senior AI Engineer requisition to LinkedIn feed with application link.",
    llmReasoning:
      "HR requested a job posting for Senior AI Engineer ($140k-$160k, Remote). Generating draft and placing in HITL approval gate before external API broadcast.",
    payload: {
      linkedin: {
        roleTitle: "Senior AI / Machine Learning Engineer",
        department: "AI & Core Engineering",
        location: "Remote (US/EU)",
        salaryRange: "$140,000 - $165,000 USD + Equity",
        content: `🚀 We're hiring a Senior AI Engineer to help build our next-generation autonomous AI recruitment platform!\n\nKey Responsibilities:\n• Build production RAG and LLM agent workflows with LangGraph & FastAPI\n• Scale vector search indexing (ChromaDB) and real-time inference pipelines\n• Integrate human-in-the-loop safety and verification systems\n\nRequirements:\n✓ 5+ years Python development with FastAPI / PyTorch\n✓ Experience with Vector Databases & RAG architectures\n✓ Strong system design and API engineering background\n\n💼 Compensation: $140,000 - $165,000 USD (Remote)\n👉 Apply directly or drop a comment / DM to connect!`,
        hashtags: [
          "#Hiring",
          "#AIEngineer",
          "#Python",
          "#PyTorch",
          "#LangGraph",
          "#RemoteJobs",
        ],
      },
    },
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "act-002",

    type: "email_dispatch",
    status: "pending_approval",
    title: "Dispatch Shortlist & Interview Invite Emails",
    description:
      "Send personalized invitation emails to 2 top-ranked candidates (Alex Rivera, Priya Sharma).",
    llmReasoning:
      "Alex Rivera (96% match) and Priya Sharma (94% match) exceed the 5+ years Python and FastAPI threshold. Generating personalized email drafts for recruiter review before SMTP dispatch.",
    payload: {
      email: {
        candidateIds: ["cand-001", "cand-002"],
        candidates: [
          {
            id: "cand-001",
            name: "Alex Rivera",
            email: "alex.rivera@example.com",
          },
          {
            id: "cand-002",
            name: "Priya Sharma",
            email: "priya.sharma@example.com",
          },
        ],
        subject:
          "Invitation to Technical Interview: Senior AI Engineer at TalentPulse",
        bodyTemplate: `Hi {{CandidateName}},\n\nThank you for applying to the Senior AI Engineer role at TalentPulse! Our hiring team was thoroughly impressed by your background—particularly your hands-on work with high-throughput FastAPI microservices and vector indexing.\n\nWe would love to invite you to a 45-minute technical conversation with our Engineering Lead on Thursday, Oct 12 at 2:00 PM EST.\n\nPlease reply to this email to confirm if this time works for you, or let us know alternative slots.\n\nBest regards,\nSarah Jenkins\nLead Technical Recruiter, TalentPulse AI`,
        emailType: "interview_invite",
        scheduledSlot: "Thursday, Oct 12 at 2:00 PM EST",
      },
    },
    createdAt: new Date(Date.now() - 15 * 60 * 1000),
  },
  {
    id: "act-003",
    type: "interview_reschedule",
    status: "pending_approval",
    title: "Reschedule Technical Screen: David Kim",
    description:
      "Candidate requested pushing Thursday meeting back by 30 mins (3:30 PM EST). Both candidate & tech lead verified free.",
    llmReasoning:
      "Parsed inbound reschedule email from David Kim. Cross-referenced Engineering Lead's calendar and found 3:30 PM EST open. Generated updated Google Meet calendar invitation.",
    payload: {
      reschedule: {
        candidateId: "cand-005",
        candidateName: "David Kim",
        candidateEmail: "david.kim@example.com",
        roleTitle: "Senior AI Engineer",
        originalSlot: "Thursday, Oct 12 at 2:00 PM EST",
        proposedSlot: "Thursday, Oct 12 at 3:30 PM EST",
        reason: "Current employer sprint demo conflict",
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
    createdAt: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: "act-004",
    type: "offer_letter",
    status: "pending_approval",
    title: "Generate & Send Official Offer Letter: Alex Rivera",
    description:
      "Formal compensation offer: $155,000 USD base salary + 0.15% equity grant. Awaiting HR sign-off.",
    llmReasoning:
      "Candidate completed final interview loop with highest ratings (96% match). Salary is within approved budget band ($140k-$165k). Prepared offer letter document with standard 4-year vesting.",
    payload: {
      offer: {
        candidateId: "cand-001",
        candidateName: "Alex Rivera",
        candidateEmail: "alex.rivera@example.com",
        roleTitle: "Senior AI Engineer",
        department: "AI & Platform Engineering",
        baseSalary: "$155,000 USD",
        equityGrant: "0.15% (15,000 Stock Options)",
        bonus: "$15,000 Annual Performance Bonus",
        startDate: "November 1, 2026",
        expiryDate: "October 20, 2026",
        reportingManager: "Marcus Chen (VP of AI & Engineering)",
        employmentType: "Full-Time",
        benefits: [
          "Comprehensive Health, Dental & Vision (100% covered)",
          "401(k) with 4% Employer Match",
          "Unlimited Paid Time Off (PTO)",
          "$3,000 Annual Tech & Home Office Stipend",
        ],
        letterTemplate: `Dear Alex Rivera,\n\nOn behalf of TalentPulse AI, we are thrilled to offer you the position of Senior AI Engineer in our AI & Platform Engineering team.\n\nWe were deeply impressed by your background in scalable Python microservices, LangGraph agent pipelines, and high-throughput vector search. We believe your contributions will be pivotal in shaping the future of our autonomous recruitment platform.\n\nSummary of Offer Terms:\n• Base Salary: $155,000 USD per annum, paid semi-monthly\n• Equity Grant: 0.15% (15,000 Stock Options) with standard 4-year vesting and 1-year cliff\n• Performance Bonus: $15,000 Annual Target Bonus\n• Start Date: November 1, 2026\n• Reporting To: Marcus Chen (VP of AI & Engineering)\n• Benefits: Comprehensive Health, Dental, Vision, 401(k) 4% match, and unlimited PTO\n\nThis offer is valid until October 20, 2026. Please review and sign to accept.\n\nSincerely,\nSarah Jenkins\nLead Technical Recruiter, TalentPulse AI`,
      },
    },
    createdAt: new Date(Date.now() - 3 * 60 * 1000),
  },
  {
    id: "act-005",
    type: "interview_scorecard",
    status: "pending_approval",
    title: "Interview Panel Scorecard & Debrief: Priya Sharma",
    description:
      "Panel recommendation: Strong Hire (4.7/5.0). Exceeds L5 Staff ML Architecture benchmark. Awaiting HR sign-off to proceed to offer.",
    llmReasoning:
      "Consolidated feedback from 3 interviewers (Engineering Lead, Principal Architect, Recruiter). High ratings in Distributed Systems (4.9/5) and Python internals (4.8/5). Recommending advancement to offer formulation.",
    payload: {
      scorecard: {
        candidateId: "cand-002",
        candidateName: "Priya Sharma",
        candidateEmail: "priya.sharma@example.com",
        roleTitle: "Staff ML Engineer",
        interviewRound: "Round 3: System Design & Live Coding",
        interviewers: [
          {
            name: "Marcus Chen",
            title: "Engineering Director",
            score: 4.8,
            notes:
              "Outstanding clarity on vector caching and high-concurrency LangGraph architectures. Strong hire.",
          },
          {
            name: "David Sterling",
            title: "Principal Architect",
            score: 4.9,
            notes:
              "Deep understanding of PyTorch tensor optimization and distributed checkpointing.",
          },
          {
            name: "Sarah Jenkins",
            title: "Lead Recruiter",
            score: 4.5,
            notes:
              "Excellent communicator, strong cultural alignment with our collaborative engineering principles.",
          },
        ],
        ratings: [
          {
            category: "System Architecture & Scalability",
            score: 4.9,
            maxScore: 5,
          },
          { category: "Python / PyTorch Proficiency", score: 4.8, maxScore: 5 },
          {
            category: "Problem Solving & Algorithm Design",
            score: 4.6,
            maxScore: 5,
          },
          { category: "Communication & Cultural Fit", score: 4.7, maxScore: 5 },
        ],
        overallScore: 4.7,
        hiringRecommendation: "Strong Hire",
        aiConsensusSummary:
          "The interview panel unanimously recommends Priya Sharma for the Staff ML role. Candidate demonstrated exceptional depth in scalable ML pipelines and clear leadership potential with zero red flags.",
        keyStrengths: [
          "Demonstrated 7+ yrs building microservices handling 10k+ QPS",
          "Deep mastery of vector index pruning and semantic caching",
          "Articulate communication and mentorship-driven mindset",
        ],
        areasOfConcern: [
          "Prefers remote/hybrid schedule (already aligned with company policy)",
        ],
      },
    },
    createdAt: new Date(Date.now() - 6 * 60 * 1000),
  },
  {
    id: "act-006",
    type: "salary_negotiation",
    status: "pending_approval",
    title: "Candidate Counter-Offer Negotiation: Elena Rostova",
    description:
      "Candidate requested $160,000 base (initial offer $148,000). AI recommends counter-package with sign-on bonus to preserve internal equity band.",
    llmReasoning:
      "Candidate has competing offer from TechCorp. Analyzed approved band ($140k-$165k). Recommended $154k base + $10k sign-on bonus to meet candidate total compensation expectations while maintaining pay parity across team.",
    payload: {
      negotiation: {
        candidateId: "cand-004",
        candidateName: "Elena Rostova",
        candidateEmail: "elena.rostova@example.com",
        roleTitle: "Senior AI Engineer",
        initialOfferBase: "$148,000 USD",
        candidateCounterAsk: "$160,000 USD",
        approvedBudgetBand: "$140,000 - $165,000 USD",
        withinBand: true,
        aiCompensationAnalysis:
          "Candidate's counter-ask of $160k is within the department's $165k ceiling. However, to preserve internal peer equity for L5 engineers, we recommend offering $154,000 Base Salary with a $10,000 Sign-on Bonus and 0.12% equity grant. This delivers a Year 1 compensation of $164k, exceeding her target.",
        suggestedCounterPackage: {
          baseSalary: "$154,000 USD",
          signOnBonus: "$10,000 USD",
          equityGrant: "0.12% (12,000 Options)",
          performanceBonus: "$15,000 USD",
        },
        justificationNotes:
          "Maintains salary consistency with 2 existing senior engineers while securing top-tier talent.",
      },
    },
    createdAt: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: "act-007",
    type: "candidate_rejection",
    status: "pending_approval",
    title: "Empathetic Candidate Rejection: Marcus Vance",
    description:
      "Candidate did not pass System Design round (2.6/5.0). Prepared polite feedback letter with talent bench retention in Future Junior Roles pool.",
    llmReasoning:
      "Candidate demonstrated strong enthusiasm but lacked the 5+ years distributed systems requirement. Generating constructive, empathetic rejection notice with automated archiving into future junior/mid talent pool.",
    payload: {
      rejection: {
        candidateId: "cand-003",
        candidateName: "Marcus Vance",
        candidateEmail: "marcus.vance@example.com",
        roleTitle: "Senior AI Engineer",
        stageReached: "Round 2: System Design",
        politeFeedbackSummary:
          "Candidate showed commendable problem-solving drive. However, our current Senior AI opening requires extensive production experience with high-throughput distributed vector stores and fault-tolerant queueing that is not yet reflected in his portfolio.",
        emailSubject:
          "Update regarding your Senior AI Engineer application at TalentPulse",
        emailBody: `Dear Marcus,\n\nThank you very much for taking the time to speak with our engineering team for the Senior AI Engineer role at TalentPulse.\n\nWe were very impressed by your passion for AI systems and your clear problem-solving mindset. However, at this time, we have decided to move forward with candidates whose experience more closely matches our immediate need for multi-year distributed infrastructure scaling.\n\nWe would love to stay in touch as our engineering organization expands. With your permission, we will keep your profile in our priority talent pool for upcoming mid-level opportunities.\n\nWe wish you all the best in your career journey and hope to connect again in the near future.\n\nWarm regards,\nSarah Jenkins\nLead Technical Recruiter, TalentPulse AI`,
        talentPoolCategory: "Mid-Level AI / Python Talent Pool",
        keepInWarmTalentPool: true,
        archiveDuration: "12 Months",
      },
    },
    createdAt: new Date(Date.now() - 18 * 60 * 1000),
  },
  {
    id: "act-008",
    type: "bgv_verification",
    status: "pending_approval",
    title: "Background Check (BGV) Clearance: Sophia Zhang",
    description:
      "Third-party agency (Checkr Enterprise) returned 100% verified status. Ready for pre-boarding clearance.",
    llmReasoning:
      "All 4 background verification checks (Identity, Employment, Education, Criminal Records) returned Verified with zero discrepancies. Candidate cleared for Day 1 onboarding.",
    payload: {
      bgv: {
        candidateId: "cand-006",
        candidateName: "Sophia Zhang",
        candidateEmail: "sophia.zhang@example.com",
        roleTitle: "Senior AI Engineer",
        joiningDate: "November 15, 2026",
        agencyName: "Checkr Enterprise Screening",
        verificationStatus: "cleared",
        riskScore: "Low",
        checks: [
          {
            name: "Previous Employment Verification",
            status: "verified",
            notes:
              "Verified 4.5 years at Stripe as Senior Software Engineer. Dates and titles match 100%.",
          },
          {
            name: "Education & Degree Verification",
            status: "verified",
            notes:
              "B.S. & M.S. in Computer Science from UC Berkeley confirmed.",
          },
          {
            name: "Criminal & Court Record Check",
            status: "verified",
            notes: "Clean record across Federal, State, and County databases.",
          },
          {
            name: "Identity & Global Sanctions / KYC",
            status: "verified",
            notes: "SSN trace and international sanctions list cleared.",
          },
        ],
        submittedDate: "October 02, 2026",
        completedDate: "October 08, 2026",
      },
    },
    createdAt: new Date(Date.now() - 25 * 60 * 1000),
  },
];

export const INITIAL_LINKEDIN_POSTS: LinkedInPost[] = [
  {
    id: "post-101",
    roleTitle: "Senior AI / Machine Learning Engineer",
    salaryRange: "$140k - $165k",
    content: `🚀 We're hiring a Senior AI Engineer to build next-generation agentic workflows! Seeking 5+ years experience in Python, FastAPI, and Vector DBs. Remote (US/EU).`,
    hashtags: ["#AIEngineering", "#Python", "#RemoteWork"],
    status: "published",
    publishedAt: "2026-09-05 10:30 AM",
    applicantsCount: 14,
    commentsCount: 6,
    impressions: 1840,
    leads: [
      {
        id: "lead-1",
        name: "Jordan Miller",
        profileUrl: "https://linkedin.com/in/jordan-miller-ai",
        comment:
          "Interested in this role! Just sent my resume via your portal.",
        imported: true,
      },
      {
        id: "lead-2",
        name: "Carlos Mendez",
        profileUrl: "https://linkedin.com/in/carlos-mendez-dev",
        comment:
          "Hi Sarah, 6 yrs Python backend experience here. Would love to connect!",
        imported: false,
      },
    ],
  },
];

export const INITIAL_EMAIL_MESSAGES: EmailMessage[] = [
  {
    id: "em-001",
    threadId: "th-alex",
    candidateId: "cand-001",
    candidateName: "Alex Rivera",
    candidateEmail: "alex.rivera@example.com",
    direction: "outbound",
    subject:
      "Invitation to Technical Interview: Senior AI Engineer at TalentPulse",
    body: "Hi Alex, we would love to invite you for an interview on Thursday, Oct 12 at 2:00 PM EST. Let us know if this slot works.",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    id: "em-002",
    threadId: "th-alex",
    candidateId: "cand-001",
    candidateName: "Alex Rivera",
    candidateEmail: "alex.rivera@example.com",
    direction: "inbound",
    subject:
      "Re: Invitation to Technical Interview: Senior AI Engineer at TalentPulse",
    body: "Hi Sarah! Thank you so much for the invitation. Thursday, Oct 12 at 2:00 PM EST works perfectly for me. Looking forward to speaking with the team!",
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    intent: "confirmed",
    aiSummary:
      "Candidate confirmed interview availability for Thursday, Oct 12 at 2:00 PM EST.",
  },
  {
    id: "em-003",
    threadId: "th-david",
    candidateId: "cand-005",
    candidateName: "David Kim",
    candidateEmail: "david.kim@example.com",
    direction: "inbound",
    subject: "Re: Interview Confirmation & Meeting Link",
    body: "Hi team, could we push our discussion back by 30 minutes to 3:30 PM EST due to a team conflict on my end?",
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    intent: "reschedule_requested",
    aiSummary: "Candidate requested a 30-minute reschedule to 3:30 PM EST.",
  },
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "act-log-001",
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
    title: "Candidate Confirmed Interview Attendance",
    category: "scheduling",
    status: "completed",
    actor: "Candidate Inbound Listener",
    candidateName: "Alex Rivera",
    candidateId: "cand-001",
    jobRole: "Senior AI Engineer",
    summary:
      "Alex Rivera replied to invitation and confirmed availability for Thursday, Oct 12 at 2:00 PM EST.",
    businessImpact:
      "Candidate stage automatically updated to 'Interview Scheduled'.",
    metadata: {
      confirmedSlot: "Thursday, Oct 12 at 2:00 PM EST",
      interviewer: "Sarah Jenkins & Tech Lead",
      platform: "Google Meet",
    },
    toolName: "parse_inbound_reply",
    actionType: "read",
    llmReasoning:
      "Candidate email verified as positive confirmation with no schedule conflict.",
    operator: "AI Assistant",
    details: "Automated status update and calendar slot locked.",
  },
  {
    id: "act-log-002",
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    title: "Interview Reschedule Request Received",
    category: "scheduling",
    status: "action_required",
    actor: "Candidate Inbound Listener",
    candidateName: "David Kim",
    candidateId: "cand-005",
    jobRole: "Senior AI Engineer",
    summary:
      "David Kim sent an email requesting to move interview slot back by 30 minutes to 3:30 PM EST.",
    businessImpact:
      "Awaiting recruiter review to send updated calendar invite.",
    metadata: {
      requestedSlot: "Thursday, Oct 12 at 3:30 PM EST",
      reason: "Team conflict at current employer",
    },
    toolName: "inbound_email_alert",
    actionType: "read",
    llmReasoning:
      "Identified reschedule intent requiring calendar confirmation.",
    operator: "Candidate via Email",
    details: "Flagged in candidate inbox for 1-click time adjustment.",
  },
  {
    id: "act-log-003",
    timestamp: new Date(Date.now() - 35 * 60 * 1000),
    title: "Technical Interview Invitations Prepared",
    category: "outreach",
    status: "pending_approval",
    actor: "AI Recruiter Assistant",
    candidateName: "Alex Rivera, Priya Sharma",
    jobRole: "Senior AI Engineer",
    summary:
      "Prepared personalized technical interview invitations for 2 top-ranked candidates with grounded project citations.",
    businessImpact:
      "Held in verification queue for recruiter approval before sending.",
    metadata: {
      recipientCount: 2,
      recipients: ["Alex Rivera", "Priya Sharma"],
      emailType: "interview_invite",
      meetingSlot: "Thursday, Oct 12 at 2:00 PM EST",
    },
    toolName: "draft_candidate_email",
    actionType: "email_dispatch",
    llmReasoning:
      "Candidates exceed 94% match score on Python & FastAPI requirements.",
    operator: "AI Recruiter Assistant",
    details: "Draft held in Human-in-the-Loop review queue.",
  },
  {
    id: "act-log-004",
    timestamp: new Date(Date.now() - 50 * 60 * 1000),
    title: "LinkedIn Job Requisition Drafted",
    category: "sourcing",
    status: "pending_approval",
    actor: "AI Recruiter Assistant",
    jobRole: "Senior AI / ML Engineer",
    summary:
      "Generated LinkedIn job post with role requirements ($140k-$165k, Remote) and 5 hiring hashtags.",
    businessImpact:
      "Awaiting recruiter review before publishing to LinkedIn company feed.",
    metadata: {
      salaryRange: "$140,000 - $165,000 USD",
      workMode: "Remote (US/EU)",
      targetAudience: "Python / PyTorch Engineers",
    },
    toolName: "draft_linkedin_job_post",
    actionType: "linkedin_post",
    llmReasoning:
      "HR opened requisition for Senior AI Engineer. Draft generated.",
    operator: "AI Recruiter Assistant",
    details: "Post preview ready for recruiter editing & publishing.",
  },
  {
    id: "act-log-005",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    title: "Staff ML Engineer Job Published to LinkedIn",
    category: "sourcing",
    status: "completed",
    actor: "Sarah Jenkins (Lead Recruiter)",
    jobRole: "Staff ML Engineer",
    summary:
      "Approved and published social job post to LinkedIn talent network. Reached 1,840 impressions and 14 candidate applicants.",
    businessImpact:
      "Active talent sourcing campaign running. 2 inbound leads captured.",
    metadata: {
      impressions: 1840,
      applicants: 14,
      platform: "LinkedIn Feed",
    },
    toolName: "publish_linkedin_job_post",
    actionType: "linkedin_post",
    llmReasoning: "Recruiter clicked approve and authorized live broadcast.",
    operator: "Sarah Jenkins",
    details: "Broadcasted to LinkedIn API with public application link.",
  },
  {
    id: "act-log-006",
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    title: "Bulk Resumes Ingested & Verified",
    category: "screening",
    status: "completed",
    actor: "Async Ingestion Pipeline",
    jobRole: "Senior AI Engineer",
    summary:
      "Parsed and indexed 6 candidate resumes. Extracted skills, experience duration, and verified grounded citations.",
    businessImpact:
      "Candidate database updated with 6 rich profiles and vector embeddings.",
    metadata: {
      resumesProcessed: 6,
      averageMatchScore: "88%",
      verifiedSkillsCount: 24,
    },
    toolName: "ingest_resume_pipeline",
    actionType: "search",
    llmReasoning:
      "Extracted work history, verified certifications, and generated citations.",
    operator: "Ingestion Worker",
    details: "Dual-persisted to SQL and ChromaDB vector store.",
  },
  {
    id: "act-log-007",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
    title: "Candidate Shortlisted for Technical Review",
    category: "pipeline",
    status: "completed",
    actor: "Sarah Jenkins (Lead Recruiter)",
    candidateName: "Priya Sharma",
    candidateId: "cand-002",
    jobRole: "Senior AI Engineer",
    summary:
      "Moved Priya Sharma (94% match) from Applied to Shortlisted after verifying 7.2 years ML infra experience.",
    businessImpact:
      "Candidate marked ready for hiring team technical screening.",
    metadata: {
      previousStage: "Applied",
      newStage: "Shortlisted",
      matchedSkills: ["Python", "FastAPI", "PyTorch", "Kubernetes"],
    },
    toolName: "update_candidate_status",
    actionType: "search",
    llmReasoning: "Match score 94% exceeds criteria.",
    operator: "Sarah Jenkins",
    details: "Status transitioned in candidate pipeline.",
  },
  {
    id: "act-log-008",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    title: "Candidate Rejection with Constructive Feedback",
    category: "outreach",
    status: "completed",
    actor: "Sarah Jenkins (Lead Recruiter)",
    candidateName: "Elena Rostova",
    candidateId: "cand-004",
    jobRole: "Senior AI Engineer",
    summary:
      "Sent personalized notice to Elena Rostova (2.8 yrs exp vs 5+ yr senior requirement) with invitation to future mid-level openings.",
    businessImpact:
      "Candidate archived with positive employer brand experience.",
    metadata: {
      rejectionReason: "Experience duration below senior threshold",
      talentPoolCategory: "Future Mid-Level ML Roles",
    },
    toolName: "send_candidate_email",
    actionType: "email_dispatch",
    llmReasoning: "Constructive feedback email sent to candidate.",
    operator: "Sarah Jenkins",
    details: "Archived to junior/mid-level talent bench.",
  },
  {
    id: "act-log-009",
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    title: "Candidate Compensation Cap Check",
    category: "compliance",
    status: "completed",
    actor: "AI Recruiter Assistant",
    candidateName: "Sophia Zhang",
    candidateId: "cand-006",
    jobRole: "Senior AI Engineer",
    summary:
      "Verified candidate expected salary of $155,000 against approved requisition band of $140,000 - $165,000.",
    businessImpact:
      "Compensation is within budget. Candidate cleared for interview scheduling.",
    metadata: {
      budgetBand: "$140k - $165k",
      candidateExpectation: "$155k",
      status: "Compliant / In-Band",
    },
    toolName: "verify_compensation_policy",
    actionType: "search",
    llmReasoning: "Salary expectations within approved department budget.",
    operator: "AI Assistant",
    details: "Compliance gate cleared.",
  },
  {
    id: "act-log-010",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    title: "GDPR Data Retention & Privacy Review",
    category: "compliance",
    status: "completed",
    actor: "Compliance Admin Worker",
    jobRole: "All Requisitions",
    summary:
      "Automated compliance check completed. Verified candidate data encryption, access logs, and retention policies.",
    businessImpact:
      "100% compliance with candidate privacy standards & SOC-2 policies.",
    metadata: {
      recordsAudited: 42,
      complianceScore: "100%",
      piiEncryption: "AES-256 Enabled",
    },
    toolName: "compliance_audit_scan",
    actionType: "read",
    llmReasoning: "Scheduled compliance maintenance check.",
    operator: "System Worker",
    details: "Audit completed with zero data privacy violations.",
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessageItem[] = [
  {
    id: "msg-init-1",
    role: "assistant",
    content: `👋 **Welcome to TalentPulse AI — Your Autonomous HR Recruitment & Sourcing Assistant.**

I can handle your end-to-end recruitment lifecycle while keeping you firmly in control:

1. **📢 LinkedIn Social Sourcing**: Ask me to draft and publish job posts to LinkedIn, and monitor incoming candidate inquiries/DMs.
2. **🔍 Semantic & Hybrid Candidate Search**: Search candidates by skills, domain expertise, and years of experience with grounded citations.
3. **⚡ Dynamic Pipeline Filtering**: Tell me to *"Remove candidates with under 5 years exp"* or *"Filter for candidates with FastAPI"*.
4. **📅 Automated Scheduling & Rescheduling**: Coordinate technical rounds, resolve calendar conflicts, and negotiate meeting times.
5. **📝 Scorecard Synthesis & Consensus**: Aggregate interview feedback across panel members and generate debrief recommendations.
6. **💬 Compensation & Offer Formulation**: Model counter-offers against approved budget bands and generate official offer agreements.
7. **🛡️ Human-in-the-Loop (HITL) Safety Gates**: Every state-changing action (sending emails, scheduling interviews, publishing social posts, dispatching offer letters) requires your explicit approval before execution.

*Click one of the starter workflows above or type your hiring request below to begin!*`,
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },
];
