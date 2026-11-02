import Image from "next/image";
import type { MarketConfig } from "@/types/market";
import type { PowerPlay } from "@/types/powerplays";
import { getLivePowerPlays, getPowerPlays } from "@/content/powerplays";
import { ChannelButtons } from "@/components/ui/ChannelButtons";
import { channelNames } from "@/lib/channels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PowerPlaysGrid } from "@/components/sections/PowerPlaysGrid";

/**
 * This week's PowerPlays come from `src/content/powerplays/<code>.json`,
 * edited through /admin. With no PowerPlays listed, the market's example
 * card (config `copy.powerPlayExample`) is shown instead, labelled "Example".
 * The same happens once every listed PowerPlay has passed its end date.
 */
export function PowerPlays({ market }: { market: MarketConfig }) {
  const { backgroundImage } = getPowerPlays(market.marketCode);
  const { fixture, kickoff, odds, minStake, bonusPercent } = market.copy.powerPlayExample;
  const example: PowerPlay = {
    id: "example",
    title: fixture,
    kickoff,
    odds: [{ label: "Odds", value: odds }],
    minStake,
    bonusPercent,
  };
  // Expired PowerPlays are dropped here at build time, and in the browser
  // by PowerPlaysGrid for any that end after the build.
  const live = getLivePowerPlays(market.marketCode);

  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-background py-16 sm:py-20">
      {/* Stadium backdrop with a dark overlay so copy stays legible. */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/85 to-background/70"
      />
      <PowerPlaysGrid
        items={live}
        example={example}
        intro={
          <div>
            <SectionHeading
              eyebrow="New this week"
              heading={
                <>
                  Powerplays. <br className="hidden sm:block" />
                  Our picks, boosted for you.
                </>
              }
              body={
                <>
                  Every week BolaChat hand-picks a handful of matches and
                  parlays. Play any of them with a qualifying stake and we drop
                  a bonus straight into your real balance - win or lose.
                </>
              }
            />

            <div className="mt-6 flex flex-col items-start gap-2">
              <ChannelButtons
                market={market}
                label={market.ctaLabels.powerPlays}
                intent="powerPlays"
              />
              <p className="text-xs text-muted">
                {market.telegram
                ? `Opens ${channelNames(market, "or")}, ready to chat.`
                : "Opens WhatsApp with your question prefilled."}
              </p>
              <a
                href={market.legal.powerPlaysTermsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-muted underline decoration-border underline-offset-4 transition-colors hover:text-foreground"
              >
                Powerplay terms and conditions
              </a>
            </div>
          </div>
        }
      />
    </section>
  );
}
