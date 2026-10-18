import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs, PostCard } from "@/components/blog-ui";
import { StoreBadges } from "@/components/store-badges";
import { allPosts, postWithContext } from "@/lib/blog/data";
import { formatDate, topicName } from "@/lib/blog/posts";
import { JsonLd, breadcrumbJsonLd, postJsonLd } from "@/lib/jsonld";
import { OG_IMAGE, absoluteUrl } from "@/lib/site";

export async function generateStaticParams() {
  return (await allPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const data = await postWithContext((await params).slug);
  if (!data) return {};
  const { post } = data;
  return {
    title: `${post.title} | trycheese`,
    description: post.description,
    keywords: [post.keyword, ...post.tags].filter(Boolean),
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: absoluteUrl(`/blog/${post.slug}`),
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const data = await postWithContext((await params).slug);
  if (!data) notFound();
  const { post, html, headings, related, newer, older } = data;
  const topic = topicName(post.topic);

  return (
    <article className="px-5 pt-10 sm:px-8 lg:px-14">
      <JsonLd data={postJsonLd(post)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/blog" },
          { name: topic, path: `/blog/topic/${post.topic}` },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Journal", href: "/blog" },
          { name: topic, href: `/blog/topic/${post.topic}` },
          { name: post.title },
        ]}
      />

      <header className="mt-8 max-w-4xl">
        <h1 className="display text-[clamp(2.5rem,6vw,4.75rem)]">{post.title}</h1>
        <p className="mt-6 max-w-2xl text-[19px] leading-relaxed text-paper/80">{post.description}</p>
        <p className="rebate mt-6 text-grain">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.updated && post.updated !== post.date && (
            <> · Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>
          )}
          {" · "}
          {post.readingMinutes} min read · <Link className="hover:text-paper" href={`/blog/topic/${post.topic}`}>{topic}</Link>
        </p>
      </header>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <div className="prose-tc" dangerouslySetInnerHTML={{ __html: html }} />

          {post.faq.length > 0 && (
            <section aria-labelledby="faq" className="prose-tc mt-14">
              <h2 id="faq">Questions people ask</h2>
              {post.faq.map((f) => (
                <div key={f.q}>
                  <h3>{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </section>
          )}

          {post.sources.length > 0 && (
            <section aria-labelledby="sources" className="mt-14 border-t border-line pt-8">
              <h2 id="sources" className="text-[17px] font-semibold">Sources</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-[15px] text-paper/70">
                {post.sources.map((s) => (
                  <li key={s.url}>
                    <a className="underline decoration-paper/30 hover:text-paper" href={s.url} target="_blank" rel="noopener">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          )}

          <aside className="puff mt-14 rounded-[22px] p-7 text-darkroom sm:p-9">
            <p className="display text-[clamp(1.6rem,3vw,2.25rem)]">
              Film looks, baked in at the shutter.
            </p>
            <p className="mt-3 max-w-lg text-[16px] leading-relaxed text-darkroom/80">
              trycheese is a film camera for iPhone and Android: real grain, red
              halation and no live filter preview.{" "}
              <Link className="underline decoration-darkroom/40" href="/#looks">See the looks</Link> or read{" "}
              <Link className="underline decoration-darkroom/40" href="/#in-the-moment">why there&rsquo;s no preview</Link>.
            </p>
            <div className="mt-6">
              <StoreBadges tone="cheese" />
            </div>
          </aside>
        </div>

        {headings.length > 1 && (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-24">
              <p className="rebate text-grain">On this page</p>
              <ol className="mt-4 space-y-2.5 text-[14px] text-paper/70">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a className="hover:text-paper" href={`#${h.id}`}>{h.text}</a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-24">
          <h2 id="related" className="display text-[clamp(2rem,4vw,3rem)]">
            Keep <span className="accent">reading.</span>
          </h2>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}

      {(newer || older) && (
        <nav aria-label="More posts" className="mt-12 grid gap-3 border-t border-line pt-8 text-[15px] sm:grid-cols-2">
          {older ? (
            <Link href={`/blog/${older.slug}`} className="text-paper/75 hover:text-paper">
              <span className="rebate block text-grain">Older</span>
              {older.title}
            </Link>
          ) : <span />}
          {newer && (
            <Link href={`/blog/${newer.slug}`} className="text-paper/75 hover:text-paper sm:text-right">
              <span className="rebate block text-grain">Newer</span>
              {newer.title}
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
