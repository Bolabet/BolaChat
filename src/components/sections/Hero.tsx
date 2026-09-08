import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SportArt } from "@/components/ui/SportArt";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

export function Hero({ market }: { market: MarketConfig }) {
  const whatsAppUrl = getDefaultWhatsAppUrl(market.whatsapp);

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-accent">
            Your AI sports bookie
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Stats, answers &amp; plays - {" "}
            <span className="text-accent">all in WhatsApp.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Ask anything about your teams and matches, get the real numbers,
            and place your play. No new app. Right where you already chat.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsAppUrl}
              size="lg"
              icon={<WhatsAppIcon className="h-5 w-5" />}
            >
              {market.ctaLabels.primary}
            </Button>
            <Button href="#how" variant="secondary" size="lg">
              {market.ctaLabels.secondary}
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge>
              <strong className="text-foreground">0</strong>&nbsp;downloads
              needed
            </Badge>
            <Badge>
              <strong className="text-foreground">24/7</strong>&nbsp;instant
              replies
            </Badge>
          </div>
        </div>

        <SportArt
          variant="hero"
          label="BolaChat - sports betting inside WhatsApp"
          className="aspect-[4/3] w-full lg:aspect-square"
        />
      </Container>
    </section>
  );
}
