import React from 'react';

export const revalidate = 0;

export function generateMetadata() {
  const base = process.env.SITE_URL || 'https://matchpulse.pro';
  return {
    title: 'World Cup 2026 Opening Match Prediction | MatchPulse.pro',
    description:
      'AI-powered preview and prediction for the World Cup 2026 opening match at Estadio Azteca. Live score, analysis and broadcast guide.',
    keywords: [
      'World Cup 2026 Opening Match Prediction',
      'Live Score',
      'AI Analysis',
      'Estadio Azteca',
    ],
    alternates: {
      canonical: `${base}/matches/world-cup-2026-opener`,
    },
  };
}

export default function WorldCupOpener() {
  const enContent = {
    title: 'World Cup 2026 Opening Match: Poland vs Argentina',
    date: 'June 11, 2026',
    stadium: 'Estadio Azteca, Mexico City',
    preview:
      "The 2026 FIFA World Cup opens with a high-stakes fixture at Estadio Azteca. AI analysis highlights Poland's defensive structure against Argentina's creative attack. Key player to watch: Robert Lewandowski.",
  };

  const plPreview =
    'Mecz otwarcia Mistrzostw Świata 2026: Polska kontra Argentyna w Estadio Azteca. Kluczowy zawodnik: Robert Lewandowski.';
  const koPreview =
    '2026 월드컵 개막전: 폴란드 vs 아르헨티나, 에스타디오 아즈테카. 주목 선수: 로베르트 레반도프스키.';

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
      <div className="bg-brand-surface mx-auto max-w-4xl rounded-2xl border border-white/5 p-8">
        <h1 className="mb-4 text-3xl font-extrabold">{enContent.title}</h1>
        <div className="mb-6 text-sm text-gray-400">
          {enContent.date} • {enContent.stadium}
        </div>

        <section className="mb-6">
          <h2 className="mb-2 text-lg font-semibold">AI Preview (English)</h2>
          <p className="text-gray-200">{enContent.preview}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-md mb-2 font-medium">Preview (Polski)</h3>
          <p className="text-gray-200">{plPreview}</p>
        </section>

        <section className="mb-6">
          <h3 className="text-md mb-2 font-medium">Preview (한국어)</h3>
          <p className="text-gray-200">{koPreview}</p>
        </section>

        <footer className="text-sm text-gray-400">
          MatchPulse.pro — AI-powered sports insights.
        </footer>
      </div>

      <div
        dangerouslySetInnerHTML={{
          __html: `<script type="application/ld+json">${JSON.stringify(
            jsonLd
          )}</script>`,
        }}
      />
    </div>
  );
}
