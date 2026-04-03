const TTL_OPTIONS: Record<string, number> = {
  "15m": 900,
  "1h": 3600,
  "24h": 86400,
  "7d": 604800,
};

const MAX_SIZE = 500 * 1024; // 500KB

// KV env vars for Redis, fallback to in-memory
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

async function redisCmd(...args: string[]): Promise<any> {
  if (!KV_URL || !KV_TOKEN) return null;
  const res = await fetch(KV_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(args),
  });
  const data = await res.json();
  return data.result;
}

const memStore = new Map<string, { html: string; expiresAt: number }>();

function cleanExpired() {
  const now = Date.now();
  for (const [k, v] of memStore) {
    if (v.expiresAt <= now) memStore.delete(k);
  }
}

export function getTTLSeconds(expiry: string): number {
  return TTL_OPTIONS[expiry] || 900;
}

export async function storeDeploy(id: string, html: string, expiry: string): Promise<{ expiresAt: number }> {
  if (Buffer.byteLength(html, "utf-8") > MAX_SIZE) {
    throw new Error("HTML exceeds 500KB limit");
  }
  const ttl = getTTLSeconds(expiry);
  const expiresAt = Date.now() + ttl * 1000;
  const payload = JSON.stringify({ html, expiresAt });

  if (KV_URL && KV_TOKEN) {
    await redisCmd("SET", `html:${id}`, payload, "EX", String(ttl));
  } else {
    memStore.set(id, { html, expiresAt });
    setTimeout(() => memStore.delete(id), ttl * 1000);
  }
  return { expiresAt };
}

export async function getDeploy(id: string): Promise<{ html: string; expiresAt: number } | null> {
  if (KV_URL && KV_TOKEN) {
    const raw = await redisCmd("GET", `html:${id}`);
    if (!raw) return null;
    const data = typeof raw === "string" ? JSON.parse(raw) : raw;
    return { html: data.html, expiresAt: data.expiresAt };
  } else {
    cleanExpired();
    const entry = memStore.get(id);
    if (!entry || entry.expiresAt <= Date.now()) return null;
    return entry;
  }
}
