import Link from 'next/link';
import MatchCard from '@/components/MatchCard';
import { getHotMatches } from '@/lib/sportsApi';

export default async function HomePage() {
  const matches = await getHotMatches();
  const featureMatch = matches[0];

  return (
    <main className="bg-brand-gray relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,255,127,0.18),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.12),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.08)_0_1px,transparent_1px_46px)]" />
      <div className="pointer-events-none absolute inset-y-0 right-[-8vw] hidden w-[56vw] opacity-15 grayscale md:block">
        <div className="animate-float absolute top-28 right-[18%] h-[540px] w-[240px] -rotate-12 rounded-t-full bg-white/70 blur-[1px]" />
        <div className="animate-float absolute top-[310px] right-[7%] h-[220px] w-[420px] -rotate-[22deg] rounded-full bg-white/60 blur-[1px]" />
        <div className="animate-float absolute top-[610px] right-[28%] h-[260px] w-[90px] rotate-6 rounded-full bg-white/70 blur-[1px]" />
        <div className="animate-float absolute top-[600px] right-[13%] h-[300px] w-[90px] -rotate-12 rounded-full bg-white/70 blur-[1px]" />
        <div className="absolute top-12 right-[24%] h-32 w-32 rounded-full bg-white/80" />
        <div className="absolute top-24 right-[2%] h-24 w-24 rounded-full border-[10px] border-white/70" />
      </div>

      <section className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-16 md:grid-cols-[1.08fr_0.92fr] md:px-8">
        <div>
          <div className="text-brand-pulse mb-6 inline-flex items-center gap-3 border border-white/15 bg-white/5 px-4 py-2 text-xs font-black tracking-[0.35em] uppercase backdrop-blur">
            <span className="bg-brand-pulse h-2 w-2 rounded-full shadow-[0_0_20px_#00FF7F]" />
            Live Pulse
          </div>

          <h1 className="font-display text-7xl leading-[0.82] font-black tracking-[-0.08em] uppercase italic md:text-[120px]">
            NBA
            <br />
            Playoffs
            <br />
            <span className="text-transparent [-webkit-text-stroke:2px_#00FF7F]">
              Pure
            </span>
            <br />
            Adrenaline
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-300 md:text-xl">
            A brutal, signal-first NBA playoff desk tracking star matchups,
            injury pressure and late-game tactical edges before the market
            catches up.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/nba"
              className="bg-brand-pulse rounded-full px-7 py-4 text-sm font-black tracking-[0.18em] text-black uppercase transition hover:scale-105"
            >
              NBA Analysis
            </Link>
            <Link
              href={`/matches/${featureMatch.slug}`}
              className="hover:border-brand-pulse hover:text-brand-pulse rounded-full border border-white/20 px-7 py-4 text-sm font-black tracking-[0.18em] text-white uppercase transition"
            >
              Open Top Match
            </Link>
          </div>
        </div>

        <aside className="relative rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="from-brand-pulse/30 absolute -inset-px rounded-[2rem] bg-gradient-to-br via-transparent to-cyan-400/20 opacity-70" />
          <div className="relative">
            <p className="text-xs font-black tracking-[0.32em] text-gray-500 uppercase">
              Featured Line
            </p>
            <h2 className="mt-5 text-5xl leading-none font-black uppercase italic">
              {featureMatch.home}
              <span className="text-brand-pulse block">vs</span>
              {featureMatch.away}
            </h2>
            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-2xl bg-black/30 p-4">
                <div className="text-3xl font-black">48</div>
                <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Minutes
                </div>
              </div>
              <div className="rounded-2xl bg-black/30 p-4">
                <div className="text-3xl font-black">7</div>
                <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Game Max
                </div>
              </div>
              <div className="rounded-2xl bg-black/30 p-4">
                <div className="text-3xl font-black">AI</div>
                <div className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">
                  Pulse
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm leading-6 text-gray-400">
              {featureMatch.staticInsight?.en ||
                `Key matchup: ${featureMatch.topPlayer || 'TBD'}`}
            </p>
          </div>
        </aside>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-24 md:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-end">
          <div>
            <p className="text-brand-pulse text-xs font-black tracking-[0.35em] uppercase">
              Tonight's Board
            </p>
            <h2 className="mt-3 text-4xl font-black uppercase italic md:text-6xl">
              Hot Playoff Matchups
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-gray-500">
            Every card links to a stable SEO-ready analysis page backed by
            curated NBA playoff data.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {matches.map((match) => (
            <MatchCard key={match.slug} match={match} />
          ))}
        </div>
      </section>
    </main>
  );
}
