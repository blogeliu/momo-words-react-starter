// src/lib/ai.js
// Pluggable AI generator with a safe local fallback.
// Replace callYourBackend() to use any LLM behind your own server.

function simpleExtract(text, limit = 15) {
  // crude noun-ish extractor: words 3-20 letters, uniq, frequency-ranked
  const words = (text || "")
    .toLowerCase()
    .replace(/[^a-z\u4e00-\u9fa5\s]/g, " ")
    .split(/\s+/)
    .filter(w => w.length >= 3 && w.length <= 20);

  const freq = new Map();
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1);

  const sorted = [...freq.entries()]
    .sort((a,b) => b[1]-a[1])
    .map(([w]) => w)
    .filter((w, i, arr) => arr.indexOf(w) === i);

  return sorted.slice(0, limit);
}

// --------- Plug your real AI backend here ----------
async function callYourBackend(topicOrText, targetLang = "zh-CN") {
  // If you have a backend route like /api/generate, call it here:
  // return fetch("/api/generate", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ text: topicOrText, targetLang }) }).then(r => r.json());
  // Expected shape: { cards: [{ term, definition }] }

  // No backend? Return null so we fall back to local.
  return null;
}
// ---------------------------------------------------

export async function generateFlashcards(topicOrText, targetLang = "zh-CN") {
  // Try your real backend first:
  try {
    const fromApi = await callYourBackend(topicOrText, targetLang);
    if (fromApi && Array.isArray(fromApi.cards) && fromApi.cards.length) {
      return fromApi.cards;
    }
  } catch (e) {
    console.warn("AI backend error, falling back to local heuristic:", e);
  }

  // Fallback: simple extraction with placeholder definitions.
  const terms = simpleExtract(topicOrText, 15);
  return terms.map((t, i) => ({
    id: `ai${i+1}`,
    term: t,
    // You can hand-edit these before saving:
    definition: targetLang.startsWith("zh") ? "（定义/翻译待补）" : "(definition/translation)",
    ease: 2.5,
    interval: 0,
    dueAt: Date.now()
  }));
}
