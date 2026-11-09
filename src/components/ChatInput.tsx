"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isStreaming: boolean;
}

export function ChatInput({ onSend, isStreaming }: ChatInputProps) {
  const [input, setInput] = useState("");
  const [isMultiline, setIsMultiline] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea and detect multiline
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const scrollH = textarea.scrollHeight;
      const newHeight = Math.min(scrollH, 120);
      textarea.style.height = `${newHeight}px`;
      setIsMultiline(scrollH > 36);
    }
  }, [input]);

  const handleSubmit = () => {
    if (input.trim() && !isStreaming) {
      onSend(input);
      setInput("");
      setIsMultiline(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className={`relative flex ${
        isMultiline ? "items-end" : "items-center"
      } gap-2.5 border rounded-2xl px-4 py-2 transition-all shadow-2xs`}
      style={{
        backgroundColor: "var(--bg-input)",
        borderColor: "var(--border-app)",
      }}
    >
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask about Ramdani's experience, skills, projects..."
        rows={1}
        disabled={isStreaming}
        className="flex-1 bg-transparent text-sm resize-none outline-none disabled:opacity-50 py-1.5 leading-5 block"
        style={{
          color: "var(--text-primary)",
        }}
      />
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!input.trim() || isStreaming}
        className="shrink-0 w-8 h-8 rounded-xl text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed mb-0.5"
        style={{
          backgroundColor: "var(--accent)",
        }}
        aria-label="Send message"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
          />
        </svg>
      </button>
    </div>
  );
}
