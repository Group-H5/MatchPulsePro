import { NextResponse } from 'next/server';
import { getHotMatches, fetchMatchDataBySlug } from '@/lib/sportsApi';
import { generateMatchInsight } from '@/lib/gemini';

export async function GET() {
  try {
    // Simulate fetching top hot matches (would be Google Trends or a news API in prod)
    const matches = await getHotMatches();

    // For each match, pre-generate insight (cached by generateMatchInsight)
    const results = [];
    for (const m of matches) {
      const matchData = await fetchMatchDataBySlug(m.slug);
      const insight = await generateMatchInsight(m.slug, matchData);
      results.push({ slug: m.slug, home: m.home, away: m.away, kickoff: m.kickoff, insight });
    }

    return NextResponse.json({ detected: true, items: results });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
