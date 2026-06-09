// Nutrition analysis — client wrapper.
//
// All provider logic (OpenAI + USDA) and the API keys live in the
// `analyze-nutrition` Supabase Edge Function. The client never holds a
// provider key; it calls the proxy with the user's Supabase session token,
// which supabase.functions.invoke() attaches automatically.

import { supabase } from '../../lib/supabase';

const GENERIC_ERROR = 'Could not analyze nutrition. Please try again.';

/**
 * @param {{quantity?: string, unit?: string, name: string}[]} ingredients
 * @param {number} servings
 * @returns {Promise<{nutrition: object|null, error: string|null}>}
 */
export async function analyzeNutrition(ingredients, servings = 1) {
  if (!Array.isArray(ingredients) || ingredients.length === 0) {
    return { nutrition: null, error: 'Add at least one ingredient to analyze nutrition.' };
  }

  try {
    const { data, error } = await supabase.functions.invoke('analyze-nutrition', {
      body: { ingredients, servings },
    });

    if (error) {
      return { nutrition: null, error: GENERIC_ERROR };
    }

    // Edge function returns { nutrition, error } — pass it straight through.
    return {
      nutrition: data?.nutrition ?? null,
      error: data?.error ?? null,
    };
  } catch {
    return { nutrition: null, error: GENERIC_ERROR };
  }
}
