// Minimal OpenAI Chat Completions client for Deno edge functions.
// Uses fetch directly (no SDK) to keep cold-start fast — every second counts
// against the <5s nutrition latency gate. The API key lives only in the
// function's environment (set via `supabase secrets set OPENAI_API_KEY=...`)
// and is never exposed to the client.

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";

export class OpenAIConfigError extends Error {}

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: unknown;
};

export async function chatCompletion(opts: {
  model: string;
  messages: ChatMessage[];
  maxTokens: number;
  timeoutMs?: number;
}): Promise<string | null> {
  const apiKey = Deno.env.get("OPENAI_API_KEY");
  if (!apiKey) {
    // Surfaced as a 500 by callers; means the secret was never set.
    throw new OpenAIConfigError("OPENAI_API_KEY is not configured");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), opts.timeoutMs ?? 12000);

  try {
    const res = await fetch(OPENAI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: opts.model,
        max_tokens: opts.maxTokens,
        messages: opts.messages,
      }),
      signal: controller.signal,
    });

    if (!res.ok) return null;
    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content;
    return typeof raw === "string" ? raw.trim() : null;
  } catch {
    // Network error, abort/timeout, or bad JSON — caller decides fallback.
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
