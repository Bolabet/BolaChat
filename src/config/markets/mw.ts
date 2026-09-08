import type { MarketConfig } from "@/types/market";

/**
 * Malawi - planned rollout market.
 * NOTE: domain, WhatsApp number, and legal links below are structurally
 * correct placeholders (right country code, right shape) and are flagged
 * TODO. Swap them for the real values before this route goes live.
 */
export const mw: MarketConfig = {
  marketCode: "mw",
  countryName: "Malawi",
  currencyCode: "MWK",
  currencySymbol: "MK",
  locale: "en-MW",

  whatsapp: {
    // TODO: replace with the live BolaChat WhatsApp Business number for Malawi.
    numberE164: "265990000000",
    defaultMessage: "Hi BolaChat! I'd like to see today's odds.",
    powerPlaysMessage: "Hi BolaChat! Show me this week's PowerPlays.",
  },

  // TODO: confirm the production Bolabet Malawi domain.
  registrationUrl: "https://www.bolabet.co.mw/register",
  loginUrl: "https://www.bolabet.co.mw/login",
  depositUrl: "https://www.bolabet.co.mw/deposit",

  ctaLabels: {
    primary: "Start chatting on WhatsApp",
    secondary: "See how it works",
    powerPlays: "See this week's PowerPlays",
    finalCta: "Start chatting on WhatsApp",
  },

  legal: {
    termsUrl: "https://www.bolabet.co.mw/terms-and-conditions",
    privacyUrl: "https://www.bolabet.co.mw/privacy-policy",
    responsibleGamblingUrl: "https://www.bolabet.co.mw/responsible-gambling",
    powerPlaysTermsUrl: "https://www.bolabet.co.mw/promotions/BolaChatPowerPlays",
  },

  support: {
    email: "support@bolabet.co.mw",
    phoneDisplay: "+265 99 000 0000",
    helplineName: "Malawi Responsible Gambling Helpline",
    // TODO: confirm the current national/operator problem-gambling helpline contact.
    helplineContact: "0800 000 000",
  },

  copy: {
    powerPlayExample: {
      fixture: "Arsenal vs Chelsea",
      kickoff: "Sat 8pm",
      market: "Home win",
      odds: "2.10",
      minStake: "MK5,000",
      bonusPercent: "50%",
    },
  },

  seo: {
    title: "BolaChat Malawi - Sports stats, answers & plays, right inside WhatsApp",
    description:
      "Ask BolaChat about your teams and matches, get live odds and stats, and place your play - all inside WhatsApp. No app, no logins. Coming soon to Malawi.",
    canonicalUrl: "https://bolachat.io/mw",
    ogImage: "/images/og/bolachat-mw.jpg",
    ogLocale: "en_MW",
  },

  analytics: {},
};
