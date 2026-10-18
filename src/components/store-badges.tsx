// Pre-launch store buttons. Swap for Apple's and Google's official badges
// (and real links) once the listings exist.

const stores = [
  { name: "App Store", platform: "iPhone" },
  { name: "Google Play", platform: "Android" },
];

const tones = {
  /** On darkroom: rind cards with paper text. */
  dark: "border-paper/15 bg-surface/80 text-paper",
  /** On cheese: ink buttons with cheese text, like the app's buttons on a cheese page. */
  cheese: "border-transparent bg-darkroom text-cheese",
  /** On paper or cream. */
  light: "border-ink/20 bg-paper text-ink",
} as const;

export function StoreBadges({ tone = "dark" }: { tone?: keyof typeof tones }) {
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Coming soon to">
      {stores.map((s) => (
        <li
          key={s.name}
          className={`flex min-w-44 flex-col rounded-2xl border px-4 py-2.5 backdrop-blur-md ${tones[tone]}`}
        >
          <span className="rebate text-[12px] opacity-75">
            {s.platform} · Coming soon
          </span>
          <span className="text-[17px] font-semibold tracking-tight">
            {s.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
