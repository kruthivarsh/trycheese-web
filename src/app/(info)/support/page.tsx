import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Breadcrumbs } from "@/components/blog-ui";
import { formatDate } from "@/lib/blog/posts";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { OG_IMAGE, PAGE_UPDATED, SITE, absoluteUrl } from "@/lib/site";

const UPDATED = PAGE_UPDATED.support;
const DESCRIPTION =
  "Help with the trycheese film camera app: accounts, where photos are saved, sharing and review, reporting and blocking, sign-in codes and deleting your account.";

export const metadata: Metadata = {
  title: "Support | trycheese",
  description: DESCRIPTION,
  alternates: { canonical: "/support" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: absoluteUrl("/support"),
    title: "Support | trycheese",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const S = {
  camera: { id: "the-camera", title: "The camera" },
  community: { id: "community", title: "Community" },
  account: { id: "your-account", title: "Your account" },
  privacy: { id: "privacy", title: "Privacy" },
} as const;

type Section = (typeof S)[keyof typeof S];

function H2({ s }: { s: Section }) {
  return <h2 id={s.id}>{s.title}</h2>;
}

const mailto = `mailto:${SITE.email}`;

export default function SupportPage() {
  return (
    <article className="px-5 pt-10 sm:px-8 lg:px-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Support", path: "/support" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Support" }]} />

      <header className="mt-8 max-w-4xl">
        <h1 className="display text-[clamp(2.5rem,6vw,4.75rem)]">
          Out of focus? <span className="accent">Let&rsquo;s fix that.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-paper/80">
          Quick answers about the trycheese app for iPhone and Android.
          Can&rsquo;t find yours? Email us.
        </p>
        <p className="rebate mt-6 text-grain">
          Last updated <time dateTime={UPDATED}>{formatDate(UPDATED)}</time>
        </p>
      </header>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <section aria-labelledby="contact" className="max-w-[68ch] rounded-[22px] bg-surface p-6 sm:p-7">
            <Mail className="size-6 text-cheese" strokeWidth={1.75} aria-hidden />
            <h2 id="contact" className="mt-4 scroll-mt-24 text-[19px] font-semibold">Email us</h2>
            <p className="mt-2">
              <a
                className="text-[clamp(1.25rem,3vw,1.6rem)] font-semibold text-paper underline decoration-cheese/50 underline-offset-4 hover:decoration-cheese"
                href={mailto}
              >
                {SITE.email}
              </a>
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-paper/70">
              Something broken? Tell us your phone model, its OS version and
              what you tapped. About your account? Write from the address you
              signed in with, or tell us your username.
            </p>
          </section>

          <div className="prose-tc mt-14">
            <H2 s={S.camera} />

            <h3>Do I need an account?</h3>
            <p>
              You can take 5 photos without one. After that, the camera asks you
              to sign in before it takes more. Signing in is free and removes the
              limit.
            </p>
            <p>
              Signed out, you can still use the looks and your recipes, save to
              Photos or your gallery, and share through your phone&rsquo;s share
              sheet. Community needs an account.
            </p>

            <h3>Where are my photos saved?</h3>
            <p>
              On your phone. Every photo is saved inside the app. If you let
              trycheese add to Photos on iPhone or your gallery on Android, it
              goes there too (on Android, in an album called trycheese). On
              iPhone, trycheese can only add photos, so it never sees the rest of
              your library.
            </p>
            <p>
              No photo is uploaded unless you share it to Community or pick it
              as your profile photo. Deleting your account leaves the photos
              on your phone alone.
            </p>

            <h3>Does trycheese know where I took a photo?</h3>
            <p>
              Only if you turn on Add location, which is off by default. The
              position goes into the copy in Photos or your gallery, not into the
              app&rsquo;s own copy that Share and Community use. If you pick a
              photo with a location as your profile photo, our server strips it
              before anyone sees the photo.
            </p>

            <H2 s={S.community} />

            <h3>How do sharing and review work?</h3>
            <p>
              Open a photo and tap <strong>Share to community</strong>. Add a
              caption if you like. If you shot it with a recipe, you can choose
              whether to include it. Everyone who can see the post gets the
              whole recipe, including its name and notes, sent to their app.
            </p>
            <p>
              Our server strips the photo&rsquo;s location and other details.
              Then the trycheese team reviews every post before it shows in
              Community. The post&rsquo;s status shows in the app, and if your
              account has an email address, we&rsquo;ll email you when it&rsquo;s
              approved, or tell you why if it isn&rsquo;t. You can delete your
              own posts at any time.
            </p>
            <p>
              The plain <strong>Share</strong> button is different. It opens your
              phone&rsquo;s share sheet and never goes through our servers.
            </p>

            <h3>How do I report a post or block someone?</h3>
            <p>
              Tap the three dots on the post, then <strong>Report this
              post</strong> or <strong>Block</strong>. For someone&rsquo;s name,
              username or profile photo, tap <strong>Report</strong> and their
              name in the same menu. Reports are private and go
              to the trycheese team. Blocking hides that person&rsquo;s
              posts from your feed, and they aren&rsquo;t told.
            </p>

            <H2 s={S.account} />

            <h3>My sign-in code hasn&rsquo;t arrived</h3>
            <ul>
              <li>
                Check your spam or junk folder for an email from {SITE.emailFrom}.
                The subject starts with the code.
              </li>
              <li>
                Check the address is right. Tap <strong>Use a different
                email</strong> to fix a typo.
              </li>
              <li>
                Tap <strong>Send a new code</strong>. It&rsquo;s ready 30 seconds
                after the last one, up to 5 codes an hour for one address.
              </li>
              <li>Each code works for 10 minutes.</li>
            </ul>
            <p>
              Still nothing? Sign in with Apple or Google instead, or{" "}
              <a href={mailto}>email us</a>.
            </p>

            <h3>Apple or Google sign-in didn&rsquo;t work</h3>
            <p>
              Try again, or use your email instead. Sign in with Apple is on
              iPhone only. Google works on both.
            </p>
            <p>
              The first time you use Apple or Google, it links to any trycheese
              account with the same verified email. If you chose Hide My Email,
              Apple gives us a private relay address, so it won&rsquo;t match an
              account you made with your real one.
            </p>

            <h3 id="delete-your-account">How do I delete my account?</h3>
            <p>
              In the app, open <strong>Settings</strong>, tap your name under{" "}
              <strong>Account</strong>, then tap <strong>Delete account</strong>,
              and confirm. No app, or can&rsquo;t sign in? Use the{" "}
              <Link href="/delete-account">delete your account page</Link>: enter
              the email address on your account and confirm with the 6-digit code
              we send you.
            </p>
            <p>
              Your account is switched off straight away: you&rsquo;re signed out
              on every phone, and your profile, posts and likes no longer show in
              trycheese. 30 days later it&rsquo;s deleted for good, with
              everything you shared to Community. Photos and recipes on your
              phone stay. Want a photo gone right away? Delete the post in
              Community before you delete your account: that removes it from
              trycheese at once (copies can still load from caches for up to a
              year).
            </p>
            <p>
              Changed your mind? Sign in again within those 30 days, the same way
              you signed in before (email, Apple or Google), and your account
              comes back as it was. If your account is on hold, signing in
              won&rsquo;t work: write to <a href={mailto}>{SITE.email}</a>{" "}
              instead.
            </p>
            <p>
              If you used Sign in with Apple, when the account is deleted for
              good, we also ask Apple to disconnect trycheese from your Apple
              Account. Google isn&rsquo;t disconnected
              automatically: remove trycheese under{" "}
              <a href="https://myaccount.google.com/connections">
                Your connections to third-party apps &amp; services
              </a>{" "}
              in your Google Account.
            </p>
            <p>
              A few things outlast the deletion. Shared photos can keep loading
              from caches for up to a year, and your username is held for a
              year so nobody else can take it straight away. The{" "}
              <Link href="/privacy#delete-your-account">privacy policy</Link>{" "}
              lists exactly what&rsquo;s deleted and what&rsquo;s kept.
            </p>
            <p>
              Your account has no email address (for example Sign in with Apple
              with no email shared)? <a href={mailto}>Email us</a> and tell us
              your username.
            </p>
            <p>
              Lost a phone? Open <strong>Settings</strong>, tap your name under{" "}
              <strong>Account</strong>, then tap{" "}
              <strong>Sign out on all devices</strong>.
            </p>

            <H2 s={S.privacy} />
            <p>
              Want the details on what trycheese collects, who handles it and how
              long it&rsquo;s kept? Read the{" "}
              <Link href="/privacy">privacy policy</Link>.
            </p>
            <p>
              The <Link href="/terms">Terms of Use</Link> and{" "}
              <Link href="/community-guidelines">community guidelines</Link>{" "}
              explain the rules for using trycheese and sharing to Community.
            </p>
          </div>

          <aside className="puff mt-14 max-w-[68ch] rounded-[22px] p-7 text-darkroom [--accent:var(--color-ink)] sm:p-9">
            <p className="display text-[clamp(1.6rem,3vw,2.25rem)]">
              Still stuck? <span className="accent">Write to us.</span>
            </p>
            <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-darkroom/80">
              Bugs, questions or a look you want to tell us about.
            </p>
            <a
              href={mailto}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-darkroom px-5 py-3 text-[15px] font-semibold text-cheese"
            >
              <Mail className="size-4" strokeWidth={2} aria-hidden />
              {SITE.email}
            </a>
          </aside>
        </div>

        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="rebate text-grain">On this page</p>
            <ol className="mt-4 space-y-2.5 text-[14px] text-paper/70">
              <li>
                <a className="hover:text-paper" href="#contact">Email us</a>
              </li>
              {Object.values(S).map((s) => (
                <li key={s.id}>
                  <a className="hover:text-paper" href={`#${s.id}`}>{s.title}</a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </div>
    </article>
  );
}
