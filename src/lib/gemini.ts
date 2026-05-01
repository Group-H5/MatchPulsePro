export async function generateMatchInsight(
  slug: string,
  matchData: any,
  options?: { lang?: string }
) {
  const lang = options?.lang || 'en';

  let prompt = `You are a senior NBA data expert and betting-market analyst. Write a concise NBA Playoffs preview for ${matchData.home} vs ${matchData.away}. Must cover: Key Matchups, injury impact, and a tactical prediction for playoff intensity. Keep it sharp, credible, and SEO-friendly.`;
  if (lang && lang !== 'en') {
    prompt += ` Generate output in ${lang}; for pl and ko, use natural local basketball terminology rather than literal translation.`;
  }

  const previewFallback = `NBA Playoffs: ${matchData.home} vs ${matchData.away}. Key matchup: ${matchData.topPlayer || 'TBD'}. Injury depth and half-court execution shape the edge.`;

  // If GEMINI_API_KEY present, call external API
  if (process.env.GEMINI_API_KEY) {
    try {
      const res = await fetch(
        process.env.GEMINI_ENDPOINT || 'https://api.gemini.example/v1/generate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          },
          body: JSON.stringify({ prompt, max_tokens: 300 }),
        }
      );
      const json = await res.json();
      const text = json?.text || json?.choices?.[0]?.text || previewFallback;

      return text;
    } catch (e) {
      // continue to fallback
    }
  }

  return previewFallback;
}
