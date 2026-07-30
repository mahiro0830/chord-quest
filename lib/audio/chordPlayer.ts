import * as Tone from "tone";

let synth: Tone.PolySynth | null = null;

async function ensureAudioReady() {
  await Tone.start();

  if (!synth) {
    synth = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: {
        attack: 0.02,
        decay: 0.3,
        sustain: 0.4,
        release: 1.2,
      },
    }).toDestination();
  }

  return synth;
}

/** Play a chord from note names, e.g. ["F4", "A4", "C5", "E5"] for FM7. */
export async function playChord(notes: string[], duration = "2n") {
  const activeSynth = await ensureAudioReady();
  const now = Tone.now();
  activeSynth.triggerAttackRelease(notes, duration, now);
}

export async function disposeChordPlayer() {
  if (synth) {
    synth.dispose();
    synth = null;
  }
}
