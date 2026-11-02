import type { DeclineRequest, DeclineResult } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5151";

export async function declineContent(req: DeclineRequest): Promise<DeclineResult> {
  const res = await fetch(`${API_URL}/api/decline`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Erreur ${res.status} : ${text}`);
  }

  return res.json();
}