import Link from 'next/link';
import { getHotMatches } from '@/lib/sportsApi';

export const revalidate = 300;

export function generateMetadata() {
  const base = process.env.SITE_URL || 'https://matchpulse.pro';
  return {
    title: 'NBA Live Pulse | AI Game Insights | MatchPulse.pro',
    description:
      'Track high-interest NBA matchups with AI previews, live pulse signals, key players and matchup context.',
    alternates: {
      canonical: `${base}/nba`,
    },
  };
}

export default async function NbaPage() {
  const matches = await getHotMatches();

  return (
    <main className="container py-12">
      <section className="mx-auto max-w-5xl">
        <p className="text-brand-pulse mb-3 text-sm font-bold tracking-[0.35em] uppercase">
          NBA Live Pulse
        </p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
          AI-powered NBA previews before the market moves.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          Follow the highest-signal NBA playoff matchups with concise AI
          insight, player focus, injury context and live-score ready pages.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
        {matches.map((match) => (
          <Link
            key={match.slug}
            href={`/matches/${match.slug}`}
            className="bg-brand-surface group hover:border-brand-pulse/70 rounded-2xl border border-white/10 p-5 transition hover:-translate-y-1"
          >
            <div className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">
              {match.status}
            </div>
            <h2 className="mt-4 text-xl font-bold">
              {match.home} <span className="text-gray-500">vs</span>{' '}
              {match.away}
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Key player: {match.topPlayer || 'TBD'}
            </p>
            <p className="text-brand-pulse mt-5 text-sm font-bold">
              Open match pulse →
            </p>
          </Link>
        ))}
      </section>
    </main>
  );
}
