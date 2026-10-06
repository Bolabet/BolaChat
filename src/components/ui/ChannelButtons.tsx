import type { MarketConfig } from "@/types/market";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { TelegramIcon } from "@/components/ui/TelegramIcon";
import {
  getDefaultWhatsAppUrl,
  getPowerPlaysWhatsAppUrl,
} from "@/lib/whatsapp";
import {
  getDefaultTelegramUrl,
  getPowerPlaysTelegramUrl,
} from "@/lib/telegram";
import { cx } from "@/lib/utils";

interface ChannelButtonsProps {
  market: MarketConfig;
  /** Verb phrase; the channel is appended ("Chat" -> "Chat on WhatsApp"). */
  label: string;
  /** Which deep link to use: the generic chat link or the PowerPlays one. */
  intent?: "default" | "powerPlays";
  size?: "md" | "lg";
  className?: string;
}

/**
 * The WhatsApp + Telegram CTA pair. Every "start chatting" button on the
 * site goes through here, so adding a channel later is a one-file change.
 */
export function ChannelButtons({
  market,
  label,
  intent = "default",
  size = "lg",
  className,
}: ChannelButtonsProps) {
  const whatsAppUrl =
    intent === "powerPlays"
      ? getPowerPlaysWhatsAppUrl(market.whatsapp)
      : getDefaultWhatsAppUrl(market.whatsapp);
  const telegramUrl =
    intent === "powerPlays"
      ? getPowerPlaysTelegramUrl(market.telegram)
      : getDefaultTelegramUrl(market.telegram);

  return (
    <div className={cx("flex flex-col gap-3 sm:flex-row sm:flex-wrap", className)}>
      <Button
        href={whatsAppUrl}
        variant="whatsapp"
        size={size}
        icon={<WhatsAppIcon className="h-5 w-5" />}
      >
        {label} on WhatsApp
      </Button>
      <Button
        href={telegramUrl}
        variant="telegram"
        size={size}
        icon={<TelegramIcon className="h-5 w-5" />}
      >
        {label} on Telegram
      </Button>
    </div>
  );
}
