import Anthropic from "@anthropic-ai/sdk";
import { NIC_SYSTEM_PROMPT, NIC_ASSISTANT } from "@/lib/nic-assistant";

// L'assistente funziona solo con ANTHROPIC_API_KEY impostata (in locale via
// .env.local, su Vercel nelle Environment Variables). Senza chiave risponde
// 503 e il widget mostra un messaggio di cortesia — mai un errore grezzo.

type ChatMessage = { role: "user" | "assistant"; content: string };

function sanitize(messages: unknown): ChatMessage[] | null {
  if (!Array.isArray(messages) || messages.length === 0) return null;
  const out: ChatMessage[] = [];
  for (const m of messages.slice(-NIC_ASSISTANT.maxMessages)) {
    if (
      !m ||
      typeof m !== "object" ||
      !("role" in m) ||
      !("content" in m) ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.trim().length === 0
    ) {
      return null;
    }
    out.push({
      role: m.role,
      content: m.content.slice(0, NIC_ASSISTANT.maxInputChars),
    });
  }
  if (out[0].role !== "user") out.shift();
  if (out.length === 0 || out[out.length - 1].role !== "user") return null;
  return out;
}

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const messages = sanitize(
    (body as { messages?: unknown } | null)?.messages,
  );
  if (!messages) {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const client = new Anthropic({ apiKey });

  try {
    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 1024,
      system: [
        {
          type: "text",
          text: NIC_SYSTEM_PROMPT,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });

    if (response.stop_reason === "refusal") {
      return Response.json({
        reply:
          "Preferisco non rispondere a questa richiesta. Per qualsiasi necessità puoi scrivere a " +
          NIC_ASSISTANT.handoffEmail +
          ".",
      });
    }

    const reply = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    return Response.json({
      reply: reply || "Non ho una risposta per questo. " + NIC_ASSISTANT.handoffMarker,
    });
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return Response.json({ error: "rate_limited" }, { status: 429 });
    }
    if (err instanceof Anthropic.APIError) {
      return Response.json({ error: "upstream" }, { status: 502 });
    }
    return Response.json({ error: "unknown" }, { status: 500 });
  }
}
