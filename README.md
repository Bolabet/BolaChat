# BolaChat

A rebuild of the BolaChat marketing site (https://bolachat.io) - the WhatsApp-native
AI sports betting product from Bola Group / Bolabet, live in Zambia with
Zimbabwe and Malawi planned. This repo replaces the original one-off page
with a maintainable, multi-market Next.js app.

This is **not** a redesign. It reproduces the live product's structure and
copy, on a clean architecture that can add new countries without touching
presentation code.

## Brand system

Visual design follows the **Bolabet Corporate Identity Manual v1.0** (the
parent brand's CI, applied here to the BolaChat sub-brand):

- **Colour** (CI 3.1/3.2): Pitch Black `#231F20` background, Action Yellow
  `#F5E500` as the single accent, Chalk White `#FFFFFF` text. This is the
  CI's "Home Kit" (3.3) - the black/yellow combination specified for core
  sports betting product UI.
- **One deliberate exception**: WhatsApp CTA buttons use WhatsApp's own
  green (`--whatsapp` in `globals.css`), not Action Yellow, so they still
  read as "this opens WhatsApp" at a glance. Every other accent on the site
  - links, badges, focus states, the wordmark split - is Action Yellow. See
  `Button.tsx`: the `whatsapp` variant is reserved for wa.me links only.
- **Typography** (CI 2.1/2.2): Archivo (weight 900, italic, uppercase, tight
  tracking) for headlines via the `.font-heading` utility class; Inter for
  body/UI text, with tabular lining numerals turned on site-wide
  (`font-feature-settings: "tnum"`) so odds and amounts align in columns -
  apply the `tabular-nums` class directly to any new numeric display.
  Both fonts are self-hosted via `@fontsource-variable/*` (no runtime call
  to Google's font CDN).
- **The Bola Angle** (CI 4.1): `-9.45deg`, stored as `--bola-angle`.
  Applied to graphic elements only (the `BolaSlash` component, the
  Responsible Gaming badge's plates, the half-tone texture) - never to
  running text, which gets its slant from the italic headline typeface
  instead.
- **The Bola Half-tone** (CI 4.4): a faded dot-matrix texture, implemented
  as the `.bola-halftone` CSS utility (see `SportArt.tsx` for usage).
- **The 18+ badge** (CI 2.4) is a defined graphic asset, not just body
  copy - see `ResponsibleGamingBadge.tsx`, used in the Footer.
- **The wordmark split** (CI 1.1): `BolaWordmark.tsx` reproduces the
  BOLA/BET colour-split pattern for BOLA/CHAT.

New brand-system components live in `src/components/ui/`:
`BolaWordmark.tsx`, `BolaSlash.tsx`, `ResponsibleGamingBadge.tsx`.

## Stack

- **Next.js 16** (App Router, static generation)
- **TypeScript**
- **Tailwind CSS v4**
- **ESLint** (`eslint-config-next`)
- **Archivo** and **Inter** (self-hosted via `@fontsource-variable/*`) for
  brand typography - see "Brand system" above
- Zero UI/animation libraries beyond the fonts above - everything else is
  hand-built Tailwind + plain SVG

No Google Fonts CDN dependency: fonts are bundled as static files through
npm (`@fontsource-variable/archivo`, `@fontsource-variable/inter`) rather
than loaded via `next/font/google`, so the build never depends on reaching
fonts.googleapis.com at request time - one less thing that can fail in a
locked-down CI/build environment, and one fewer third-party network request
for visitors.

## Project structure

```
src/
  app/
    layout.tsx        Root HTML shell, global metadata defaults
    page.tsx           "/" - choose-your-country fallback (see below)
    robots.ts           /robots.txt
    sitemap.ts           /sitemap.xml, generated from the market registry
    zm/page.tsx         Zambia route - metadata + <MarketPage market={zm} />
    mw/page.tsx         Malawi route
    zw/page.tsx         Zimbabwe route
  components/
    MarketPage.tsx      The one page template every market route renders
    layout/             Header, Footer
    sections/           Hero, PowerPlays, HowItWorks, WhyWhatsApp, SportsGrid, FinalCta
    ui/                 Button, Container, Badge, SectionHeading, SportArt, ChatMockup, WhatsAppIcon
  config/
    markets/            zm.ts / mw.ts / zw.ts / index.ts - see "Market configuration" below
  lib/
    whatsapp.ts         wa.me URL builder (single source of truth for WhatsApp links)
    utils.ts            cx() class-name helper
  types/
    market.ts           MarketConfig contract every market file must satisfy
  styles/
    globals.css         Design tokens (CSS variables) + Tailwind import
public/
  images/sports/        Drop real photography here (see below)
  icons/
```

Nothing in `components/` imports a market-specific value directly - every
component that needs one receives a `market: MarketConfig` prop and reads
from it. That's what makes `/zm`, `/mw`, and `/zw` three routes over one
codebase instead of three separate sites.

## Market configuration

Each market is one file in `src/config/markets/` implementing the
`MarketConfig` type (`src/types/market.ts`): currency, WhatsApp number,
registration/login/deposit URLs, legal links, support details, SEO
metadata, and analytics IDs (left empty until you're ready to enable them).

**Known placeholders you must replace before a market goes live** - each is
marked `// TODO` in its config file:

| Market | What's a placeholder |
|---|---|
| Zambia (`zm.ts`) | WhatsApp Business number, helpline contact |
| Malawi (`mw.ts`) | Domain (`bolabet.co.mw`), WhatsApp number, all legal URLs, helpline |
| Zimbabwe (`zw.ts`) | Domain (`bolabet.co.zw`), currency (USD vs ZiG - confirm with the business), WhatsApp number, all legal URLs, helpline |

Zambia's domain (`bolabet.co.zm`) and currency (Kwacha, symbol `K`) are
carried over from the live site's own copy, so those aren't placeholders.

### Adding a new market

1. Copy `src/config/markets/zm.ts` to `src/config/markets/<code>.ts` (use
   the two-letter country code, lowercase).
2. Fill in every field for the new country.
3. Register it in `src/config/markets/index.ts`:
   ```ts
   import { <code> } from "./<code>";

   export const markets: Record<MarketCode, MarketConfig> = {
     zm, mw, zw, <code>,
   };
   ```
4. Add `"<code>"` to the `MarketCode` union in `src/types/market.ts`.
5. Create `src/app/<code>/page.tsx` - copy `src/app/zm/page.tsx` and swap
   the import.

That's it. `sitemap.ts` and the root "choose your country" page both read
from the registry automatically, so they pick up the new market without
any further changes.

### Editing market configuration

Just edit the relevant field in that market's file under
`src/config/markets/`. There's no build step or code generation - the
config file is the config.

## Adding photography assets

The live site uses black-and-white sports photography (a soccer player,
a basketball player, a boxer) that is not this project's to copy. Every
image slot in this rebuild (`Hero`, `SportsGrid`) currently renders
`<SportArt />` - a lightweight duotone/SVG placeholder in brand colours -
instead. To swap in real photography:

1. Drop the final images into `public/images/sports/` (e.g. `soccer.jpg`).
2. Replace the relevant `<SportArt variant="soccer" ... />` usage with:
   ```tsx
   import Image from "next/image";

   <Image
     src="/images/sports/soccer.jpg"
     alt="Soccer on BolaChat"
     fill
     className="object-cover"
   />
   ```
3. Keep the parent element's `aspect-[4/3]` (or similar) class so layout
   doesn't shift.

## Installation & local development

```bash
npm install
npm run dev
```

Open http://localhost:3000, then visit `/zm`, `/mw`, or `/zw` directly
(there's no automatic redirect yet - see "Geo-routing" below).

## Production build

```bash
npm run build
npm run start
```

`npm run build` must complete with zero errors before anything is pushed.
It currently prerenders every route as static HTML (`/`, `/zm`, `/mw`,
`/zw`, `/robots.txt`, `/sitemap.xml`) - there's no server-side runtime
requirement, which keeps hosting simple wherever this ends up.

## Working without local dev (GitHub web editor -> Vercel)

If you're editing through the GitHub web UI rather than cloning locally:

- Every file this project needs is a **complete file**, not a diff -
  paste the whole file when replacing one.
- To push this whole project for the first time, GitHub's "Upload files"
  page (Add file -> Upload files) accepts a dragged folder from
  Finder/Explorer and recreates the directory structure automatically -
  you don't have to create each subfolder by hand first.
- Vercel's zero-config Next.js build will pick this up with no extra
  settings.
- Comments and copy in this codebase are deliberately plain ASCII (no
  curly quotes, em dashes, or special punctuation) - a past project hit
  Cloudflare build failures from unicode characters in source comments,
  so this repo avoids that class of bug outright.

## Cloudflare readiness

This app deliberately avoids anything Vercel-only:

- No Vercel-specific middleware, edge config, or `@vercel/*` packages.
- No ISR / on-demand revalidation - every route is fully static.
- Metadata (`robots.ts`, `sitemap.ts`) uses the standard Next.js Metadata
  API, which works the same regardless of host.

**Geo-routing is intentionally not implemented here.** Per the brief, this
codebase only prepares the ground for it: `/zm`, `/mw`, and `/zw` exist as
fully independent static routes, so a Cloudflare Worker sitting in front of
this deployment can inspect the visitor's country and redirect/rewrite to
the right path - the same pattern already used on the ChatBet geo-redirect
project - without any changes to this frontend. When that Worker is ready,
`/` (the current "choose your country" fallback) is the safe default for
traffic the Worker can't classify.

## SEO & accessibility

- Every market route has its own `<title>`, meta description, canonical
  URL, and Open Graph/Twitter metadata (see each `src/app/<code>/page.tsx`).
- `robots.ts` and `sitemap.ts` are generated, not static files, so the
  sitemap always matches the registered markets.
- All interactive elements are real `<a>`/`<button>` elements (no
  clickable `<div>`s), focus states are visible, and images/icons carry
  `alt`/`aria-label` text.

## What differs from the live site

- **Colour and typography now follow the Bolabet Corporate Identity Manual
  v1.0** (Action Yellow / Pitch Black, Archivo + Inter) rather than the
  live bolachat.io page's own look - this is a deliberate, explicit brand
  decision, not a gap. WhatsApp buttons are the one intentional exception
  (see "Brand system" above).
- **Photography**: replaced with placeholder duotone panels - see
  "Adding photography assets" above. This is the one thing that
  couldn't be reproduced automatically (copying the live site's actual
  photos would mean copying assets that aren't this project's to reuse).
- **Exact pixel values** (precise colours, spacing, font): the live site
  could only be audited through its rendered text content, not its
  underlying CSS, so this rebuild uses a close, brand-consistent
  interpretation (WhatsApp green accent, dark theme) rather than
  pixel-identical values pulled from the original stylesheet. Flag any
  specific mismatch and it's a quick Tailwind class change.
- **WhatsApp numbers, market domains for Malawi/Zimbabwe, and helpline
  contacts** are structurally-correct placeholders - see the table above.

## Analytics (not yet enabled)

`AnalyticsConfig` on each market (in `src/types/market.ts`) has empty slots
for a GA4 ID, GTM container ID, Meta Pixel ID, and TikTok Pixel ID. Nothing
is loaded until you fill these in and wire up the corresponding script -
intentionally, so no third-party script ships before it's actually needed.
