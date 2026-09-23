import type { Metadata } from "next";
import { zw } from "@/config/markets/zw";
import { MarketPage } from "@/components/MarketPage";

export const metadata: Metadata = {
  title: zw.seo.title,
  description: zw.seo.description,
  alternates: {
    canonical: zw.seo.canonicalUrl,
  },
  openGraph: {
    title: zw.seo.title,
    description: zw.seo.description,
    url: zw.seo.canonicalUrl,
    locale: zw.seo.ogLocale,
    images: [zw.seo.ogImage],
    siteName: "BolaChat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: zw.seo.title,
    description: zw.seo.description,
    images: [zw.seo.ogImage],
  },
};

export default function Page() {
  return <MarketPage market={zw} />;
}
