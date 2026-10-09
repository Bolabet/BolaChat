import Image from "next/image";
import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { ChannelButtons } from "@/components/ui/ChannelButtons";
import { channelNames } from "@/lib/channels";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BolaSlash } from "@/components/ui/BolaSlash";

export function PowerPlays({ market }: { market: MarketConfig }) {
  const example = market.copy.powerPlayExample;
  const promo = market.copy.powerPlay;

  return (
    <section className="relative isolate overflow-hidden border-y border-border bg-background py-16 sm:py-20">
      {/* Stadium backdrop with a dark overlay so copy stays legible. */}
      <Image
        src="/images/sports/soccer-kick.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/85 to-background/70"
      />
      <Container className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
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
              promo ? (
                promo.mechanic
              ) : (
                <>
                  Every week BolaChat hand-picks a handful of matches and
                  parlays. Play any of them with a qualifying stake and we
                  drop a bonus straight into your real balance - win or lose.
                </>
              )
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

        <div className="relative overflow-hidden rounded-md border border-border bg-background-elevated-2/90 p-6 backdrop-blur-sm sm:p-8">
          <BolaSlash className="absolute -right-6 -top-6 h-16 w-16 opacity-90" />
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Powerplay{promo ? ` - ${promo.name}` : ""}
          </p>
          <p className="mt-1 text-xs text-muted">
            {promo ? promo.kickoff : `Example - ${example.kickoff}`}
          </p>

          {promo ? (
            <>
              <div className="mt-4 border-b border-border pb-4">
                <p className="text-xs text-muted">Ticket must include</p>
                <p className="font-heading mt-1 text-lg normal-case">
                  {promo.fixture}
                </p>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-4">
                {promo.terms.map((term) => (
                  <div key={term.label}>
                    <dt className="text-xs text-muted">{term.label}</dt>
                    <dd className="mt-0.5 text-base font-extrabold tabular-nums text-accent sm:text-lg">
                      {term.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <>
              <div className="mt-4 flex items-center justify-between gap-4 border-b border-border pb-4">
                <p className="font-heading text-lg normal-case">
                  {example.fixture}
                </p>
                <div className="text-right">
                  <p className="text-xs text-muted">{example.market}</p>
                  <p className="text-xl font-extrabold tabular-nums text-accent">
                    {example.odds}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted">
                Play{" "}
                <strong className="text-foreground">
                  <span className="tabular-nums">{example.minStake}</span> or
                  more
                </strong>{" "}
                and get{" "}
                <strong className="text-foreground">
                  {example.bonusPercent} back
                </strong>{" "}
                as real balance - win or lose.
              </p>
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
