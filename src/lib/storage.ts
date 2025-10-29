export const LS_KEYS = {
  signatures: "app.signatures",
  adItems: "app.adItems",      // [{ src, href? }]
  adImages: "app.adImages",    // legacy: [string]
  adIntervalSec: "app.adIntervalSec",
  aboutText: "app.aboutText",
} as const;

export type AdItem = { src: string; href?: string };

export function loadNumber(key: string, fallback: number): number {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

export function loadString(key: string, fallback = ""): string {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  return raw == null ? fallback : raw;
}

function loadStringArray(key: string): string[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(key);
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

type AdJSON = { src?: unknown; href?: unknown };
function toAdItem(x: unknown): AdItem | null {
  if (typeof x === "object" && x !== null) {
    const rec = x as AdJSON;
    const src = typeof rec.src === "string" ? rec.src : "";
    const href = typeof rec.href === "string" ? rec.href : undefined;
    return src ? { src, href } : null;
  }
  return null;
}

export function loadAdItems(): AdItem[] {
  if (typeof window === "undefined") return [];

  // Prefer new schema
  const raw = window.localStorage.getItem(LS_KEYS.adItems);
  if (raw) {
    try {
      const arr: unknown = JSON.parse(raw);
      if (Array.isArray(arr)) {
        return arr.map(toAdItem).filter((x): x is AdItem => x !== null);
      }
    } catch {
      // fall through to legacy
    }
  }

  // Legacy migration: adImages -> adItems
  const legacy = loadStringArray(LS_KEYS.adImages);
  if (legacy.length) {
    const mapped: AdItem[] = legacy.map((src) => ({ src, href: "" }));
    window.localStorage.setItem(LS_KEYS.adItems, JSON.stringify(mapped));
    window.localStorage.removeItem(LS_KEYS.adImages);
    return mapped;
  }

  return [];
}

export function save<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    key,
    typeof value === "string" ? (value as string) : JSON.stringify(value)
  );
}
