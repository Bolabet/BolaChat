import Link from "next/link";
import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BolaWordmark } from "@/components/ui/BolaWordmark";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";

export function Header({ market }: { market: MarketConfig }) {
  const whatsAppUrl = getDefaultWhatsAppUrl(market.whatsapp);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href={`/${market.marketCode}`} aria-label="BolaChat home">
          <BolaWordmark className="text-lg sm:text-xl" />
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary">
          <a
            href="#how"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            How it works
          </a>
          <a
            href="#sports"
            className="text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            Sports
          </a>
        </nav>

        <Button
          href={whatsAppUrl}
          variant="whatsapp"
          size="md"
          icon={<WhatsAppIcon className="h-4 w-4" />}
          className="text-xs sm:text-sm"
        >
          <span className="hidden sm:inline">Chat on WhatsApp</span>
          <span className="sm:hidden">WhatsApp</span>
        </Button>
      </Container>
    </header>
  );
}
