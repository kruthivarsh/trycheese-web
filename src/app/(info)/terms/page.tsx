import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/blog-ui";
import { ToFill } from "@/components/to-fill";
import { formatDate } from "@/lib/blog/posts";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { OG_IMAGE, PAGE_UPDATED, PRIVACY_DRAFT, SITE, absoluteUrl } from "@/lib/site";

// Shares PRIVACY_DRAFT with /privacy: noindex and out of the sitemap while any
// [To fill in] item is left, and the build fails if one is left once it's false.
// Keep it in step with the app's real rules (trycheese_be and camera-project).

const UPDATED = PAGE_UPDATED.terms;
const TITLE = "Terms of Use | trycheese";
const DESCRIPTION =
  "The rules for using the trycheese film camera app and trycheese.app: your account, what you share to Community, moderation and deleting your account.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  ...(PRIVACY_DRAFT ? { robots: { index: false, follow: true } } : {}),
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: absoluteUrl("/terms"),
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const S = {
  who: { id: "who-we-are", title: "Who we are" },
  agreeing: { id: "agreeing", title: "Agreeing to these terms" },
  app: { id: "the-app", title: "The app" },
  account: { id: "your-account", title: "Your account" },
  content: { id: "your-content", title: "Your photos and what you share" },
  community: { id: "community", title: "Community rules" },
  moderation: { id: "moderation", title: "Moderation and enforcement" },
  deleting: { id: "deleting", title: "Deleting your account" },
  dont: { id: "dont", title: "Things you must not do" },
  ours: { id: "ours", title: "What’s ours" },
  stores: { id: "stores", title: "App Store and Google Play" },
  disclaimers: { id: "disclaimers", title: "Disclaimers" },
  liability: { id: "liability", title: "Liability" },
  changes: { id: "changes", title: "Changes" },
  ending: { id: "ending", title: "Ending" },
  law: { id: "law", title: "Governing law and disputes" },
  contact: { id: "contact", title: "Contact" },
} as const;

type Section = (typeof S)[keyof typeof S];

function H2({ s }: { s: Section }) {
  return <h2 id={s.id}>{s.title}</h2>;
}

const PAGE = "/terms";
const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

export default function TermsPage() {
  return (
    <article className="px-5 pt-10 sm:px-8 lg:px-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms of Use", path: "/terms" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Terms of Use" }]} />

      <header className="mt-8 max-w-4xl">
        <p className="rebate text-cheese">Legal</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4.75rem)]">
          terms of <span className="accent">use.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-paper/80">
          The rules for using the trycheese app for iPhone and Android, and this
          website, in plain words.
        </p>
        <p className="rebate mt-6 text-grain">
          Last updated <time dateTime={UPDATED}>{formatDate(UPDATED)}</time>
        </p>
      </header>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <div className="prose-tc">
            <H2 s={S.who} />
            <p>
              trycheese is a film camera app for iPhone and Android. trycheese is
              made by{" "}
              <ToFill page={PAGE}>legal entity name and registered address</ToFill>
              . In these terms, &ldquo;we&rdquo; and &ldquo;us&rdquo; means them,
              and &ldquo;you&rdquo; means you, the person using trycheese.
            </p>
            <p>Questions about these terms go to {mail}.</p>

            <H2 s={S.agreeing} />
            <p>
              By using the trycheese app or this website, you agree to these
              terms, our <Link href="/privacy">privacy policy</Link> and our{" "}
              <Link href="/community-guidelines">community guidelines</Link>. If
              you don&rsquo;t agree, please don&rsquo;t use trycheese.
            </p>
            <p>
              Minimum age:{" "}
              <ToFill page={PAGE}>
                minimum age to use trycheese and to have an account
              </ToFill>
              .
            </p>

            <H2 s={S.app} />
            <ul>
              <li>trycheese is free. There are no ads and no subscription.</li>
              <li>
                It&rsquo;s a camera: each look is baked into the photo when you
                press the shutter.
              </li>
              <li>
                You can take 5 photos without an account. After that, you need a
                free account to keep shooting.
              </li>
              <li>Community, where people share photos and recipes, needs an account.</li>
              <li>
                We keep working on trycheese, so features can change, and some
                may be added or taken away.
              </li>
            </ul>

            <H2 s={S.account} />
            <ul>
              <li>
                You sign in with a code we email you, with Apple or with Google.
                There are no passwords.
              </li>
              <li>
                One account per person. Your account is yours to keep safe:
                anyone who can get into your email, Apple or Google account can
                sign in to trycheese as you.
              </li>
              <li>
                Your username, display name and profile photo must not
                impersonate anyone.
              </li>
              <li>
                We can reset a username that breaks these terms or the community
                guidelines, and ask you to pick a new one.
              </li>
            </ul>

            <H2 s={S.content} />
            <ul>
              <li>You own your photos.</li>
              <li>
                Your photos stay on your phone unless you share them to Community
                or pick one as your profile photo.
              </li>
              <li>
                When you share a post, you give us a worldwide, non-exclusive,
                royalty-free licence to store, copy, process (resize, make
                thumbnails and strip metadata) and show the photo, its caption,
                look name and recipe in the trycheese community in the app, and
                in emails we send you about the post, for as long as it&rsquo;s
                shared.
              </li>
              <li>
                The licence ends when you delete the post or your account is
                deleted for good, except for copies in caches and backups that
                expire on their own (see{" "}
                <Link href="/privacy#how-long-we-keep-it">how long we keep things</Link>
                ).
              </li>
              <li>
                We don&rsquo;t use your photos in ads or marketing without asking
                you first.
              </li>
              <li>
                When you share something, you confirm you have the right to share
                it.
              </li>
            </ul>

            <H2 s={S.community} />
            <p>
              Follow the{" "}
              <Link href="/community-guidelines">community guidelines</Link>.
              Every shared post is reviewed by our team before it appears in
              Community. You can report posts and block people.
            </p>
            <p>
              There&rsquo;s no tolerance for objectionable content or abusive
              users. We act on reports within{" "}
              <ToFill page={PAGE}>
                how quickly we act on reports (Apple expects within 24 hours);
                keep it the same as in the community guidelines
              </ToFill>
              , by removing content that breaks the guidelines, and we can
              suspend or delete the account that posted it.
            </p>

            <H2 s={S.moderation} />
            <p>To keep Community safe, we can:</p>
            <ul>
              <li>
                decline or remove posts, and email you about it (with the reason,
                when we give one)
              </li>
              <li>reset usernames</li>
              <li>
                suspend accounts. While an account is on hold, you can&rsquo;t
                sign in, your posts are hidden, and the app works as it does
                without an account, free-photo limit included.
              </li>
              <li>
                delete accounts for serious or repeated breaches. A deletion by us
                happens straight away.
              </li>
            </ul>
            <p>Think we got it wrong? Email {mail} to appeal.</p>

            <H2 s={S.deleting} />
            <p>
              You can delete your account at any time: in the app (open{" "}
              <strong>Settings</strong>, tap your name under{" "}
              <strong>Account</strong>, then tap <strong>Delete account</strong>),
              or at <Link href="/delete-account">trycheese.app/delete-account</Link>.
            </p>
            <p>
              Your account is switched off at once: you&rsquo;re signed out
              everywhere, and your profile, posts and likes no longer show in
              trycheese. It&rsquo;s deleted for good after 30 days. Signing in
              again within those 30 days, the same way you signed in before
              (email, Apple or Google), cancels the deletion. If your account is
              on hold, signing in won&rsquo;t work: write to {mail} instead.
            </p>
            <p>
              The <Link href="/privacy#delete-your-account">privacy policy</Link>{" "}
              lists what&rsquo;s deleted and what&rsquo;s kept.
            </p>

            <H2 s={S.dont} />
            <ul>
              <li>Don&rsquo;t use trycheese to break the law.</li>
              <li>Don&rsquo;t scrape trycheese or bulk-download photos or profiles.</li>
              <li>
                Don&rsquo;t reverse engineer the app or our service, except where
                the law allows it, and don&rsquo;t overload them.
              </li>
              <li>
                Don&rsquo;t get around limits or bans, like the free-photo limit,
                rate limits or a suspension.
              </li>
              <li>Don&rsquo;t get into other people&rsquo;s accounts.</li>
              <li>Don&rsquo;t upload malware.</li>
            </ul>

            <H2 s={S.ours} />
            <p>
              The trycheese app, its looks, the trycheese name and the brand belong
              to <ToFill page={PAGE}>legal entity name</ToFill>. Using trycheese
              doesn&rsquo;t give you any rights to them beyond using the app as
              these terms allow. The app includes open-source software; its
              licences are listed in the app.
            </p>

            <H2 s={S.stores} />
            <p>
              You get the app from Apple&rsquo;s App Store or Google Play. These
              terms are between you and us, not Apple or Google. If you got the
              app from the App Store:
            </p>
            <ul>
              <li>Apple has no obligation to maintain or support the app.</li>
              <li>
                Apple is not responsible for warranty claims, product claims or
                claims that the app infringes someone else&rsquo;s intellectual
                property.
              </li>
              <li>
                Apple and its subsidiaries are third-party beneficiaries of these
                terms, and can enforce them against you.
              </li>
              <li>
                You confirm you&rsquo;re not in a country under a US government
                embargo, and not on a US government list of prohibited or
                restricted parties.
              </li>
            </ul>
            <p>The store&rsquo;s own terms also apply.</p>

            <H2 s={S.disclaimers} />
            <p>
              trycheese is provided as is, to the extent the law allows.{" "}
              <ToFill page={PAGE}>disclaimer wording for the governing law</ToFill>
            </p>

            <H2 s={S.liability} />
            <p>
              <ToFill page={PAGE}>liability cap and exclusions</ToFill>
            </p>

            <H2 s={S.changes} />
            <p>
              When these terms change, we update this page and the date at the
              top.{" "}
              <ToFill page={PAGE}>
                effective date, and how people are told about material changes
              </ToFill>
            </p>

            <H2 s={S.ending} />
            <p>
              You can stop using trycheese and{" "}
              <a href={`#${S.deleting.id}`}>delete your account</a> at any time.
              We can suspend or end your access if you break these terms or the
              community guidelines.
            </p>

            <H2 s={S.law} />
            <p>
              <ToFill page={PAGE}>governing law, courts and venue</ToFill>
            </p>

            <H2 s={S.contact} />
            <p>Email {mail}.</p>
          </div>
        </div>

        <nav aria-label="On this page" className="hidden lg:block">
          <div className="sticky top-24">
            <p className="rebate text-grain">On this page</p>
            <ol className="mt-4 space-y-2.5 text-[14px] text-paper/70">
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
