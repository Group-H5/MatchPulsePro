import React from 'react';
import { getHotMatches } from '@/lib/sportsApi';
import MatchCard from '@/components/MatchCard';

export default async function HomePage() {
  const matches = await getHotMatches();

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-brand-pulse/10 to-transparent pointer-events-none" />

      <section className="max-w-7xl mx-auto px-4 pt-20 pb-32 relative">
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            FEEL THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pulse to-cyan-400">
              GAME'S HEARTBEAT
            </span>
          </h2>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            2026年世界杯与NBA季后赛实时数据看板。利用 AI 深度逻辑捕捉赛场每一个瞬时脉搏。
          </p>
          <div className="flex gap-4">
            <button className="bg-brand-pulse text-black px-8 py-4 rounded-xl font-bold hover:scale-105 transition-transform">
              立即查看实时看板
            </button>
            <div className="flex items-center gap-2 px-6 py-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
              <span className="text-sm font-medium">AI 预测已就绪</span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matches.map((m) => (
            <MatchCard key={m.slug} match={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
