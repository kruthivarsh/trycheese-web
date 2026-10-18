import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import {
  Camera,
  Footer,
  InTheMoment,
  JournalTeaser,
  LookMarquee,
  Looks,
  Manifesto,
  Numbers,
  Platforms,
  TheApp,
} from "@/components/sections";
import { JsonLd, siteJsonLd } from "@/lib/jsonld";

export default function Home() {
  return (
    <div id="top">
      <JsonLd data={siteJsonLd()} />
      <Nav />
      <main>
        <Hero />
        <LookMarquee />
        <Manifesto />
        <Looks />
        <InTheMoment />
        <TheApp />
        <Numbers />
        <Camera />
        <Platforms />
        <JournalTeaser />
      </main>
      <Footer />
    </div>
  );
}
