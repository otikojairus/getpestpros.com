import type { Metadata } from "next";
import { Figtree, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { StickyCallBar } from "@/components/CTA";
import { IMAGES } from "@/lib/images";
import { siteName, siteTagline, siteUrl } from "@/lib/pseo";
import "./globals.css";

const heading = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

const body = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Licensed Help Across Canada`,
    template: "%s",
  },
  description: siteTagline,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: `${siteName} | Licensed Help Across Canada`,
    description: siteTagline,
    url: siteUrl,
    siteName,
    type: "website",
    images: [{ url: IMAGES.homeHero.src, width: 900, height: 600, alt: IMAGES.homeHero.alt }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <Header />
        {children}
        <Footer />
        <StickyCallBar />
      </body>
    </html>
  );
}
