// Vercel KV (Upstash Redis) REST API helper
// No package installation needed - uses raw fetch

export async function kvGet(key: string): Promise<string | null> {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return null

  try {
    const res = await fetch(`${url}/get/${key}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    const data = await res.json()
    return data.result || null
  } catch {
    return null
  }
}

export async function kvSet(key: string, value: string): Promise<boolean> {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) return false

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(["SET", key, value]),
    })
    const data = await res.json()
    return data.result === "OK"
  } catch {
    return false
  }
}

export function isKvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN)
}
