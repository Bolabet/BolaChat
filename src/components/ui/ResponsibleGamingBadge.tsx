import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

function BolaPlate({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cx("overflow-hidden", className)}
      style={{ transform: "skewX(var(--bola-angle))" }}
    >
      <div style={{ transform: "skewX(calc(var(--bola-angle) * -1))" }}>
        {children}
      </div>
    </div>
  );
}

/**
 * CI 2.4 Responsible Gaming Integration: the "18+" badge and primary
 * message are a defined graphic asset, not just body copy - Action Yellow
 * "18+" chip plus a dark message plate, both cut at the Bola Angle.
 * Per the CI this must appear in the bottom portion of collateral, which is
 * why it's used in the site Footer, directly above the full regulatory text.
 */
export function ResponsibleGamingBadge({
  productName = "BolaChat",
  className,
}: {
  productName?: string;
  className?: string;
}) {
  return (
    <div className={cx("inline-flex items-stretch", className)}>
      <BolaPlate className="-mr-2 flex items-center bg-accent px-4">
        <span className="font-heading text-xl text-accent-foreground sm:text-2xl">
          18+
        </span>
      </BolaPlate>
      <BolaPlate className="flex flex-col justify-center bg-background-elevated py-2 pl-6 pr-4">
        <span className="font-heading text-xs text-foreground sm:text-sm">
          {productName} Responsibly
        </span>
        <span className="text-[11px] text-muted sm:text-xs">
          Winners know when to stop
        </span>
      </BolaPlate>
    </div>
  );
}
