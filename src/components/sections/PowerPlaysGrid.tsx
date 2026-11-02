"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { isExpired, type PowerPlay } from "@/types/powerplays";
import { Container } from "@/components/ui/Container";
import { PowerPlayCard } from "@/components/ui/PowerPlayCard";
import { cx } from "@/lib/utils";

/**
 * The page is static, so PowerPlays whose end date passes after the last
 * deploy are hidden here, in the visitor's browser. The clock ticks once a
 * minute, so a card also disappears from a page that was left open.
 */

const MINUTE = 60_000;

function subscribe(onTick: () => void) {
  const timer = setInterval(onTick, MINUTE);
  return () => clearInterval(timer);
}
// Rounded to the minute so the snapshot stays stable between renders.
const currentMinute = () => Math.floor(Date.now() / MINUTE) * MINUTE;
// No clock during server rendering: show what the server already filtered.
const noClock = () => null;

export function PowerPlaysGrid({
  intro,
  items,
  example,
}: {
  intro: ReactNode;
  items: PowerPlay[];
  example: PowerPlay;
}) {
  const now = useSyncExternalStore(subscribe, currentMinute, noClock);
  const live = now === null ? items : items.filter((play) => !isExpired(play, now));
  const plays = live.length ? live : [example];
  // One card sits beside the heading; several get a grid underneath it.
  const sideBySide = plays.length === 1;

  return (
    <Container
      className={cx(
        "grid gap-10",
        sideBySide && "lg:grid-cols-2 lg:items-center lg:gap-16"
      )}
    >
      {intro}

      {sideBySide ? (
        <PowerPlayCard play={plays[0]} isExample={!live.length} />
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plays.map((play) => (
            <li key={play.id} className="flex">
              <PowerPlayCard play={play} className="w-full" />
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
