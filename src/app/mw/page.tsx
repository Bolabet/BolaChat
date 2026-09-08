import type { Metadata } from "next";
import { mw } from "@/config/markets/mw";
import { MarketPage } from "@/components/MarketPage";

export const metadata: Metadata = {
  title: mw.seo.title,
  description: mw.seo.description,
  alternates: {
    canonical: mw.seo.canonicalUrl,
  },
  openGraph: {
    title: mw.seo.title,
    description: mw.seo.description,
    url: mw.seo.canonicalUrl,
    locale: mw.seo.ogLocale,
    images: [mw.seo.ogImage],
    siteName: "BolaChat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: mw.seo.title,
    description: mw.seo.description,
    images: [mw.seo.ogImage],
  },
};

export default function Page() {
  return <MarketPage market={mw} />;
}
