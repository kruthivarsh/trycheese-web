import { rssXml } from "@/lib/blog/feeds";

export async function GET() {
  return new Response(await rssXml(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
