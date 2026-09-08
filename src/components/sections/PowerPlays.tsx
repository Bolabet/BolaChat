import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getPowerPlaysWhatsAppUrl } from "@/lib/whatsapp";

export function PowerPlays({ market }: { market: MarketConfig }) {
  const whatsAppUrl = getPowerPlaysWhatsAppUrl(market.whatsapp);
  const example = market.copy.powerPlayExample;

  return (
    <section className="border-y border-border bg-background-elevated py-16 sm:py-20">
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
              <>
                Every week BolaChat hand-picks a handful of matches and
                parlays. Play any of them with a qualifying stake and we drop
                a bonus straight into your real balance - win or lose.
              </>
            }
          />

          <div className="mt-6 flex flex-col items-start gap-2">
            <Button href={whatsAppUrl} size="lg">
              {market.ctaLabels.powerPlays}
            </Button>
            <p className="text-xs text-muted">
              Opens WhatsApp with your question prefilled.
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

        <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted">
            Powerplay
          </p>
          <p className="mt-1 text-xs text-muted">
            Example - {example.kickoff}
          </p>

          <div className="mt-4 flex items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-lg font-bold">{example.fixture}</p>
            <div className="text-right">
              <p className="text-xs text-muted">{example.market}</p>
              <p className="text-xl font-extrabold text-accent">
                {example.odds}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-muted">
            Play{" "}
            <strong className="text-foreground">
              {example.minStake} or more
            </strong>{" "}
            and get{" "}
            <strong className="text-foreground">
              {example.bonusPercent} back
            </strong>{" "}
            as real balance - win or lose.
          </p>
        </div>
      </Container>
    </section>
  );
}
