# Chords Quest

コードを聴いて当てる音感トレーニング Web アプリです。

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev) + TypeScript
- [Tailwind CSS](https://tailwindcss.com)
- [Tone.js](https://tonejs.github.io) (Web Audio)

## Getting Started

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開き、「Play sample chord」で Tone.js の再生を確認できます。

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## Project layout

```
app/                 # App Router pages & layout
components/          # UI components (client/server)
lib/audio/           # Tone.js chord playback helpers
```
