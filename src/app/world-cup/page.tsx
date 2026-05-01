import Link from 'next/link';
import { getHotMatches } from '@/lib/sportsApi';

export const revalidate = 300;

export function generateMetadata() {
  const base = process.env.SITE_URL || 'https://matchpulse.pro';
  return {
    title: 'World Cup 2026 Live Pulse | MatchPulse.pro',
    description:
      'AI previews, match context and multilingual SEO pages for the World Cup 2026 opening cycle.',
    alternates: {
      canonical: `${base}/world-cup`,
    },
  };
}

export default async function WorldCupPage() {
  const matches = (await getHotMatches()).filter((match) =>
    [
      'world-cup-2026-opener',
      'poland-vs-argentina',
      'south-korea-vs-brazil',
      'england-vs-france',
    ].includes(match.slug)
  );

  return (
    <main className="container py-12">
      <section className="mx-auto max-w-5xl">
        <p className="text-brand-pulse mb-3 text-sm font-bold tracking-[0.35em] uppercase">
          World Cup 2026
        </p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
          Opening-cycle football pages built for search demand.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          Track World Cup 2026 previews with static high-quality cornerstone
          data, AI summaries and SportsEvent structured data.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
        {matches.map((match) => (
          <Link
            key={match.slug}
            href={`/matches/${match.slug}`}
            className="bg-brand-surface hover:border-brand-pulse/70 rounded-2xl border border-white/10 p-5 transition hover:-translate-y-1"
          >
            <div className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
              {match.isStatic ? 'Core preview' : match.status}
            </div>
            <h2 className="mt-4 text-xl font-bold">
              {match.home} <span className="text-gray-500">vs</span>{' '}
              {match.away}
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              {match.location || 'Venue TBA'}
            </p>
            <p className="text-brand-pulse mt-5 text-sm font-bold">
              Open World Cup pulse →
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
