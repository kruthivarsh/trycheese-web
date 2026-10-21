import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/blog-ui";
import { ToFill } from "@/components/to-fill";
import { formatDate } from "@/lib/blog/posts";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { OG_IMAGE, PAGE_UPDATED, PRIVACY_DRAFT, SITE, absoluteUrl } from "@/lib/site";

// Before publishing: work through "0.1 Before the privacy policy goes live" in
// store-assets/RELEASE-GUIDE.md (server, storage and provider checks that
// don't belong on this page), and re-check the Apple sign-in parts against
// trycheese_be src/modules/auth/apple-tokens.service.ts.

const UPDATED = PAGE_UPDATED.privacy;
const DESCRIPTION =
  "What the trycheese app and website collect, why, who handles it, how long it’s kept and how to delete your account.";

export const metadata: Metadata = {
  title: "Privacy policy | trycheese",
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  ...(PRIVACY_DRAFT ? { robots: { index: false, follow: true } } : {}),
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: absoluteUrl("/privacy"),
    title: "Privacy policy | trycheese",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const S = {
  who: { id: "who-we-are", title: "Who we are" },
  noAccount: { id: "without-an-account", title: "What works without an account" },
  phone: { id: "on-your-phone", title: "What stays on your phone" },
  collect: { id: "what-we-collect", title: "What we collect and why" },
  dont: { id: "what-we-dont-do", title: "What we don’t do" },
  providers: { id: "who-handles-it", title: "Who handles data for us" },
  moderation: { id: "moderation", title: "How moderation works" },
  retention: { id: "how-long-we-keep-it", title: "How long we keep things" },
  delete: { id: "delete-your-account", title: "Deleting your account" },
  children: { id: "children", title: "Children" },
  security: { id: "security", title: "Keeping it safe" },
  rights: { id: "your-rights", title: "Your choices and rights" },
  website: { id: "this-website", title: "This website" },
  changes: { id: "changes", title: "Changes to this policy" },
} as const;

type Section = (typeof S)[keyof typeof S];

function H2({ s }: { s: Section }) {
  return <h2 id={s.id}>{s.title}</h2>;
}

const mail = <a href={`mailto:${SITE.email}`}>{SITE.email}</a>;

export default function PrivacyPage() {
  return (
    <article className="px-5 pt-10 sm:px-8 lg:px-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy policy", path: "/privacy" },
        ])}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Privacy policy" }]} />

      <header className="mt-8 max-w-4xl">
        <p className="rebate text-cheese">trycheese privacy policy</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4.75rem)]">
          Your photos, <span className="accent">your call.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-paper/80">
          Here&rsquo;s what trycheese collects, why, who handles it and how to
          delete it. This policy covers the trycheese app for iPhone and
          Android, and this website.
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
              trycheese is a film camera app for iPhone and Android. It&rsquo;s
              run by{" "}
              <ToFill page="/privacy">
                legal name of the company or person running trycheese (the data
                controller), registered address and country
              </ToFill>
              . In this policy, &ldquo;we&rdquo; and &ldquo;us&rdquo; means them.
            </p>
            <p>
              Questions about your data go to {mail}.{" "}
              <ToFill page="/privacy">
                how quickly we answer requests to access, export or correct data
              </ToFill>
            </p>
            <p>
              <ToFill page="/privacy">
                Data Protection Officer, Grievance Officer (India DPDP Act) or EU
                or UK representative, if any
              </ToFill>
            </p>

            <H2 s={S.noAccount} />
            <p>
              You can take 5 photos without an account. After that, the camera
              asks you to sign in before it takes more. Signing in is free and
              removes the limit.
            </p>
            <p>
              Signed out, you can still use the looks and your recipes, save to
              Photos or your gallery, and share through your phone&rsquo;s share
              sheet. Community needs an account: the feed, sharing a post, likes,
              reports and blocks.
            </p>
            <p>
              The 5-photo limit is counted on your phone. The usage events
              described below also tell us each time a photo is taken, signed in
              or not.
            </p>
            <p>
              Even signed out, the app sends a little usage data to our server.
              See <a href="#usage">app usage and device info</a>.
            </p>

            <H2 s={S.phone} />
            <ul>
              <li>
                Every photo you take is saved as a private copy inside the app.
                If you let trycheese add to Photos on iPhone or your gallery on
                Android, it goes there too (on Android, in an album called
                trycheese). Turn on <strong>Also save the original</strong> and
                the unedited shot is saved there as well.
              </li>
              <li>
                On iPhone, trycheese asks only to add photos. It can&rsquo;t see
                the rest of your library.
              </li>
              <li>Your settings and recipes are stored on the phone.</li>
              <li>
                The Share button opens your phone&rsquo;s share sheet with the
                app&rsquo;s own copy. It doesn&rsquo;t go through our servers.
              </li>
              <li>
                If you use your phone&rsquo;s own backups (iCloud, or Google on
                Android), they can include trycheese&rsquo;s app data: the
                photos inside the app, your settings and recipes, and the
                app&rsquo;s install ID. Apple or Google keep those backups under
                your account, not us.
              </li>
            </ul>
            <p>
              A photo reaches our servers only when you share it to Community or
              pick it as your profile photo.
            </p>
            <h3>Location</h3>
            <p>
              Add location is off by default. Turn it on and the app asks for
              your location only while you&rsquo;re using it. The position goes
              into the copy saved to Photos or your gallery, and nowhere else. If
              you share that copy from your Photos app yourself, the location goes
              with it.
            </p>
            <p>
              The app&rsquo;s own copy, the one Share and Community use, never
              gets your location. The app never sends us your current location,
              in any request or in usage data.
            </p>
            <p>
              A profile photo is different: you pick it from your library, and
              the app uploads it with whatever details the photo already holds,
              which can include where it was taken. Our server strips all
              metadata, location included, when it makes your profile photo, and
              then deletes the upload. It strips shared Community photos the same
              way.
            </p>

            <H2 s={S.collect} />
            <p>
              Some data reaches our server when you sign in, share, or just open
              the app. Here&rsquo;s all of it.
            </p>

            <h3>Signing in</h3>
            <p>There are three ways to sign in. There&rsquo;s no password.</p>
            <ul>
              <li>
                <strong>Email code.</strong> We store your email address. Each
                time you ask for a code, we store the address, a one-way hash of
                the code (never the code itself), how many tries were used, when
                it expires and was used, your IP address and the time. Codes are 6
                digits and work for 10 minutes.
              </li>
              <li>
                <strong>Sign in with Apple</strong> (iPhone). Apple tells us an
                account ID, your email address and whether it&rsquo;s verified.
                The address may be an Apple private relay address. On your first
                sign-in Apple can share your name: we keep only your first name,
                as your display name. Apple doesn&rsquo;t share a photo. Your
                phone also gives us a one-time code from Apple. Our server
                swaps it with Apple for a refresh token and keeps that token
                encrypted. We use it only to end trycheese&rsquo;s Sign in with
                Apple access when your account is deleted for good. A newer Apple
                sign-in replaces it.
              </li>
              <li>
                <strong>Google</strong> (iPhone and Android). Google tells us an
                account ID, your email address and whether it&rsquo;s verified,
                your name and your profile picture&rsquo;s web address. We ask
                for nothing beyond that basic profile. A new account takes your
                name as its display name and your Google picture as its profile
                photo. The app signs out of Google on your phone straight after.
              </li>
            </ul>
            <p>
              We check each sign-in&rsquo;s identity token against Apple&rsquo;s
              or Google&rsquo;s public keys and don&rsquo;t store that token. We
              use the email address from Apple or Google for your account only
              if they say it&rsquo;s verified. For each linked sign-in we keep
              the provider, its account ID and the email address it sent us,
              verified or not, plus, for Apple, the encrypted refresh token.
            </p>
            <p>
              The first time you use Apple or Google, it&rsquo;s linked to any
              trycheese account with the same verified email. Otherwise
              you get a new account.
            </p>
            <p>
              <em>Why:</em> to know it&rsquo;s you, to slow down anyone spamming
              codes, and to disconnect Sign in with Apple when you leave.
            </p>

            <h3>Staying signed in</h3>
            <p>
              Each sign-in gives the app a key that lasts 15 minutes and a
              refresh key that renews it. Each time the app renews its key (about
              every 15 minutes while you use it), we store a new record: a
              one-way hash of the new refresh key, when it was made, when it
              expires or was ended, your IP address and the user agent the app
              sends (today that names only the network library the app uses, and
              its version). Older records are marked as ended, not deleted, so
              they build up a history of the IP addresses you used trycheese
              from. They stay until your account is deleted for good. We also
              note when your account was last active.
            </p>
            <p>
              If the app has an install ID (see <a href="#usage">below</a>),
              signing in links that install to your account. It stays linked
              after you sign out, until your account is deleted for good or
              another account signs in on that phone.
            </p>
            <p>
              <em>Why:</em> to keep you signed in, and to let you sign out on
              every device at once.
            </p>

            <h3>Your profile</h3>
            <ul>
              <li>
                Username: 3 to 24 characters, unique. You can change it twice
                every 14 days. To enforce that, we keep a record of each username
                you give up and when, linked to your account.
              </li>
              <li>Display name (up to 40 characters) and bio (up to 160).</li>
              <li>A profile photo, if you set one.</li>
            </ul>
            <p>
              Other people see your username, display name and profile photo
              next to your posts. Your email address and bio are seen only by you
              and the trycheese team. Anyone can check whether a username is
              taken.
            </p>
            <p>
              Your profile photo comes from your phone&rsquo;s photo picker,
              which needs no Photos permission. The app shrinks it to at most
              1600 pixels a side. Our server crops it to a 512 by 512 square,
              strips all metadata and deletes the upload. Setting a new photo or
              removing it deletes the old file.
            </p>
            <p>
              If your photo came from Google, other people&rsquo;s phones load it
              straight from Google, and <strong>Remove photo</strong> in the app
              doesn&rsquo;t remove it yet. Email us and we&rsquo;ll remove it.
            </p>

            <h3>Community posts</h3>
            <p>When you share a photo to Community, we receive:</p>
            <ul>
              <li>the photo: the app&rsquo;s own developed copy, as a JPEG or PNG up to 15 MB</li>
              <li>a caption, if you add one (up to 300 characters)</li>
              <li>the name of the look</li>
              <li>
                your recipe, if the photo used one and you leave Include recipe
                on. A recipe carries its settings plus the name and notes you
                gave it.
              </li>
            </ul>
            <p>
              Our server re-encodes every photo, removes all metadata (location
              included) and keeps two JPEGs: one up to 2048 pixels on the long
              side and a 640-pixel thumbnail. Once that&rsquo;s done, the
              original upload is deleted. An upload that never becomes a post or
              profile photo (it couldn&rsquo;t be processed, or you didn&rsquo;t
              finish) isn&rsquo;t deleted automatically yet: see{" "}
              <a href={`#${S.retention.id}`}>how long we keep things</a>. For
              each upload we also keep a short record: its storage name, file
              type, size and status.
            </p>
            <p>
              We also store each post&rsquo;s review status, its like and report
              counts, and when it was reviewed (and by which team member),
              approved or pinned.
            </p>
            <p>
              Approved posts show in Community to people signed in to trycheese.
              They see your username, display name and profile photo, and the
              post&rsquo;s caption, look name and time. If you include the
              recipe, their app receives all of it, including the name and notes
              you gave it. Their app also receives your account&rsquo;s ID, a random code
              with nothing about you in it.
            </p>
            <p>
              You can delete your own posts at any time, and that deletes their
              image files too.
            </p>
            <p>
              <em>Why:</em> to run Community, and to review posts before they
              show.
            </p>

            <h3>Shared photos have public web addresses</h3>
            <p>
              Post photos and profile photos are served from our CDN. Their web
              addresses are long and random, but anyone who has one can open the
              image without signing in.
            </p>
            <p>
              Our images are marked to be cached for up to a year, and deleting
              one doesn&rsquo;t clear the CDN. So after you delete a photo, its
              web address can keep working from CDN caches, and copies can stay
              in browser and phone caches, for up to a year.
            </p>

            <h3>Likes, reports and blocks</h3>
            <ul>
              <li>
                A like stores who liked which post, and when. Other people see
                only the count, never who liked.
              </li>
              <li>
                A report stores who reported which post, the reason (spam,
                nudity, harassment or something else) and an optional note of up
                to 500 characters. A report about someone&rsquo;s name, username
                or profile photo is stored as a report on the post you saw it on.
                Reporting the same post again keeps one report, with your first
                reason, and adds anything new to its note.
              </li>
              <li>A block stores who blocked whom.</li>
            </ul>

            <h3 id="usage">App usage and device info</h3>
            <p>
              On first launch the app makes a random install ID and keeps it on
              the phone. Each launch, it sends us that ID with the platform (iOS
              or Android), the app version, the OS version (on Android, the
              system&rsquo;s kernel version) and your language and region setting
              (for example en_IN). We note when we first and last saw the
              install, and when you finished onboarding.
            </p>
            <p>The app also sends a short list of events, in batches:</p>
            <ul>
              <li>the app opened</li>
              <li>
                onboarding started and finished, with whether camera and Photos
                access were allowed
              </li>
              <li>
                a photo taken, with the shooting mode and the look&rsquo;s name
                (which can be a name you gave a recipe)
              </li>
              <li>a recipe created</li>
              <li>the sign-in prompt shown after your free photos</li>
              <li>Community opened</li>
              <li>a post shared, with whether it had a recipe and a caption</li>
            </ul>
            <p>
              Our server records a few events of its own: signing up and signing
              in (with the method), a post created, an account deletion asked for
              (in the app or on this website) or cancelled, and an account
              deleted for good (with no account or install attached).
            </p>
            <p>
              This runs even when you&rsquo;re signed out. Once you sign in on a
              phone, that install stays linked to your account, even after you
              sign out, until your account is deleted for good or another
              account signs in on it. Events sent while you&rsquo;re signed in are linked to
              your account too; events sent while you&rsquo;re signed out are
              linked to the install. We don&rsquo;t store your IP address with
              them.
            </p>
            <p>
              <em>Why:</em> to count active installs, see where onboarding
              loses people and learn which features get used.
            </p>
            <p>
              There&rsquo;s no switch to turn this off yet. Uninstalling the app
              stops it. When your account is deleted for good, the events linked
              to it are deleted with it; the install record and events sent
              while you were signed out stay (see{" "}
              <a href={`#${S.delete.id}`}>deleting your account</a>).
            </p>

            <h3>Emails we send</h3>
            <p>
              We only email you about your account and your posts. We don&rsquo;t
              send marketing emails.
            </p>
            <ul>
              <li>your sign-in code</li>
              <li>a welcome when you make an account</li>
              <li>
                your post was approved, restored, pinned, not approved or removed,
                with the reason if there is one
              </li>
              <li>your account was put on hold (with the reason), or is back</li>
              <li>
                a code to confirm deleting your account, when you ask for one on{" "}
                <Link href="/delete-account">trycheese.app/delete-account</Link>
              </li>
              <li>
                your account is scheduled for deletion, with the date and how to
                cancel
              </li>
              <li>
                your account&rsquo;s deletion was cancelled because you signed in
                again
              </li>
              <li>
                your account is no longer on hold but is still scheduled for
                deletion
              </li>
              <li>a request to pick a new username, if the team reset yours</li>
              <li>
                your account was deleted for good, sent to the address it had
                (with Apple&rsquo;s steps, if we couldn&rsquo;t disconnect Sign in
                with Apple or Apple hasn&rsquo;t confirmed it yet)
              </li>
            </ul>
            <p>
              Post emails show the post&rsquo;s thumbnail, look name and caption.
              Images in our emails load from our CDN. Accounts without an email
              address get no emails.
            </p>

            <H2 s={S.dont} />
            <ul>
              <li>No ads.</li>
              <li>No tracking you across other companies&rsquo; apps or websites.</li>
              <li>We don&rsquo;t sell your data.</li>
              <li>
                No ad, analytics or crash-reporting SDKs of our own. On Android,
                Google ML Kit, which runs portrait mode, sends Google some
                diagnostics about itself (see{" "}
                <a href={`#${S.providers.id}`}>who handles data for us</a>).
              </li>
              <li>
                No location tracking. The camera&rsquo;s location goes only into
                the copy saved on your phone, and we strip all metadata, location
                included, from every photo we process.
              </li>
              <li>
                No reading your photo library on iPhone. trycheese can only add
                to it.
              </li>
            </ul>

            <H2 s={S.providers} />
            <ul>
              <li>
                <strong>Amazon Web Services (AWS).</strong> Our API and its
                database run on an AWS Lightsail server in{" "}
                <ToFill page="/privacy">the Lightsail region</ToFill>. Shared photos are stored in
                Amazon S3 in the Mumbai region (ap-south-1) and served worldwide
                through Amazon CloudFront.
              </li>
              <li>
                <strong>Resend</strong> sends our emails, over an encrypted
                connection.{" "}
                <ToFill page="/privacy">
                  the region of the Resend account and sending domain, and how
                  long Resend keeps sent-email logs
                </ToFill>
              </li>
              <li>
                <strong>Apple and Google</strong> run Sign in with Apple and
                Google sign-in, under their own privacy policies. Our server
                fetches their public keys to check sign-ins. For Apple, it also
                swaps the one-time code from your sign-in for a refresh token,
                and asks Apple to revoke that token when your account is deleted
                for good.
              </li>
              <li>
                <strong>Google ML Kit</strong> (Android only) finds the person in
                the frame for portrait mode. It runs on the phone, and your
                photos aren&rsquo;t sent to Google. ML Kit does send Google
                diagnostics and usage data about itself: your phone&rsquo;s
                maker, model and OS version, the app&rsquo;s name and version, a
                per-install identifier that isn&rsquo;t meant to identify you or
                your phone, performance and error information, and the size and
                format of what it processed. Google uses it to measure and
                improve ML Kit, under Google&rsquo;s terms. On iPhone, portrait
                mode uses Apple&rsquo;s Vision, which is part of iOS and also runs
                on the phone.
              </li>
              <li>
                <strong>Vercel</strong> hosts this website, trycheese.app, so it
                receives your IP address and the pages you ask for when you visit.
                When you use{" "}
                <Link href="/delete-account">delete your account</Link>, the email
                address and code you enter, and your IP address, pass through
                Vercel to our server.{" "}
                <ToFill page="/privacy">
                  the Vercel region the site runs in, and how long Vercel keeps
                  request logs
                </ToFill>
              </li>
            </ul>
            <p>
              AWS, Resend and Vercel handle data only to provide their service to
              us, under data processing terms that require them to protect it at
              least as well as this policy does.
            </p>
            <p>
              <ToFill page="/privacy">
                how data is protected when it leaves your country (CloudFront edge
                locations worldwide, Resend, Vercel, Apple and Google)
              </ToFill>
            </p>

            <H2 s={S.moderation} />
            <p>
              Every new post waits for review. The trycheese team approves it, or
              turns it down with a reason. Community shows only approved posts,
              and never posts by people you&rsquo;ve blocked, by accounts on hold
              or by accounts waiting to be deleted.
            </p>
            <p>
              The team can also remove or restore a post, and pin up to 3. To do
              this they see reports, with the reporter&rsquo;s username, and
              each author&rsquo;s email address. Reports are private: other
              people can&rsquo;t see who reported what.
            </p>
            <p>
              Blocking someone hides their posts from your feed. They aren&rsquo;t
              told.
            </p>
            <p>
              The team can put an account on hold, with a reason. That signs it
              out everywhere, stops it signing in and hides its posts, and we
              email the reason. The team can also reset a username, remove a
              profile photo, sign an account out on all devices, or delete it.
              A deletion by the team happens straight away, without the 30 days.
            </p>
            <p>
              A photo that&rsquo;s turned down or removed stays in storage, at
              its web address, until you delete the post or your account is
              deleted for good.
            </p>
            <p>
              When you share a post you give us a licence to show it in the
              community; the <Link href="/terms#your-content">Terms of Use</Link>{" "}
              explain it. We don&rsquo;t use your photos in ads or marketing
              without asking you first.
            </p>

            <H2 s={S.retention} />
            <table>
              <thead>
                <tr>
                  <th scope="col">What</th>
                  <th scope="col">How long</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>A sign-in or deletion code</td>
                  <td>
                    Works for 10 minutes. The record of it (email address and IP
                    address) is deleted 30 days after it&rsquo;s sent.
                  </td>
                </tr>
                <tr>
                  <td>The app&rsquo;s short-lived sign-in key</td>
                  <td>15 minutes</td>
                </tr>
                <tr>
                  <td>A session</td>
                  <td>90 days, renewed each time the app uses it</td>
                </tr>
                <tr>
                  <td>The original upload of a shared or profile photo</td>
                  <td>Deleted once it&rsquo;s processed (see below for uploads that never are)</td>
                </tr>
                <tr>
                  <td>Your account, profile and posts</td>
                  <td>
                    Until you delete them, or 30 days after you ask to delete your
                    account (they don&rsquo;t show in trycheese during those 30
                    days)
                  </td>
                </tr>
                <tr>
                  <td>A request to delete your account</td>
                  <td>
                    30 days, then the account is deleted (signing in again cancels
                    it)
                  </td>
                </tr>
                <tr>
                  <td>The Apple refresh token</td>
                  <td>
                    Until your account is deleted for good, then until Apple
                    confirms it&rsquo;s revoked (we stop trying after about 10 days)
                  </td>
                </tr>
                <tr>
                  <td>A username you&rsquo;ve stopped using</td>
                  <td>
                    Held for 30 days after a rename, or 365 days after the account
                    is deleted or the name is reset. The record of it stays after
                    that (see below).
                  </td>
                </tr>
              </tbody>
            </table>
            <p>
              Apart from code records, we don&rsquo;t run automatic clean-up yet,
              so some records stay longer than they need to:
            </p>
            <ul>
              <li>
                Session records (IP address, user agent and times, one for each
                key renewal, including expired, renewed and signed-out ones) stay
                until your account is deleted for good.
              </li>
              <li>
                An upload that never became a post or profile photo stays in
                storage as it was uploaded, metadata included, until your
                account is deleted for good.
              </li>
              <li>
                Records of usernames you&rsquo;ve given up, and when, stay until
                someone takes that name. While you have an account they&rsquo;re
                linked to it; once it&rsquo;s deleted for good, they aren&rsquo;t.
              </li>
              <li>
                Usage events linked to your account stay until your account is
                deleted for good. Install records, events sent while signed out
                and the short deletion records described{" "}
                <a href={`#${S.delete.id}`}>below</a> have no time limit yet.
              </li>
              <li>
                Our server logs don&rsquo;t record email addresses or codes. Our
                email provider keeps its own sending logs (see{" "}
                <a href={`#${S.providers.id}`}>who handles data for us</a>).
              </li>
            </ul>
            <p>
              <ToFill page="/privacy">
                intended retention periods for installs, events, session records,
                unused uploads, old username records and deletion records, and whether we keep backups and server logs, and
                for how long (a deleted account can survive in a backup until it
                expires)
              </ToFill>
            </p>

            <H2 s={S.delete} />
            <p>
              In the app, open <strong>Settings</strong>, tap your name under{" "}
              <strong>Account</strong>, then tap <strong>Delete account</strong>,
              and confirm. Without the app, use{" "}
              <Link href="/delete-account">delete your account</Link>: enter the
              email address on your account and confirm with the code we send
              you. Your account is switched off straight away: every session
              ends, so all your phones are signed out, and your profile, posts
              and likes no longer show in trycheese. 30 days later it&rsquo;s
              deleted for good. Signing in again before then, the same way you
              signed in before (email, Apple or Google), cancels the deletion and
              brings everything back. If your account is on hold, signing in
              won&rsquo;t work: write to {mail} instead. We email you when the deletion is
              scheduled and if it&rsquo;s cancelled. Can&rsquo;t use either and
              your account has no email address? Email {mail} and tell us your
              username.{" "}
              <ToFill page="/privacy">
                how we check an emailed deletion request comes from the
                account&rsquo;s owner
              </ToFill>
            </p>
            <p>
              At once: every session ends, so all your phones are signed out.
              The session records go with everything else after 30 days.
            </p>
            <p>What&rsquo;s deleted after 30 days:</p>
            <ul>
              <li>
                your account, profile, profile photo and your Apple or Google
                sign-in links (your username is held, see below)
              </li>
              <li>your posts and their image files, with their likes and reports</li>
              <li>uploads that never became a post or profile photo</li>
              <li>
                the likes you gave, the reports you filed and blocks in both
                directions
              </li>
              <li>records of sign-in and deletion codes sent to your email address</li>
              <li>
                usage events linked to your account: the ones the app sent while
                you were signed in, and the ones our server recorded for your
                account
              </li>
              <li>
                your Apple refresh token, once Apple confirms it&rsquo;s revoked
                (see below)
              </li>
            </ul>
            <p>What&rsquo;s kept:</p>
            <ul>
              <li>
                a short record that an account was deleted: how it signed up,
                when it was made and when it was deleted. No email, name or
                username.
              </li>
              <li>
                your install record, which is no longer linked to your account,
                and usage events the app sent while you were signed out, which
                never were. Both are still linked to your phone&rsquo;s install
                ID, which the app keeps using, so they&rsquo;re unlinked, not
                anonymous.
              </li>
              <li>
                your username, held for 365 days so nobody can take it straight
                away, and records of usernames you gave up earlier. None of them
                are linked to you.
              </li>
              <li>an &ldquo;account deleted&rdquo; event with no account or install attached</li>
              <li>
                until Apple confirms the revoke: your Apple account ID and the
                encrypted refresh token, and nothing else about you
              </li>
            </ul>
            <p>
              Copies of shared photos can also linger in caches for up to a year,
              as described above, and in any backups. Photos, recipes and
              settings on your phone aren&rsquo;t touched. When the account is
              deleted for good, we send a confirmation to the email address it
              had.
            </p>
            <h3>Apple and Google sign-in</h3>
            <p>
              If you signed in with Apple, when your account is deleted for good,
              we also ask Apple to revoke trycheese&rsquo;s Sign in with Apple
              access, using the refresh token described above. If Apple
              doesn&rsquo;t confirm straight away, our server keeps trying for
              about 10 days, and the email confirming the deletion includes
              Apple&rsquo;s steps in case it never does. If we have no token to do it with, the app shows
              Apple&rsquo;s steps when you ask to delete your account, and the
              emails about the deletion include them. If we never got a token
              from Apple for your sign-in, or Apple never confirms, you can{" "}
              <a href="https://support.apple.com/en-us/102571">
                stop using Sign in with Apple with trycheese
              </a>{" "}
              yourself, in your Apple Account settings.
            </p>
            <p>
              Deleting your account doesn&rsquo;t disconnect trycheese from your
              Google Account. Remove it yourself under{" "}
              <a href="https://myaccount.google.com/connections">
                Your connections to third-party apps &amp; services
              </a>{" "}
              in your Google Account.
            </p>

            <H2 s={S.children} />
            <p>
              trycheese doesn&rsquo;t ask for your age or date of birth, and has
              no age check. Signing in asks only for an email address, or Apple or
              Google.
            </p>
            <p>
              <ToFill page="/privacy">
                the minimum age for using the app or having an account, and how
                children&rsquo;s data is handled
              </ToFill>{" "}
              (see the <Link href="/terms">Terms of Use</Link>)
            </p>

            <H2 s={S.security} />
            <ul>
              <li>
                The app talks to our API over HTTPS, and our emails go out over
                encrypted connections.
              </li>
              <li>
                The API and database accept connections only from the server
                itself. The outside world reaches the API through an HTTPS proxy.
              </li>
              <li>
                Sign-in codes and refresh keys are stored only as one-way hashes.
                If an old refresh key is ever reused, we end that session.
              </li>
              <li>
                Apple refresh tokens are stored encrypted, never in plain text.
              </li>
              <li>
                On your phone, the refresh key is kept in the iPhone Keychain
                (this device only) or Android&rsquo;s encrypted storage. The
                short-lived key stays in memory.
              </li>
              <li>Sign-in, uploads, posts and reports are rate-limited.</li>
              <li>
                An account that&rsquo;s on hold or waiting to be deleted loses
                access on its next request.
              </li>
            </ul>
            <p>
              Think someone else got into your account? Open{" "}
              <strong>Settings</strong>, tap your name under{" "}
              <strong>Account</strong>, then tap{" "}
              <strong>Sign out on all devices</strong>, and email us.
            </p>

            <H2 s={S.rights} />
            <p>In the app you can:</p>
            <ul>
              <li>keep Add location off (it&rsquo;s off by default)</li>
              <li>
                edit your username, display name, bio and profile photo, or
                remove a photo you uploaded (to remove a photo from Google, email
                us)
              </li>
              <li>delete any of your posts</li>
              <li>block people</li>
              <li>sign out, or sign out on all devices</li>
              <li>
                delete your account, in the app or on{" "}
                <Link href="/delete-account">our website</Link>
              </li>
            </ul>
            <p>
              Usage data has no switch yet. Uninstalling the app stops it, and
              deleting your account deletes the events linked to it, as
              described <a href={`#${S.delete.id}`}>above</a>. Asked for a code but never
              made an account? Its record is deleted 30 days after it&rsquo;s
              sent, or sooner if you email us from that address.
            </p>
            <p>
              Depending on where you live, you may have rights to access, correct
              or delete your data, or to withdraw your consent. To ask, email{" "}
              {mail}.{" "}
              <ToFill page="/privacy">
                governing law and jurisdiction, which privacy laws apply (for
                example India&rsquo;s DPDP Act, GDPR or UK GDPR, CCPA), and the
                legal basis for each purpose above
              </ToFill>
            </p>

            <H2 s={S.website} />
            <p>
              trycheese.app has no analytics or tracking scripts and no sign-up.
              Its one form is{" "}
              <Link href="/delete-account">delete your account</Link>: the email
              address and code you enter, and your IP address, pass through our
              website host (<a href={`#${S.providers.id}`}>Vercel</a>) to our
              server to check the request and limit abuse.
              We store the email address and IP address with the code record,
              and delete that record 30 days after the code is sent. Codes are
              stored only as a hash and work for 10 minutes.
            </p>
            <p>
              For help, see <Link href="/support">support</Link>.
            </p>
            <p>
              <ToFill page="/privacy">
                cookies on trycheese.app: the site has no analytics packages, but
                whether Vercel, our host, sets any cookies is unknown
              </ToFill>
            </p>

            <H2 s={S.changes} />
            <p>
              When this policy changes, we&rsquo;ll update this page and the date
              at the top.{" "}
              <ToFill page="/privacy">
                effective date and version of this policy, the app version it
                covers, and how people will be told about changes
              </ToFill>
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
