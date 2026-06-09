// analyze-nutrition — server-side proxy (CTO-1 / FOR-19).
// Input:  { ingredients: [{ quantity, unit, name }], servings? }
// Output: { nutrition: {...} | null, error: string | null }
//
// Primary path: GPT-4o-mini single call (fast, fits the <5s gate).
// Fallback:     USDA FoodData Central lookups when OpenAI is unavailable.
// All provider keys stay in the function environment, never in the bundle.

import { chatCompletion, OpenAIConfigError } from "../_shared/openai.ts";
import { handlePreflight, json } from "../_shared/cors.ts";

const SYSTEM_PROMPT =
  `You are a nutrition analysis assistant. Given a list of recipe ingredients, calculate approximate nutritional content per serving.

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

const USDA_BASE = "https://api.nal.usda.gov/fdc/v1";
const USDA_KEY = Deno.env.get("USDA_API_KEY") ?? "DEMO_KEY";

type Ingredient = { quantity?: string; unit?: string; name?: string };

const round1 = (n: number) => Math.round(n * 10) / 10;

function isValidSchema(obj: any): boolean {
  if (!obj || typeof obj !== "object") return false;
  const numFields = [
    "calories", "protein_g", "carbs_g", "fat_g",
    "fiber_g", "sugar_g", "sodium_mg", "servings",
  ];
  for (const f of numFields) {
    if (typeof obj[f] !== "number" || obj[f] < 0) return false;
  }
  if (!["high", "medium", "low"].includes(obj.confidence)) return false;
  return true;
}

function normalizeSchema(obj: any) {
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

async function usdaLookup(ingredientName: string) {
  try {
    const url =
      `${USDA_BASE}/foods/search?query=${encodeURIComponent(ingredientName)}` +
      `&pageSize=1&dataType=SR%20Legacy,Foundation&api_key=${USDA_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return null;

    const data = await res.json();
    const food = data.foods?.[0];
    if (!food) return null;

    const n: Record<string, number> = {};
    for (const nutrient of food.foodNutrients || []) {
      if (nutrient.nutrientName === "Energy" && nutrient.unitName === "KCAL") n.calories = nutrient.value;
      if (nutrient.nutrientName === "Protein") n.protein_g = nutrient.value;
      if (nutrient.nutrientName === "Carbohydrate, by difference") n.carbs_g = nutrient.value;
      if (nutrient.nutrientName === "Total lipid (fat)") n.fat_g = nutrient.value;
      if (nutrient.nutrientName === "Fiber, total dietary") n.fiber_g = nutrient.value;
      if (nutrient.nutrientName === "Sugars, total including NLEA") n.sugar_g = nutrient.value;
      if (nutrient.nutrientName === "Sodium, Na") n.sodium_mg = nutrient.value;
    }

    return Object.keys(n).length > 0 ? n : null;
  } catch {
    return null;
  }
}

function aggregateUSDA(results: (Record<string, number> | null)[]) {
  const totals: Record<string, number> = {
    calories: 0, protein_g: 0, carbs_g: 0, fat_g: 0,
    fiber_g: 0, sugar_g: 0, sodium_mg: 0,
  };
  let found = 0;
  for (const r of results) {
    if (r) {
      found++;
      for (const key of Object.keys(totals)) totals[key] += r[key] ?? 0;
    }
  }
  return { totals, found };
}

async function analyzeNutrition(ingredients: Ingredient[], servings: number) {
  const ingredientText = ingredients
    .map((i) => `${i.quantity ?? ""} ${i.unit ?? ""} ${i.name ?? ""}`.trim())
    .join("\n");

  // Primary: GPT-4o-mini
  const raw = await chatCompletion({
    model: "gpt-4o-mini",
    maxTokens: 500,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Analyze nutrition for ${servings} serving(s):\n\n${ingredientText}` },
    ],
  });

  if (raw) {
    let parsed: any = null;
    try { parsed = JSON.parse(raw); } catch { parsed = null; }
    if (parsed && isValidSchema(parsed)) {
      return { nutrition: normalizeSchema(parsed), error: null };
    }
  }

  // Fallback: USDA FoodData Central
  const usdaResults = await Promise.all(ingredients.map((i) => usdaLookup(i.name ?? "")));
  const { totals, found } = aggregateUSDA(usdaResults);

  const note =
    found === 0
      ? "Could not retrieve nutrition data — no ingredients recognized by USDA."
      : found < ingredients.length
        ? `Partial USDA data: ${ingredients.length - found} of ${ingredients.length} ingredient(s) not found.`
        : "Nutrition sourced from USDA FoodData Central (OpenAI unavailable).";

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
      confidence: "low",
      note,
    },
    error: null,
  };
}

Deno.serve(async (req) => {
  const preflight = handlePreflight(req);
  if (preflight) return preflight;

  if (req.method !== "POST") return json({ nutrition: null, error: "Method not allowed" }, 405);

  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ nutrition: null, error: "Invalid JSON body" }, 400);
  }

  const ingredients = body?.ingredients;
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return json({ nutrition: null, error: "ingredients must be a non-empty array" }, 400);
  }

  const servings = Number(body?.servings) > 0 ? Number(body.servings) : 1;

  try {
    const result = await analyzeNutrition(ingredients, servings);
    return json(result, 200);
  } catch (err) {
    if (err instanceof OpenAIConfigError) {
      return json({ nutrition: null, error: "Nutrition service is not configured." }, 500);
    }
    return json({ nutrition: null, error: "Nutrition analysis failed. Please try again." }, 500);
  }
});
