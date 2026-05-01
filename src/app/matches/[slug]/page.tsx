import React from 'react';
import { cookies, headers } from 'next/headers';
import { generateMatchInsight } from '@/lib/gemini';
import { fetchMatchDataBySlug } from '@/lib/sportsApi';

const SUPPORTED_LANGS = ['en', 'pl', 'ko', 'zh', 'es', 'fr', 'de', 'pt'];

function normalizeLang(value?: string | null) {
  const lang = value?.split(',')[0]?.split(';')[0]?.trim().toLowerCase();
  const baseLang = lang?.split('-')[0];
  return baseLang && SUPPORTED_LANGS.includes(baseLang) ? baseLang : undefined;
}

function getLangFromSearchParams(searchParams?: {
  [key: string]: string | string[];
}) {
  const candidate = searchParams?.lang || searchParams?.locale;
  return normalizeLang(Array.isArray(candidate) ? candidate[0] : candidate);
}

async function detectRequestLang(searchParams?: {
  [key: string]: string | string[];
}) {
  const urlLang = getLangFromSearchParams(searchParams);
  if (urlLang) return urlLang;

  const cookieStore = await cookies();
  const cookieLang = normalizeLang(cookieStore.get('next-locale')?.value);
  if (cookieLang) return cookieLang;

  const headerStore = await headers();
  const acceptLanguage = headerStore.get('accept-language');
  return normalizeLang(acceptLanguage) || 'en';
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const matchData = await fetchMatchDataBySlug(slug);
  const title = `${matchData.home} vs ${matchData.away} Live - MatchPulse`;
  const description = `Live updates and AI insights for ${matchData.home} vs ${matchData.away}. Real-time scores, stats and watching guide.`;
  return {
    title,
    description,
    keywords: [
      `${matchData.home} vs ${matchData.away}`,
      'live score',
      'ai prediction',
    ],
  };
}

export default async function MatchPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] };
}) {
  const { slug } = params;
  const lang = await detectRequestLang(searchParams);
  const matchData = await fetchMatchDataBySlug(slug);
  const insight =
    matchData.staticInsight?.[lang] ||
    matchData.staticInsight?.en ||
    (await generateMatchInsight(slug, matchData, { lang }));
  const location = matchData.location
    ? { '@type': 'Place', name: matchData.location }
    : matchData.slug.includes('world-cup')
      ? { '@type': 'Place', name: '2026 FIFA World Cup host cities' }
      : undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${matchData.home} vs ${matchData.away}`,
    startDate: matchData.kickoff,
    homeTeam: { '@type': 'SportsTeam', name: matchData.home },
    awayTeam: { '@type': 'SportsTeam', name: matchData.away },
    ...(location ? { location } : {}),
  };

  return (
    <div className="container py-8">
      <div className="bg-brand-surface mx-auto max-w-4xl rounded-2xl border border-white/5 p-6">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {matchData.home} <span className="text-gray-400">vs</span>{' '}
              {matchData.away}
            </h1>
            <div className="text-sm text-gray-400">
              Status: {matchData.status} • Kickoff:{' '}
              {new Date(matchData.kickoff).toLocaleString()}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold">
              {matchData.score.home} - {matchData.score.away}
            </div>
            <div className="text-sm text-gray-400">Live Pulse</div>
          </div>
        </header>

        <section className="mb-6">
          <h3 className="mb-2 text-lg font-semibold">AI Match Insight</h3>
          <p className="leading-relaxed text-gray-200" lang={lang}>
            {insight}
          </p>
        </section>

        <section>
          <h4 className="text-md mb-2 font-medium text-gray-300">
            Where to Watch
          </h4>
          <div className="text-sm text-gray-400">
            Official broadcasters and streaming links will appear here.
          </div>
        </section>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
