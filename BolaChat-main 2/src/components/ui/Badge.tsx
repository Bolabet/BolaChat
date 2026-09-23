import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background-elevated px-3.5 py-1.5 text-xs font-medium text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
