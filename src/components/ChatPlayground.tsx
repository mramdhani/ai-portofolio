"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { PromptChips } from "./PromptChips";
import { ThemeToggle } from "./ThemeToggle";
import { retrieveFromCV, buildFallbackRAGResponse } from "@/lib/rag-engine";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface ChatPlaygroundProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function ChatPlayground({
  sidebarOpen,
  onToggleSidebar,
}: ChatPlaygroundProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Client-side streaming helper (works on VPS, Vercel, and static shared hosting)
  const streamLocalText = useCallback(
    async (fullText: string, assistantId: string) => {
      const words = fullText.split(/(?=[ \n])/);
      let accumulated = "";
      const chunkSize = 3;
      for (let i = 0; i < words.length; i += chunkSize) {
        accumulated += words.slice(i, i + chunkSize).join("");
        const snapshot = accumulated;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: snapshot } : m
          )
        );
        await new Promise((r) => setTimeout(r, 12));
      }
    },
    []
  );

  const sendMessage = useCallback(
    async (content: string) => {
      if (isStreaming || !content.trim()) return;

      const trimmed = content.trim();
      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: trimmed,
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsStreaming(true);

      try {
        // 1. Instant Local RAG Match
        const directRag = retrieveFromCV(trimmed);
        if (directRag) {
          await streamLocalText(directRag, assistantMessage.id);
          return;
        }

        // 2. Call Backend Gemini Streaming API
        const allMessages = [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: trimmed },
        ];

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: allMessages }),
        });

        if (!response.ok) {
          const fallback = buildFallbackRAGResponse(trimmed);
          await streamLocalText(fallback, assistantMessage.id);
          return;
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          const fallback = buildFallbackRAGResponse(trimmed);
          await streamLocalText(fallback, assistantMessage.id);
          return;
        }

        let accumulated = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.error) throw new Error(parsed.error);
                if (parsed.text) {
                  accumulated += parsed.text;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMessage.id
                        ? { ...m, content: accumulated }
                        : m
                    )
                  );
                }
              } catch {
                // Ignore malformed chunks
              }
            }
          }
        }
      } catch {
        const fallback = buildFallbackRAGResponse(trimmed);
        await streamLocalText(fallback, assistantMessage.id);
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages, streamLocalText]
  );

  const showWelcome = messages.length === 0;

  return (
    <div
      className="flex flex-col h-full"
      style={{ backgroundColor: "var(--bg-app)" }}
    >
      {/* Header bar */}
      <div
        className="px-4 lg:px-6 py-3 flex items-center justify-between border-b backdrop-blur-md sticky top-0 z-10 transition-colors"
        style={{
          backgroundColor: "var(--bg-header)",
          borderColor: "var(--border-app)",
        }}
      >
        {/* Left: Sidebar toggle & Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer shadow-2xs hover:opacity-90"
            style={{
              backgroundColor: sidebarOpen
                ? "var(--accent-soft)"
                : "var(--bg-card)",
              borderColor: sidebarOpen
                ? "var(--accent-border)"
                : "var(--border-app)",
              color: sidebarOpen ? "var(--accent)" : "var(--text-secondary)",
            }}
            title={sidebarOpen ? "Collapse sidebar" : "Expand Profile & CV sidebar"}
            aria-label="Toggle Profile & CV sidebar"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
              {sidebarOpen ? (
                <path d="m14 9-3 3 3 3" />
              ) : (
                <path d="m13 15 3-3-3-3" />
              )}
            </svg>
            <span className="hidden sm:inline">
              {sidebarOpen ? "Hide Profile" : "Profile & CV"}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <h2
              className="text-sm font-semibold tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              AI Assistant
            </h2>
          </div>
        </div>

        {/* Right: Theme switcher & Clear chat */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          {!showWelcome && (
            <button
              type="button"
              onClick={() => setMessages([])}
              disabled={isStreaming}
              className="text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer disabled:opacity-40"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--text-primary)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--text-muted)";
              }}
              title="Clear chat history"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Chat messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        {showWelcome ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
            {/* Center avatar badge */}
            <div
              className="w-12 h-12 rounded-2xl border flex items-center justify-center mb-4 shadow-sm"
              style={{
                backgroundColor: "var(--ai-badge-bg)",
                borderColor: "var(--border-card)",
              }}
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: "var(--accent)" }}
              >
                <path d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
              </svg>
            </div>

            <h2
              className="text-base sm:text-lg font-semibold mb-1.5"
              style={{ color: "var(--text-primary)" }}
            >
              Ask anything about Muhamad Ramdani
            </h2>

            <p
              className="text-xs leading-relaxed max-w-md mb-6"
              style={{ color: "var(--text-secondary)" }}
            >
              Interactive AI assistant trained on Ramdani&apos;s CV, enterprise
              projects (BRI, AXA Mandiri, EMC Singapore), full-stack portfolio,
              and technical skills.
            </p>

            <PromptChips onSelect={sendMessage} />
          </div>
        ) : (
          <div className="max-w-2xl mx-auto space-y-1">
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isStreaming={
                  isStreaming &&
                  index === messages.length - 1 &&
                  msg.role === "assistant"
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* Prompt chips when there are messages */}
      {!showWelcome && !isStreaming && (
        <div className="px-4 pb-2">
          <div className="max-w-2xl mx-auto">
            <PromptChips onSelect={sendMessage} compact />
          </div>
        </div>
      )}

      {/* Input area */}
      <div
        className="px-4 py-3 border-t transition-colors"
        style={{
          backgroundColor: "var(--bg-app)",
          borderColor: "var(--border-app)",
        }}
      >
        <div className="max-w-2xl mx-auto">
          <ChatInput onSend={sendMessage} isStreaming={isStreaming} />
        </div>
      </div>
    </div>
  );
}
