const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function parseISODate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (!year || month < 1 || month > 12 || day < 1 || day > 31) return null;
  return new Date(year, month - 1, day);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatLong(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!match) return iso;
  return `${Number(match[3])} ${MONTHS[Number(match[2]) - 1]} ${match[1]}`;
}

export function formatCAD(amount: number): string {
  const rounded = Math.round(amount);
  const sign = rounded < 0 ? "-" : "";
  const body = Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${sign}$${body}`;
}

export function formatPostal(value: string): string {
  const compact = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (compact.length <= 3) return compact;
  return `${compact.slice(0, 3)} ${compact.slice(3, 6)}`;
}

export function startOfToday(now = new Date()): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function endOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

export function plusDays(date: Date, days: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + days);
  return next;
}

export function stampPlusDays(from: Date, days: number): { createdAt: string; expiresAt: string } {
  const createdAt = from.toISOString();
  const expires = plusDays(from, days);
  expires.setHours(12, 0, 0, 0);
  return { createdAt, expiresAt: expires.toISOString() };
}

export function daysUntil(iso: string, now = new Date()): number {
  const end = parseISODate(iso);
  if (!end) return 0;
  return Math.ceil((end.getTime() - startOfToday(now).getTime()) / 86_400_000);
}

export function cityKey(value: string): string {
  return value.trim().toLocaleLowerCase("en-CA");
}
