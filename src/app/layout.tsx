import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://trycheese.app"),
  title: "trycheese — a film camera for iPhone and Android",
  description:
    "Real grain, red halation and filmic colour, baked in at the shutter. No live filter preview, no editing. Coming soon to the App Store and Google Play.",
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": [{ url: "/feed.xml", title: "trycheese journal" }] },
  },
  openGraph: { type: "website", siteName: "trycheese", url: "https://trycheese.app" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0C0C0B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrumentSans.variable}`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
