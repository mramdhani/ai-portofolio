"use client";

import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="inline-flex items-center p-0.5 rounded-lg border transition-colors shadow-2xs"
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
        title="Dark Mode"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
        <span>Dark</span>
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
        title="Light Mode"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
        <span>Light</span>
      </button>
    </div>
  );
}
