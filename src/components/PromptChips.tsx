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
    <div className="flex flex-wrap gap-2 justify-center">
      {chips.map((prompt) => (
        <button
          key={prompt}
          onClick={() => onSelect(prompt)}
          className="px-3.5 py-1.5 text-xs text-neutral-400 bg-neutral-900/80 border border-neutral-800 rounded-full hover:border-neutral-700 hover:bg-neutral-800/80 hover:text-neutral-200 transition-all duration-150 cursor-pointer"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
