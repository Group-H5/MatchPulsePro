import React from 'react';
import Link from 'next/link';

export default function MatchCard({ match }: { match: any }) {
  return (
    <Link href={`/matches/${match.slug}`}>
      <a className="block rounded-2xl bg-brand-surface border border-white/5 p-4 hover:border-brand-pulse/50 transition">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-sm text-gray-400">{new Date(match.kickoff).toLocaleString()}</div>
            <div className="text-xl font-bold">{match.home} <span className="text-gray-400">vs</span> {match.away}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-extrabold">{match.score?.home ?? '-'} - {match.score?.away ?? '-'}</div>
            <div className="text-xs text-gray-400">{match.status}</div>
          </div>
        </div>
        <div className="mt-2 text-sm text-gray-300">
          <span className="inline-block bg-white/5 px-2 py-1 rounded mr-2 text-xs">AI INSIGHT</span>
          <span>{match.topPlayer ? `Key: ${match.topPlayer}` : 'Insight loading...'}</span>
        </div>
      </a>
    </Link>
  );
}
