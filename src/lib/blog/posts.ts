import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { topicBySlug, topics } from "@/lib/blog/topics";

const DIR = path.join(process.cwd(), "content", "blog");

export type Source = { title: string; url: string };
export type Faq = { q: string; a: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  topic: string;
  keyword: string;
  tags: string[];
  sources: Source[];
  faq: Faq[];
  markdown: string;
  readingMinutes: number;
};

export type Heading = { id: string; text: string };

// gray-matter parses unquoted YAML dates into Date objects; normalise to
// YYYY-MM-DD. Checked by tag, not `instanceof`: route handlers can run in a
// different realm where the YAML parser's Date is not this realm's Date.
const isoDay = (v: unknown) =>
  Object.prototype.toString.call(v) === "[object Date]"
    ? (v as Date).toISOString().slice(0, 10)
    : String(v).slice(0, 10);

const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = data.slug ?? file.replace(/^\d{4}-\d{2}-\d{2}-/, "").replace(/\.md$/, "");
  const words = content.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    title: data.title,
    description: data.description,
    date: isoDay(data.date),
    updated: data.updated ? isoDay(data.updated) : undefined,
    topic: data.topic,
    keyword: data.keyword ?? "",
    tags: data.tags ?? [],
    sources: data.sources ?? [],
    faq: data.faq ?? [],
    markdown: content,
    readingMinutes: Math.max(1, Math.round(words / 220)),
  };
}

/** All published posts, newest first. Drafts (`draft: true`) are skipped. */
export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => !matter(fs.readFileSync(path.join(DIR, f), "utf8")).data.draft)
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export const postsByTopic = (topic: string) => getPosts().filter((p) => p.topic === topic);

/** Related posts: same topic first, then shared tags, then newest. */
export function relatedPosts(post: Post, limit = 3): Post[] {
  return getPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      p,
      score:
        (p.topic === post.topic ? 3 : 0) +
        p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p);
}

/** Previous (older) and next (newer) posts for sequential links. */
export function neighbours(post: Post) {
  const all = getPosts();
  const i = all.findIndex((p) => p.slug === post.slug);
  return { newer: all[i - 1], older: all[i + 1] };
}

/**
 * Hub auto-linking: the first plain-text mention of a topic term in a
 * paragraph links to that topic's hub (once per post per hub, skipping the
 * post's own hub, headings, lists already linking, and existing links).
 */
function autoLink(markdown: string, ownTopic: string): string {
  const linked = new Set<string>([ownTopic]);
  return markdown
    .split("\n")
    .map((line) => {
      if (/^\s*(#|>|\||```|-\s*\[|!\[)/.test(line) || line.trim() === "") return line;
      for (const t of topics) {
        if (linked.has(t.slug)) continue;
        for (const term of [...t.terms].sort((a, b) => b.length - a.length)) {
          const re = new RegExp(`(^|[^\\[\\w/-])(${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})(?![^\\[]*\\])(?![\\w-])`, "i");
          const masked = line.replace(/\[[^\]]*\]\([^)]*\)/g, (m) => "\u0000".repeat(m.length));
          const m = re.exec(masked);
          if (m) {
            const start = m.index + m[1].length;
            const word = line.slice(start, start + m[2].length);
            line = `${line.slice(0, start)}[${word}](/blog/topic/${t.slug})${line.slice(start + m[2].length)}`;
            linked.add(t.slug);
            break;
          }
        }
      }
      return line;
    })
    .join("\n");
}

/** Markdown → HTML with stable heading ids for the table of contents. */
export function renderPost(post: Post): { html: string; headings: Heading[] } {
  const headings: Heading[] = [];
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = tokens.map((t) => ("text" in t ? t.text : "")).join("");
    const id = slugify(text);
    if (depth === 2) headings.push({ id, text });
    const inner = marked.Parser.parseInline(tokens);
    return `<h${depth} id="${id}"><a href="#${id}" class="heading-anchor">${inner}</a></h${depth}>`;
  };
  renderer.link = ({ href, title, tokens }) => {
    const inner = marked.Parser.parseInline(tokens);
    const external = /^https?:\/\//.test(href) && !href.startsWith("https://trycheese.app");
    const t = title ? ` title="${title}"` : "";
    return external
      ? `<a href="${href}"${t} target="_blank" rel="noopener">${inner}</a>`
      : `<a href="${href}"${t}>${inner}</a>`;
  };
  const html = marked.parse(autoLink(post.markdown, post.topic), {
    renderer,
    async: false,
    gfm: true,
  }) as string;
  return { html, headings };
}

export const topicName = (slug: string) => topicBySlug(slug)?.name ?? slug;

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
