"use client";

import { useState } from "react";
import { playChord } from "@/lib/audio/chordPlayer";

const CHORDS = [
  { name: "FM7", notes: ["F4", "A4", "C5", "E5"] },
  { name: "E7", notes: ["E4", "G#4", "B4", "D5"] },
  { name: "Am7", notes: ["A4", "C5", "E5", "G5"] },
  { name: "Gm7", notes: ["G4", "Bb4", "D5", "F5"] },
  { name: "C7", notes: ["C4", "E5", "G4", "Bb4"] },
] as const;

export function ChordPreview() {
  const [playingName, setPlayingName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePlay(name: string, notes: readonly string[]) {
    setError(null);
    setPlayingName(name);

    try {
      await playChord([...notes]);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to play chord";
      setError(message);
    } finally {
      window.setTimeout(() => setPlayingName(null), 1200);
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-sm tracking-wide text-[var(--muted)]">
        コードを押して音を確認
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {CHORDS.map((chord) => {
          const isPlaying = playingName === chord.name;

          return (
            <button
              key={chord.name}
              type="button"
              onClick={() => handlePlay(chord.name, chord.notes)}
              disabled={playingName !== null}
              className="min-w-20 rounded-lg bg-[var(--accent)] px-5 py-3 text-base font-medium text-[var(--accent-foreground)] transition enabled:hover:opacity-90 disabled:opacity-60"
            >
              {isPlaying ? "…" : chord.name}
            </button>
          );
        })}
      </div>
      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
