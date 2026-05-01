import Link from 'next/link';

type MatchCardProps = {
  match: {
    slug: string;
    home: string;
    away: string;
    status: string;
    kickoff: string;
    score?: { home: number; away: number };
    topPlayer?: string;
    location?: string;
  };
};

function winPulse(slug: string) {
  const seed = slug
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 52 + (seed % 23);
}

export default function MatchCard({ match }: MatchCardProps) {
  const pulse = winPulse(match.slug);

  return (
    <Link
      href={`/matches/${match.slug}`}
      className="group hover:border-brand-pulse/70 relative block overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition duration-300 hover:-translate-y-1"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
        <div className="bg-brand-pulse/20 absolute top-10 -right-24 h-40 w-40 rounded-full blur-3xl" />
        <div className="via-brand-pulse absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent to-transparent" />
      </div>

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black tracking-[0.28em] text-gray-300 uppercase">
            {match.status}
          </p>
          <p className="mt-2 text-xs text-gray-400">
            {new Date(match.kickoff).toLocaleString()}
          </p>
        </div>
        <div className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs font-black text-white">
          {match.score?.home ?? 0}-{match.score?.away ?? 0}
        </div>
      </div>

      <div className="relative mt-8 space-y-1">
        <h2 className="text-4xl leading-none font-black tracking-tight uppercase italic transition duration-300 group-hover:translate-x-2">
          {match.home}
        </h2>
        <div className="text-brand-pulse text-sm font-black tracking-[0.4em]">
          VS
        </div>
        <h3 className="text-4xl leading-none font-black tracking-tight uppercase italic transition duration-300 group-hover:translate-x-4">
          {match.away}
        </h3>
      </div>

      <div className="relative mt-8">
        <div className="mb-2 flex items-center justify-between text-xs font-bold tracking-[0.25em] text-gray-300 uppercase">
          <span>AI win pulse</span>
          <span>{pulse}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="from-brand-pulse to-brand-pulse h-full rounded-full bg-gradient-to-r via-cyan-300 transition-all duration-700 group-hover:animate-pulse"
            style={{ width: `${pulse}%` }}
          />
        </div>
      </div>

      <p className="relative mt-5 text-sm leading-6 text-gray-300">
        {match.topPlayer
          ? `Key matchup: ${match.topPlayer}`
          : 'AI matchup model warming up.'}
      </p>
    </Link>
  );
}
