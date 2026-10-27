/**
 * Weekly PowerPlays content, one JSON file per market in
 * `src/content/powerplays/<code>.json`. Edited through the /admin panel,
 * which commits the file back to GitHub - the next deploy publishes it.
 *
 * Only `id`, `title` and `kickoff` are required; every other block on the
 * card is shown only when it's filled in, so one shape covers both an
 * odds-boost pick ("Arsenal vs Chelsea, Home win 2.10, K50 -> 50% back") and
 * a promo like "Weekend Special: Bet $1 on a combo, get $1 in freebets".
 */

/** A highlighted label/value pair, e.g. { label: "Min legs", value: "5" }. */
export interface PowerPlayTerm {
  label: string;
  value: string;
}

export interface PowerPlay {
  /** Stable id so the admin list can reorder items safely. */
  id: string;
  /** Optional promo name shown in the card header, e.g. "Weekend Special". */
  name?: string;
  /** Match or parlay, e.g. "Arsenal vs Chelsea" or "Weekend Treble". */
  title: string;
  /** When it plays, exactly as it should be displayed, e.g. "Sat 8pm". */
  kickoff: string;
  /** The pick, e.g. "Home win". Shown above the odds. */
  market?: string;
  /** Odds exactly as displayed, e.g. "2.10". */
  odds?: string;
  /** Up to three highlighted terms, e.g. Stake / You get / Min legs. */
  terms?: PowerPlayTerm[];
  /** Parlay legs or extra detail, one line each. */
  legs?: string[];
  /** Qualifying stake incl. currency, e.g. "K50". With bonusPercent, renders the "Play X, get Y back" line. */
  minStake?: string;
  /** Bonus paid as real balance, e.g. "50%". */
  bonusPercent?: string;
  /** Free-text mechanic, e.g. "Bet $1 on a BolaChat combo and get $1 in freebets." */
  description?: string;
  /** Optional card image, a path under /public (e.g. "/images/powerplays/x.jpg"). */
  image?: string;
}

export interface PowerPlaysContent {
  /** Section backdrop, a path under /public. */
  backgroundImage: string;
  /** This week's PowerPlays, in display order. Empty = show the market's example card. */
  items: PowerPlay[];
}

export const MAX_TERMS = 3;
const MAX_ITEMS = 24;
const IMAGE_PATH = /^\/images\/[A-Za-z0-9 _.,()/-]+\.(jpe?g|png|webp)$/i;

function text(value: unknown, field: string, max: number, required = false): string {
  if (value === undefined || value === null) value = "";
  if (typeof value !== "string") throw new Error(`${field} must be text`);
  const trimmed = value.trim();
  if (required && !trimmed) throw new Error(`${field} is required`);
  if (trimmed.length > max) throw new Error(`${field} is too long (max ${max} characters)`);
  return trimmed;
}

export function isImagePath(value: string): boolean {
  return IMAGE_PATH.test(value) && !value.includes("..");
}

function imagePath(value: unknown, field: string): string {
  const path = text(value, field, 200, true);
  if (!isImagePath(path)) throw new Error(`${field} is not a valid image path`);
  return path;
}

/** Drops empty optional fields so the saved JSON stays tidy. */
function compact<T extends object>(value: T): T {
  return Object.fromEntries(
    Object.entries(value).filter(([, v]) => v !== "" && !(Array.isArray(v) && !v.length))
  ) as T;
}

/** Validates untrusted input (from the admin API) and returns a clean copy. */
export function parsePowerPlaysContent(input: unknown): PowerPlaysContent {
  if (!input || typeof input !== "object") throw new Error("Invalid content");
  const raw = input as Record<string, unknown>;
  if (!Array.isArray(raw.items)) throw new Error("items must be a list");
  if (raw.items.length > MAX_ITEMS) throw new Error(`At most ${MAX_ITEMS} PowerPlays`);

  const ids = new Set<string>();
  const items = raw.items.map((entry, i): PowerPlay => {
    const n = `PowerPlay ${i + 1}`;
    if (!entry || typeof entry !== "object") throw new Error(`${n} is invalid`);
    const item = entry as Record<string, unknown>;
    const id = text(item.id, `${n} id`, 64, true);
    if (ids.has(id)) throw new Error(`${n} has a duplicate id`);
    ids.add(id);

    const legs = (Array.isArray(item.legs) ? item.legs : [])
      .map((leg, j) => text(leg, `${n} detail line ${j + 1}`, 120))
      .filter(Boolean);
    if (legs.length > 12) throw new Error(`${n} has too many detail lines`);

    const terms = (Array.isArray(item.terms) ? item.terms : [])
      .map((term, j) => {
        const t = (term ?? {}) as Record<string, unknown>;
        return {
          label: text(t.label, `${n} highlight ${j + 1} label`, 24),
          value: text(t.value, `${n} highlight ${j + 1} value`, 32),
        };
      })
      .filter((term) => term.label || term.value);
    if (terms.length > MAX_TERMS) throw new Error(`${n} has more than ${MAX_TERMS} highlights`);
    terms.forEach((term, j) => {
      if (!term.label || !term.value) {
        throw new Error(`${n} highlight ${j + 1} needs both a label and a value`);
      }
    });

    const odds = text(item.odds, `${n} odds`, 12);
    const market = text(item.market, `${n} pick`, 40);
    if (market && !odds) throw new Error(`${n}: add odds for the pick, or clear the pick`);

    const image = text(item.image, `${n} image`, 200);
    if (image && !isImagePath(image)) throw new Error(`${n} image is not a valid image path`);

    return compact({
      id,
      name: text(item.name, `${n} promo name`, 40),
      title: text(item.title, `${n} match or parlay`, 80, true),
      kickoff: text(item.kickoff, `${n} when`, 40, true),
      market,
      odds,
      terms,
      legs,
      minStake: text(item.minStake, `${n} minimum stake`, 20),
      bonusPercent: text(item.bonusPercent, `${n} bonus`, 20),
      description: text(item.description, `${n} description`, 200),
      image,
    });
  });

  return {
    backgroundImage: imagePath(raw.backgroundImage, "Background image"),
    items,
  };
}
