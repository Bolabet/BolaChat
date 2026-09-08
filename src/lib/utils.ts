/** Joins class names, dropping falsy values. Keeps components free of clsx/cn dependencies. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
