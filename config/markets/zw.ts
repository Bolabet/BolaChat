import type { MarketConfig } from "@/types/market";
import { marketUrl } from "@/config/site";

/**
 * Zimbabwe - live on WhatsApp and Telegram.
 * NOTE: Zimbabwe's currency situation is unusual (ZiG alongside widespread
 * USD use in betting). currencyCode/currencySymbol below default to USD as
 * a starting point - confirm with the business which currency BolaChat
 * should actually display. Domain and legal links are structurally correct
 * placeholders flagged TODO.
 */
export const zw: MarketConfig = {
  marketCode: "zw",
  countryName: "Zimbabwe",
  currencyCode: "USD",
  currencySymbol: "$",
  locale: "en-ZW",

  whatsapp: {
    numberE164: "263780367808",
    defaultMessage: "Hi BolaChat! I'd like to see today's odds.",
    powerPlaysMessage: "Hi BolaChat! Show me this week's PowerPlays.",
  },

  // TODO: confirm the production Bolabet Zimbabwe domain.
  telegram: {
    username: "bolabet_zw_bot",
    defaultStart: "web",
    powerPlaysStart: "powerplays",
  },

  registrationUrl: "https://www.bolabet.co.zw/register",
  loginUrl: "https://www.bolabet.co.zw/login",
  depositUrl: "https://www.bolabet.co.zw/deposit",

  ctaLabels: {
    primary: "Chat",
    secondary: "See how it works",
    powerPlays: "Get PowerPlays",
    finalCta: "Chat",
  },

  legal: {
    termsUrl: "https://www.bolabet.co.zw/terms-and-conditions",
    privacyUrl: "https://www.bolabet.co.zw/privacy-policy",
    responsibleGamblingUrl: "https://www.bolabet.co.zw/responsible-gambling",
    powerPlaysTermsUrl: "https://www.bolabet.co.zw/promotions/BolaChatPowerPlays",
  },

  support: {
    email: "support@bolabet.co.zw",
    lines: [
      { label: "Econet", numbers: ["+263 771 631 228", "+263 771 632 383"] },
      { label: "NetOne", numbers: ["+263 719 210 014", "+263 719 210 039"] },
      { label: "Africom", numbers: ["+263 867 701 0220"] },
    ],
    helplineName: "Zimbabwe Responsible Gambling Helpline",
    // TODO: confirm the current national/operator problem-gambling helpline contact.
    helplineContact: "0800 000 000",
  },

  copy: {
    // Weekly promotion - update (or remove) each week.
    powerPlay: {
      name: "Weekend Special",
      mechanic: "Bet $1 on a BolaChat combo and get $1 in freebets.",
      fixture: "Man. Utd vs Tottenham",
      kickoff: "Sat 10 Oct, 18:30",
      terms: [
        { label: "Stake", value: "$1" },
        { label: "You get", value: "$1 in freebets" },
        { label: "Min legs", value: "5" },
      ],
    },
    powerPlayExample: {
      fixture: "Arsenal vs Chelsea",
      kickoff: "Sat 8pm",
      market: "Home win",
      odds: "2.10",
      minStake: "$5",
      bonusPercent: "50%",
    },
  },

  sports: ["soccer", "cricket", "rugby"],

  seo: {
    title: "BolaChat Zimbabwe - Sports stats, answers & plays, right inside WhatsApp & Telegram",
    description:
      "Ask BolaChat about your teams and matches, get live odds and stats, and place your play - all inside WhatsApp or Telegram. No app, no logins. Available in Zimbabwe.",
    canonicalUrl: marketUrl("zw"),
    ogImage: "/images/og/bolachat-zw.jpg",
    ogLocale: "en_ZW",
  },

  analytics: {},
};
