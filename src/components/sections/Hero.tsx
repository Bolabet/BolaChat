import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { SportArt } from "@/components/ui/SportArt";
import { BolaSlash } from "@/components/ui/BolaSlash";
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
          <h1 className="font-heading text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
            Stats, answers &amp; plays -{" "}
            <span className="text-accent">all in WhatsApp.</span>
          </h1>

          {/* CI 2.3: the slogan lockup - "YOU" always emphasised in Action Yellow. */}
          <p className="font-heading mt-3 text-base text-foreground/80 sm:text-lg">
            Prove <span className="text-accent">you</span> know the game.
          </p>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            Ask anything about your teams and matches, get the real numbers,
            and place your play. No new app. Right where you already chat.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              href={whatsAppUrl}
              variant="whatsapp"
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
              <strong className="text-accent">0</strong>&nbsp;downloads needed
            </Badge>
            <Badge>
              <strong className="text-accent">24/7</strong>&nbsp;instant
              replies
            </Badge>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full lg:aspect-square">
          <BolaSlash className="absolute -inset-x-4 top-6 h-10 opacity-90 sm:h-14" />
          <SportArt
            variant="hero"
            label="BolaChat - sports betting inside WhatsApp"
            className="absolute inset-0"
          />
        </div>
      </Container>
    </section>
  );
}
