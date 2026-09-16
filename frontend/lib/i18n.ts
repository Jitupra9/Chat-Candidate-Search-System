export type Language = "en" | "ja" | "es" | "fr" | "de" | "hi" | "zh" | "pt";

export interface TranslationStrings {
  appName: string;
  appTagline: string;
  newChat: string;
  requisition: string;
  uploadCVs: string;
  workspaces: string;
  aiAgent: string;
  candidatePipeline: string;
  hitlApprovals: string;
  linkedinSourcing: string;
  emailReplies: string;
  auditCompliance: string;
  recentChats: string;
  searchPastChats: string;
  agentOnline: string;
  langGraphStatus: string;
  leadRecruiter: string;
  inputPlaceholder: string;
  send: string;
  hitlGuardActive: string;
  vectorSqlSynced: string;
  modelSelect: string;
  reasoningMode: string;
  searchMode: string;
  uploadModalTitle: string;
  reqModalTitle: string;
  themeDark: string;
  themeLight: string;
  themeMidnight: string;
  suggestionsTitle: string;
  suggestionsSubtitle: string;
}

export const TRANSLATIONS: Record<Language, TranslationStrings> = {
  en: {
    appName: "TalentPulse AI",
    appTagline: "Autonomous HR Recruitment Agent",
    newChat: "New AI Conversation",
    requisition: "New Requisition",
    uploadCVs: "Upload Resumes",
    workspaces: "Workspaces",
    aiAgent: "AI Recruiter Agent",
    candidatePipeline: "Candidate Pipeline",
    hitlApprovals: "HITL Approvals",
    linkedinSourcing: "LinkedIn Sourcing",
    emailReplies: "Email & Replies",
    auditCompliance: "Audit & Compliance",
    recentChats: "Recent Agent Chats",
    searchPastChats: "Search past chats...",
    agentOnline: "LangGraph Agent Online",
    langGraphStatus: "ChromaDB + PostgreSQL",
    leadRecruiter: "Lead Technical Recruiter",
    inputPlaceholder:
      "Ask agent: 'Find Python devs 5+ yr exp', 'Draft LinkedIn post', 'Send shortlist emails'...",
    send: "Send",
    hitlGuardActive: "HITL Guard Active",
    vectorSqlSynced: "Vector + SQL Synced",
    modelSelect: "Select AI Model",
    reasoningMode: "Deep Reasoning Mode",
    searchMode: "Hybrid Search Mode",
    uploadModalTitle: "Multi-Modal Ingestion Pipeline",
    reqModalTitle: "Job Requisition & Sourcing Wizard",
    themeDark: "Dark Mode",
    themeLight: "Light Mode",
    themeMidnight: "Midnight Blue",
    suggestionsTitle: "How can I assist your recruitment pipeline today?",
    suggestionsSubtitle:
      "Select a guided workflow below or type your request in natural language.",
  },
  ja: {
    appName: "TalentPulse AI",
    appTagline: "自律型AI採用アシスタント",
    newChat: "新しいAI会話を開始",
    requisition: "新規求人作成",
    uploadCVs: "履歴書アップロード",
    workspaces: "ワークスペース",
    aiAgent: "AIリクルーター",
    candidatePipeline: "候補者パイプライン",
    hitlApprovals: "人間承認 (HITL)",
    linkedinSourcing: "LinkedInソーシング",
    emailReplies: "メール＆返信追跡",
    auditCompliance: "監査ログとコンプライアンス",
    recentChats: "最近のチャット履歴",
    searchPastChats: "過去のチャットを検索...",
    agentOnline: "エージェント稼働中",
    langGraphStatus: "ChromaDB + PostgreSQL 同期済",
    leadRecruiter: "リード採用担当者",
    inputPlaceholder:
      "AIに指示: 「5年以上のPython開発者を検索」「求人投稿作成」...",
    send: "送信",
    hitlGuardActive: "HITL安全ガード有効",
    vectorSqlSynced: "ベクトル＋SQL同期完了",
    modelSelect: "AIモデル選択",
    reasoningMode: "ディープ推論モード",
    searchMode: "ハイブリッド検索",
    uploadModalTitle: "マルチモーダル履歴書解析",
    reqModalTitle: "求人要件ウィザード",
    themeDark: "ダークモード",
    themeLight: "ライトモード",
    themeMidnight: "ミッドナイト",
    suggestionsTitle: "採用パイプラインをどのようにサポートしましょうか？",
    suggestionsSubtitle:
      "以下のガイド付きアクションを選択するか、チャットで直接ご指示ください。",
  },
  es: {
    appName: "TalentPulse AI",
    appTagline: "Asistente Autónomo de Contratación IA",
    newChat: "Nueva Conversación IA",
    requisition: "Nueva Requisición",
    uploadCVs: "Subir Currículums",
    workspaces: "Espacios de Trabajo",
    aiAgent: "Agente de Reclutamiento IA",
    candidatePipeline: "Pipeline de Candidatos",
    hitlApprovals: "Aprobaciones HITL",
    linkedinSourcing: "Sourcing de LinkedIn",
    emailReplies: "Correos y Respuestas",
    auditCompliance: "Auditoría y Cumplimiento",
    recentChats: "Chats Recientes",
    searchPastChats: "Buscar chats anteriores...",
    agentOnline: "Agente LangGraph Activo",
    langGraphStatus: "ChromaDB + PostgreSQL",
    leadRecruiter: "Reclutador Técnico Principal",
    inputPlaceholder:
      'Pregunte al agente: "Buscar desarrolladores Python 5+ años", "Publicar en LinkedIn"...',
    send: "Enviar",
    hitlGuardActive: "Guarda HITL Activa",
    vectorSqlSynced: "Vector + SQL Sincronizado",
    modelSelect: "Seleccionar Modelo IA",
    reasoningMode: "Modo de Razonamiento Profundo",
    searchMode: "Búsqueda Híbrida",
    uploadModalTitle: "Pipeline de Ingesta Multimodal",
    reqModalTitle: "Asistente de Requisiciones de Puesto",
    themeDark: "Modo Oscuro",
    themeLight: "Modo Claro",
    themeMidnight: "Azul Medianoche",
    suggestionsTitle: "¿Cómo puedo ayudar en tu pipeline de contratación hoy?",
    suggestionsSubtitle:
      "Selecciona un flujo guiado a continuación o escribe tu solicitud.",
  },
  fr: {
    appName: "TalentPulse AI",
    appTagline: "Assistant IA Autonome de Recrutement",
    newChat: "Nouvelle Conversation IA",
    requisition: "Nouvelle Réquisition",
    uploadCVs: "Téléverser des CV",
    workspaces: "Espaces de Travail",
    aiAgent: "Agent Recruteur IA",
    candidatePipeline: "Pipeline des Candidats",
    hitlApprovals: "Approbations HITL",
    linkedinSourcing: "Sourcing LinkedIn",
    emailReplies: "Emails & Réponses",
    auditCompliance: "Audit & Conformité",
    recentChats: "Discussions Récentes",
    searchPastChats: "Rechercher des chats...",
    agentOnline: "Agent LangGraph En Ligne",
    langGraphStatus: "ChromaDB + PostgreSQL",
    leadRecruiter: "Recruteur Technique Principal",
    inputPlaceholder:
      'Demandez à l’agent: "Trouver devs Python 5+ ans", "Créer post LinkedIn"...',
    send: "Envoyer",
    hitlGuardActive: "Garde HITL Active",
    vectorSqlSynced: "Vector + SQL Synchronisé",
    modelSelect: "Sélectionner le Modèle IA",
    reasoningMode: "Mode Raisonnement Profond",
    searchMode: "Recherche Hybride",
    uploadModalTitle: "Pipeline d’Ingestion Multimodal",
    reqModalTitle: "Assistant de Réquisition de Poste",
    themeDark: "Mode Sombre",
    themeLight: "Mode Clair",
    themeMidnight: "Bleu Minuit",
    suggestionsTitle:
      "Comment puis-je vous aider dans vos recrutements aujourd’hui ?",
    suggestionsSubtitle:
      "Sélectionnez un workflow ci-dessous ou écrivez votre demande.",
  },
  de: {
    appName: "TalentPulse AI",
    appTagline: "Autonomer KI-Recruiting-Assistent",
    newChat: "Neues KI-Gespräch",
    requisition: "Neue Stellenausschreibung",
    uploadCVs: "Lebensläufe hochladen",
    workspaces: "Arbeitsbereiche",
    aiAgent: "KI-Recruiter-Agent",
    candidatePipeline: "Kandidaten-Pipeline",
    hitlApprovals: "HITL-Freigaben",
    linkedinSourcing: "LinkedIn Sourcing",
    emailReplies: "E-Mails & Antworten",
    auditCompliance: "Audit & Compliance",
    recentChats: "Letzte Chats",
    searchPastChats: "Chats durchsuchen...",
    agentOnline: "LangGraph Agent Online",
    langGraphStatus: "ChromaDB + PostgreSQL",
    leadRecruiter: "Leitender Recruiter",
    inputPlaceholder:
      'Agent fragen: "Finde Python-Entwickler mit 5+ Jahren Erfahrung"...',
    send: "Senden",
    hitlGuardActive: "HITL-Schutz Aktiv",
    vectorSqlSynced: "Vektor + SQL Synchronisiert",
    modelSelect: "KI-Modell auswählen",
    reasoningMode: "Tiefenlogik-Modus",
    searchMode: "Hybridsuche",
    uploadModalTitle: "Multimodale Ingestion-Pipeline",
    reqModalTitle: "Stellenanforderung-Assistent",
    themeDark: "Dunkelmodus",
    themeLight: "Hellmodus",
    themeMidnight: "Mitternachtsblau",
    suggestionsTitle:
      "Wie kann ich Ihre Recruiting-Pipeline heute unterstützen?",
    suggestionsSubtitle:
      "Wählen Sie einen Ablauf oder geben Sie Ihre Anfrage ein.",
  },
  hi: {
    appName: "TalentPulse AI",
    appTagline: "स्वायत्त AI भर्ती सहायक",
    newChat: "नई AI बातचीत शुरू करें",
    requisition: "नई भर्ती आवश्यकता",
    uploadCVs: "रिज्यूमे अपलोड करें",
    workspaces: "कार्यक्षेत्र",
    aiAgent: "AI रिक्रूटर एजेंट",
    candidatePipeline: "उम्मीदवार पाइपलाइन",
    hitlApprovals: "मानव अनुमोदन (HITL)",
    linkedinSourcing: "लिंक्डइन सोर्सिंग",
    emailReplies: "ईमेल और उत्तर",
    auditCompliance: "ऑडिट और अनुपालन",
    recentChats: "हाल की बातचीत",
    searchPastChats: "पुरानी चैट खोजें...",
    agentOnline: "एजेंट सक्रिय है",
    langGraphStatus: "ChromaDB + PostgreSQL सिंक",
    leadRecruiter: "प्रमुख तकनीकी भर्तीकर्ता",
    inputPlaceholder:
      'एजेंट से पूछें: "5+ वर्ष अनुभव वाले पायथन डेवलपर्स खोजें"...',
    send: "भेजें",
    hitlGuardActive: "HITL सुरक्षा गार्ड सक्रिय",
    vectorSqlSynced: "वेक्टर + SQL सिंक",
    modelSelect: "AI मॉडल चुनें",
    reasoningMode: "गहरा तर्क मोड",
    searchMode: "हाइब्रिड सर्च",
    uploadModalTitle: "मल्टी-मॉडल रिज्यूमे पार्सिंग",
    reqModalTitle: "नौकरी आवश्यकता विज़ार्ड",
    themeDark: "डार्क मोड",
    themeLight: "लाइट मोड",
    themeMidnight: "मिडनाइट ब्लू",
    suggestionsTitle: "आज मैं आपकी भर्ती पाइपलाइन में कैसे सहायता करूँ?",
    suggestionsSubtitle:
      "नीचे दिए गए विकल्पों में से चुनें या सीधे चैट में लिखें।",
  },
  zh: {
    appName: "TalentPulse AI",
    appTagline: "自主式AI招聘与人才管理助理",
    newChat: "开启新AI对话",
    requisition: "新建招聘需求",
    uploadCVs: "上传简历",
    workspaces: "工作空间",
    aiAgent: "AI招聘助理",
    candidatePipeline: "候选人人才库",
    hitlApprovals: "人工审批 (HITL)",
    linkedinSourcing: "领英人才搜寻",
    emailReplies: "邮件与回复跟踪",
    auditCompliance: "合规与审计日志",
    recentChats: "最近对话",
    searchPastChats: "搜索历史记录...",
    agentOnline: "Agent 在线运行中",
    langGraphStatus: "ChromaDB + PostgreSQL 同步",
    leadRecruiter: "技术招聘主管",
    inputPlaceholder:
      '向助理输入指令: "查找5年以上经验的Python工程师", "草拟领英招聘"...',
    send: "发送",
    hitlGuardActive: "HITL安全门禁已激活",
    vectorSqlSynced: "向量 + SQL 双库已同步",
    modelSelect: "选择AI模型",
    reasoningMode: "深度思考推理模式",
    searchMode: "混合检索模式",
    uploadModalTitle: "多模态简历解析系统",
    reqModalTitle: "岗位需求与搜寻向导",
    themeDark: "深色主题",
    themeLight: "浅色主题",
    themeMidnight: "午夜深蓝",
    suggestionsTitle: "今天需要我如何协助您的招聘流程？",
    suggestionsSubtitle: "选择下方快捷向导或直接在对话框中输入需求。",
  },
  pt: {
    appName: "TalentPulse AI",
    appTagline: "Assistente Autônomo de Recrutamento IA",
    newChat: "Nova Conversa IA",
    requisition: "Nova Requisição",
    uploadCVs: "Carregar Currículos",
    workspaces: "Espaços de Trabalho",
    aiAgent: "Agente Recrutador IA",
    candidatePipeline: "Pipeline de Candidatos",
    hitlApprovals: "Aprovações HITL",
    linkedinSourcing: "Sourcing no LinkedIn",
    emailReplies: "E-mails e Respostas",
    auditCompliance: "Auditoria e Compliance",
    recentChats: "Conversas Recentes",
    searchPastChats: "Pesquisar conversas...",
    agentOnline: "Agente LangGraph Online",
    langGraphStatus: "ChromaDB + PostgreSQL",
    leadRecruiter: "Recrutador Técnico Líder",
    inputPlaceholder:
      'Pergunte ao agente: "Buscar desenvolvedores Python 5+ anos"...',
    send: "Enviar",
    hitlGuardActive: "Proteção HITL Ativa",
    vectorSqlSynced: "Vetor + SQL Sincronizado",
    modelSelect: "Selecionar Modelo IA",
    reasoningMode: "Modo de Raciocínio Profundo",
    searchMode: "Busca Híbrida",
    uploadModalTitle: "Pipeline de Ingestão Multimodal",
    reqModalTitle: "Assistente de Requisições de Vagas",
    themeDark: "Modo Escuro",
    themeLight: "Modo Claro",
    themeMidnight: "Azul Meia-Noite",
    suggestionsTitle: "Como posso ajudar no seu processo de recrutamento hoje?",
    suggestionsSubtitle:
      "Selecione um fluxo guiado abaixo ou digite sua solicitação.",
  },
};

export const SUPPORTED_LANGUAGES = [
  { code: "en" as Language, name: "English", flag: "🇺🇸" },
  { code: "ja" as Language, name: "日本語", flag: "🇯🇵" },
  { code: "es" as Language, name: "Español", flag: "🇪🇸" },
  { code: "fr" as Language, name: "Français", flag: "🇫🇷" },
  { code: "de" as Language, name: "Deutsch", flag: "🇩🇪" },
  { code: "hi" as Language, name: "हिन्दी", flag: "🇮🇳" },
  { code: "zh" as Language, name: "中文", flag: "🇨🇳" },
  { code: "pt" as Language, name: "Português", flag: "🇧🇷" },
];
