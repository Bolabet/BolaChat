import Image from "next/image";
import Link from "next/link";
import type { MarketConfig } from "@/types/market";
import { markets } from "@/config/markets";
import { sportsCatalog } from "@/config/sports";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { BolaWordmark } from "@/components/ui/BolaWordmark";
import { BolaSlash } from "@/components/ui/BolaSlash";
import { ChatMockup } from "@/components/ui/ChatMockup";
import { SectionHeading } from "@/components/ui/SectionHeading";

const features = [
  {
    number: "01",
    title: "Ask anything",
    body: "Previous scores, form, injuries. Plain language, any sport you follow.",
  },
  {
    number: "02",
    title: "Real stats, live odds",
    body: "Straight answers with the numbers behind them. No fluff, no jargon.",
  },
  {
    number: "03",
    title: "Play in the chat",
    body: "Confirm your play right where you already are. No downloads, no new login.",
  },
];

/**
 * Landing page for markets flagged `comingSoon` (currently Malawi).
 * Deliberately standalone: no chat buttons (the market has no live number
 * yet) and no placeholder legal/support details. Points visitors to the
 * markets that are live, and shows an optional "Notify me" button once
 * `comingSoon.notifyUrl` is set in the market config.
 */
export function ComingSoonPage({ market }: { market: MarketConfig }) {
  const notifyUrl = market.comingSoon?.notifyUrl;
  const liveMarkets = Object.values(markets).filter(
    (m) => !m.comingSoon && m.marketCode !== market.marketCode
  );
  const sportNames = market.sports.map((key) => sportsCatalog[key].name);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-20">
        <Container className="flex h-16 items-center justify-between sm:h-20">
          <Link href="/" aria-label="BolaChat home">
            <BolaWordmark className="text-lg sm:text-xl" />
          </Link>

          {liveMarkets.length > 0 && (
            <nav
              aria-label="Live countries"
              className="flex items-center gap-4 text-sm font-medium sm:gap-6"
            >
              <span className="hidden text-muted sm:inline">Live in</span>
              {liveMarkets.map((m) => (
                <Link
                  key={m.marketCode}
                  href={`/${m.marketCode}`}
                  className="text-foreground/90 transition-colors hover:text-accent"
                >
                  {m.countryName}
                </Link>
              ))}
            </nav>
          )}
        </Container>
      </header>

      <main className="flex-1">
        {/* ---------- Hero ---------- */}
        <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
          <Image
            src="/images/sports/soccer.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-background/95 via-background/85 to-background/60"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent"
          />

          <Container className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wide text-accent">
                  Coming soon to {market.countryName}
                </span>
              </div>

              <h1 className="font-heading text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
                BolaChat is{" "}
                <span className="text-accent">
                  coming to {market.countryName}.
                </span>
              </h1>

              {/* CI 2.3: the slogan lockup - "YOU" always emphasised in Action Yellow. */}
              <p className="font-heading mt-4 text-base text-foreground/80 sm:text-xl">
                Prove <span className="text-accent">you</span> know the game.
              </p>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/80 sm:text-lg">
                Your AI sports bookie, right inside your chat app. Ask about
                any match, get real stats and live odds, and place your play -
                no downloads, no clunky betting site. We&apos;re putting the
                finishing touches on it for {market.countryName}.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {notifyUrl && (
                  <Button href={notifyUrl} variant="primary" size="lg">
                    Notify me at launch
                  </Button>
                )}
                {liveMarkets.map((m, i) => (
                  <Button
                    key={m.marketCode}
                    href={`/${m.marketCode}`}
                    variant={!notifyUrl && i === 0 ? "primary" : "secondary"}
                    size="lg"
                  >
                    See BolaChat in {m.countryName}
                  </Button>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Badge className="bg-background/60 backdrop-blur-sm">
                  <strong className="text-accent">0</strong>&nbsp;downloads
                  needed
                </Badge>
                <Badge className="bg-background/60 backdrop-blur-sm">
                  <strong className="text-accent">24/7</strong>&nbsp;instant
                  replies
                </Badge>
                <Badge className="bg-background/60 backdrop-blur-sm">
                  <strong className="text-accent">18+</strong>&nbsp;only
                </Badge>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <BolaSlash className="absolute -left-4 top-10 hidden h-12 w-24 opacity-90 sm:block" />
              <BolaSlash className="absolute -right-2 bottom-12 hidden h-8 w-16 opacity-90 sm:block" />
              <ChatMockup />
            </div>
          </Container>
        </section>

        {/* ---------- What's coming ---------- */}
        <section className="py-16 sm:py-24">
          <Container>
            <SectionHeading
              align="center"
              eyebrow="What's coming"
              heading="Three messages, that's it"
              body="You type like you'd text a friend who happens to know every stat."
              className="mx-auto"
            />

            <ul className="mt-12 grid gap-6 sm:grid-cols-3">
              {features.map((feature) => (
                <li
                  key={feature.number}
                  className="rounded-md border border-border bg-background-elevated p-6 transition-colors hover:border-accent/60"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-heading text-sm not-italic text-accent">
                    {feature.number}
                  </span>
                  <p className="font-heading mt-5 text-lg normal-case">
                    {feature.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {feature.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-col items-center gap-4">
              <p className="text-sm font-medium uppercase tracking-wide text-muted">
                Built for the games you watch
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {sportNames.map((name) => (
                  <span
                    key={name}
                    className="font-heading rounded-md border border-border bg-background-elevated px-5 py-2.5 text-sm"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* ---------- Live elsewhere ---------- */}
        {liveMarkets.length > 0 && (
          <section className="border-t border-border bg-background-elevated py-16 sm:py-20">
            <Container className="text-center">
              <h2 className="font-heading mx-auto max-w-xl text-2xl leading-tight sm:text-3xl">
                Can&apos;t wait? BolaChat is already{" "}
                <span className="text-accent">live</span>.
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base text-muted">
                Play where BolaChat is up and running today.
              </p>

              <div className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row sm:justify-center">
                {liveMarkets.map((m) => (
                  <Link
                    key={m.marketCode}
                    href={`/${m.marketCode}`}
                    className="group flex flex-1 items-center justify-between gap-4 rounded-md border border-border bg-background px-6 py-5 text-left transition-colors hover:border-accent"
                  >
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wide text-accent">
                        Live now
                      </span>
                      <span className="font-heading mt-1 block text-lg">
                        {m.countryName}
                      </span>
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 text-muted transition-transform group-hover:translate-x-1 group-hover:text-accent"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4L11.6 10 7.3 5.7a1 1 0 0 1 0-1.4Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}
      </main>

      <Footer market={market} />
    </>
  );
}
