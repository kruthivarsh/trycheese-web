import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import {
  Camera,
  Footer,
  InTheMoment,
  JournalTeaser,
  Looks,
  Manifesto,
  Platforms,
} from "@/components/sections";
import { JsonLd, siteJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <div id="top">
      <JsonLd data={siteJsonLd()} />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Looks />
        <InTheMoment />
        <Camera />
        <Platforms />
        <JournalTeaser />
      </main>
      <Footer />
    </div>
  );
}
