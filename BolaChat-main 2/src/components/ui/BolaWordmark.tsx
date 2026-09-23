import { cx } from "@/lib/utils";

/**
 * CI 1.1 Primary Wordmark: the mark is visually split to aid readability and
 * create dynamic tension - one part set in the neutral colour, the other in
 * Action Yellow. Applied here to the BolaChat sub-brand the same way the CI
 * splits BOLA / BET.
 */
export function BolaWordmark({
  suffix = "CHAT",
  className,
}: {
  suffix?: string;
  className?: string;
}) {
  return (
    <span className={cx("font-heading inline-flex", className)}>
      <span className="text-foreground">BOLA</span>
      <span className="text-accent">{suffix}</span>
    </span>
  );
}
