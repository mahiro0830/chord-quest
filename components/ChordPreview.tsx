"use client";

import { useState } from "react";
import { playChord } from "@/lib/audio/chordPlayer";

const SAMPLE_CHORD = {
  name: "FM7",
  notes: ["F4", "A4", "C5", "E5"],
};

export function ChordPreview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePlay() {
    setError(null);
    setIsPlaying(true);

    try {
      await playChord(SAMPLE_CHORD.notes);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to play chord";
      setError(message);
    } finally {
      window.setTimeout(() => setIsPlaying(false), 1200);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm tracking-wide text-[var(--muted)]">
        Tone.js smoke test · {SAMPLE_CHORD.name}
      </p>
      <button
        type="button"
        onClick={handlePlay}
        disabled={isPlaying}
        className="rounded-lg bg-[var(--accent)] px-6 py-3 text-base font-medium text-[var(--accent-foreground)] transition enabled:hover:opacity-90 disabled:opacity-60"
      >
        {isPlaying ? "Playing…" : "Play sample chord"}
      </button>
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
