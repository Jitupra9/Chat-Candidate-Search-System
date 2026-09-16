"use client";

import React, { useState } from "react";
import {
  X,
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Database,
  Cpu,
  Layers,
  Check,
} from "lucide-react";
import { Candidate } from "@/lib/types";

interface IngestionPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onIngestSuccess: (newCandidate: Candidate) => void;
}

type PipelineStage =
  | "idle"
  | "uploading"
  | "ocr_extract"
  | "vision_llm"
  | "injection_defense"
  | "dual_sync"
  | "completed";

export default function IngestionPipelineModal({
  isOpen,
  onClose,
  onIngestSuccess,
}: IngestionPipelineModalProps) {
  const [stage, setStage] = useState<PipelineStage>("idle");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<string>("");

  if (!isOpen) return null;

  const handleSimulateUpload = (file: File) => {
    setFileName(file.name);
    setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
    setStage("uploading");

    setTimeout(() => {
      setStage("ocr_extract");
      setTimeout(() => {
        setStage("vision_llm");
        setTimeout(() => {
          setStage("injection_defense");
          setTimeout(() => {
            setStage("dual_sync");
            setTimeout(() => {
              setStage("completed");

              const generatedCandidate: Candidate = {
                id: `cand-${Date.now()}`,
                name: "Taylor Morgan",
                email: "taylor.morgan@example.com",
                phone: "+1 (555) 890-1234",
                title: "Senior Python & Agentic AI Engineer",
                currentCompany: "Apex Intelligence",
                location: "San Francisco, CA (Remote)",
                experienceYears: 6.0,
                education: "B.S. Computer Science, UC San Diego",
                skills: [
                  "Python",
                  "FastAPI",
                  "PyTorch",
                  "LangChain",
                  "Docker",
                  "PostgreSQL",
                ],
                matchScore: 97,
                status: "applied",
                appliedRole: "Senior AI Engineer",
                appliedDate: new Date().toISOString().split("T")[0],
                resumeUrl: "/resumes/taylor_morgan.pdf",
                summary:
                  "6 years specialized in Python backend microservices, LangChain agents, and vector similarity search pipelines with ChromaDB.",
                citations: [
                  {
                    field: "Experience Verification",
                    claimedValue: "6.0 years",
                    sourceSnippet:
                      "Apex Intelligence (2021-Present): 3.5 yrs; CloudScale AI (2018-2021): 2.5 yrs backend engineering",
                    pageNumber: 1,
                    confidence: 0.99,
                  },
                ],
              };
              onIngestSuccess(generatedCandidate);
            }, 1200);
          }, 1000);
        }, 1100);
      }, 1000);
    }, 800);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleSimulateUpload(e.target.files[0]);
    }
  };

  const stagesList = [
    {
      id: "uploading",
      title: "1. Secure Document Upload",
      desc: "Encrypting and uploading resume file to secure cloud storage",
    },
    {
      id: "ocr_extract",
      title: "2. Text & Layout Reading",
      desc: "Reading multi-column resume layout, work dates, and section headers",
    },
    {
      id: "vision_llm",
      title: "3. Skill & Experience Extraction",
      desc: "Extracting candidate skills, job history, education, and years of experience",
    },
    {
      id: "injection_defense",
      title: "4. Content Safety & Authenticity Check",
      desc: "Screening for hidden formatting and verifying profile data integrity",
    },
    {
      id: "dual_sync",
      title: "5. Profile Added to Talent Database",
      desc: "Candidate profile saved and instantly searchable in your pipeline",
    },
  ];

  const getStageStatus = (stageId: string) => {
    const order = [
      "idle",
      "uploading",
      "ocr_extract",
      "vision_llm",
      "injection_defense",
      "dual_sync",
      "completed",
    ];
    const currentIndex = order.indexOf(stage);
    const thisIndex = order.indexOf(stageId);

    if (stage === "completed" || currentIndex > thisIndex) return "done";
    if (stage === stageId) return "active";
    return "pending";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-5 bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-600/30">
              <Upload className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Automated Resume Ingestion
              </h2>
              <p className="text-xs text-slate-400">
                Upload $\rightarrow$ Extract Skills $\rightarrow$ Verify
                Experience $\rightarrow$ Save to Pipeline
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-6">
          {stage === "idle" ? (
            <div className="space-y-4">
              <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-indigo-500/30 bg-slate-950/50 p-8 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-950/10 transition-all group">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform mb-3">
                  <Upload className="h-6 w-6" />
                </div>
                <p className="text-sm font-semibold text-white">
                  Drop candidate resume here or click to browse
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  Supports PDF, DOCX, TXT (Vision LLM multi-column enabled)
                </p>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileInput}
                  className="hidden"
                />
                <span className="mt-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all">
                  Select Resume File
                </span>
              </label>

              <div className="rounded-xl bg-slate-950 border border-white/5 p-3.5 text-xs text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-400">
                  <ShieldCheck className="h-4 w-4" />
                  <span>
                    Enterprise Security & Anti-Hallucination Guardrails
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  Uploaded resumes are sanitized against prompt injection,
                  parsed into structured Pydantic schemas, and dual-indexed in
                  PostgreSQL & ChromaDB.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File details */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-white/5 text-xs">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-indigo-400" />
                  <span className="font-semibold text-white">{fileName}</span>
                  <span className="text-slate-500">({fileSize})</span>
                </div>
                {stage === "completed" && (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Ingested
                  </span>
                )}
              </div>

              {/* Step by Step Progress Indicators */}
              <div className="space-y-3">
                {stagesList.map((st) => {
                  const status = getStageStatus(st.id);
                  return (
                    <div
                      key={st.id}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                        status === "active"
                          ? "bg-indigo-950/40 border-indigo-500/50 shadow-md shadow-indigo-950/30"
                          : status === "done"
                            ? "bg-slate-950 border-emerald-500/20"
                            : "bg-slate-950/40 border-white/5 opacity-50"
                      }`}
                    >
                      <div className="shrink-0 mt-0.5">
                        {status === "done" && (
                          <div className="h-5 w-5 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950">
                            <Check className="h-3 w-3 stroke-[3]" />
                          </div>
                        )}
                        {status === "active" && (
                          <div className="h-5 w-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                        )}
                        {status === "pending" && (
                          <div className="h-5 w-5 rounded-full border border-slate-700 bg-slate-900" />
                        )}
                      </div>

                      <div className="text-xs flex-1">
                        <p
                          className={`font-semibold ${status === "active" ? "text-indigo-300" : status === "done" ? "text-emerald-400" : "text-slate-400"}`}
                        >
                          {st.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {stage === "completed" && (
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-300 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" /> Candidate Successfully
                    Extracted & Indexed!
                  </p>
                  <p className="text-slate-300 text-[11px]">
                    Candidate profile is now searchable in natural language and
                    available in your Candidate Pipeline view.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-white/10 p-4 bg-slate-950/80">
          {stage === "completed" ? (
            <button
              onClick={() => {
                setStage("idle");
                onClose();
              }}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-2 text-xs font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all"
            >
              View In Pipeline
            </button>
          ) : (
            <button
              onClick={onClose}
              className="rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-white transition-all"
            >
              Close
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
