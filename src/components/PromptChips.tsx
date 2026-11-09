"use client";

const PROMPTS = [
  "Tell me about the BRI Enterprise Portal project",
  "How did you contribute to AXA Mandiri?",
  "Tell me about SMA PGRI Cibadak School System",
  "Tell me about PharmaStock",
  "What is your main tech stack?",
  "What is your recent work experience?",
];

interface PromptChipsProps {
  onSelect: (prompt: string) => void;
  compact?: boolean;
}

export function PromptChips({ onSelect, compact }: PromptChipsProps) {
  const chips = compact ? PROMPTS.slice(0, 3) : PROMPTS;

  return (
    <div
      className={
        compact
          ? "flex flex-wrap gap-1.5 sm:gap-2 justify-start sm:justify-center"
          : "flex flex-wrap gap-2 justify-center"
      }
    >
      {chips.map((prompt) => (
        <button
          key={prompt}
          type="button"
          onClick={() => onSelect(prompt)}
          className={`rounded-full border transition-all duration-150 cursor-pointer hover:shadow-2xs ${
            compact
              ? "px-3 py-1 text-[11px] sm:text-xs"
              : "px-3.5 py-1.5 text-xs"
          }`}
          style={{
            backgroundColor: "var(--bg-chip)",
            borderColor: "var(--border-app)",
            color: "var(--text-secondary)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-chip-hover)";
            e.currentTarget.style.color = "var(--text-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--bg-chip)";
            e.currentTarget.style.color = "var(--text-secondary)";
          }}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
