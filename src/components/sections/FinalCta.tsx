import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

export function FinalCta({ market }: { market: MarketConfig }) {
  const whatsAppUrl = getDefaultWhatsAppUrl(market.whatsapp);

  return (
    <section className="border-t border-border py-16 sm:py-24">
      <Container className="text-center">
        <h2 className="mx-auto max-w-xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          Ready to play where you already chat?
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          Open WhatsApp, say hi to BolaChat, and ask your first question.
          It&apos;s that simple.
        </p>
        <div className="mt-8 flex justify-center">
          <Button
            href={whatsAppUrl}
            size="lg"
            icon={<WhatsAppIcon className="h-5 w-5" />}
          >
            {market.ctaLabels.finalCta}
          </Button>
        </div>
      </Container>
    </section>
  );
}
