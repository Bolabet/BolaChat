import type { MarketConfig } from "@/types/market";

/**
 * Zimbabwe - planned rollout market.
 * NOTE: Zimbabwe's currency situation is unusual (ZiG alongside widespread
 * USD use in betting). currencyCode/currencySymbol below default to USD as
 * a starting point - confirm with the business which currency BolaChat
 * should actually display before launch. Domain, WhatsApp number, and
 * legal links are structurally correct placeholders flagged TODO.
 */
export const zw: MarketConfig = {
  marketCode: "zw",
  countryName: "Zimbabwe",
  currencyCode: "USD",
  currencySymbol: "$",
  locale: "en-ZW",

  whatsapp: {
    // TODO: replace with the live BolaChat WhatsApp Business number for Zimbabwe.
    numberE164: "263770000000",
    defaultMessage: "Hi BolaChat! I'd like to see today's odds.",
    powerPlaysMessage: "Hi BolaChat! Show me this week's PowerPlays.",
  },

  // TODO: confirm the production Bolabet Zimbabwe domain.
  registrationUrl: "https://www.bolabet.co.zw/register",
  loginUrl: "https://www.bolabet.co.zw/login",
  depositUrl: "https://www.bolabet.co.zw/deposit",

  ctaLabels: {
    primary: "Start chatting on WhatsApp",
    secondary: "See how it works",
    powerPlays: "See this week's PowerPlays",
    finalCta: "Start chatting on WhatsApp",
  },

  legal: {
    termsUrl: "https://www.bolabet.co.zw/terms-and-conditions",
    privacyUrl: "https://www.bolabet.co.zw/privacy-policy",
    responsibleGamblingUrl: "https://www.bolabet.co.zw/responsible-gambling",
    powerPlaysTermsUrl: "https://www.bolabet.co.zw/promotions/BolaChatPowerPlays",
  },

  support: {
    email: "support@bolabet.co.zw",
    phoneDisplay: "+263 77 000 0000",
    helplineName: "Zimbabwe Responsible Gambling Helpline",
    // TODO: confirm the current national/operator problem-gambling helpline contact.
    helplineContact: "0800 000 000",
  },

  copy: {
    powerPlayExample: {
      fixture: "Arsenal vs Chelsea",
      kickoff: "Sat 8pm",
      market: "Home win",
      odds: "2.10",
      minStake: "$5",
      bonusPercent: "50%",
    },
  },

  seo: {
    title: "BolaChat Zimbabwe - Sports stats, answers & plays, right inside WhatsApp",
    description:
      "Ask BolaChat about your teams and matches, get live odds and stats, and place your play - all inside WhatsApp. No app, no logins. Coming soon to Zimbabwe.",
    canonicalUrl: "https://bolachat.io/zw",
    ogImage: "/images/og/bolachat-zw.jpg",
    ogLocale: "en_ZW",
  },

  analytics: {},
};
