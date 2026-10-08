import Image from "next/image";
import { BolaWordmark } from "@/components/ui/BolaWordmark";
import { cx } from "@/lib/utils";

/**
 * The Bolabet logo (white + yellow version, made for dark backgrounds).
 * Sized by height - pass e.g. "h-4" - the width follows automatically.
 */
export function BolabetLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/logos/bolabet-logo-white.png"
      alt="Bolabet"
      width={720}
      height={102}
      className={cx("w-auto", className)}
    />
  );
}

/**
 * Header lockup: BolaChat wordmark, a divider, then "by" + the Bolabet logo,
 * so it's clear at a glance that BolaChat comes from Bolabet.
 */
export function BolaChatByBolabet({ className }: { className?: string }) {
  return (
    <span
      className={cx("flex items-center gap-2.5 sm:gap-3.5", className)}
      aria-label="BolaChat by Bolabet"
    >
      <BolaWordmark className="text-base sm:text-xl" />
      <span aria-hidden="true" className="h-5 w-px bg-border sm:h-6" />
      <span className="flex items-center gap-1.5 sm:gap-2" aria-hidden="true">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted sm:text-xs">
          by
        </span>
        <BolabetLogo className="h-3 sm:h-4" />
      </span>
    </span>
  );
}

/** Footer lockup: "A Bolabet product" with the logo. */
export function BolabetProductLine({ className }: { className?: string }) {
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <span className="text-xs font-semibold uppercase tracking-wider text-muted">
        A product of
      </span>
      <BolabetLogo className="h-5" />
    </div>
  );
}
