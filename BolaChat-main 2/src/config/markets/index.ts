import type { MarketCode, MarketConfig } from "@/types/market";
import { zm } from "./zm";
import { mw } from "./mw";
import { zw } from "./zw";

/**
 * Single source of truth for every market this codebase supports.
 * Adding a new market = add one file in this folder + one line here.
 * See README.md "Adding a new market" for the full walkthrough.
 */
export const markets: Record<MarketCode, MarketConfig> = {
  zm,
  mw,
  zw,
};

export const marketCodes = Object.keys(markets) as MarketCode[];

export function getMarketConfig(code: MarketCode): MarketConfig {
  const config = markets[code];
  if (!config) {
    throw new Error(`Unknown market code: "${code}"`);
  }
  return config;
}

export function isMarketCode(value: string): value is MarketCode {
  return value in markets;
}

export type { MarketCode, MarketConfig } from "@/types/market";
