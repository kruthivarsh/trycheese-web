"use client";

import { useState } from "react";
import { FilmFrame } from "@/components/film-frame";
import { StoreBadges } from "@/components/store-badges";
import { pad, roll } from "@/lib/roll";

export function Hero() {
  const [current, setCurrent] = useState(0);
  const frame = roll[current];

  return (
    <section className="px-3 pt-2 sm:px-5" aria-labelledby="hero-title">
      <div className="relative">
        {/* Film-edge markings above the frame */}
        <div className="rebate flex justify-between px-2 pb-2 text-grain">
          <span>trycheese 400</span>
          <span aria-live="polite">
            ▸ {pad(frame.n)}
            <span className="text-grain/60"> / 12</span>
          </span>
        </div>

        <div className="relative overflow-hidden rounded-[28px]">
          <FilmFrame
            key={frame.n}
            frame={frame}
            bare
            priority
            className="h-[min(78svh,820px)] min-h-[520px] w-full"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(18,16,14,0.78)_100%)]" />

          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-7 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">
            <div className="max-w-3xl">
              <h1
                id="hero-title"
                className="display text-[clamp(3.25rem,9vw,7.5rem)] text-paper"
              >
                Say cheese.
                <br />
                <span className="accent text-[1.08em]">It&rsquo;s already film.</span>
              </h1>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-paper/85">
                A film camera for iPhone and Android. Real grain, red halation
                and filmic colour, baked in the moment you press the shutter.
              </p>
            </div>
            <div className="pointer-events-auto">
              <StoreBadges />
            </div>
          </div>

          <span className="rebate absolute right-4 top-4 rounded-full bg-darkroom/55 px-2.5 py-1 text-[12px] text-paper/80 backdrop-blur-sm">
            Placeholder · {frame.look}
          </span>
        </div>

        {/* Sample frames. Picking one develops it in the hero. */}
        <div className="mt-3">
          <ol className="flex gap-2 overflow-x-auto px-0.5 pb-2 [scrollbar-width:thin]">
            {roll.map((f, i) => {
              const active = i === current;
              return (
                <li key={f.n} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setCurrent(i)}
                    aria-pressed={active}
                    aria-label={`Show frame ${pad(f.n)}, ${f.look}`}
                    className={`group relative block overflow-hidden rounded-xl transition-[outline-color,opacity] duration-300 outline-2 outline-offset-2 ${
                      active
                        ? "outline-safelight"
                        : "opacity-70 outline-transparent hover:opacity-100"
                    }`}
                  >
                    <FilmFrame frame={f} bare sizes="112px" className="h-16 w-24 sm:h-20 sm:w-28" />
                    <span className="rebate absolute left-1.5 top-1 text-[11px] text-paper/90">
                      {pad(f.n)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
