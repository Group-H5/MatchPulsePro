import React from 'react';
import { fetchMatchDataBySlug } from '@/lib/sportsApi';
import { generateMatchInsight } from '@/lib/gemini';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const matchData = await fetchMatchDataBySlug(slug);
  const title = `${matchData.home} vs ${matchData.away} Live - MatchPulse`;
  const description = `Live updates and AI insights for ${matchData.home} vs ${matchData.away}. Real-time scores, stats and watching guide.`;
  return {
    title,
    description,
    keywords: [`${matchData.home} vs ${matchData.away}`, 'live score', 'ai prediction'],
  };
}

export default async function MatchPage({ params, searchParams }: { params: { slug: string }, searchParams?: { [key:string]: string | string[] } }) {
  const { slug } = params;
  const langParam = (searchParams && (searchParams.lang as string)) || (searchParams && (searchParams.locale as string)) || 'en';
  const lang = (typeof langParam === 'string' && langParam.length === 2) ? langParam : 'en';

  const matchData = await fetchMatchDataBySlug(slug);
  const insight = await generateMatchInsight(slug, matchData, { lang });

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto bg-brand-surface rounded-2xl p-6 border border-white/5">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">
              {matchData.home} <span className="text-gray-400">vs</span> {matchData.away}
            </h1>
            <div className="text-sm text-gray-400">Status: {matchData.status} • Kickoff: {new Date(matchData.kickoff).toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold">{matchData.score.home} - {matchData.score.away}</div>
            <div className="text-sm text-gray-400">Live Pulse</div>
          </div>
        </header>

        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">AI Match Insight</h3>
          <p className="text-gray-200 leading-relaxed">{insight}</p>
        </section>

        <section>
          <h4 className="text-md font-medium text-gray-300 mb-2">Where to Watch</h4>
          <div className="text-sm text-gray-400">Official broadcasters and streaming links will appear here.</div>
        </section>
      </div>
      {/* JSON-LD for SportsEvent */}
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SportsEvent',
        name: `${matchData.home} vs ${matchData.away}`,
        startDate: matchData.kickoff,
        location: matchData.slug && matchData.slug.includes('world-cup') ? '2026 FIFA World Cup host cities' : '',
        homeTeam: { '@type': 'SportsTeam', name: matchData.home },
        awayTeam: { '@type': 'SportsTeam', name: matchData.away },
      })}</script>
    </div>
  );
}

// Inject JSON-LD SportsEvent schema for SEO
export const runtime = 'edge';

