import Image from "next/image";
import Link from "next/link";
import { Layers2, Lock, QrCode, ScanFace } from "lucide-react";
import { topics } from "@/lib/blog/topics";
import { allPosts } from "@/lib/blog/data";
import { PostCard } from "@/components/blog-ui";
import { FilmFrame, SampleTag } from "@/components/film-frame";
import { StoreBadges } from "@/components/store-badges";
import { LOOKS, look } from "@/lib/looks";

/** A strip of look stickers scrolling past, between the hero and the manifesto. */
export function LookMarquee() {
  // Two copies side by side so the strip loops seamlessly; the second is decorative.
  const strip = [...LOOKS, ...LOOKS];
  return (
    <section aria-label="The looks" className="marquee-wrap mt-16 overflow-hidden py-4">
      <ul className="marquee flex w-max items-center gap-4 pr-4">
        {strip.map((l, i) => (
          <li
            key={`${l.id}-${i}`}
            aria-hidden={i >= LOOKS.length}
            className={`wordmark shrink-0 rounded-full px-6 py-3 text-[clamp(1.6rem,3.2vw,2.6rem)] ${i % 2 ? "rotate-2" : "-rotate-2"}`}
            style={{ background: l.color, color: l.ink }}
          >
            {l.name.toLowerCase()}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Manifesto() {
  return (
    <section className="mx-3 mt-16 rounded-[28px] bg-negative px-6 py-20 text-cream sm:mx-5 sm:px-12 sm:py-28 lg:px-20">
      <p className="display max-w-5xl text-[clamp(2rem,4.6vw,4rem)] leading-[1.04]">
        Most phone cameras chase perfect.{" "}
        <span className="accent">trycheese chases character:</span> grain you
        can feel, highlights that bloom red, colour that looks like it came off
        a roll of film.
      </p>
      <p className="mt-10 max-w-xl text-[17px] leading-relaxed text-paper-dim">
        No over-sharpening, no plastic skin, no editing marathon afterwards.
        Point, shoot, and the photo comes out finished.
      </p>
    </section>
  );
}

export function Looks() {
  return (
    <section id="looks" className="scroll-mt-24 px-5 pt-32 sm:px-8 lg:px-14">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 className="display max-w-3xl text-[clamp(2.5rem,6vw,5rem)]">
          Looks, <span className="accent">baked in.</span>
        </h2>
        <p className="max-w-md text-[17px] leading-relaxed text-paper/75">
          Every look is tuned like a film stock: colour, grain, red halation
          and a soft highlight roll-off. Pick one before you shoot, then turn
          two dials, grain and tone, to taste.
        </p>
      </div>
      <ul className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {LOOKS.map((l, i) => (
          <li
            key={l.id}
            className={`group flex flex-col gap-4 rounded-[22px] bg-surface p-3 pb-5 transition-[background-color,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:bg-raised motion-reduce:transform-none ${i % 2 ? "hover:rotate-1" : "hover:-rotate-1"} ${
              i === 0 ? "outline-2 outline-cheese" : ""
            }`}
          >
            <FilmFrame
              look={l}
              bare
              sizes="(min-width: 1024px) 18vw, (min-width: 768px) 30vw, 45vw"
              className="aspect-[4/5] w-full rounded-2xl"
            />
            <div className="px-2">
              <span
                className="wordmark inline-block rounded-full px-3 py-1.5 text-[clamp(1.05rem,1.6vw,1.3rem)]"
                style={{ background: l.color, color: l.ink }}
              >
                {l.name}
              </span>
              <p className="mt-3 text-[15px] leading-snug text-paper/80">{l.blurb}</p>
              <p className="rebate mt-2 text-[12px] text-grain">
                Grain {l.grain} · {l.tone}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="rebate mt-4 text-[12px] text-grain">
        Sample images made for the app&rsquo;s look picker. Looks may still change before launch.
      </p>
    </section>
  );
}

const principles = [
  {
    title: "No preview",
    body: "The viewfinder shows the scene, not the look, so you watch the moment instead of the screen.",
  },
  {
    title: "Just a camera",
    body: "No importing old photos, no editing suite. Every trycheese photo was taken with trycheese.",
  },
  {
    title: "The reveal",
    body: "Press the shutter and your photo develops for a beat, then it's revealed: grain, halation, colour.",
  },
];

/** The flat, un-developed scene: CSS saturate(0.45) contrast(0.85) brightness(1.05), as in the app. */
const viewfinderFilter = "saturate(0.45) contrast(0.85) brightness(1.05)";

export function InTheMoment() {
  return (
    <section
      id="in-the-moment"
      className="mx-3 mt-32 scroll-mt-24 overflow-hidden rounded-[28px] bg-gouda text-darkroom [--accent:var(--color-cream)] sm:mx-5"
    >
      <div className="grid gap-12 px-6 py-20 sm:px-12 sm:py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-20">
        <div>
          <h2 className="display text-[clamp(2.5rem,6vw,5.25rem)]">
            No live preview. <span className="accent">On purpose.</span>
          </h2>
          <ol className="mt-12 space-y-9">
            {principles.map((s) => (
              <li key={s.title} className="grid gap-2 border-t border-darkroom/25 pt-5 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <span className="display text-[26px]">{s.title}</span>
                <p className="max-w-md text-[17px] leading-relaxed text-darkroom">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* What you see in the viewfinder, and what you get a beat later. */}
        <div className="grid grid-cols-2 gap-3 self-center">
          {[
            { label: "what you see", caption: "The scene, as it is", filter: viewfinderFilter, tone: "text-darkroom" },
            { label: "what you get", caption: "A beat later, on film", filter: undefined, tone: "text-cream" },
          ].map((p) => (
            <figure key={p.label} className="flex flex-col gap-3">
              <span className={`display text-[clamp(1.25rem,2vw,1.6rem)] ${p.tone}`}>{p.label}</span>
              <div className="relative aspect-[3/4] overflow-hidden rounded-[18px]">
                <Image
                  src="/samples/f06.jpg"
                  alt={p.filter ? "Sample scene as the viewfinder shows it, flat and undeveloped" : "The same sample scene developed with grain, halation and filmic colour"}
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  quality={75}
                  className="object-cover"
                  style={{ filter: p.filter, objectPosition: "58% 50%" }}
                />
              </div>
              <figcaption className="text-[14px] font-medium text-darkroom">{p.caption}</figcaption>
            </figure>
          ))}
          <p className="rebate col-span-2 text-[12px] text-darkroom">Sample image</p>
        </div>
      </div>
    </section>
  );
}

/** The app's onboarding, in its own page colours. Real screens from an early iPhone build. */
const screens = [
  { src: "/screens/01-welcome.jpg", name: "Welcome", color: "#FFD21A", alt: "Welcome screen on cheese yellow: the trycheese wordmark, a tilted sample print with a cheddar sticker and the line say cheese, it's already film." },
  { src: "/screens/02-looks.jpg", name: "Looks", color: "#0D25AA", alt: "Looks screen on the negative blue: three sample photos tagged Gouda, Blue and Smoked above Looks, baked in." },
  { src: "/screens/03-in-the-moment.jpg", name: "In the moment", color: "#C8742B", alt: "In the moment screen on Gouda: what you see beside what you get, above No live preview, on purpose." },
  { src: "/screens/04-dial-in.jpg", name: "Dial in", color: "#0D25AA", alt: "Dial in screen on the negative blue: a Cheddar look card with Grain and Tone dials set to 400 and Natural." },
  { src: "/screens/05b-permissions-allowed.jpg", name: "Two quick yeses", color: "#6E6760", alt: "Permissions screen on Smoked grey with camera and photo saving both allowed and a yellow Start shooting button." },
];

export function TheApp() {
  return (
    <section id="app" className="scroll-mt-24 pt-32" aria-labelledby="app-title">
      <div className="flex flex-col gap-6 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-14">
        <h2 id="app-title" className="display max-w-3xl text-[clamp(2.5rem,6vw,5rem)]">
          From cheese <span className="accent">to camera.</span>
        </h2>
        <p className="max-w-md text-[17px] leading-relaxed text-paper/75">
          Five screens and you&rsquo;re shooting. Each one takes a colour from
          the brand: cheese, the film negative&rsquo;s blue, Gouda and Smoked.
        </p>
      </div>
      <ol className="mt-14 flex snap-x gap-5 overflow-x-auto px-5 pb-6 [scrollbar-width:thin] sm:px-8 lg:px-14">
        {screens.map((s, i) => (
          <li key={s.src} className="w-[min(62vw,250px)] shrink-0 snap-start">
            <div className="rounded-[38px] bg-raised p-2 shadow-[0_24px_50px_-24px_rgb(0_0_0/0.8)]">
              <div className="relative aspect-[1206/2622] overflow-hidden rounded-[30px]">
                <Image src={s.src} alt={s.alt} fill sizes="250px" quality={90} className="object-cover" />
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-[15px] font-medium text-paper">
              <span className="block size-3.5 rounded-[4px] ring-1 ring-paper/20" style={{ background: s.color }} />
              <span className="rebate text-[13px] text-grain">{String(i + 1).padStart(2, "0")}</span>
              {s.name}
            </p>
          </li>
        ))}
      </ol>
      <p className="rebate px-5 text-[12px] text-grain sm:px-8 lg:px-14">
        Onboarding screens from an early iPhone build. Photos inside them are samples.
      </p>
    </section>
  );
}

const facts = [
  { n: "10", label: "looks", note: "Each tuned like a film stock" },
  { n: "3200", label: "grain, at most", note: "From a clean 100 to a gritty 3200, on one dial" },
  { n: "6", label: "tones", note: "From Faded to Crushed" },
  { n: "2", label: "platforms", note: "iPhone and Android, together" },
];

/** The app in numbers, all taken from the app itself. */
export function Numbers() {
  return (
    <section className="puff mx-3 mt-32 rounded-[28px] px-6 py-16 text-darkroom sm:mx-5 sm:px-12 sm:py-20 lg:px-20" aria-label="trycheese in numbers">
      <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map((f) => (
          <div key={f.label} className="border-t-2 border-darkroom/80 pt-5">
            <dt className="rebate text-[14px] text-darkroom/70">{f.label}</dt>
            <dd className="mt-1">
              <span className="display block text-[clamp(3rem,7vw,5.5rem)] tabular-nums">{f.n}</span>
              <span className="mt-3 block text-[16px] font-medium text-darkroom/80">{f.note}</span>
            </dd>
          </div>
        ))}
      </dl>
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
              t === 3 ? "h-7 w-[2px] bg-cheese" : t % 3 === 0 ? "h-5 bg-paper/70" : "h-3 bg-paper/30"
            }`}
          />
        ))}
      </div>
      <div className="rebate mt-3 flex justify-between text-[12px] text-grain">
        <span>−2</span><span>0</span><span className="text-cheese">+1/3</span><span>+2</span>
      </div>
    </div>
  );
}

export function Camera() {
  const night = look("blue");
  return (
    <section id="camera" className="scroll-mt-24 px-5 pt-32 sm:px-8 lg:px-14">
      <h2 className="display max-w-4xl text-[clamp(2.5rem,6vw,5rem)]">
        A real camera, <span className="accent">minus the fuss.</span>
      </h2>

      <div className="mt-14 grid gap-3 lg:grid-cols-6">
        <article className="relative overflow-hidden rounded-[22px] bg-surface lg:col-span-4 lg:row-span-2">
          <FilmFrame look={night} bare sizes="(min-width: 1024px) 60vw, 100vw" className="h-[480px] w-full sm:h-[440px] lg:h-full lg:min-h-[520px]" />
          <SampleTag look={night} className="absolute right-4 top-4" />
          <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgb(12_12_11/0.92))] p-6 sm:p-8">
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
          <ScanFace className="size-6 text-cheese" strokeWidth={1.75} aria-hidden />
          <h3 className="mt-4 text-[19px] font-semibold">Portrait mode</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
            Soft, filmic background blur that falls off like a real lens, with the look applied on top.
          </p>
        </article>

        <article className="relative overflow-hidden rounded-[22px] bg-surface p-6 sm:p-7 lg:col-span-2">
          <Layers2 className="size-6 text-cheese" strokeWidth={1.75} aria-hidden />
          <h3 className="mt-4 text-[19px] font-semibold">Double exposure</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
            Two shots, one frame. Blend them into something you couldn&rsquo;t have planned.
          </p>
          <div className="relative mt-6 h-24" aria-hidden>
            <FilmFrame look={look("fresh")} bare sizes="144px" className="absolute left-0 top-0 h-24 w-36 rounded-xl" />
            <div className="absolute left-14 top-3 h-24 w-36 overflow-hidden rounded-xl mix-blend-screen">
              <FilmFrame look={look("swiss")} bare sizes="144px" className="h-full w-full" />
            </div>
          </div>
        </article>

        <article className="rounded-[22px] bg-surface p-6 sm:p-7 lg:col-span-2">
          <QrCode className="size-6 text-cheese" strokeWidth={1.75} aria-hidden />
          <h3 className="mt-4 text-[19px] font-semibold">Recipes you can share</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-paper/70">
            Build your own look from warmth, grain, halation and tone, then pass it on as a code or QR. Friends dial
            it in, offline.
          </p>
        </article>

        <article className="puff rounded-[22px] p-6 text-darkroom sm:p-7 lg:col-span-2">
          <Lock className="size-6 text-darkroom" strokeWidth={1.75} aria-hidden />
          <h3 className="mt-4 text-[19px] font-semibold">Free and private</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-darkroom/80">
            No account, no subscription. Your photos stay on your phone until
            you share them.
          </p>
        </article>
      </div>
    </section>
  );
}

/** A stylised camera screen in the app's own UI: modes, the cheese shutter, the look tile. */
function PhoneMock({ os }: { os: "iPhone" | "Android" }) {
  const cheddar = look("cheddar");
  return (
    <figure className="flex flex-col items-center">
      <div
        className={`relative w-[min(78vw,290px)] border-[10px] border-raised bg-darkroom p-3 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ${
          os === "iPhone" ? "rounded-[46px]" : "rounded-[34px]"
        }`}
      >
        <div className="rebate flex justify-between px-1 pb-2 text-[11px] text-grain">
          <span>26 mm</span>
          <span className="text-paper/80">EV 0.0</span>
        </div>
        <FilmFrame look={look("mozz")} bare sizes="290px" className="aspect-[3/4] w-full rounded-2xl" />
        <div className="mt-3 flex justify-center">
          <span className="wordmark rounded-full bg-cheese px-2.5 py-1 text-[12px] text-darkroom">1×</span>
        </div>
        <div className="mt-3 flex justify-center gap-3 text-[13px]">
          <span className="wordmark rounded-full bg-paper px-2.5 py-0.5 text-darkroom">auto</span>
          <span className="wordmark text-grain">portrait</span>
          <span className="wordmark text-grain">slow</span>
          <span className="wordmark text-grain">double</span>
        </div>
        <div className="mt-4 flex items-center justify-between px-2 pb-2">
          <span className="block size-10 rounded-xl bg-surface" />
          <span className="block size-16 rounded-full border-[3px] border-cream p-1">
            <span className="puff block size-full rounded-full" />
          </span>
          <span
            className="flex size-12 flex-col items-center justify-center rounded-xl leading-none"
            style={{ background: cheddar.color, color: cheddar.ink }}
          >
            <span className="wordmark text-[10px]">Cheddar</span>
            <span className="mt-0.5 text-[7px]">400 · Natural</span>
          </span>
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
        <Link href="/blog" className="text-[17px] text-paper/80 underline decoration-cheese/50 hover:text-paper">
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
            <li><Link className="hover:text-paper" href="/#app">The app</Link></li>
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
            <li><a className="hover:text-paper" href="https://www.reddit.com/r/trycheese/" rel="noopener">r/trycheese</a></li>
            <li><a className="hover:text-paper" href="/feed.xml">RSS feed</a></li>
            <li><a className="hover:text-paper" href="/llms.txt">llms.txt</a></li>
          </ul>
        </div>
      </nav>
      <div className="flex items-end gap-[clamp(0.75rem,2vw,2rem)]">
        <Image
          src="/brand/bubbly-cheese.svg"
          alt="The trycheese Bubbly Cheese icon"
          width={240}
          height={240}
          className="size-[clamp(4.5rem,16vw,14rem)] shrink-0"
        />
        <p className="wordmark text-[clamp(3.5rem,15vw,14rem)] leading-[0.85] text-paper">
          trycheese
        </p>
      </div>
      <div className="rebate mt-8 flex flex-col gap-3 text-grain lg:flex-row lg:items-center lg:justify-between">
        <span>trycheese ▸ 400 ▸ 01A</span>
        <span>say cheese. it&rsquo;s already film.</span>
        <span>Coming soon to the App Store &amp; Google Play</span>
        <span>© 2026 trycheese</span>
      </div>
    </footer>
  );
}
