import { cx } from "@/lib/utils";

type SportArtVariant = "hero" | "soccer" | "basketball" | "boxing";

const icons: Record<SportArtVariant, React.ReactNode> = {
  hero: (
    <path d="M32 4a28 28 0 1 0 0 56 28 28 0 0 0 0-56Zm0 4 8.6 6.24-3.28 10.1H26.68l-3.28-10.1L32 8Zm-14.5 10.86 8.9 6.46-2.06 10.58-10.44 1.6A24 24 0 0 1 17.5 18.86Zm29 0a24 24 0 0 1 3.6 18.64l-10.44-1.6-2.06-10.58 8.9-6.46ZM24.9 39.2h14.2l4.4 9.9A23.9 23.9 0 0 1 32 56a23.9 23.9 0 0 1-11.5-6.9l4.4-9.9Z" />
  ),
  soccer: (
    <path d="M32 4a28 28 0 1 0 0 56 28 28 0 0 0 0-56Zm0 4 8.6 6.24-3.28 10.1H26.68l-3.28-10.1L32 8Zm-14.5 10.86 8.9 6.46-2.06 10.58-10.44 1.6A24 24 0 0 1 17.5 18.86Zm29 0a24 24 0 0 1 3.6 18.64l-10.44-1.6-2.06-10.58 8.9-6.46ZM24.9 39.2h14.2l4.4 9.9A23.9 23.9 0 0 1 32 56a23.9 23.9 0 0 1-11.5-6.9l4.4-9.9Z" />
  ),
  basketball: (
    <path d="M32 4a28 28 0 1 0 0 56 28 28 0 0 0 0-56ZM8.2 30h11.4a35.6 35.6 0 0 0-3.2-13.3A24.1 24.1 0 0 0 8.2 30Zm8.2-16.9A31.6 31.6 0 0 1 23.6 30H30V8.2A23.9 23.9 0 0 0 16.4 13.1ZM34 8.2V30h6.4a31.6 31.6 0 0 1 7.2-16.9A23.9 23.9 0 0 0 34 8.2ZM44.6 16.7A35.6 35.6 0 0 0 41.4 30h11.4a24.1 24.1 0 0 0-8.2-13.3ZM8.2 34a24.1 24.1 0 0 0 8.2 13.3A35.6 35.6 0 0 0 19.6 34H8.2Zm12.2 0a31.6 31.6 0 0 0 7.2 16.9A23.9 23.9 0 0 0 30 55.8V34h-9.6Zm13.6 0v21.8a23.9 23.9 0 0 0 13.6-4.9A31.6 31.6 0 0 0 34 34Zm7.4 0a35.6 35.6 0 0 0 3.2 13.3 24.1 24.1 0 0 0 8.2-13.3H41.4Z" />
  ),
  boxing: (
    <path d="M20 8a6 6 0 0 0-6 6v6.34A10 10 0 0 0 8 30v10a14 14 0 0 0 14 14h6a14 14 0 0 0 14-14v-3.06A9.94 9.94 0 0 0 46 30V18a6 6 0 0 0-12 0v2h-2v-6a6 6 0 0 0-6-6h-2a6 6 0 0 0-6 6v6h-2v-6a6 6 0 0 0-6-6Z" />
  ),
};

/**
 * Stand-in visual treatment used until the client supplies real photography.
 * Drop finished assets into /public/images and swap this for next/image - 
 * see README "Adding photography assets".
 */
export function SportArt({
  variant,
  className,
  label,
}: {
  variant: SportArtVariant;
  className?: string;
  label?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label ?? `${variant} illustration`}
      className={cx(
        "relative flex items-center justify-center overflow-hidden rounded-2xl",
        "bg-gradient-to-br from-background-elevated-2 via-background-elevated to-background",
        className
      )}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(37,211,102,0.25), transparent 45%), radial-gradient(circle at 80% 80%, rgba(37,211,102,0.12), transparent 40%)",
        }}
      />
      <svg
        viewBox="0 0 64 64"
        className="relative h-16 w-16 text-accent/80 sm:h-20 sm:w-20"
        fill="currentColor"
      >
        {icons[variant]}
      </svg>
    </div>
  );
}
