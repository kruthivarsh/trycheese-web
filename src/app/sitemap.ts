import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/blog/data";
import { topics } from "@/lib/blog/topics";
import { absoluteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await allPosts();
  const newest = posts[0]?.updated ?? posts[0]?.date;
  const latestFor = (topic: string) => {
    const p = posts.find((x) => x.topic === topic);
    return p ? p.updated ?? p.date : newest;
  };

  return [
    { url: absoluteUrl("/"), lastModified: newest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/blog"), lastModified: newest, changeFrequency: "daily", priority: 0.9 },
    ...topics.map((t) => ({
      url: absoluteUrl(`/blog/topic/${t.slug}`),
      lastModified: latestFor(t.slug),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
