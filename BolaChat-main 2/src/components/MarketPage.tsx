import type { MarketConfig } from "@/types/market";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PowerPlays } from "@/components/sections/PowerPlays";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyWhatsApp } from "@/components/sections/WhyWhatsApp";
import { SportsGrid } from "@/components/sections/SportsGrid";
import { FinalCta } from "@/components/sections/FinalCta";

/**
 * Every localised market route (/zm, /mw, /zw, ...) renders this exact
 * component tree. Only `market` changes. Add a new market by adding a
 * config file - never by duplicating this file.
 */
export function MarketPage({ market }: { market: MarketConfig }) {
  return (
    <>
      <Header market={market} />
      <main className="flex-1">
        <Hero market={market} />
        <PowerPlays market={market} />
        <HowItWorks />
        <WhyWhatsApp />
        <SportsGrid />
        <FinalCta market={market} />
      </main>
      <Footer market={market} />
    </>
  );
}
