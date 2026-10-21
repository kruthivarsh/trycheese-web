export const SITE = {
  name: "trycheese",
  url: "https://trycheese.app",
  tagline: "A film camera for iPhone and Android",
  description:
    "Real grain, red halation and filmic colour, baked in at the shutter. No live filter preview, no editing. Coming soon to the App Store and Google Play.",
  locale: "en",
  /** The contact address the app and backend show (trycheese_be SUPPORT_EMAIL in src/modules/email/notices.ts). */
  email: "hello@trycheese.app",
  /** The sender of the app's emails, sign-in codes included (trycheese_be EMAIL_FROM). */
  emailFrom: "hello@trycheese.app",
} as const;

/** Last-updated dates of the hand-written pages: shown on each page and used by the sitemap. */
export const PAGE_UPDATED = {
  privacy: "2026-10-21",
  support: "2026-10-21",
  terms: "2026-10-21",
  communityGuidelines: "2026-10-21",
  deleteAccount: "2026-10-21",
} as const;

/**
 * True while /privacy, /terms or /community-guidelines still have [To fill in]
 * placeholders: those pages are noindex and left out of the sitemap and
 * llms.txt. Set it to false only once every placeholder is filled in; until
 * then the build fails (see ToFill).
 */
export const PRIVACY_DRAFT: boolean = true;

/** Absolute URL for a site path, e.g. absoluteUrl("/blog") → https://trycheese.app/blog */
export const absoluteUrl = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

/** The brand share card (app/opengraph-image.png), for pages that set their own openGraph. */
export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "The trycheese Bubbly Cheese icon beside the trycheese wordmark and the line say cheese, it's already film.",
} as const;
