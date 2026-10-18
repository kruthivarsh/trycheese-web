export const SITE = {
  name: "trycheese",
  url: "https://trycheese.app",
  tagline: "A film camera for iPhone and Android",
  description:
    "Real grain, red halation and filmic colour, baked in at the shutter. No live filter preview, no editing. Coming soon to the App Store and Google Play.",
  locale: "en",
} as const;

/** Absolute URL for a site path, e.g. absoluteUrl("/blog") → https://trycheese.app/blog */
export const absoluteUrl = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

/** The brand share card (app/opengraph-image.png), for pages that set their own openGraph. */
export const OG_IMAGE = {
  url: "/opengraph-image.png",
  width: 1200,
  height: 630,
  alt: "The trycheese Bubbly Cheese icon beside the trycheese wordmark and the line say cheese, it's already film.",
} as const;
