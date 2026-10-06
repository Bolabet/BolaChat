import type { MarketConfig } from "@/types/market";

/**
 * Human-readable list of the chat apps a market offers, so copy stays
 * accurate per market ("WhatsApp" in Zambia, "WhatsApp and Telegram" in
 * Zimbabwe).
 */
export function channelNames(
  market: MarketConfig,
  joiner: "and" | "or" = "and"
): string {
  return market.telegram ? `WhatsApp ${joiner} Telegram` : "WhatsApp";
}
