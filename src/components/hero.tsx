"use client";

import Image from "next/image";
import { useState } from "react";
import { FilmFrame } from "@/components/film-frame";
import { StoreBadges } from "@/components/store-badges";
import { LOOKS, edgeCode } from "@/lib/looks";

/**
 * The app's welcome screen at site scale: a cheese panel with the brand line,
 * and a tilted print of the chosen look. Picking a look below re-develops it.
 */
export function Hero() {
  const [current, setCurrent] = useState(0);
  const look = LOOKS[current];

  return (
    <section className="px-3 pt-2 sm:px-5" aria-labelledby="hero-title">
      <div className="puff relative overflow-hidden rounded-[32px] text-darkroom [--accent:var(--color-darkroom)]">
        <div className="grid items-center gap-12 px-6 pb-10 pt-12 sm:px-10 sm:pb-14 lg:min-h-[min(84svh,860px)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-16">
          <div className="max-w-2xl">
            <h1 id="hero-title" className="display text-[clamp(3.4rem,9.5vw,8rem)]">
              say cheese.
              <br />
              <span className="accent">it&rsquo;s already film.</span>
            </h1>
            <p className="mt-6 max-w-md text-[18px] font-medium leading-relaxed text-darkroom/85">
              A film camera for iPhone and Android. Real grain and red halation,
              baked in the moment you press the shutter.
            </p>
            <div className="mt-9">
              <StoreBadges tone="cheese" />
            </div>
            <p className="rebate mt-5 text-[13px] text-ink-muted">
              Free. No account. Your photos stay on your phone.
            </p>
          </div>

          {/* A small pile of prints: the next two looks peek out behind the chosen one. */}
          <div className="relative mx-auto w-full max-w-[460px] lg:mr-4">
            {[
              { l: LOOKS[(current + 2) % LOOKS.length], cls: "rotate-[9deg] translate-x-[14%] -translate-y-[4%]" },
              { l: LOOKS[(current + 1) % LOOKS.length], cls: "-rotate-[11deg] -translate-x-[12%] translate-y-[3%]" },
            ].map(({ l, cls }) => (
              <div
                key={l.id}
                aria-hidden
                className={`absolute inset-0 hidden rounded-[28px] bg-cream p-3 pb-12 shadow-[0_14px_0_rgb(150_96_0/0.22)] transition-transform duration-700 ease-[var(--ease-develop)] sm:block ${cls}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[18px]">
                  <Image src={l.src} alt="" fill sizes="(min-width: 1024px) 400px, 60vw" quality={75} fetchPriority="low" className="object-cover" style={{ objectPosition: l.focus }} />
                </div>
              </div>
            ))}
            <figure className="relative -rotate-[4deg] rounded-[28px] bg-cream p-3 pb-12 shadow-[0_18px_0_rgb(150_96_0/0.28)]">
              <FilmFrame
                key={look.id}
                look={look}
                bare
                eager
                sizes="(min-width: 1024px) 460px, calc(100vw - 72px)"
                className="aspect-[4/5] w-full rounded-[18px]"
              />
              <figcaption className="rebate absolute bottom-4 left-6 text-[12px] uppercase tracking-[0.12em] text-ink-muted">
                {edgeCode(current + 1, look.grain)} · Sample
              </figcaption>
            </figure>
            <span
              aria-live="polite"
              className="wordmark absolute -right-2 -top-4 rotate-[8deg] rounded-full bg-darkroom px-5 py-2.5 text-[clamp(1.4rem,2.6vw,2rem)] text-cheese sm:-right-6"
            >
              {look.name.toLowerCase()}
            </span>
            {/* Starburst sticker: the shape turns, the words stay put. */}
            <div className="absolute -left-5 -top-8 grid size-32 place-items-center sm:-left-10 sm:size-36">
              <span aria-hidden className="starburst absolute inset-0 bg-negative" />
              <span className="wordmark relative -rotate-12 text-center text-[19px] leading-[1.05] text-cream sm:text-[21px]">
                free at
                <br />
                launch
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* The looks. Picking one develops it in the print above. */}
      <div className="mt-3">
        <ol className="flex gap-2 overflow-x-auto px-0.5 pb-2 [scrollbar-width:thin]">
          {LOOKS.map((l, i) => {
            const active = i === current;
            return (
              <li key={l.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setCurrent(i)}
                  aria-pressed={active}
                  aria-label={`Show the ${l.name} look`}
                  className={`group relative block overflow-hidden rounded-xl outline-2 outline-offset-2 transition-[outline-color] duration-300 ${
                    active ? "outline-cheese" : "outline-transparent"
                  }`}
                >
                  <span className={`block transition-opacity duration-300 ${active ? "" : "opacity-60 group-hover:opacity-100"}`}>
                    <FilmFrame look={l} bare sizes="112px" className="h-20 w-24 sm:h-24 sm:w-28" />
                  </span>
                  <span
                    className="wordmark absolute bottom-1.5 left-1.5 rounded-full px-2 py-1 text-[12px]"
                    style={{ background: l.color, color: l.ink }}
                  >
                    {l.name}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <p className="rebate px-1 text-[12px] text-grain">
          Sample images made for the app&rsquo;s look picker, not shot on trycheese.
        </p>
      </div>
    </section>
  );
}
