import { Nav } from "@/components/nav";
import { Footer } from "@/components/sections";

export default function BlogLayout({ children }: LayoutProps<"/blog">) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}
