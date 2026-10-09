import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, PostCard } from "@/components/blog-ui";
import { topicPosts } from "@/lib/blog/data";
import { topicBySlug, topics } from "@/lib/blog/topics";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/site";

export function generateStaticParams() {
  return topics.map((t) => ({ topic: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/topic/[topic]">): Promise<Metadata> {
  const topic = topicBySlug((await params).topic);
  if (!topic) return {};
  return {
    title: `${topic.name} — trycheese journal`,
    description: topic.description,
    alternates: { canonical: `/blog/topic/${topic.slug}` },
    openGraph: { type: "website", url: absoluteUrl(`/blog/topic/${topic.slug}`) },
  };
}

export default async function TopicPage({ params }: PageProps<"/blog/topic/[topic]">) {
  const topic = topicBySlug((await params).topic);
  if (!topic) notFound();
  const posts = await topicPosts(topic.slug);
  const others = topics.filter((t) => t.slug !== topic.slug);

  return (
    <div className="px-5 pt-10 sm:px-8 lg:px-14">
      <JsonLd
        data={{
          ...breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/blog" },
            { name: topic.name, path: `/blog/topic/${topic.slug}` },
          ]),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${topic.name} — trycheese journal`,
          description: topic.description,
          url: absoluteUrl(`/blog/topic/${topic.slug}`),
          hasPart: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absoluteUrl(`/blog/${p.slug}`) })),
        }}
      />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Journal", href: "/blog" }, { name: topic.name }]} />
      <h1 className="display mt-6 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)]">{topic.name}</h1>
      <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-paper/75">{topic.description}</p>

      {posts.length === 0 ? (
        <p className="mt-14 text-paper/60">No posts on this topic yet.</p>
      ) : (
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}

      <nav aria-label="Other topics" className="mt-20 border-t border-line pt-10">
        <h2 className="text-[19px] font-semibold">More from the journal</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {others.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/blog/topic/${t.slug}`}
                className="block rounded-full border border-paper/15 px-4 py-2 text-[14px] text-paper/85 hover:border-paper/40 hover:text-paper"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
