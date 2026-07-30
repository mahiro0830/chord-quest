import * as Tone from "tone";

/** Salamander Grand Piano samples (Tone.js official host). */
const PIANO_BASE_URL = "https://tonejs.github.io/audio/salamander/";

const PIANO_URLS = {
  A0: "A0.mp3",
  C1: "C1.mp3",
  "D#1": "Ds1.mp3",
  "F#1": "Fs1.mp3",
  A1: "A1.mp3",
  C2: "C2.mp3",
  "D#2": "Ds2.mp3",
  "F#2": "Fs2.mp3",
  A2: "A2.mp3",
  C3: "C3.mp3",
  "D#3": "Ds3.mp3",
  "F#3": "Fs3.mp3",
  A3: "A3.mp3",
  C4: "C4.mp3",
  "D#4": "Ds4.mp3",
  "F#4": "Fs4.mp3",
  A4: "A4.mp3",
  C5: "C5.mp3",
  "D#5": "Ds5.mp3",
  "F#5": "Fs5.mp3",
  A5: "A5.mp3",
  C6: "C6.mp3",
  "D#6": "Ds6.mp3",
  "F#6": "Fs6.mp3",
  A6: "A6.mp3",
  C7: "C7.mp3",
  "D#7": "Ds7.mp3",
  "F#7": "Fs7.mp3",
  A7: "A7.mp3",
  C8: "C8.mp3",
} as const;

let sampler: Tone.Sampler | null = null;
let loadPromise: Promise<Tone.Sampler> | null = null;

function getPiano(): Promise<Tone.Sampler> {
  if (sampler) {
    return Promise.resolve(sampler);
  }

  if (!loadPromise) {
    loadPromise = new Promise((resolve, reject) => {
      const piano = new Tone.Sampler({
        urls: PIANO_URLS,
        release: 1,
        baseUrl: PIANO_BASE_URL,
        onload: () => {
          sampler = piano;
          resolve(piano);
        },
        onerror: (error) => {
          loadPromise = null;
          reject(error instanceof Error ? error : new Error(String(error)));
        },
      }).toDestination();
    });
  }

  return loadPromise;
}

/** Prefetch piano samples (safe to call before a user gesture). */
export function preloadPiano() {
  return getPiano();
}

/** Play a chord from note names, e.g. ["F4", "A4", "C5", "E5"] for FM7. */
export async function playChord(notes: string[], duration = "2n") {
  await Tone.start();
  const piano = await getPiano();
  // Stop any ringing notes so the next chord can start immediately.
  piano.releaseAll();
  const now = Tone.now();
  piano.triggerAttackRelease(notes, duration, now);
}

export function disposeChordPlayer() {
  if (sampler) {
    sampler.dispose();
    sampler = null;
  }
  loadPromise = null;
}
