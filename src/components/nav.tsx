import Link from "next/link";

const links = [
  { href: "/#looks", label: "Looks" },
  { href: "/#in-the-moment", label: "In the moment" },
  { href: "/#camera", label: "Camera" },
  { href: "/blog", label: "Journal" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-30 bg-darkroom/80 backdrop-blur-md">
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8" aria-label="Main">
        <Link href="/" className="wordmark text-[26px] text-paper" aria-label="trycheese home">
          trycheese
        </Link>
        <ul className="hidden items-center gap-7 text-[15px] text-paper/75 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link className="transition-colors hover:text-paper" href={l.href}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="rounded-full border border-paper/15 px-3.5 py-1.5 text-[13px] text-paper/85">
          Coming soon · iOS &amp; Android
        </span>
      </nav>
    </header>
  );
}
