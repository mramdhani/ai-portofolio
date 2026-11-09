"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="inline-flex items-center p-0.5 rounded-lg border transition-colors"
      style={{
        backgroundColor: "var(--theme-toggle-bg)",
        borderColor: "var(--border-app)",
      }}
      role="group"
      aria-label="Theme switcher"
    >
      <button
        type="button"
        onClick={() => setTheme("gemini")}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
          theme === "gemini" ? "shadow-xs" : "opacity-70 hover:opacity-100"
        }`}
        style={{
          backgroundColor:
            theme === "gemini" ? "var(--theme-toggle-active)" : "transparent",
          color:
            theme === "gemini" ? "var(--accent)" : "var(--text-secondary)",
        }}
        title="Gemini Theme (Dark)"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
        </svg>
        <span>Gemini</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme("claude")}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
          theme === "claude" ? "shadow-xs" : "opacity-70 hover:opacity-100"
        }`}
        style={{
          backgroundColor:
            theme === "claude" ? "var(--theme-toggle-active)" : "transparent",
          color:
            theme === "claude" ? "var(--accent)" : "var(--text-secondary)",
        }}
        title="Claude Theme (Clean Light)"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
        </svg>
        <span>Claude</span>
      </button>
    </div>
  );
}
