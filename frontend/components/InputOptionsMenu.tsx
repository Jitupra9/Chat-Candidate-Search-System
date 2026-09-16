"use client";

import { useState } from "react";
import { Plus, FileUp, Settings2 } from "lucide-react";
import ModelSelector from "./ModelSelector";

interface InputOptionsMenuProps {
  selectedModel: string;
  onModelChange: (model: string) => void;
  onUploadClick?: () => void;
}

export default function InputOptionsMenu({
  selectedModel,
  onModelChange,
  onUploadClick,
}: InputOptionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-background rounded-lg transition-colors shrink-0"
        title="More options"
      >
        <Plus className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-56 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
          <div className="p-3 border-b border-border">
            <p className="text-xs text-muted-foreground font-medium mb-2">
              Select Model
            </p>
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={(model) => {
                onModelChange(model);
                setIsOpen(false);
              }}
            />
          </div>

          {/* Upload Option */}
          <button
            onClick={() => {
              onUploadClick?.();
              setIsOpen(false);
            }}
            className="w-full px-3 py-2.5 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2"
          >
            <FileUp className="w-4 h-4 text-muted-foreground" />
            Upload Documents
          </button>

          {/* Settings Option */}
          <button className="w-full px-3 py-2.5 text-left text-sm text-foreground hover:bg-muted transition-colors flex items-center gap-2 border-t border-border">
            <Settings2 className="w-4 h-4 text-muted-foreground" />
            More Options
          </button>
        </div>
      )}
    </div>
  );
}
