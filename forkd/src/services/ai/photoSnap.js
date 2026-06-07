import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_KEY });

const SYSTEM_PROMPT = `You are a recipe extraction assistant. Analyze the provided image and extract any recipe information visible.

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

export async function analyzePhoto(base64Image) {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1500,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
                detail: 'low',
              },
            },
            { type: 'text', text: 'Extract the recipe from this image.' },
          ],
        },
      ],
    });

    const raw = response.choices[0]?.message?.content?.trim();

    if (!raw || raw === 'null') {
      return { recipe: null, error: FAILURE_MESSAGE };
    }

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return { recipe: null, error: FAILURE_MESSAGE };
    }

    if (!isValidSchema(parsed)) {
      return { recipe: null, error: FAILURE_MESSAGE };
    }

    return { recipe: parsed, error: null };
  } catch {
    return { recipe: null, error: FAILURE_MESSAGE };
  }
}

function isValidSchema(obj) {
  if (!obj || typeof obj !== 'object') return false;
  if (typeof obj.title !== 'string' || obj.title.length === 0) return false;
  if (!Array.isArray(obj.ingredients)) return false;
  if (!Array.isArray(obj.steps)) return false;
  if (!Array.isArray(obj.cuisine_tags)) return false;
  if (!Array.isArray(obj.dietary_tags)) return false;
  const validTypes = ['recipe', 'ferment', 'mead', 'spirit', 'cider', 'homebrew', 'other'];
  if (!validTypes.includes(obj.content_type)) return false;
  return true;
}
