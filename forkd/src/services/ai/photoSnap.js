// Photo → recipe extraction — client wrapper.
//
// The GPT-4o vision call and the OpenAI key live in the `analyze-photo`
// Supabase Edge Function. The client never holds a provider key; it sends the
// base64 image to the proxy with the user's Supabase session token, which
// supabase.functions.invoke() attaches automatically.

import { supabase } from '../../lib/supabase';

const FAILURE_MESSAGE = "We couldn't read that photo — try manual entry or a clearer shot.";

/**
 * @param {string} base64Image  Raw base64 (no data: prefix).
 * @returns {Promise<{recipe: object|null, error: string|null}>}
 */
export async function analyzePhoto(base64Image) {
  if (typeof base64Image !== 'string' || base64Image.length === 0) {
    return { recipe: null, error: FAILURE_MESSAGE };
  }

  try {
    const { data, error } = await supabase.functions.invoke('analyze-photo', {
      body: { base64Image },
    });

    if (error) {
      return { recipe: null, error: FAILURE_MESSAGE };
    }

    // Edge function returns { recipe, error } — pass it straight through.
    return {
      recipe: data?.recipe ?? null,
      error: data?.error ?? null,
    };
  } catch {
    return { recipe: null, error: FAILURE_MESSAGE };
  }
}
