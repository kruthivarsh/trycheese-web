import { llmsTxt } from "@/lib/blog/feeds";

export async function GET() {
  return new Response(await llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
