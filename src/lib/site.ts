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
