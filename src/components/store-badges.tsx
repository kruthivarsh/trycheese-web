// Pre-launch store buttons. Swap for Apple's and Google's official badges
// (and real links) once the listings exist.

const stores = [
  { name: "App Store", platform: "iPhone" },
  { name: "Google Play", platform: "Android" },
];

export function StoreBadges({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const base =
    tone === "dark"
      ? "border-paper/20 bg-darkroom/60 text-paper"
      : "border-ink/20 bg-paper text-ink";
  return (
    <ul className="flex flex-wrap gap-3" aria-label="Coming soon to">
      {stores.map((s) => (
        <li
          key={s.name}
          className={`flex min-w-44 flex-col rounded-2xl border px-4 py-2.5 backdrop-blur-md ${base}`}
        >
          <span className="rebate text-[12px] opacity-70">
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
