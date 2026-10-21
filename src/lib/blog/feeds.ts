import { allPosts } from "@/lib/blog/data";
import { topicName } from "@/lib/blog/posts";
import { topics } from "@/lib/blog/topics";
import { PRIVACY_DRAFT, SITE, absoluteUrl } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** llms.txt (https://llmstxt.org): a curated map of the site for LLMs. */
export async function llmsTxt() {

  const posts = await allPosts();
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} is a film camera app for iPhone and Android. Film looks (colour, grain, halation, filmic tone) are applied at the moment of capture; there is no live filter preview and photos cannot be imported: it is a camera, not an editor. Coming soon to the App Store and Google Play; free at launch.`,
    "",
    "Key facts:",
    "- Platforms: iPhone (iOS) and Android, launching together.",
    "- No live filter preview: the viewfinder shows the scene; the look appears on the captured photo.",
    "- No importing of existing photos; no editing suite.",
    "- Free, with no subscription or ads. The first 5 photos work signed out; after that, and for Community, the app needs a free account (email code, Apple or Google). Photos stay on the device unless the user shares them to Community or picks one as a profile photo.",
    "",
    "## Product",
    `- [Home](${absoluteUrl("/")}): what ${SITE.name} is, its film looks and camera features`,
    `- [Film looks](${absoluteUrl("/#looks")}): the looks and how they are tuned`,
    `- [Why no live preview](${absoluteUrl("/#in-the-moment")}): the no-preview, no-import principles`,
    "",
    "## Help",
    `- [Support](${absoluteUrl("/support")}): answers about accounts, where photos are saved, sharing and review, reporting and blocking, sign-in codes and deleting an account; contact ${SITE.email}`,
    `- [Delete your account](${absoluteUrl("/delete-account")}): request account deletion without the app; the account is switched off at once and deleted for good after 30 days unless the person signs in again`,
    ...(PRIVACY_DRAFT
      ? []
      : [
          `- [Privacy policy](${absoluteUrl("/privacy")}): what the app and website collect, who handles it, how long it is kept and how to delete an account`,
          `- [Terms of Use](${absoluteUrl("/terms")}): the rules for using the app and website, the licence for photos shared to Community, moderation and account deletion`,
          `- [Community guidelines](${absoluteUrl("/community-guidelines")}): what can and can't be shared to Community, how review, reporting and blocking work, and what happens when the rules are broken`,
        ]),
    "",
    "## Journal topics",
    ...topics.map((t) => `- [${t.name}](${absoluteUrl(`/blog/topic/${t.slug}`)}): ${t.description}`),
    "",
    "## Journal posts",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.description}`),
    "",
    "## Optional",
    `- [Full text of every post](${absoluteUrl("/llms-full.txt")})`,
    `- [RSS feed](${absoluteUrl("/feed.xml")})`,
    `- [Sitemap](${absoluteUrl("/sitemap.xml")})`,
    "",
  ];
  return lines.join("\n");
}

/** llms-full.txt: the full markdown of every post, for LLM ingestion. */
export async function llmsFullTxt() {

  const posts = await allPosts();
  return [
    `# ${SITE.name} journal: full text`,
    "",
    `> Every post from ${absoluteUrl("/blog")}, newest first.`,
    "",
    ...posts.flatMap((p) => [
      "---",
      "",
      `## ${p.title}`,
      "",
      `URL: ${absoluteUrl(`/blog/${p.slug}`)}`,
      `Published: ${p.date}${p.updated ? ` · Updated: ${p.updated}` : ""}`,
      `Topic: ${topicName(p.topic)}`,
      "",
      p.markdown.trim(),
      "",
      ...(p.sources.length ? ["Sources:", ...p.sources.map((s) => `- ${s.title}: ${s.url}`), ""] : []),
    ]),
  ].join("\n");
}

/** RSS 2.0 feed of the journal. */
export async function rssXml() {

  const posts = await allPosts();
  const items = posts
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${absoluteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${absoluteUrl(`/blog/${p.slug}`)}</guid>
      <pubDate>${new Date(`${p.date}T08:00:00Z`).toUTCString()}</pubDate>
      <category>${esc(topicName(p.topic))}</category>
      <description>${esc(p.description)}</description>
    </item>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} journal</title>
    <link>${absoluteUrl("/blog")}</link>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>Film looks, grain and halation, phone photography and film cameras on iPhone and Android.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
}
