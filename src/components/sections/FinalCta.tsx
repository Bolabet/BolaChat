import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { ChannelButtons } from "@/components/ui/ChannelButtons";
import { channelNames } from "@/lib/channels";

export function FinalCta({ market }: { market: MarketConfig }) {
  return (
    <section className="border-t border-border py-16 sm:py-24">
      <Container className="text-center">
        <h2 className="font-heading mx-auto max-w-xl text-3xl leading-tight sm:text-4xl">
          Ready to play where you already chat?
        </h2>
        <p className="font-heading mt-3 text-sm text-foreground/70 sm:text-base">
          Prove <span className="text-accent">you</span> know the game.
        </p>
        <p className="mx-auto mt-4 max-w-md text-base text-muted">
          Open {channelNames(market, "or")}, say hi to BolaChat, and ask your
          first question.
          It&apos;s that simple.
        </p>
        <div className="mt-8 flex justify-center">
          <ChannelButtons market={market} label={market.ctaLabels.finalCta} />
        </div>
      </Container>
    </section>
  );
}
