import type { Metadata } from "next";
import Link from "next/link";
import { markets, marketCodes } from "@/config/markets";
import { Container } from "@/components/ui/Container";
import { BolaWordmark } from "@/components/ui/BolaWordmark";

export const metadata: Metadata = {
  title: "BolaChat - choose your country",
  description:
    "BolaChat is live in Zambia, with Zimbabwe and Malawi coming soon. Choose your country to get started.",
};

/**
 * Fallback landing page for visitors who land on the bare domain instead of
 * a market path. Cloudflare geo-routing will eventually send most visitors
 * straight to /zm, /mw or /zw - this page just needs to exist as a sane
 * default for direct/root traffic and crawlers. Mirrors the /select-region
 * pattern already used on the ChatBet geo-redirect project.
 */
export default function RootPage() {
  return (
    <main className="flex flex-1 items-center justify-center py-24">
      <Container className="max-w-lg text-center">
        <BolaWordmark className="text-lg" />
        <h1 className="font-heading mt-4 text-2xl sm:text-3xl">
          Choose your country
        </h1>
        <p className="mt-3 text-sm text-muted">
          Sports stats, answers &amp; plays, right inside WhatsApp.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          {marketCodes.map((code) => {
            const market = markets[code];
            return (
              <Link
                key={code}
                href={`/${code}`}
                className="rounded-md border border-border bg-background-elevated px-6 py-3.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
              >
                {market.countryName}
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
