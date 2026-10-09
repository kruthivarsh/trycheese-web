import type { Post } from "@/lib/blog/posts";
import { topicName } from "@/lib/blog/posts";
import { SITE, absoluteUrl } from "@/lib/site";

const org = {
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: absoluteUrl("/icon.png"),
};

export const siteJsonLd = () => ({
  "@context": "https://schema.org",
  "@graph": [
    org,
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.description,
      publisher: { "@id": `${SITE.url}/#organization` },
      inLanguage: SITE.locale,
    },
  ],
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const postJsonLd = (post: Post) => ({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": `${absoluteUrl(`/blog/${post.slug}`)}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@id": `${SITE.url}/#organization` },
      publisher: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
      image: absoluteUrl("/opengraph-image.png"),
      articleSection: topicName(post.topic),
      keywords: [post.keyword, ...post.tags].filter(Boolean).join(", "),
      inLanguage: SITE.locale,
      citation: post.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
    },
    ...(post.faq.length
      ? [
          {
            "@type": "FAQPage",
            mainEntity: post.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : []),
    org,
  ],
});

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
