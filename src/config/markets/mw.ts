import type { MarketConfig } from "@/types/market";
import { marketUrl } from "@/config/site";

/**
 * Malawi - not live yet. `comingSoon` makes /mw render the coming-soon
 * landing page. Remove the `comingSoon` line (and add a real WhatsApp number
 * and, if applicable, a `telegram` block) to launch the full site.
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

  comingSoon: {
    // TODO: add a waitlist / sign-up link here to show a "Notify me" button.
    // notifyUrl: "https://...",
  },

  whatsapp: {
    // TODO: replace with the live BolaChat WhatsApp Business number for Malawi.
    numberE164: "265990000000",
    defaultMessage: "Hi BolaChat! I'd like to see today's odds.",
    powerPlaysMessage: "Hi BolaChat! Show me this week's PowerPlays.",
  },

  registrationUrl: "https://www.bolabet.co.mw/register",
  loginUrl: "https://www.bolabet.co.mw/login",
  depositUrl: "https://www.bolabet.co.mw/deposit",

  ctaLabels: {
    primary: "Chat",
    secondary: "See how it works",
    powerPlays: "Get PowerPlays",
    finalCta: "Chat",
  },

  legal: {
    termsUrl: "https://www.bolabet.co.mw/terms-and-conditions",
    privacyUrl: "https://www.bolabet.co.mw/privacy-policy",
    responsibleGamblingUrl: "https://www.bolabet.co.mw/responsible-gambling",
    powerPlaysTermsUrl: "https://www.bolabet.co.mw/promotions/BolaChatPowerPlays",
  },

  support: {
    email: "support@bolabet.mw",
    lines: [
      { label: "TNM", numbers: ["+265 899710910"] },
      {
        label: "Customer Care",
        numbers: ["+265 984937219", "+265 887051279"],
      },
    ],
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

  sports: ["soccer", "basketball", "boxing"],

  seo: {
    title: "BolaChat is coming to Malawi - Your AI sports bookie",
    description:
      "BolaChat is your AI sports bookie, right inside your chat app - live stats, real odds and plays with no downloads. Coming soon to Malawi.",
    canonicalUrl: marketUrl("mw"),
    ogImage: "/images/og/bolachat-mw.jpg",
    ogLocale: "en_MW",
  },

  analytics: {},
};
