import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs, PostCard } from "@/components/blog-ui";
import { allPosts } from "@/lib/blog/data";
import { topics } from "@/lib/blog/topics";
import { JsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { OG_IMAGE, absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal: film looks, grain and phone photography | trycheese",
  description:
    "Notes on film looks, grain and halation, phone photography and film cameras on iPhone and Android, from the team building trycheese.",
  alternates: { canonical: "/blog", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { type: "website", url: absoluteUrl("/blog"), images: [OG_IMAGE] },
};

export default async function BlogIndex() {
  const posts = await allPosts();
  const [lead, ...rest] = posts;
  return (
    <div className="px-5 pt-10 sm:px-8 lg:px-14">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Journal", path: "/blog" }])} />
      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Journal" }]} />
      <h1 className="display mt-6 max-w-4xl text-[clamp(3rem,8vw,6rem)]">
        The <span className="accent">journal.</span>
      </h1>
      <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-paper/75">
        Film looks, grain and halation, phone photography and film cameras on
        iPhone and Android. New posts most days.
      </p>

      <nav aria-label="Topics" className="mt-10">
        <ul className="flex flex-wrap gap-2">
          {topics.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/blog/topic/${t.slug}`}
                className="block rounded-full border border-paper/15 px-4 py-2 text-[14px] text-paper/85 transition-colors hover:border-paper/40 hover:text-paper"
              >
                {t.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {posts.length === 0 ? (
        <p className="mt-16 text-paper/60">The first post is on its way.</p>
      ) : (
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {lead && (
            <div className="md:col-span-2 lg:col-span-3">
              <PostCard post={lead} large />
            </div>
          )}
          {rest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
