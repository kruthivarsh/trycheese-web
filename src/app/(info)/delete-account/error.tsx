"use client";

// Catches "Failed to find Server Action": a page loaded before a deploy posts
// to an action ID the new build doesn't have. A reload picks up the new build.

export default function DeleteAccountError() {
  return (
    <article className="px-5 pt-10 sm:px-8 lg:px-14">
      <header className="mt-8 max-w-4xl">
        <p className="rebate text-cheese">trycheese account</p>
        <h1 className="display mt-3 text-[clamp(2.5rem,6vw,4.75rem)]">
          delete your <span className="accent">account.</span>
        </h1>
      </header>
      <div role="alert" className="mt-14 max-w-[68ch] rounded-[22px] bg-surface p-6 sm:p-7">
        <p className="text-[17px] leading-relaxed text-paper">
          This page was updated while you were using it. Reload the page and
          start again.
        </p>
        <button
          type="button"
          onClick={() => location.reload()}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-cheese px-5 py-3 text-[15px] font-semibold text-darkroom"
        >
          Reload the page
        </button>
      </div>
    </article>
  );
}
