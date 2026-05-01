import React from 'react';
import MatchCard from '@/components/MatchCard';
import { getHotMatches } from '@/lib/sportsApi';

export default async function HomePage() {
  const matches = await getHotMatches();

  return (
    <div className="relative overflow-hidden">
      <div className="from-brand-pulse/10 pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2 bg-gradient-to-b to-transparent" />

      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-32">
        <div className="max-w-3xl">
          <h2 className="mb-6 text-5xl leading-[1.1] font-extrabold tracking-tight md:text-7xl">
            FEEL THE <br />
            <span className="from-brand-pulse bg-gradient-to-r to-cyan-400 bg-clip-text text-transparent">
              GAME'S HEARTBEAT
            </span>
          </h2>
          <p className="mb-8 text-lg leading-relaxed text-gray-400">
            NBA季后赛实时数据看板。利用 AI
            深度逻辑捕捉球星对位、伤病影响与每一个关键回合。
          </p>
          <div className="flex gap-4">
            <button className="bg-brand-pulse rounded-xl px-8 py-4 font-bold text-black transition-transform hover:scale-105">
              立即查看实时看板
            </button>
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <span className="text-sm font-medium">AI 预测已就绪</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {matches.map((m) => (
            <MatchCard key={m.slug} match={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
