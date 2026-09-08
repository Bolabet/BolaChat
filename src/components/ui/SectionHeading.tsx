import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  className,
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        {heading}
      </h2>
      {body && <p className="mt-4 text-base leading-relaxed text-muted">{body}</p>}
    </div>
  );
}
