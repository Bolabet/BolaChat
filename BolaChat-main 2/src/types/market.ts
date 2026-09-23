/**
 * Shared TypeScript contract for every BolaChat market.
 *
 * Every localised route (/zm, /mw, /zw, ...) is rendered by the exact same
 * component tree. The only thing that changes between markets is the data
 * returned from `src/config/markets/*`. Never hardcode a market-specific
 * value (a phone number, a currency symbol, a URL) inside a presentation
 * component - add it here instead and read it from the active config.
 */

export type MarketCode = "zm" | "mw" | "zw";

export interface AnalyticsConfig {
  /** Google Analytics 4 measurement ID, e.g. "G-XXXXXXX". Leave undefined until ready to enable. */
  googleAnalyticsId?: string;
  /** Google Tag Manager container ID, e.g. "GTM-XXXXXXX". */
  googleTagManagerId?: string;
  /** Meta (Facebook) Pixel ID. */
  metaPixelId?: string;
  /** TikTok Pixel ID. */
  tiktokPixelId?: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  /** Absolute canonical URL for this market's page, e.g. "https://bolachat.io/zm". */
  canonicalUrl: string;
  /** Path to the Open Graph share image, relative to /public. */
  ogImage: string;
  ogLocale: string;
}

export interface WhatsAppConfig {
  /** E.164 phone number, digits only, no leading "+" (e.g. "260970000000"). */
  numberE164: string;
  /** Default prefilled message used by generic "Start chatting" CTAs. */
  defaultMessage: string;
  /** Prefilled message used by the PowerPlays CTA. */
  powerPlaysMessage: string;
}

export interface LegalLinks {
  termsUrl: string;
  privacyUrl: string;
  responsibleGamblingUrl: string;
  powerPlaysTermsUrl: string;
}

export interface SupportDetails {
  email: string;
  phoneDisplay: string;
  /** Name of the national/local problem-gambling helpline shown in the footer. */
  helplineName: string;
  helplineContact: string;
}

export interface MarketCopy {
  /** Example fixture shown in the PowerPlays card. Illustrative only, never live odds. */
  powerPlayExample: {
    fixture: string;
    kickoff: string;
    market: string;
    odds: string;
    minStake: string;
    bonusPercent: string;
  };
}

export interface MarketConfig {
  marketCode: MarketCode;
  countryName: string;
  currencyCode: string;
  currencySymbol: string;
  /** BCP-47 locale tag, e.g. "en-ZM". */
  locale: string;

  whatsapp: WhatsAppConfig;

  registrationUrl: string;
  loginUrl: string;
  depositUrl: string;

  ctaLabels: {
    primary: string;
    secondary: string;
    powerPlays: string;
    finalCta: string;
  };

  legal: LegalLinks;
  support: SupportDetails;
  copy: MarketCopy;
  seo: SeoConfig;
  analytics: AnalyticsConfig;
}
