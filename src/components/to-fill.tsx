import type { ReactNode } from "react";
import { PRIVACY_DRAFT } from "@/lib/site";

/**
 * An open item for the owner to fill in before launch, on /privacy, /terms and
 * /community-guidelines. Search for data-todo to find them all. Once
 * PRIVACY_DRAFT is false, any left over fails the build: those pages are fully
 * static, so `next build` renders every one of them.
 */
export function ToFill({ page, children }: { page: string; children: ReactNode }) {
  if (!PRIVACY_DRAFT) {
    throw new Error(`${page} still has a [To fill in] placeholder: fill it in, or set PRIVACY_DRAFT back to true.`);
  }
  return (
    <span data-todo className="box-decoration-clone rounded-md bg-alert/15 px-1.5 py-0.5 font-medium text-alert">
      [To fill in: {children}]
    </span>
  );
}
