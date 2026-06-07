import OpenAI from 'openai';

const client = new OpenAI({ apiKey: process.env.EXPO_PUBLIC_OPENAI_KEY });

const SYSTEM_PROMPT = `You are a nutrition analysis assistant. Given a list of recipe ingredients, calculate approximate nutritional content per serving.

Return ONLY a valid JSON object matching this exact schema — no markdown, no code blocks, no explanation:
{
  "calories": number,
  "protein_g": number,
  "carbs_g": number,
  "fat_g": number,
  "fiber_g": number,
  "sugar_g": number,
  "sodium_mg": number,
  "servings": number,
  "confidence": "high" | "medium" | "low",
  "note": "string or null"
}

Confidence rules:
- "high": all ingredients clearly recognized with full nutritional data available
- "medium": most ingredients recognized, minor gaps filled with reasonable estimates
- "low": significant gaps, highly unusual ingredients, or insufficient data for accurate calculation

Rules:
- All numeric values are non-negative, rounded to one decimal place
- servings matches the serving count given in the prompt; default 1 if not specified
- note: include caveats about unusual ingredients or significant estimation uncertainty; null if none
- Return ONLY the JSON object`;

const USDA_BASE = 'https://api.nal.usda.gov/fdc/v1';
const USDA_KEY = process.env.EXPO_PUBLIC_USDA_KEY ?? 'DEMO_KEY';

function round1(n) {
  return Math.round(n * 10) / 10;
}

function isValidSchema(obj) {
  if (!obj || typeof obj !== 'object') return false;
  const numFields = ['calories', 'protein_g', 'carbs_g', 'fat_g', 'fiber_g', 'sugar_g', 'sodium_mg', 'servings'];
  for (const f of numFields) {
    if (typeof obj[f] !== 'number' || obj[f] < 0) return false;
  }
  if (!['high', 'medium', 'low'].includes(obj.confidence)) return false;
  return true;
}

function normalizeSchema(obj) {
  return {
    calories: round1(obj.calories),
    protein_g: round1(obj.protein_g),
    carbs_g: round1(obj.carbs_g),
    fat_g: round1(obj.fat_g),
    fiber_g: round1(obj.fiber_g),
    sugar_g: round1(obj.sugar_g),
    sodium_mg: round1(obj.sodium_mg),
    servings: obj.servings,
    confidence: obj.confidence,
    note: obj.note ?? null,
  };
}

async function usdaLookup(ingredientName) {
  try {
    const url = `${USDA_BASE}/foods/search?query=${encodeURIComponent(ingredientName)}&pageSize=1&dataType=SR%20Legacy,Foundation&api_key=${USDA_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    const food = data.foods?.[0];
    if (!food) return null;

    const n = {};
    for (const nutrient of food.foodNutrients || []) {
      // Energy appears as both kJ (id 1062) and KCAL (id 1008) — use KCAL only
      if (nutrient.nutrientName === 'Energy' && nutrient.unitName === 'KCAL') n.calories = nutrient.value;
      if (nutrient.nutrientName === 'Protein') n.protein_g = nutrient.value;
      if (nutrient.nutrientName === 'Carbohydrate, by difference') n.carbs_g = nutrient.value;
      if (nutrient.nutrientName === 'Total lipid (fat)') n.fat_g = nutrient.value;
      if (nutrient.nutrientName === 'Fiber, total dietary') n.fiber_g = nutrient.value;
      if (nutrient.nutrientName === 'Sugars, total including NLEA') n.sugar_g = nutrient.value;
      if (nutrient.nutrientName === 'Sodium, Na') n.sodium_mg = nutrient.value;
    }

    return Object.keys(n).length > 0 ? n : null;
  } catch {
    return null;
  }
}

function aggregateUSDA(results, servings) {
  const totals = { calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0, fiber_g: 0, sugar_g: 0, sodium_mg: 0 };
  let found = 0;

  for (const r of results) {
    if (r) {
      found++;
      for (const key of Object.keys(totals)) {
        totals[key] += r[key] ?? 0;
      }
    }
  }

  return { totals, found };
}

export async function analyzeNutrition(ingredients, servings = 1) {
  const ingredientText = ingredients
    .map((i) => `${i.quantity} ${i.unit} ${i.name}`.trim())
    .join('\n');

  // Primary: GPT-4o-mini
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 500,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        {
          role: 'user',
          content: `Analyze nutrition for ${servings} serving(s):\n\n${ingredientText}`,
        },
      ],
    });

    const raw = response.choices[0]?.message?.content?.trim();
    if (raw) {
      let parsed;
      try {
        parsed = JSON.parse(raw);
      } catch {
        parsed = null;
      }

      if (parsed && isValidSchema(parsed)) {
        return { nutrition: normalizeSchema(parsed), error: null };
      }
    }
  } catch {
    // Fall through to USDA
  }

  // Fallback: USDA FoodData Central (DEMO_KEY used if EXPO_PUBLIC_USDA_KEY not set)
  const usdaResults = await Promise.all(ingredients.map((i) => usdaLookup(i.name)));
  const { totals, found } = aggregateUSDA(usdaResults, servings);

  const confidence = 'low';
  const note =
    found === 0
      ? 'Could not retrieve nutrition data — no ingredients recognized by USDA.'
      : found < ingredients.length
        ? `Partial USDA data: ${ingredients.length - found} of ${ingredients.length} ingredient(s) not found.`
        : 'Nutrition sourced from USDA FoodData Central (OpenAI unavailable).';

  return {
    nutrition: {
      calories: round1(totals.calories / servings),
      protein_g: round1(totals.protein_g / servings),
      carbs_g: round1(totals.carbs_g / servings),
      fat_g: round1(totals.fat_g / servings),
      fiber_g: round1(totals.fiber_g / servings),
      sugar_g: round1(totals.sugar_g / servings),
      sodium_mg: round1(totals.sodium_mg / servings),
      servings,
      confidence,
      note,
    },
    error: null,
  };
}
