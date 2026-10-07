import type { MarketCode } from "@/types/market";

/**
 * Site-wide domain settings. Every market lives on its own path of the one
 * domain: bolachat.africa/zm, bolachat.africa/zw, bolachat.africa/mw.
 * The bare domain shows the "choose your country" page.
 */
export const siteDomain = "bolachat.africa";
export const siteUrl = `https://${siteDomain}`;

/** Public URL of a market's page, e.g. https://bolachat.africa/zm */
export function marketUrl(code: MarketCode): string {
  return `${siteUrl}/${code}`;
}
