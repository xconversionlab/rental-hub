import { EXPIRY_DAYS } from "@/domain/catalog";
import { plusDays, toISODate } from "@/domain/format";
import type { RecordStatus } from "@/domain/types";

/**
 * Marketplace listings and tenant requirements expire 60 days after they are
 * created. Expired user-created marketplace records are removed from this
 * local prototype on hydration and while the app is open. Labelled sample
 * records are retained for demonstration but treated as unavailable.
 * Production must enforce deletion with a server-side scheduled job.
 * Profiles, verification records, and enquiries are outside this rule and are
 * not removed by marketplace expiry.
 */
export function statusFromExpiry(expiresAt: string, now = Date.now()): RecordStatus {
  const time = new Date(expiresAt).getTime();
  if (Number.isNaN(time)) return "expired";
  return time < now ? "expired" : "active";
}

export function expiryFrom(created: Date, days = EXPIRY_DAYS): string {
  const expires = plusDays(created, days);
  expires.setHours(12, 0, 0, 0);
  return expires.toISOString();
}

export function todayStamp(now = new Date()): { createdAt: string; expiresAt: string; status: RecordStatus } {
  return {
    createdAt: now.toISOString(),
    expiresAt: expiryFrom(now),
    status: "active",
  };
}

export function renewStamp(now = new Date()): { createdAt: string; expiresAt: string; status: RecordStatus } {
  return todayStamp(now);
}

export function dateOnly(iso: string): string {
  return toISODate(new Date(iso));
}
