import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/utils";

type ButtonVariant = "whatsapp" | "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
}

/**
 * "whatsapp" is the ONLY variant that uses WhatsApp's own green - reserved
 * for buttons that open a wa.me link, so the CTA still reads as "opens
 * WhatsApp" at a glance. Every other CTA on the site follows the CI
 * (5.1 Website UI Styling Guidelines): Action Yellow on Pitch Black for
 * primary actions, Chalk White outline for secondary ones.
 */
const variantClasses: Record<ButtonVariant, string> = {
  whatsapp:
    "bg-whatsapp text-white hover:bg-whatsapp-strong active:bg-whatsapp-strong",
  primary:
    "bg-accent text-accent-foreground hover:brightness-95 active:brightness-90",
  secondary:
    "bg-transparent text-foreground border border-foreground/70 hover:border-accent hover:text-accent",
  ghost: "bg-background-elevated text-foreground hover:bg-background-elevated-2",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "text-sm px-5 py-3",
  lg: "text-base px-6 py-4",
};

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
        "inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors duration-150",
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
