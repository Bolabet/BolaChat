import type { MarketConfig } from "@/types/market";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { PowerPlays } from "@/components/sections/PowerPlays";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { WhyMessaging } from "@/components/sections/WhyMessaging";
import { SportsGrid } from "@/components/sections/SportsGrid";
import { FinalCta } from "@/components/sections/FinalCta";
import { ComingSoonPage } from "@/components/ComingSoonPage";

/**
 * Every localised market route (/zm, /mw, /zw, ...) renders this exact
 * component tree. Only `market` changes (markets flagged `comingSoon` render
 * the coming-soon landing page instead). Add a new market by adding a
 * config file - never by duplicating this file.
 */
export function MarketPage({ market }: { market: MarketConfig }) {
  if (market.comingSoon) {
    return <ComingSoonPage market={market} />;
  }

  return (
    <>
      <Header market={market} />
      <main className="flex-1">
        <Hero market={market} />
        <PowerPlays market={market} />
        <HowItWorks />
        <WhyMessaging market={market} />
        <SportsGrid market={market} />
        <FinalCta market={market} />
      </main>
      <Footer market={market} />
    </>
  );
}
