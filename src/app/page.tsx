"use client";

import { useState } from "react";
import profileData from "@/data/profile-data.json";
import { ChatPlayground } from "@/components/ChatPlayground";
import { ProfileSection } from "@/components/ProfileSection";

export default function Home() {
  const { personal, summary } = profileData;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-dvh flex overflow-hidden bg-neutral-950">
      {/* Mobile Backdrop Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Left Sidebar — Slide-over drawer on mobile, static sidebar on desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[85vw] max-w-[380px] lg:static lg:w-[380px] xl:w-[420px] h-dvh bg-neutral-950 border-r border-neutral-800/60 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6 lg:p-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-start justify-between mb-4">
              {/* Avatar / Initials */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
                <span className="text-xl font-bold text-white">MR</span>
              </div>

              {/* Close button on mobile */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <h1 className="text-xl font-semibold text-neutral-100 mb-1">
              {personal.name}
            </h1>
            <p className="text-sm text-neutral-400 mb-3">{personal.title}</p>

            {/* Availability badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-medium">
                {personal.availability}
              </span>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed">
              {summary}
            </p>

            {/* Contact links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`mailto:${personal.email}`}
                className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1.5"
                aria-label="Email"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
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
                className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1.5"
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
                className="text-xs text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1.5"
                aria-label="Portfolio"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
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
          <div className="border-t border-neutral-800/50 my-6" />

          {/* CV sections */}
          <ProfileSection />

          {/* Footer */}
          <footer className="mt-10 pt-6 border-t border-neutral-800/50">
            <p className="text-[10px] text-neutral-700 text-center">
              © 2026 {personal.name}. Built with Next.js + Gemini AI.
            </p>
          </footer>
        </div>
      </aside>

      {/* Main Panel — Full-screen AI Chat Playground */}
      <main className="flex-1 flex flex-col h-dvh min-w-0">
        <div className="flex-1 min-h-0">
          <ChatPlayground onOpenSidebar={() => setSidebarOpen(true)} />
        </div>
      </main>
    </div>
  );
}
