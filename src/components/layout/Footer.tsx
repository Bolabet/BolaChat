import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { BolaWordmark } from "@/components/ui/BolaWordmark";
import { BolabetProductLine } from "@/components/ui/BolabetMark";
import { ResponsibleGamingBadge } from "@/components/ui/ResponsibleGamingBadge";
import { channelNames } from "@/lib/channels";

/** "tel:" link target from a display number ("+260 97 744 9933" -> "+260977449933"). */
function telHref(display: string): string {
  return `tel:${display.replace(/[^\d+]/g, "")}`;
}

function SupportBlock({ market }: { market: MarketConfig }) {
  const { lines, email } = market.support;
  return (
    <section aria-labelledby="support-heading">
      <h2
        id="support-heading"
        className="font-heading text-base normal-case text-foreground"
      >
        Help line / Customer support
      </h2>

      <div className="mt-4 grid gap-x-10 gap-y-5 text-sm text-muted sm:grid-cols-2 lg:grid-cols-3">
        {lines.map((group) => (
          <div key={group.label}>
            <p className="font-semibold text-foreground">{group.label}</p>
            <ul className="mt-1.5 space-y-1">
              {group.numbers.map((number) => (
                <li key={number}>
                  <a
                    href={telHref(number)}
                    className="transition-colors hover:text-accent"
                  >
                    {number}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted">
        Email:{" "}
        <a
          href={`mailto:${email}`}
          className="text-foreground transition-colors hover:text-accent"
        >
          {email}
        </a>
      </p>
    </section>
  );
}

export function Footer({ market }: { market: MarketConfig }) {
  const year = new Date().getFullYear();

  // Coming-soon markets: the legal links and the responsible-gambling
  // helpline are still placeholders, so keep those out. Customer-care lines
  // are real, so they are shown.
  if (market.comingSoon) {
    return (
      <footer className="border-t border-border bg-background">
        <Container className="py-10 sm:py-12">
          <BolaWordmark className="text-lg" />
          <p className="mt-2 max-w-sm text-sm text-muted">
            Your AI sports bookie - coming soon to {market.countryName}.
          </p>
          <BolabetProductLine className="mt-5" />

          <hr className="my-8 border-border" />

          <SupportBlock market={market} />

          <hr className="my-8 border-border" />

          <ResponsibleGamingBadge productName="BolaChat" />

          <p className="mt-6 text-xs leading-relaxed text-muted">
            <strong className="text-foreground">18+. Play responsibly.</strong>{" "}
            BolaChat is for entertainment and informational purposes. Betting
            involves financial risk - only stake what you can afford to lose,
            and never chase losses. BolaChat is not yet available in{" "}
            {market.countryName}.
          </p>

          <p className="mt-4 text-xs text-muted">
            &copy; {year} BolaChat, part of the Bolabet family. All rights
            reserved.
          </p>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="border-t border-border bg-background">
      <Container className="py-10 sm:py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <BolaWordmark className="text-lg" />
            <p className="mt-2 max-w-xs text-sm text-muted">
              Your sports copilot in {channelNames(market)} - {market.countryName}.
            </p>
            <BolabetProductLine className="mt-5" />
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
        </div>

        <hr className="my-8 border-border" />

        <SupportBlock market={market} />

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
