import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-strong active:bg-accent-strong",
  secondary:
    "bg-transparent text-foreground border border-border hover:border-accent hover:text-accent",
  ghost: "bg-background-elevated text-foreground hover:bg-background-elevated-2",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "text-sm px-5 py-3",
  lg: "text-base px-6 py-4",
};

/**
 * Every outbound CTA (WhatsApp, registration, login) renders through this
 * component so link styling, focus states, and target/rel handling for
 * external links live in exactly one place.
 */
export function Button({
  href,
  variant = "primary",
  size = "md",
  icon,
  children,
  className,
  ...rest
}: ButtonProps) {
  const isExternal = href.startsWith("http") || href.startsWith("https://wa.me");

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...rest}
    >
      {icon}
      {children}
    </a>
  );
}
