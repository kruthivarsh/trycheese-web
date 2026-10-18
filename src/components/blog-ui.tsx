import Link from "next/link";
import type { Post } from "@/lib/blog/posts";
import { formatDate, topicName } from "@/lib/blog/posts";

export function PostCard({ post, large = false }: { post: Post; large?: boolean }) {
  return (
    <article className="group relative flex flex-col justify-between rounded-[22px] bg-surface p-6 transition-colors duration-300 hover:bg-raised sm:p-7">
      <div>
        <p className="rebate text-grain">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {topicName(post.topic)}
        </p>
        <h3 className={`display mt-3 ${large ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[clamp(1.35rem,2vw,1.75rem)]"}`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-paper/70">{post.description}</p>
      </div>
      <p className="rebate mt-6 text-paper/60">{post.readingMinutes} min read</p>
    </article>
  );
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="rebate text-grain">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.name} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden>›</span>}
            {it.href ? (
              <Link className="hover:text-paper" href={it.href}>{it.name}</Link>
            ) : (
              <span aria-current="page" className="text-paper/80">{it.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
