import type { MarketConfig } from "@/types/market";
import { marketUrl } from "@/config/site";

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
    numberE164: "260766208966",
    defaultMessage: "Hi BolaChat! I'd like to see today's odds.",
    powerPlaysMessage: "Hi BolaChat! Show me this week's PowerPlays.",
  },

  registrationUrl: "https://www.bolabet.co.zm/register",
  loginUrl: "https://www.bolabet.co.zm/login",
  depositUrl: "https://www.bolabet.co.zm/deposit",

  ctaLabels: {
    primary: "Chat",
    secondary: "See how it works",
    powerPlays: "Get PowerPlays",
    finalCta: "Chat",
  },

  legal: {
    termsUrl: "https://www.bolabet.co.zm/terms-and-conditions",
    privacyUrl: "https://www.bolabet.co.zm/privacy-policy",
    responsibleGamblingUrl: "https://www.bolabet.co.zm/responsible-gambling",
    powerPlaysTermsUrl: "https://www.bolabet.co.zm/promotions/BolaChatPowerPlays",
  },

  support: {
    email: "support@bolabet.co.zm",
    lines: [
      {
        label: "Airtel",
        numbers: ["+260 97 744 9933", "+260 77 055 2541", "+260 77 055 2543"],
      },
      {
        label: "MTN",
        numbers: ["+260 96 093 0022", "+260 76 243 7006", "+260 76 243 7475"],
      },
      { label: "Zamtel/MTN Toll Free", numbers: ["357"] },
    ],
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

  sports: ["soccer", "basketball", "boxing"],

  seo: {
    title: "BolaChat Zambia - Sports stats, answers & plays, right inside WhatsApp",
    description:
      "Ask BolaChat about your teams and matches, get live odds and stats, and place your play - all inside WhatsApp. No app, no logins. Available in Zambia.",
    canonicalUrl: marketUrl("zm"),
    ogImage: "/images/og/bolachat-zm.jpg",
    ogLocale: "en_ZM",
  },

  analytics: {},
};
