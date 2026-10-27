import Image from "next/image";
import type { PowerPlay } from "@/types/powerplays";
import { BolaSlash } from "@/components/ui/BolaSlash";
import { cx } from "@/lib/utils";

/**
 * One PowerPlay. Every block except the header and title is optional and
 * only renders when filled in (see `PowerPlay` in src/types/powerplays.ts).
 */
export function PowerPlayCard({
  play,
  isExample = false,
  className,
}: {
  play: PowerPlay;
  isExample?: boolean;
  className?: string;
}) {
  const hasOdds = Boolean(play.odds);

  return (
    <div
      className={cx(
        "relative flex flex-col overflow-hidden rounded-md border border-border bg-background-elevated-2/90 backdrop-blur-sm",
        className
      )}
    >
      {play.image && (
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={play.image}
            alt={play.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      )}
      <BolaSlash className="absolute -right-6 -top-6 h-16 w-16 opacity-90" />

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">
          Powerplay{play.name ? ` - ${play.name}` : ""}
        </p>
        <p className="mt-1 text-xs text-muted">
          {isExample ? `Example - ${play.kickoff}` : play.kickoff}
        </p>

        <div
          className={cx(
            "mt-4 border-b border-border pb-4",
            hasOdds && "flex items-center justify-between gap-4"
          )}
        >
          <p className="font-heading text-lg normal-case">{play.title}</p>
          {hasOdds && (
            <div className="shrink-0 text-right">
              <p className="text-xs text-muted">Odds</p>
              <p className="text-xl font-extrabold tabular-nums text-accent">
                {play.odds}
              </p>
              <p className="text-[0.625rem] text-muted">Subject to change</p>
            </div>
          )}
        </div>

        {play.terms && play.terms.length > 0 && (
          <dl className="mt-4 grid grid-cols-3 gap-4">
            {play.terms.map((term) => (
              <div key={term.label}>
                <dt className="text-xs text-muted">{term.label}</dt>
                <dd className="mt-0.5 text-base font-extrabold tabular-nums text-accent sm:text-lg">
                  {term.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {play.legs && play.legs.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm text-foreground">
            {play.legs.map((leg, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true" className="text-accent">-</span>
                {leg}
              </li>
            ))}
          </ul>
        )}

        {play.minStake && play.bonusPercent && (
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Play{" "}
            <strong className="text-foreground">
              <span className="tabular-nums">{play.minStake}</span> or more
            </strong>{" "}
            and get{" "}
            <strong className="text-foreground">
              {play.bonusPercent} back
            </strong>{" "}
            as real balance - win or lose.
          </p>
        )}

        {play.description && (
          <p className="mt-4 text-sm leading-relaxed text-muted">{play.description}</p>
        )}
      </div>
    </div>
  );
}
