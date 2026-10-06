/**
 * Catalogue of sports that can appear in the "Pick your sport" grid.
 * Each market chooses which ones to show (and in what order) via
 * `MarketConfig.sports`. A sport without an `image` falls back to the
 * <SportArt /> placeholder until real photography is added.
 */
export type SportKey = "soccer" | "basketball" | "boxing" | "cricket" | "rugby";

export interface SportCardData {
  name: string;
  body: string;
  /** Path relative to /public. Omit to show the SportArt placeholder. */
  image?: string;
  /** Placeholder icon used when there is no image. */
  art: "soccer" | "basketball" | "boxing";
}

export const sportsCatalog: Record<SportKey, SportCardData> = {
  soccer: {
    name: "Soccer",
    body: "Leagues and cups worldwide. Form, lineups, match odds.",
    image: "/images/sports/soccer.jpg",
    art: "soccer",
  },
  basketball: {
    name: "Basketball",
    body: "Pro and college. Pace, props, spreads and live lines.",
    image: "/images/sports/Basketball Chat.jpeg",
    art: "basketball",
  },
  boxing: {
    name: "Boxing",
    body: "Every card, every bout. Records, styles and the odds before the bell.",
    image: "/images/sports/Boxing chat.jpeg",
    art: "boxing",
  },
  cricket: {
    name: "Cricket",
    body: "Every format, every series. Averages, form and live lines.",
    image: "/images/sports/cricket.jpg",
    art: "soccer",
  },
  rugby: {
    name: "Rugby",
    body: "Union and league. Team news, head-to-heads and the odds before kick-off.",
    image: "/images/sports/rugby.jpg",
    art: "soccer",
  },
};
