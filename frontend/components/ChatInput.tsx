"use client";

import { useState, useRef, useEffect } from "react";
import { Send, AlertCircle } from "lucide-react";
import InputOptionsMenu from "./InputOptionsMenu";

interface ChatInputProps {
  onSendMessage: (message: string, model: string) => void;
  onUploadClick?: () => void;
  isLoading?: boolean;
}

export default function ChatInput({
  onSendMessage,
  onUploadClick,
  isLoading = false,
}: ChatInputProps) {
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
    if (message.trim()) {
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
    <div className="p-4">
      <div className="max-w-3xl mx-auto w-full space-y-2">
        <div className="flex gap-2 items-end bg-muted rounded-lg">
          <div className=" flex-1 flex items-center gap-2  px-3 py-2 ">
            <InputOptionsMenu
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              onUploadClick={onUploadClick}
            />
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about candidates..."
              rows={rows}
              disabled={isLoading}
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none resize-none font-medium text-sm"
            />
            <button
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
              className="p-1.5 cursor-pointer bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
