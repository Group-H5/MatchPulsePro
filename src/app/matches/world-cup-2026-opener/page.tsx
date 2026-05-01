import React from 'react';
export const revalidate = 0;

export function generateMetadata() {
  return {
    title: 'World Cup 2026 Opening Match Prediction | MatchPulse.pro',
    description: 'AI-powered preview and prediction for the World Cup 2026 opening match at Estadio Azteca. Live score, analysis and broadcast guide.',
    keywords: ['World Cup 2026 Opening Match Prediction', 'Live Score', 'AI Analysis', 'Estadio Azteca'],
  };
}

export default function WorldCupOpener() {
  const enContent = {
    title: "World Cup 2026 Opening Match: Poland vs Argentina",
    date: 'June 11, 2026',
    stadium: 'Estadio Azteca, Mexico City',
    preview:
      'The 2026 FIFA World Cup opens with a high-stakes fixture at Estadio Azteca. AI analysis highlights Poland\'s defensive structure against Argentina\'s creative attack. Key player to watch: Robert Lewandowski.',
  };

  const plPreview = 'Mecz otwarcia Mistrzostw Świata 2026: Polska kontra Argentyna w Estadio Azteca. Kluczowy zawodnik: Robert Lewandowski.';
  const koPreview = '2026 월드컵 개막전: 폴란드 vs 아르헨티나, 에스타디오 아즈테카. 주목 선수: 로베르트 레반도프스키.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: enContent.title,
    startDate: '2026-06-11T00:00:00Z',
    location: 'Estadio Azteca, Mexico City',
    homeTeam: { '@type': 'SportsTeam', name: 'Poland' },
    awayTeam: { '@type': 'SportsTeam', name: 'Argentina' },
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto bg-brand-surface p-8 rounded-2xl border border-white/5">
        <h1 className="text-3xl font-extrabold mb-4">{enContent.title}</h1>
        <div className="text-sm text-gray-400 mb-6">{enContent.date} • {enContent.stadium}</div>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">AI Preview (English)</h2>
          <p className="text-gray-200">{enContent.preview}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-md font-medium mb-2">Preview (Polski)</h3>
          <p className="text-gray-200">{plPreview}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-md font-medium mb-2">Preview (한국어)</h3>
          <p className="text-gray-200">{koPreview}</p>
        </section>

        <footer className="text-sm text-gray-400">MatchPulse.pro — AI-powered sports insights.</footer>
      </div>

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </div>
  );
}
