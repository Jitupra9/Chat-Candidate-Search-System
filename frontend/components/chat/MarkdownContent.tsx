"use client";

import React from "react";
import ReactMarkdown from "react-markdown";

interface MarkdownContentProps {
  content: string;
  className?: string;
}

export default function MarkdownContent({
  content,
  className = "",
}: MarkdownContentProps) {
  return (
    <div
      className={`prose-dark leading-relaxed text-xs sm:text-sm ${className}`}
    >
      <ReactMarkdown
        components={{
          p: ({ children }) => (
            <p className="mb-2.5 last:mb-0 leading-relaxed text-slate-200">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-300">{children}</em>
          ),
          h1: ({ children }) => (
            <h1 className="text-base sm:text-lg font-extrabold text-white mb-2 mt-3 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-white mb-2 mt-3 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-bold text-indigo-300 mb-1.5 mt-2 first:mt-0">
              {children}
            </h3>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-outside ml-5 mb-3 space-y-1.5 text-slate-200">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside ml-5 mb-3 space-y-1.5 text-slate-200">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 leading-relaxed text-slate-200">{children}</li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-indigo-500 pl-3 my-2.5 text-slate-400 italic bg-indigo-950/20 py-1.5 rounded-r-lg">
              {children}
            </blockquote>
          ),
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className="block rounded-xl bg-slate-950 p-3 border border-white/10 font-mono text-[11px] sm:text-xs text-indigo-200 overflow-x-auto my-2">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded-md bg-slate-950 border border-white/10 px-1.5 py-0.5 font-mono text-[11px] sm:text-xs text-indigo-300 font-medium">
                {children}
              </code>
            );
          },
          pre: ({ children }) => <pre className="my-2">{children}</pre>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors font-medium"
            >
              {children}
            </a>
          ),
          hr: () => <hr className="border-white/10 my-3" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
