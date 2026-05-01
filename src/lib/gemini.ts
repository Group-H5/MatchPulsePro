import fs from 'fs';
import path from 'path';

const CACHE_DIR = path.resolve(process.cwd(), '.cache', 'gemini');

async function ensureCacheDir() {
  try {
    await fs.promises.mkdir(CACHE_DIR, { recursive: true });
  } catch (e) {
    // ignore
  }
}

function cachePathFor(slug: string) {
  return path.join(CACHE_DIR, `${slug.replace(/[^a-z0-9_-]/gi, '_')}.json`);
}

export async function generateMatchInsight(
  slug: string,
  matchData: any,
  options?: { lang?: string }
) {
  const lang = options?.lang || 'en';

  // Try file cache if filesystem is available; otherwise skip cache in Edge.
  let fsModule: any = null;
  let pathModule: any = null;
  let cacheFile = null;
  try {
    // dynamic import to avoid errors in Edge runtime
    // @ts-ignore
    fsModule = await import('fs');
    // @ts-ignore
    pathModule = await import('path');
    const CACHE_DIR = pathModule.resolve(process.cwd(), '.cache', 'gemini');
    try {
      await fsModule.promises.mkdir(CACHE_DIR, { recursive: true });
    } catch (e) {}
    cacheFile = pathModule.join(CACHE_DIR, `${slug.replace(/[^a-z0-9_-]/gi, '_')}.json`);

    // Try cache (10 minutes TTL)
    const stat = await fsModule.promises.stat(cacheFile).catch(() => null);
    if (stat) {
      const now = Date.now();
      const mtime = stat.mtimeMs || 0;
      if (now - mtime < 1000 * 60 * 10) {
        const raw = await fsModule.promises.readFile(cacheFile, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && parsed.insight) return parsed.insight;
      }
    }
  } catch (e) {
    // Filesystem not available (Edge), skip file cache
    fsModule = null;
  }

  // build prompt (target <= 200 chars)
  let prompt = `You are a professional sports analyst. Provide a concise (<=200 chars) preview for the match between ${matchData.home} and ${matchData.away} in the ${matchData.league || 'league'}. Include two points: 1) brief betting/odds movement insight; 2) key matchup or player to watch. Use a neutral, professional tone.`;
  if (lang && lang !== 'en') {
    prompt += ` Generate output in ${lang}.`;
  }

  const previewFallback = `Preview: ${matchData.home} vs ${matchData.away} — ${matchData.status}. Key player: ${matchData.topPlayer || 'TBD'}. Edge: Balanced.`;

  // If GEMINI_API_KEY present, call external API
  if (process.env.GEMINI_API_KEY) {
    try {
      const res = await fetch(process.env.GEMINI_ENDPOINT || 'https://api.gemini.example/v1/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
        body: JSON.stringify({ prompt, max_tokens: 300 }),
      });
      const json = await res.json();
      const text = json?.text || json?.choices?.[0]?.text || previewFallback;

      // write cache if possible
      try {
        if (fsModule && cacheFile) {
          await fsModule.promises.writeFile(cacheFile, JSON.stringify({ insight: text }), 'utf-8');
        }
      } catch (e) {}

      return text;
    } catch (e) {
      // continue to fallback
    }
  }

  // no API or failed -> use fallback and cache it if possible
  try {
    if (fsModule && cacheFile) {
      await fsModule.promises.writeFile(cacheFile, JSON.stringify({ insight: previewFallback }), 'utf-8');
    }
  } catch (e) {}

  return previewFallback;
}
