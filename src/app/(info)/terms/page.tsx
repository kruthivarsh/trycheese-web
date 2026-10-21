import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/blog-ui";
import { formatDate } from "@/lib/blog/posts";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import {
  COMPANY,
  GRIEVANCE_OFFICER,
  LEGAL_VERSION,
  OG_IMAGE,
  PAGE_UPDATED,
  PRIVACY_DRAFT,
  SITE,
  absoluteUrl,
} from "@/lib/site";

// Shares PRIVACY_DRAFT with /privacy: noindex and out of the sitemap while it's
// true. Keep it in step with the app's real rules (trycheese_be and
// camera-project), and the minimum age and report time in step with
// /community-guidelines and /privacy.

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

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;
const grievanceMail = <a href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</a>;

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
              made by {COMPANY.name}, a company registered in India and a
              subsidiary of {COMPANY.parent}. {COMPANY.name}&rsquo;s registered
              office is at {COMPANY.address}. In these terms, &ldquo;we&rdquo; and
              &ldquo;us&rdquo; means {COMPANY.name}, and &ldquo;you&rdquo; means
              you, the person using trycheese.
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
              You must be at least 13 to use trycheese or have an account. We
              delete accounts we find belong to someone under 13. If you&rsquo;re
              under 18, you need a parent&rsquo;s or guardian&rsquo;s permission
              to use trycheese where the law where you live requires it.
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
                deleted for good, except for copies in caches that expire on
                their own (see{" "}
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
              users. We act on reports within 24 hours, by removing content that
              breaks the guidelines, and we can suspend or delete the account
              that posted it.
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
              <li>
                Don&rsquo;t share anything that infringes someone&rsquo;s
                copyright, trademark, patent or other rights.
              </li>
              <li>
                Don&rsquo;t share anything you know is false or misleading, or
                that misleads people about where it came from.
              </li>
              <li>
                Don&rsquo;t share anything that threatens the unity, integrity,
                defence, security or sovereignty of India, its relations with
                other countries or public order, or that incites an offence.
              </li>
            </ul>

            <H2 s={S.ours} />
            <p>
              The trycheese app, its looks, the trycheese name and the brand belong
              to {COMPANY.name}, apart from the open-source software and film
              LUTs the app includes. Using trycheese doesn&rsquo;t give you any
              rights to them beyond using the app as these terms allow. The
              licences for the open-source parts are listed in the app.
            </p>

            <H2 s={S.stores} />
            <p>
              You get the app from Apple&rsquo;s App Store or Google Play.
              trycheese is published on Google Play under the developer name WTMF
              AI, and on the App Store under the seller name Knockverse Private
              Limited. These terms are between you and us, not Apple or Google.
              If you got the app from the App Store:
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
              To the extent the law allows, the trycheese app and this website
              are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;,
              without warranties of any kind, express or implied, including that
              they&rsquo;re fit for a particular purpose. We don&rsquo;t promise
              that they&rsquo;ll always be available or free of errors, or that
              what you share won&rsquo;t be lost.
            </p>
            <p>
              Nothing in these terms takes away rights you have under consumer
              law that can&rsquo;t be excluded.
            </p>

            <H2 s={S.liability} />
            <p>To the extent the law allows:</p>
            <ul>
              <li>
                we aren&rsquo;t liable for indirect or consequential loss, such as
                lost profits, lost data or harm to reputation
              </li>
              <li>
                our total liability to you for all claims about trycheese is
                limited to the greater of what you paid us in the 12 months
                before the claim (trycheese is free, so normally INR 0) or INR
                1,000
              </li>
            </ul>
            <p>
              Nothing in these terms limits liability that the law doesn&rsquo;t
              allow to be limited, for example for fraud, or for death or
              personal injury caused by negligence.
            </p>

            <H2 s={S.changes} />
            <p>
              These terms are version {LEGAL_VERSION.version}, in effect from{" "}
              <time dateTime={LEGAL_VERSION.effective}>{formatDate(LEGAL_VERSION.effective)}</time>.
            </p>
            <p>
              When these terms change, we update this page and the date at the
              top. Before a material change takes effect, we&rsquo;ll announce it
              on this website and in an update to the app. If you keep using
              trycheese after a change takes effect, the new terms apply to you.
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
              These terms are governed by the laws of India. The courts in
              Hyderabad, Telangana, have exclusive jurisdiction over any dispute
              about these terms or trycheese. This doesn&rsquo;t take away the
              protection of mandatory consumer laws where you live.
            </p>

            <H2 s={S.contact} />
            <p>Email {mail}.</p>
            <p>
              {COMPANY.name}, {COMPANY.address}.
            </p>
            <p>
              <strong>Grievance Officer.</strong> Under India&rsquo;s Information
              Technology Rules, 2021 and Digital Personal Data Protection Act,
              2023, our Grievance Officer is {GRIEVANCE_OFFICER.name}. Write to{" "}
              {grievanceMail} with a complaint about trycheese, a post or an
              account. We acknowledge complaints within{" "}
              {GRIEVANCE_OFFICER.acknowledgeWithin} and resolve them within{" "}
              {GRIEVANCE_OFFICER.resolveWithin}. If your complaint asks us to
              remove a post, a profile or anything else on trycheese, we resolve
              it within {GRIEVANCE_OFFICER.removalWithin}. If it&rsquo;s about
              content that shows you nude, partly nude or in a sexual act, or
              impersonates you (including morphed images), we remove it or block
              access to it within 24 hours of your complaint.
            </p>
            <p>
              If you&rsquo;re not happy with the Grievance Officer&rsquo;s
              decision, you can appeal to the Grievance Appellate Committee set
              up by the Government of India, at{" "}
              <a href="https://gac.gov.in">gac.gov.in</a>, within 30 days of
              receiving it.
            </p>
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
