import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections";

/** Chrome for the standalone pages (privacy, terms, community guidelines, support, delete account). The group adds nothing to the URL. */
export default function InfoLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
