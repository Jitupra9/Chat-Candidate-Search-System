"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Brain, Sparkles } from "lucide-react";
import InputOptionsMenu from "./InputOptionsMenu";

interface EmptyStateProps {
  onNewChat?: () => void;
  onSendMessage?: (message: string, model: string) => void;
  onUploadClick?: () => void;
}

export default function EmptyState({
  onNewChat,
  onSendMessage,
  onUploadClick,
}: EmptyStateProps) {
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("claude-opus");
  const [rows, setRows] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 80) + "px";
      setRows(Math.min(Math.ceil(scrollHeight / 20), 3));
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message, selectedModel);
      setMessage("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        setRows(1);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      {/* Logo and Welcome */}
      <div className="text-center mb-12 space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-primary to-accent flex items-center justify-center">
              <Brain className="w-10 h-10 text-primary-foreground" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">
          Candidate Search AI
        </h2>
        <p className="text-foreground/60">
          Find and match the perfect candidates using advanced AI
        </p>
      </div>

      {/* Chat Input Area - Centered */}
      <div className="w-full max-w-2xl space-y-3">
        {/* Options Menu and Chat Input - Single Row */}
        <div className="flex gap-2 items-end">
          <InputOptionsMenu
            selectedModel={selectedModel}
            onModelChange={setSelectedModel}
            onUploadClick={onUploadClick}
          />

          <div className="flex-1 flex items-end gap-2 bg-muted rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background transition-all">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about candidates..."
              rows={rows}
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none resize-none font-medium text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim()}
              className="p-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tips */}
        <p className="text-xs text-muted-foreground text-center">
          Click + to choose model and upload • Shift + Enter for new line
        </p>
      </div>
    </div>
  );
}
