import type { MarketConfig } from "@/types/market";

/**
 * Zambia is BolaChat's live, first market.
 * Domain confirmed from the parent Bolabet brand: bolabet.co.zm
 */
export const zm: MarketConfig = {
  marketCode: "zm",
  countryName: "Zambia",
  currencyCode: "ZMW",
  currencySymbol: "K",
  locale: "en-ZM",

  whatsapp: {
    // TODO: replace with the live BolaChat WhatsApp Business number for Zambia.
    numberE164: "260970000000",
    defaultMessage: "Hi BolaChat! I'd like to see today's odds.",
    powerPlaysMessage: "Hi BolaChat! Show me this week's PowerPlays.",
  },

  registrationUrl: "https://www.bolabet.co.zm/register",
  loginUrl: "https://www.bolabet.co.zm/login",
  depositUrl: "https://www.bolabet.co.zm/deposit",

  ctaLabels: {
    primary: "Start chatting on WhatsApp",
    secondary: "See how it works",
    powerPlays: "See this week's PowerPlays",
    finalCta: "Start chatting on WhatsApp",
  },

  legal: {
    termsUrl: "https://www.bolabet.co.zm/terms-and-conditions",
    privacyUrl: "https://www.bolabet.co.zm/privacy-policy",
    responsibleGamblingUrl: "https://www.bolabet.co.zm/responsible-gambling",
    powerPlaysTermsUrl: "https://www.bolabet.co.zm/promotions/BolaChatPowerPlays",
  },

  support: {
    email: "support@bolabet.co.zm",
    phoneDisplay: "+260 97 000 0000",
    helplineName: "Zambia Responsible Gambling Helpline",
    // TODO: confirm the current national/operator problem-gambling helpline contact.
    helplineContact: "0800 000 000",
  },

  copy: {
    powerPlayExample: {
      fixture: "Arsenal vs Chelsea",
      kickoff: "Sat 8pm",
      market: "Home win",
      odds: "2.10",
      minStake: "K50",
      bonusPercent: "50%",
    },
  },

  seo: {
    title: "BolaChat Zambia - Sports stats, answers & plays, right inside WhatsApp",
    description:
      "Ask BolaChat about your teams and matches, get live odds and stats, and place your play - all inside WhatsApp. No app, no logins. Available in Zambia.",
    canonicalUrl: "https://bolachat.io/zm",
    ogImage: "/images/og/bolachat-zm.jpg",
    ogLocale: "en_ZM",
  },

  analytics: {},
};
