import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/blog-ui";
import { formatDate } from "@/lib/blog/posts";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { GRIEVANCE_OFFICER, OG_IMAGE, PAGE_UPDATED, PRIVACY_DRAFT, SITE, absoluteUrl } from "@/lib/site";

// Shares PRIVACY_DRAFT with /privacy and /terms: noindex and out of the
// sitemap while it's true. Keep the report time (24 hours) the same as in the
// Terms, and the minimum age (13) the same as in the Terms and /privacy.
// Keep it in step with the app's real moderation (trycheese_be community module).

const UPDATED = PAGE_UPDATED.communityGuidelines;
const TITLE = "Community guidelines | trycheese";
const DESCRIPTION =
  "What you can share to the trycheese community, what you can’t, how review, reporting and blocking work, and what happens when the rules are broken.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/community-guidelines" },
  ...(PRIVACY_DRAFT ? { robots: { index: false, follow: true } } : {}),
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: absoluteUrl("/community-guidelines"),
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const S = {
  short: { id: "the-short-version", title: "The short version" },
  share: { id: "share", title: "What to share" },
  dontPost: { id: "dont-post", title: "What not to post" },
  profiles: { id: "profiles", title: "Usernames, names, bios and profile photos" },
  review: { id: "review", title: "How review works" },
  reportBlock: { id: "report-block", title: "Reporting and blocking" },
  consequences: { id: "consequences", title: "When rules are broken" },
  appeals: { id: "appeals", title: "Think we got it wrong?" },
  age: { id: "age", title: "Age" },
} as const;

type Section = (typeof S)[keyof typeof S];

function H2({ s }: { s: Section }) {
  return <h2 id={s.id}>{s.title}</h2>;
}

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

export default function CommunityGuidelinesPage() {
  return (
    <article className="px-5 pt-10 sm:px-8 lg:px-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Community guidelines", path: "/community-guidelines" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Community guidelines" }]} />

      <header className="mt-8 max-w-4xl">
        <p className="rebate text-cheese">Community</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4.75rem)]">
          community <span className="accent">guidelines.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-paper/80">
          Community is where people share photos taken with trycheese, and the
          recipes behind them. Here&rsquo;s how to keep it a good place to be.
        </p>
        <p className="rebate mt-6 text-grain">
          Last updated <time dateTime={UPDATED}>{formatDate(UPDATED)}</time>
        </p>
      </header>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <div className="prose-tc">
            <H2 s={S.short} />
            <p>
              Share photos you took with trycheese, be kind, and keep it safe for
              everyone. Our team reviews every post before it appears.
            </p>
            <p>
              There&rsquo;s no tolerance for objectionable content or abusive
              users: posts that break these rules are declined or removed, and
              accounts that break them can be suspended or deleted.
            </p>

            <H2 s={S.share} />
            <p>
              Your own photos, taken with trycheese. Add a caption if you like,
              and the recipe if you shot it with one.
            </p>

            <H2 s={S.dontPost} />
            <ul>
              <li>nudity or sexual content</li>
              <li>
                anything sexual involving minors. It&rsquo;s removed, the account
                is deleted, and we report it to the authorities.
              </li>
              <li>violence or gore</li>
              <li>hate, harassment, bullying or threats</li>
              <li>anything that promotes self-harm</li>
              <li>illegal activity</li>
              <li>spam, ads or scams</li>
              <li>other people&rsquo;s photos</li>
              <li>other people&rsquo;s personal information</li>
              <li>photos of people in private moments without their agreement</li>
              <li>anything that infringes someone&rsquo;s copyright or trademark</li>
              <li>things you know are false or misleading</li>
              <li>
                anything that threatens public order or national security, or
                incites a crime
              </li>
            </ul>

            <H2 s={S.profiles} />
            <p>
              The same rules apply to your username, display name, bio and
              profile photo. Don&rsquo;t pretend to be someone else.
            </p>

            <H2 s={S.review} />
            <p>
              Every shared post is checked by our team before it shows in
              Community. If it isn&rsquo;t approved, we email you the reason
              (if your account has an email address). Approved posts can still
              be removed later.
            </p>

            <H2 s={S.reportBlock} />
            <ul>
              <li>
                Report a post from its menu: spam, nudity, harassment or
                something else. We act on reports within 24 hours: our team
                looks at every report and removes content that breaks these
                rules. Reports are private.
              </li>
              <li>
                Block someone to hide their posts from your feed. They
                aren&rsquo;t told.
              </li>
            </ul>

            <H2 s={S.consequences} />
            <p>Depending on what happened:</p>
            <ul>
              <li>
                the post is declined or removed, and we email you (with the
                reason, when we give one) if your account has an email address
              </li>
              <li>your username is reset</li>
              <li>
                your account is suspended: you can&rsquo;t sign in, and your posts
                are hidden
              </li>
              <li>for serious cases, the account is deleted straight away</li>
            </ul>

            <H2 s={S.appeals} />
            <p>
              Write to {mail} and tell us your username and what happened.
              We&rsquo;ll take another look.
            </p>
            <p>
              You can also complain to our Grievance Officer,{" "}
              {GRIEVANCE_OFFICER.name}, at{" "}
              <a href={`mailto:${GRIEVANCE_OFFICER.email}`}>{GRIEVANCE_OFFICER.email}</a>.
              We acknowledge
              complaints within {GRIEVANCE_OFFICER.acknowledgeWithin} and resolve
              them within {GRIEVANCE_OFFICER.resolveWithin}. If your complaint
              asks us to remove a post, a profile or anything else on trycheese,
              we resolve it within {GRIEVANCE_OFFICER.removalWithin}. If
              it&rsquo;s about content that shows you nude, partly nude or in a
              sexual act, or impersonates you (including morphed images), we
              remove it or block access to it within 24 hours of your complaint.
            </p>
            <p>
              If you&rsquo;re not happy with the Grievance Officer&rsquo;s
              decision, you can appeal to the Grievance Appellate Committee set
              up by the Government of India, at{" "}
              <a href="https://gac.gov.in">gac.gov.in</a>, within 30 days of
              receiving it.
            </p>

            <H2 s={S.age} />
            <p>
              You must be at least 13 to use trycheese (see our{" "}
              <Link href="/terms#agreeing">Terms of Use</Link>). We delete
              accounts we find belong to someone under 13. If you&rsquo;re under
              18, you need a parent&rsquo;s or guardian&rsquo;s permission to use
              trycheese where the law where you live requires it.
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
