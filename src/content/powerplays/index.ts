import type { MarketCode } from "@/types/market";
import type { PowerPlaysContent } from "@/types/powerplays";
import zm from "./zm.json";
import mw from "./mw.json";
import zw from "./zw.json";

/**
 * This week's PowerPlays per market. The JSON files are edited through
 * /admin (see README "PowerPlays admin"); they are read at build time, so a
 * change goes live with the next deploy.
 */
const powerPlays: Record<MarketCode, PowerPlaysContent> = {
  zm: zm as PowerPlaysContent,
  mw: mw as PowerPlaysContent,
  zw: zw as PowerPlaysContent,
};

export function getPowerPlays(code: MarketCode): PowerPlaysContent {
  return powerPlays[code];
}

/** Repo path of a market's PowerPlays file (used by the admin API). */
export function powerPlaysFilePath(code: MarketCode): string {
  return `src/content/powerplays/${code}.json`;
}
