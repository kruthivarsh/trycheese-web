// Topic clusters. Every post belongs to exactly one topic (its pillar hub);
// hubs link down to posts and posts link up to their hub.

export type Topic = {
  slug: string;
  name: string;
  /** One-line hub description, also used as the hub's meta description. */
  description: string;
  /** Terms that auto-link to this hub on first mention in a post. */
  terms: string[];
};

export const topics: Topic[] = [
  {
    slug: "film-looks",
    name: "Film looks",
    description:
      "How film stocks get their colour, and how film looks recreate negative, slide, instant and black-and-white character on a phone.",
    terms: ["film look", "film looks", "film emulation", "film simulation", "colour negative", "color negative", "slide film"],
  },
  {
    slug: "grain-and-halation",
    name: "Grain & halation",
    description:
      "Film grain, halation, bloom and filmic tone: what they are on real film and how they are rendered in digital photos.",
    terms: ["halation", "film grain", "grain", "bloom", "highlight roll-off"],
  },
  {
    slug: "phone-photography",
    name: "Phone photography",
    description:
      "Shooting better photos on a phone: computational photography, HDR, exposure, lenses and taking pictures that feel less clinical.",
    terms: ["phone photography", "smartphone photography", "computational photography", "HDR", "exposure compensation"],
  },
  {
    slug: "android-film-cameras",
    name: "Film cameras on Android",
    description:
      "Film camera apps and analog-style photography on Android phones: Pixel, Samsung and beyond.",
    terms: ["Android camera", "film camera app for Android", "Android film camera", "Pixel camera", "Samsung camera"],
  },
  {
    slug: "film-photography",
    name: "Film photography",
    description:
      "Analog photography culture and news: film stocks, prices, cameras and why people still shoot film.",
    terms: ["film photography", "analog photography", "35mm film", "film stock", "film camera"],
  },
];

export const topicBySlug = (slug: string) => topics.find((t) => t.slug === slug);
