export const SITE = {
  name: "trycheese",
  url: "https://trycheese.app",
  tagline: "A film camera for iPhone and Android",
  description:
    "Real grain, red halation and filmic colour, baked in at the shutter. No live filter preview, no editing. Coming soon to the App Store and Google Play.",
  locale: "en",
  /**
   * Where people write to us, for everything: support, privacy, legal, grievances
   * and deletion requests. The same as trycheese_be SUPPORT_EMAIL and
   * EMAIL_REPLY_TO, and the app's feedback link. trycheese.app takes no mail, so
   * never an address there.
   */
  email: "hello@wtmf.ai",
  /**
   * The sender of the app's emails, sign-in codes included (trycheese_be
   * EMAIL_FROM). Only for telling people what to look for in their inbox: it
   * receives no mail, so never show it as an address to write to.
   */
  emailFrom: "hello@trycheese.app",
} as const;

/** The company that runs trycheese: the data controller and the party to the Terms of Use. */
export const COMPANY = {
  name: "Overads Private Limited",
  parent: "overads Inc.",
  address: "Plot No 56 & 57, Yellareddyguda, Srinagar Colony, Khairatabad, Hyderabad 500073, Telangana, India",
} as const;

/**
 * The Grievance Officer under India's IT Rules, 2021 and the DPDP Act, with the
 * IT Rules' timelines. No phone number is published.
 */
export const GRIEVANCE_OFFICER = {
  name: "Shreyak Singh",
  email: SITE.email,
  acknowledgeWithin: "24 hours",
  resolveWithin: "15 days",
  /** Complaints asking for something to be removed (IT Rules 3(2)(a)(i) proviso). */
  removalWithin: "72 hours",
} as const;

/** The version and effective date of /privacy and /terms (shown on both pages). */
export const LEGAL_VERSION = { version: "1.0", effective: "2026-10-21" } as const;

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
 * llms.txt. While it's false, any <ToFill> left on those pages fails the build.
 */
export const PRIVACY_DRAFT: boolean = false;

/** Absolute URL for a site path, e.g. absoluteUrl("/blog") → https://trycheese.app/blog */
export const absoluteUrl = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

/** The brand share card (app/opengraph-image.png), for pages that set their own openGraph. */
export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "The trycheese Bubbly Cheese icon beside the trycheese wordmark and the line say cheese, it's already film.",
} as const;
