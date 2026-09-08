import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { BolaWordmark } from "@/components/ui/BolaWordmark";
import { ResponsibleGamingBadge } from "@/components/ui/ResponsibleGamingBadge";

export function Footer({ market }: { market: MarketConfig }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <BolaWordmark className="text-lg" />
            <p className="mt-2 max-w-xs text-sm text-muted">
              Your sports copilot in WhatsApp - {market.countryName}.
            </p>
          </div>

          <nav aria-label="Legal" className="flex flex-col gap-2 text-sm">
            <a
              href={market.legal.termsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              Terms &amp; conditions
            </a>
            <a
              href={market.legal.privacyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              Privacy policy
            </a>
            <a
              href={market.legal.responsibleGamblingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted transition-colors hover:text-accent"
            >
              Responsible gambling
            </a>
          </nav>

          <div className="text-sm text-muted">
            <p className="font-semibold text-foreground">Support</p>
            <p className="mt-2">{market.support.phoneDisplay}</p>
            <p>{market.support.email}</p>
          </div>
        </div>

        <hr className="my-8 border-border" />

        {/* CI 2.4: the 18+ badge is a defined graphic asset, not just text -
            it must appear within the bottom portion of collateral. */}
        <ResponsibleGamingBadge productName="BolaChat" />

        <p className="mt-6 text-xs leading-relaxed text-muted">
          <strong className="text-foreground">18+. Play responsibly.</strong>{" "}
          BolaChat is for entertainment and informational purposes. Betting
          involves financial risk - only stake what you can afford to lose,
          and never chase losses. Availability and features may vary by
          region; please follow the laws that apply where you live. If
          gambling stops being fun, reach out to the{" "}
          {market.support.helplineName} ({market.support.helplineContact})
          or a local support service for help.
        </p>

        <p className="mt-4 text-xs text-muted">
          &copy; {year} BolaChat, part of the Bolabet family. All rights
          reserved.
        </p>
      </Container>
    </footer>
  );
}
