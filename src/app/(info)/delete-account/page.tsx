import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/blog-ui";
import { DeleteAccountForm } from "@/components/delete-account-form";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { OG_IMAGE, SITE, absoluteUrl } from "@/lib/site";

// Also the Google Play "Delete account URL". The page itself is static; the
// form posts to the server action in ./actions.ts, which calls the trycheese
// API server to server (it holds the key; the browser never sees it).

const TITLE = "Delete your account | trycheese";
const DESCRIPTION =
  "Delete your trycheese account without the app. It’s switched off at once and deleted for good after 30 days unless you sign in again.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/delete-account" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: absoluteUrl("/delete-account"),
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

export default function DeleteAccountPage() {
  return (
    <article className="px-5 pt-10 sm:px-8 lg:px-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Delete your account", path: "/delete-account" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Delete your account" }]} />

      <header className="mt-8 max-w-4xl">
        <p className="rebate text-cheese">trycheese account</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4.75rem)]">
          delete your <span className="accent">account.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-paper/80">
          Delete your trycheese account without the app. Enter the email address
          on your account and we&rsquo;ll send you a 6-digit code to confirm
          it&rsquo;s you.
        </p>
      </header>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <section aria-label="Delete your account" className="max-w-[68ch] rounded-[22px] bg-surface p-6 sm:p-7">
          <DeleteAccountForm />
        </section>

        <aside className="prose-tc">
          <h2 id="what-happens">What happens</h2>
          <ul>
            <li>
              Your account is switched off at once: you&rsquo;re signed out on
              every phone, and your profile, posts and likes no longer show in
              trycheese.
            </li>
            <li>30 days later it&rsquo;s deleted for good, with everything you shared.</li>
            <li>
              Changed your mind? Sign in to the app before the date in our email,
              the same way you signed in before, and everything comes back. If
              your account is on hold, write to {mail} instead.
            </li>
            <li>Photos and recipes on your phone are never touched.</li>
          </ul>

          <h2 id="what-we-keep">What we keep</h2>
          <ul>
            <li>
              Your username, held for 1 year so nobody can take it straight
              away. The record stays after that until someone takes the name.
              It isn&rsquo;t linked to you.
            </li>
            <li>
              Records of usernames you gave up earlier, until someone else takes
              the name. They aren&rsquo;t linked to you.
            </li>
            <li>
              A short record that an account was deleted: how it signed up, when
              it was made and when it was deleted. No email, name or username.
              There&rsquo;s no time limit on this yet.
            </li>
            <li>
              Your install record (platform, app and OS version, language), no
              longer linked to your account, and usage events the app sent while
              you were signed out, which never were. Both are still tied to the
              app&rsquo;s install ID on your phone. There&rsquo;s no time limit
              on these yet. Usage events linked to your account are deleted with
              it.
            </li>
            <li>
              If you signed in with Apple: your Apple account ID and an encrypted
              token, until Apple confirms we&rsquo;ve disconnected it (we stop
              trying after about 10 days).
            </li>
            <li>
              Copies of shared photos can stay in caches for up to a year, and
              data can stay in backups until they expire.
            </li>
          </ul>
          <p>
            How long each of these is kept is in the{" "}
            <Link href="/privacy#how-long-we-keep-it">privacy policy</Link>.
          </p>

          <h2 id="prefer-the-app">Prefer the app?</h2>
          <p>
            In trycheese, open <strong>Settings</strong>, tap your name under{" "}
            <strong>Account</strong>, then tap <strong>Delete account</strong>.
          </p>

          <h2 id="no-email">No email on your account?</h2>
          <p>
            Signed in with Apple and hid your email? Use your private relay
            address (it ends in privaterelay.appleid.com), or delete the account
            in the app. Still stuck? Email {mail} and tell us your username.
          </p>
          <p>
            The <Link href="/privacy#delete-your-account">privacy policy</Link>{" "}
            explains exactly what&rsquo;s deleted and what&rsquo;s kept.
          </p>
        </aside>
      </div>
    </article>
  );
}
