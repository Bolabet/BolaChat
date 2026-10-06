import Link from "next/link";
import type { MarketConfig } from "@/types/market";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BolaWordmark } from "@/components/ui/BolaWordmark";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import { getDefaultWhatsAppUrl } from "@/lib/whatsapp";
import { getDefaultTelegramUrl } from "@/lib/telegram";

export function Header({ market }: { market: MarketConfig }) {
  const whatsAppUrl = getDefaultWhatsAppUrl(market.whatsapp);
  const telegramUrl = market.telegram
    ? getDefaultTelegramUrl(market.telegram)
    : null;

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

        <div className="flex items-center gap-2 sm:gap-3">
          <Button
            href={whatsAppUrl}
            variant="whatsapp"
            size="md"
            icon={<WhatsAppIcon className="h-4 w-4" />}
            aria-label="Chat on WhatsApp"
            className="px-3 text-xs sm:px-5 sm:text-sm"
          >
            {telegramUrl ? (
              <span className="hidden sm:inline">WhatsApp</span>
            ) : (
              <>
                <span className="hidden sm:inline">Chat on WhatsApp</span>
                <span className="sm:hidden">WhatsApp</span>
              </>
            )}
          </Button>
          {telegramUrl && (
            <Button
              href={telegramUrl}
              variant="telegram"
              size="md"
              icon={<TelegramIcon className="h-4 w-4" />}
              aria-label="Chat on Telegram"
              className="px-3 text-xs sm:px-5 sm:text-sm"
            >
              <span className="hidden sm:inline">Telegram</span>
            </Button>
          )}
        </div>
      </Container>
    </header>
  );
}
