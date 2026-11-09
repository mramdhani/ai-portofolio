"use client";

import { useState } from "react";
import profileData from "@/data/profile-data.json";
import { ChatPlayground } from "@/components/ChatPlayground";
import { ProfileSection } from "@/components/ProfileSection";

export default function Home() {
  const { personal, summary } = profileData;
  // Default to collapsed on both desktop and mobile!
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="h-dvh flex overflow-hidden transition-colors"
      style={{ backgroundColor: "var(--bg-app)" }}
    >
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Profile & CV Sidebar
          - On Desktop (lg): Smoothly transitions width from 0 (collapsed by default) to 380px/420px
          - On Mobile: Slide-over drawer with translate-x
      */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 h-dvh overflow-y-auto transition-all duration-300 ease-in-out lg:static lg:z-auto shrink-0 ${
          sidebarOpen
            ? "w-[85vw] max-w-[380px] translate-x-0 lg:w-[380px] xl:w-[420px] lg:opacity-100 border-r"
            : "-translate-x-full w-[85vw] max-w-[380px] lg:translate-x-0 lg:w-0 lg:opacity-0 lg:overflow-hidden lg:border-r-0 pointer-events-none lg:pointer-events-none"
        }`}
        style={{
          backgroundColor: "var(--bg-sidebar)",
          borderColor: "var(--border-app)",
          pointerEvents: sidebarOpen ? "auto" : "none",
        }}
        aria-label="Profile and CV Sidebar"
      >
        <div className="w-[85vw] max-w-[380px] lg:w-[380px] xl:w-[420px] p-6 lg:p-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-start justify-between mb-4">
              {/* Avatar / Initials */}
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center shadow-sm"
                style={{
                  backgroundColor: "var(--accent)",
                }}
              >
                <span className="text-lg font-bold text-white tracking-wider">
                  MR
                </span>
              </div>

              {/* Collapse button (works on both desktop and mobile) */}
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-1.5 rounded-lg border transition-all cursor-pointer hover:opacity-80"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border-app)",
                  color: "var(--text-secondary)",
                }}
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <h1
              className="text-xl font-bold tracking-tight mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {personal.name}
            </h1>
            <p
              className="text-xs sm:text-sm mb-3"
              style={{ color: "var(--text-secondary)" }}
            >
              {personal.title}
            </p>

            {/* Availability badge */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border mb-4 shadow-2xs"
              style={{
                backgroundColor: "var(--accent-soft)",
                borderColor: "var(--accent-border)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <span
                className="text-[11px] font-medium"
                style={{ color: "var(--accent)" }}
              >
                {personal.availability}
              </span>
            </div>

            <p
              className="text-xs leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {summary}
            </p>

            {/* Contact links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`mailto:${personal.email}`}
                className="text-xs transition-colors flex items-center gap-1.5 hover:opacity-80 font-medium"
                style={{ color: "var(--accent)" }}
                aria-label="Email"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                Email
              </a>

              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors flex items-center gap-1.5 hover:opacity-80 font-medium"
                style={{ color: "var(--accent)" }}
                aria-label="LinkedIn"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>

              <a
                href={personal.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors flex items-center gap-1.5 hover:opacity-80 font-medium"
                style={{ color: "var(--accent)" }}
                aria-label="Portfolio"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
                  />
                </svg>
                Web
              </a>
            </div>
          </header>

          {/* Divider */}
          <div
            className="border-t my-6"
            style={{ borderColor: "var(--border-subtle)" }}
          />

          {/* CV sections */}
          <ProfileSection />

          {/* Footer */}
          <footer
            className="mt-10 pt-6 border-t"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p
              className="text-[10px] text-center"
              style={{ color: "var(--text-muted)" }}
            >
              © 2026 {personal.name}. Built with Next.js + Gemini AI.
            </p>
          </footer>
        </div>
      </aside>

      {/* Main Panel — Full-width AI Chat Playground */}
      <main className="flex-1 flex flex-col h-dvh min-w-0">
        <div className="flex-1 min-h-0">
          <ChatPlayground
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          />
        </div>
      </main>
    </div>
  );
}
