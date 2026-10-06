import type { TelegramConfig } from "@/types/market";

/**
 * Builds a t.me deep link to the BolaChat bot.
 *
 * Telegram can't prefill free text for a bot chat (unlike wa.me), so we
 * pass a `start` payload instead - the bot receives it as "/start <payload>"
 * and can open the right flow (e.g. PowerPlays).
 */
export function buildTelegramUrl(username: string, startPayload?: string): string {
  const handle = username.replace(/^@/, "");
  const base = `https://t.me/${handle}`;
  if (!startPayload) return base;
  return `${base}?start=${encodeURIComponent(startPayload)}`;
}

export function getDefaultTelegramUrl(telegram: TelegramConfig): string {
  return buildTelegramUrl(telegram.username, telegram.defaultStart);
}

export function getPowerPlaysTelegramUrl(telegram: TelegramConfig): string {
  return buildTelegramUrl(telegram.username, telegram.powerPlaysStart);
}
