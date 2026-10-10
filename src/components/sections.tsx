import Link from "next/link";
import { Layers2, Lock, QrCode, ScanFace } from "lucide-react";
import { topics } from "@/lib/blog/topics";
import { allPosts } from "@/lib/blog/data";
import { PostCard } from "@/components/blog-ui";
import { FilmFrame } from "@/components/film-frame";
import { StoreBadges } from "@/components/store-badges";
import { roll } from "@/lib/roll";

export function Manifesto() {
  return (
    <section className="mx-3 mt-24 rounded-[28px] bg-paper px-6 py-20 text-ink sm:mx-5 sm:px-12 sm:py-28 lg:px-20">
      <p className="display max-w-5xl text-[clamp(2rem,4.6vw,4rem)] leading-[1.04]">
        Most phone cameras chase perfect.{" "}
        <span className="accent">trycheese chases character</span> — grain you
        can feel, highlights that bloom red, colour that looks like it came off
        a roll of film.
      </p>
      <p className="mt-10 max-w-xl text-[17px] leading-relaxed text-ink/75">
        No over-sharpening, no plastic skin, no editing marathon afterwards.
        Point, shoot, and the photo comes out finished.
      </p>
    </section>
  );
}

const looks = [
  { name: "Colour negative", note: "Grain · warm", bar: "#E39A4C" },
  { name: "Cine print", note: "Halation · teal & amber", bar: "#3F7F86" },
  { name: "Colour slide", note: "Punchy · saturated", bar: "#3E83C2" },
  { name: "Instant", note: "Soft · faded", bar: "#E2A497" },
  { name: "Black & white", note: "Grain · contrast", bar: "#BDB6AC" },
  { name: "Expired", note: "Shifted · unpredictable", bar: "#B98A55" },
];

export function Looks() {
  return (
    <section id="looks" className="scroll-mt-24 px-5 pt-32 sm:px-8 lg:px-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="display max-w-3xl text-[clamp(2.5rem,6vw,5rem)]">
          Looks, <span className="accent">not filters.</span>
        </h2>
        <p className="max-w-md text-[17px] leading-relaxed text-paper/75">
          Hand-tuned film looks with grain and halation baked in at the
          shutter. Pick one before you shoot, and tune its grain and tone to
          taste.
        </p>
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3">
        {looks.map((l, i) => (
          <li
            key={l.name}
            className={`group flex min-h-40 flex-col justify-between rounded-[22px] bg-surface p-5 transition-colors duration-300 hover:bg-raised sm:min-h-48 sm:p-6 ${
              i === 0 ? "outline-2 outline-safelight" : ""
            }`}
          >
            <div>
              <p className="rebate text-[12px] text-grain">{l.note}</p>
              <p className="display mt-2 text-[clamp(1.5rem,2.6vw,2.25rem)] font-semibold">
                {l.name}
              </p>
            </div>
            <span
              className="mt-6 block h-1.5 w-full rounded-full"
              style={{ background: l.bar }}
            />
          </li>
        ))}
      </ul>
      <p className="rebate mt-4 text-[12px] text-grain">
        Working names · final looks announced at launch
      </p>
    </section>
  );
}

const principles = [
  {
    title: "No preview",
    body: "The viewfinder shows the scene, not the effect. Frame it, shoot it, move on — like a real film camera.",
  },
  {
    title: "Just a camera",
    body: "No importing old photos, no editing suite. Every trycheese photo was taken with trycheese.",
  },
  {
    title: "The reveal",
    body: "A beat after the shutter, your photo comes back developed: grain, halation, colour. A little suspense, every frame.",
  },
];

export function InTheMoment() {
  return (
    <section
      id="in-the-moment"
      className="mx-3 mt-32 scroll-mt-24 overflow-hidden rounded-[28px] bg-safelight-deep text-paper sm:mx-5"
    >
      <div className="grid gap-12 px-6 py-20 sm:px-12 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-20">
        <div>
          <h2 className="display text-[clamp(2.5rem,6vw,5.25rem)]">
            Stay in the moment. <span className="accent">Not in the settings.</span>
          </h2>
          <ol className="mt-12 space-y-9">
            {principles.map((s) => (
              <li key={s.title} className="grid gap-2 border-t border-paper/25 pt-5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <span className="display text-[26px] font-semibold">{s.title}</span>
                <p className="max-w-md text-[17px] leading-relaxed text-paper/90">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative self-center">
          <div className="rebate mb-2 flex justify-between text-paper/70">
            <span>Frame 07</span>
            <span>Developing</span>
          </div>
          <FilmFrame frame={roll[0]} sizes="(min-width: 1024px) 40vw, 90vw" className="aspect-[4/5] w-full rounded-[22px]" />
        </div>
      </div>
    </section>
  );
}

function EvDial() {
  const ticks = Array.from({ length: 25 }, (_, i) => i - 12);
  return (
    <div className="mt-8" aria-hidden>
      <div className="flex items-end justify-between gap-[3px]">
        {ticks.map((t) => (
          <span
            key={t}
            className={`block w-px rounded-full ${
              t === 3 ? "h-7 bg-cheddar" : t % 3 === 0 ? "h-5 bg-paper/70" : "h-3 bg-paper/30"
            }`}
          />
        ))}
      </div>
      <div className="rebate mt-3 flex justify-between text-[12px] text-grain">
        <span>−2</span><span>0</span><span className="text-cheddar">+1/3</span><span>+2</span>
      </div>
    </div>
  );
}

export function Camera() {
  return (
    <section id="camera" className="scroll-mt-24 px-5 pt-32 sm:px-8 lg:px-14">
      <h2 className="display max-w-4xl text-[clamp(2.5rem,6vw,5rem)]">
        A real camera, <span className="accent">minus the fuss.</span>
      </h2>

      <div className="mt-14 grid gap-3 lg:grid-cols-6">
        <article className="relative overflow-hidden rounded-[22px] bg-surface lg:col-span-4 lg:row-span-2">
          <FilmFrame frame={roll[6]} bare sizes="(min-width: 1024px) 60vw, 100vw" className="h-[480px] w-full sm:h-[440px] lg:h-full lg:min-h-[520px]" />
          <span className="rebate absolute right-4 top-4 rounded-full bg-darkroom/55 px-2.5 py-1 text-[12px] text-paper/80 backdrop-blur-sm">
            Placeholder · {roll[6].look}
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(18,16,14,0.9))] p-6 sm:p-8">
            <h3 className="display text-[clamp(1.75rem,3vw,2.75rem)]">Grain you can feel.</h3>
            <p className="mt-2 max-w-md text-[16px] leading-relaxed text-paper/80">
              Bright lights bloom with red halation, the glow film gives a
              streetlight. Shadows stay soft; highlights roll off instead of
              clipping.
            </p>
          </div>
        </article>

        <article className="rounded-[22px] bg-surface p-6 sm:p-7 lg:col-span-2">
          <h3 className="text-[19px] font-semibold">Lenses, EV, aspect ratios</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
            Switch lenses, nudge exposure in thirds, frame in 3:2 or 4:3.
          </p>
          <EvDial />
        </article>

        <article className="rounded-[22px] bg-surface p-6 sm:p-7 lg:col-span-2">
          <ScanFace className="size-6 text-cheddar" strokeWidth={1.75} aria-hidden />
          <h3 className="mt-4 text-[19px] font-semibold">Portrait mode</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
            Soft, filmic background blur that falls off like a real lens, with the look applied on top.
          </p>
        </article>

        <article className="relative overflow-hidden rounded-[22px] bg-surface p-6 sm:p-7 lg:col-span-2">
          <Layers2 className="size-6 text-cheddar" strokeWidth={1.75} aria-hidden />
          <h3 className="mt-4 text-[19px] font-semibold">Double exposure</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
            Two shots, one frame. Blend them into something you couldn&rsquo;t have planned.
          </p>
          <div className="relative mt-6 h-24" aria-hidden>
            <FilmFrame frame={roll[2]} bare sizes="144px" className="absolute left-0 top-0 h-24 w-36 rounded-xl" />
            <div className="absolute left-14 top-3 h-24 w-36 overflow-hidden rounded-xl mix-blend-screen">
              <FilmFrame frame={roll[11]} bare sizes="144px" className="h-full w-full" />
            </div>
          </div>
        </article>

        <article className="rounded-[22px] bg-surface p-6 sm:p-7 lg:col-span-2">
          <QrCode className="size-6 text-cheddar" strokeWidth={1.75} aria-hidden />
          <h3 className="mt-4 text-[19px] font-semibold">Recipes you can share</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
            Build your own look from warmth, grain, halation and tone, then pass it on as a code or QR. Friends dial
            it in, offline.
          </p>
        </article>

        <article className="rounded-[22px] bg-paper p-6 text-ink sm:p-7 lg:col-span-2">
          <Lock className="size-6 text-safelight-deep" strokeWidth={1.75} aria-hidden />
          <h3 className="mt-4 text-[19px] font-semibold">Free and private</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
            No account, no subscription. Your photos stay on your phone until
            you share them.
          </p>
        </article>
      </div>
    </section>
  );
}

function PhoneMock({ os }: { os: "iPhone" | "Android" }) {
  return (
    <figure className="flex flex-col items-center">
      <div
        className={`relative w-[min(78vw,290px)] border-[10px] border-raised bg-darkroom p-3 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ${
          os === "iPhone" ? "rounded-[46px]" : "rounded-[34px]"
        }`}
      >
        <div className="rebate flex justify-between px-1 pb-2 text-[11px] text-grain">
          <span>Colour neg</span>
          <span>+1/3 EV</span>
        </div>
        <FilmFrame frame={roll[9]} bare sizes="290px" className="aspect-[3/4] w-full rounded-2xl" />
        <div className="rebate mt-3 flex justify-center gap-4 text-[11px] text-paper/60">
          <span>0.5</span><span className="text-cheddar">1×</span><span>2</span>
        </div>
        <div className="mt-3 flex items-center justify-between px-3 pb-2">
          <span className="block size-9 rounded-lg bg-raised" />
          <span className="block size-16 rounded-full border-[3px] border-paper/80 bg-paper" />
          <span className="block size-9 rounded-lg" style={{ background: "#E39A4C" }} />
        </div>
      </div>
      <figcaption className="rebate mt-5 text-grain">{os}</figcaption>
    </figure>
  );
}

export function Platforms() {
  return (
    <section className="px-5 pt-32 sm:px-8 lg:px-14">
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <h2 className="display text-[clamp(2.5rem,6vw,5rem)]">
            iPhone and Android. <span className="accent">Same film.</span>
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-paper/75">
            Same looks, same grain, same controls on both. trycheese launches
            on the App Store and Google Play together.
          </p>
          <div className="mt-10">
            <StoreBadges />
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <PhoneMock os="iPhone" />
          <PhoneMock os="Android" />
        </div>
      </div>
    </section>
  );
}

export async function JournalTeaser() {
  const posts = (await allPosts()).slice(0, 3);
  if (posts.length === 0) return null;
  return (
    <section className="px-5 pt-32 sm:px-8 lg:px-14" aria-labelledby="journal-title">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="journal-title" className="display text-[clamp(2.5rem,6vw,5rem)]">
          From the <span className="accent">journal.</span>
        </h2>
        <Link href="/blog" className="text-[17px] text-paper/80 underline decoration-paper/30 hover:text-paper">
          All posts on film, grain and phone photography
        </Link>
      </div>
      <div className="mt-12 grid gap-3 md:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-36 overflow-hidden border-t border-line px-5 pb-10 pt-16 sm:px-8 lg:px-14">
      <nav aria-label="Footer" className="mb-16 grid gap-10 text-[15px] sm:grid-cols-3">
        <div>
          <p className="font-semibold text-paper">trycheese</p>
          <ul className="mt-4 space-y-2.5 text-paper/70">
            <li><Link className="hover:text-paper" href="/#looks">Film looks</Link></li>
            <li><Link className="hover:text-paper" href="/#in-the-moment">Why no live preview</Link></li>
            <li><Link className="hover:text-paper" href="/#camera">Camera features</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold text-paper">
            <Link className="hover:text-paper" href="/blog">Journal</Link>
          </p>
          <ul className="mt-4 space-y-2.5 text-paper/70">
            {topics.map((t) => (
              <li key={t.slug}>
                <Link className="hover:text-paper" href={`/blog/topic/${t.slug}`}>{t.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-paper">Follow along</p>
          <ul className="mt-4 space-y-2.5 text-paper/70">
            <li><a className="hover:text-paper" href="/feed.xml">RSS feed</a></li>
            <li><a className="hover:text-paper" href="/llms.txt">llms.txt</a></li>
          </ul>
        </div>
      </nav>
      <p className="wordmark text-[clamp(4.5rem,19vw,17rem)] leading-[0.85] text-paper">
        trycheese
      </p>
      <div className="rebate mt-8 flex flex-col gap-3 text-grain lg:flex-row lg:items-center lg:justify-between">
        <span>trycheese ▸ 400 ▸ 01A</span>
        <span>Coming soon to the App Store &amp; Google Play</span>
        <span>© 2026 trycheese</span>
      </div>
    </footer>
  );
}
