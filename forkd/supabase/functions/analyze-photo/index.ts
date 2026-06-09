// analyze-photo — server-side proxy (CTO-1 / FOR-19).
// Input:  { base64Image: string }   (raw base64, no data: prefix)
// Output: { recipe: {...} | null, error: string | null }
//
// Runs GPT-4o vision to extract recipe structure from a photo. The OpenAI key
// lives only in the function environment, never in the Expo bundle.

import { chatCompletion, OpenAIConfigError } from "../_shared/openai.ts";
import { handlePreflight, json } from "../_shared/cors.ts";

const SYSTEM_PROMPT =
  `You are a recipe extraction assistant. Analyze the provided image and extract any recipe information visible.

Return ONLY a valid JSON object matching this exact schema — no markdown, no code blocks, no explanation:
{
  "title": "string",
  "description": "string or null",
  "ingredients": [{ "quantity": "string", "unit": "string", "name": "string" }],
  "steps": [{ "description": "string" }],
  "cuisine_tags": ["string"],
  "dietary_tags": ["string"],
  "content_type": "recipe | ferment | mead | spirit | cider | homebrew | other"
}

Rules:
- If the image contains no readable recipe text or recognizable recipe content, return exactly: null
- Never invent ingredients or steps not clearly visible in the image
- quantity: numeric string ("2", "1/2", "¼") or empty string if not specified
- unit: measurement unit ("cup", "tbsp", "g", "ml") or empty string if not specified
- cuisine_tags: cuisine style labels (e.g. ["Italian", "Asian"])
- dietary_tags: applicable tags only from ["vegetarian", "vegan", "gluten-free", "dairy-free", "keto", "paleo"]
- content_type: "recipe" for standard food; "ferment" for fermented foods; "mead" for mead; "spirit" for spirits/liquor; "cider" for cider; "homebrew" for beer/wine; "other" for anything else
- Return ONLY the JSON object or the literal value null`;

const FAILURE_MESSAGE = "We couldn't read that photo — try manual entry or a clearer shot.";

function isValidSchema(obj: any): boolean {
  if (!obj || typeof obj !== "object") return false;
  if (typeof obj.title !== "string" || obj.title.length === 0) return false;
  if (!Array.isArray(obj.ingredients)) return false;
  if (!Array.isArray(obj.steps)) return false;
  if (!Array.isArray(obj.cuisine_tags)) return false;
  if (!Array.isArray(obj.dietary_tags)) return false;
  const validTypes = ["recipe", "ferment", "mead", "spirit", "cider", "homebrew", "other"];
  if (!validTypes.includes(obj.content_type)) return false;
  return true;
}

async function analyzePhoto(base64Image: string) {
  const raw = await chatCompletion({
    model: "gpt-4o",
    maxTokens: 1500,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: `data:image/jpeg;base64,${base64Image}`, detail: "low" },
          },
          { type: "text", text: "Extract the recipe from this image." },
        ],
      },
    ],
  });

  if (!raw || raw === "null") return { recipe: null, error: FAILURE_MESSAGE };

  let parsed: any = null;
  try { parsed = JSON.parse(raw); } catch { return { recipe: null, error: FAILURE_MESSAGE }; }

  if (!isValidSchema(parsed)) return { recipe: null, error: FAILURE_MESSAGE };

  return { recipe: parsed, error: null };
}

Deno.serve(async (req) => {
  const preflight = handlePreflight(req);
  if (preflight) return preflight;

  if (req.method !== "POST") return json({ recipe: null, error: "Method not allowed" }, 405);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ recipe: null, error: "Invalid JSON body" }, 400);
  }

  const base64Image = body?.base64Image;
  if (typeof base64Image !== "string" || base64Image.length === 0) {
    return json({ recipe: null, error: "base64Image is required" }, 400);
  }

  try {
    const result = await analyzePhoto(base64Image);
    return json(result, 200);
  } catch (err) {
    if (err instanceof OpenAIConfigError) {
      return json({ recipe: null, error: "Photo service is not configured." }, 500);
    }
    return json({ recipe: null, error: FAILURE_MESSAGE }, 500);
  }
});
