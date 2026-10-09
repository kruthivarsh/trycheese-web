import { llmsFullTxt } from "@/lib/blog/feeds";

export async function GET() {
  return new Response(await llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
