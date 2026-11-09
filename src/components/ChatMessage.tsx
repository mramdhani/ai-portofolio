"use client";

import React from "react";
import { Message } from "./ChatPlayground";

interface ChatMessageProps {
  message: Message;
  isStreaming: boolean;
}

function formatInline(text: string): React.ReactNode[] {
  // Match **bold**, `code`, and https://... links
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|https?:\/\/[^\s)]+)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-semibold" style={{ color: "var(--text-primary)" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded font-mono text-xs"
          style={{
            backgroundColor: "var(--code-bg)",
            color: "var(--code-text)",
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 break-all font-medium transition-colors hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

function renderFormattedContent(content: string) {
  const lines = content.split("\n");
  return lines.map((line, i) => {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      return (
        <div key={i} className="flex items-start gap-2 pl-1 my-1">
          <span className="mt-1.5 text-[10px]" style={{ color: "var(--accent)" }}>●</span>
          <span className="flex-1">{formatInline(trimmed.slice(2))}</span>
        </div>
      );
    }
    if (trimmed === "") {
      return <div key={i} className="h-2" />;
    }
    return (
      <p key={i} className="my-1">
        {formatInline(line)}
      </p>
    );
  });
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`animate-fade-in py-3 ${isUser ? "flex justify-end" : ""}`}>
      {isUser ? (
        <div
          className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-sm text-sm leading-relaxed shadow-xs font-medium"
          style={{
            backgroundColor: "var(--user-bubble-bg)",
            color: "var(--user-bubble-text)",
          }}
        >
          {message.content}
        </div>
      ) : (
        <div className="flex gap-3.5">
          {/* AI avatar badge */}
          <div
            className="w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 mt-1 shadow-2xs"
            style={{
              backgroundColor: "var(--ai-badge-bg)",
              borderColor: "var(--ai-badge-border)",
            }}
          >
            <span
              className="text-[11px] font-semibold"
              style={{ color: "var(--ai-badge-text)" }}
            >
              AI
            </span>
          </div>

          {/* AI message */}
          <div className="flex-1 min-w-0">
            <div
              className={`text-sm leading-relaxed ${
                isStreaming && !message.content ? "italic" : ""
              } ${isStreaming && message.content ? "streaming-cursor" : ""}`}
              style={{
                color: isStreaming && !message.content ? "var(--text-muted)" : "var(--text-primary)",
              }}
            >
              {message.content
                ? renderFormattedContent(message.content)
                : isStreaming
                ? "Thinking..."
                : ""}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
