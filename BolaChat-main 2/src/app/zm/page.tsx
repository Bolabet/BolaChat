import type { Metadata } from "next";
import { zm } from "@/config/markets/zm";
import { MarketPage } from "@/components/MarketPage";

export const metadata: Metadata = {
  title: zm.seo.title,
  description: zm.seo.description,
  alternates: {
    canonical: zm.seo.canonicalUrl,
  },
  openGraph: {
    title: zm.seo.title,
    description: zm.seo.description,
    url: zm.seo.canonicalUrl,
    locale: zm.seo.ogLocale,
    images: [zm.seo.ogImage],
    siteName: "BolaChat",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: zm.seo.title,
    description: zm.seo.description,
    images: [zm.seo.ogImage],
  },
};

export default function Page() {
  return <MarketPage market={zm} />;
}
