import { cx } from "@/lib/utils";

/**
 * CI 4.2 The Bola Slash: a thick graphic block cut at the Bola Angle
 * (-9.45deg), used to separate typography from photography or frame
 * high-impact shots. Purely decorative - always aria-hidden.
 */
export function BolaSlash({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cx("pointer-events-none block bg-accent", className)}
      style={{ transform: "skewX(var(--bola-angle))" }}
    />
  );
}
