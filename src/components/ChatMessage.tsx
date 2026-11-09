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
        <strong key={idx} className="font-semibold text-neutral-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 rounded bg-neutral-800 text-blue-300 font-mono text-xs"
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
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 break-all"
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
          <span className="text-blue-400 mt-1.5 text-[10px]">●</span>
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
        <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-br-sm bg-neutral-100 text-neutral-900 font-medium text-sm leading-relaxed shadow-sm">
          {message.content}
        </div>
      ) : (
        <div className="flex gap-3.5">
          {/* AI avatar */}
          <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-[11px] font-semibold text-blue-400">AI</span>
          </div>
          {/* AI message */}
          <div className="flex-1 min-w-0">
            <div
              className={`text-sm text-neutral-300 leading-relaxed ${
                isStreaming && !message.content ? "text-neutral-500 italic" : ""
              } ${isStreaming && message.content ? "streaming-cursor" : ""}`}
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
