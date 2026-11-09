"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { PromptChips } from "./PromptChips";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function ChatPlayground() {
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

  const sendMessage = useCallback(
    async (content: string) => {
      if (isStreaming || !content.trim()) return;

      const userMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: content.trim(),
      };

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsStreaming(true);

      try {
        const allMessages = [
          ...messages.map((m) => ({ role: m.role, content: m.content })),
          { role: "user" as const, content: content.trim() },
        ];

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: allMessages }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.error || "Failed to get response");
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) throw new Error("No reader available");

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
                // Skip malformed JSON chunks
              }
            }
          }
        }
      } catch (error: unknown) {
        const errorMsg =
          error instanceof Error ? error.message : "Something went wrong";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessage.id
              ? {
                  ...m,
                  content: `Sorry, something went wrong: ${errorMsg}. Please try again.`,
                }
              : m
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, messages]
  );

  const showWelcome = messages.length === 0;

  return (
    <div className="flex flex-col h-full">
      {/* Header bar */}
      <div className="border-b border-neutral-800/50 px-5 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          <h2 className="text-sm font-medium text-neutral-200">
            AI Assistant
          </h2>
        </div>
        {!showWelcome && (
          <button
            onClick={() => setMessages([])}
            disabled={isStreaming}
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer disabled:opacity-50"
          >
            Clear chat
          </button>
        )}
      </div>

      {/* Chat messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        {showWelcome ? (
          <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
            <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
              <svg
                className="w-5 h-5 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </div>
            <h2 className="text-base font-medium text-neutral-200 mb-1.5">
              Ask anything about Muhamad Ramdani
            </h2>
            <p className="text-xs text-neutral-500 mb-6 leading-relaxed max-w-md">
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
      <div className="border-t border-neutral-800/60 px-4 py-3 bg-neutral-950">
        <div className="max-w-2xl mx-auto">
          <ChatInput onSend={sendMessage} isStreaming={isStreaming} />
        </div>
      </div>
    </div>
  );
}
