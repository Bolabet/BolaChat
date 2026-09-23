import type { WhatsAppConfig } from "@/types/market";

/**
 * Builds a safe wa.me deep link.
 *
 * Centralising this means every "Start chatting" / "See PowerPlays" button
 * across the app goes through one function instead of hand-rolled
 * `https://wa.me/...` strings scattered across components.
 */
export function buildWhatsAppUrl(
  numberE164: string,
  message?: string
): string {
  const digitsOnly = numberE164.replace(/[^0-9]/g, "");
  const base = `https://wa.me/${digitsOnly}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Convenience wrapper for the primary "start chatting" CTA. */
export function getDefaultWhatsAppUrl(whatsapp: WhatsAppConfig): string {
  return buildWhatsAppUrl(whatsapp.numberE164, whatsapp.defaultMessage);
}

/** Convenience wrapper for the PowerPlays CTA, which prefills a different message. */
export function getPowerPlaysWhatsAppUrl(whatsapp: WhatsAppConfig): string {
  return buildWhatsAppUrl(whatsapp.numberE164, whatsapp.powerPlaysMessage);
}
