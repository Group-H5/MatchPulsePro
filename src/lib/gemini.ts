export async function generateMatchInsight(
  slug: string,
  matchData: any,
  options?: { lang?: string }
) {
  const lang = options?.lang || 'en';

  // build prompt (target <= 200 chars)
  let prompt = `You are a professional sports analyst. Provide a concise (<=200 chars) preview for the match between ${matchData.home} and ${matchData.away} in the ${matchData.league || 'league'}. Include two points: 1) brief betting/odds movement insight; 2) key matchup or player to watch. Use a neutral, professional tone.`;
  if (lang && lang !== 'en') {
    prompt += ` Generate output in ${lang}.`;
  }

  const previewFallback = `Preview: ${matchData.home} vs ${matchData.away} — ${matchData.status}. Key player: ${matchData.topPlayer || 'TBD'}. Edge: Balanced.`;

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
