import { ChordPreview } from "@/components/ChordPreview";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <main className="flex w-full max-w-lg flex-col items-center gap-10 text-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-5xl font-semibold tracking-tight text-[var(--foreground)] sm:text-6xl">
            Chords Quest
          </h1>
          <p className="text-lg text-[var(--muted)]">
            コードを聴いて当てる、音感トレーニング
          </p>
        </div>

        <div className="w-full rounded-2xl bg-[var(--surface)] px-6 py-8 shadow-sm backdrop-blur">
          <ChordPreview />
        </div>

        <p className="max-w-sm text-sm text-[var(--muted)]">
          各ボタンを押すとそのコードが鳴ります。
        </p>
      </main>
    </div>
  );
}
