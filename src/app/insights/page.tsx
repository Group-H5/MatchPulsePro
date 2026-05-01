import Link from 'next/link';

export const revalidate = 300;

export function generateMetadata() {
  const base = process.env.SITE_URL || 'https://matchpulse.pro';
  return {
    title: 'AI Sports Insights | MatchPulse.pro',
    description:
      'How MatchPulse.pro turns sports match context into localized AI previews, SEO-ready pages and deployment health checks.',
    alternates: {
      canonical: `${base}/insights`,
    },
  };
}

const insightBlocks = [
  {
    title: 'Localized match intelligence',
    body: 'Dynamic match pages detect URL language, locale cookies and Accept-Language headers before generating AI insight.',
  },
  {
    title: 'Static data for cornerstone pages',
    body: 'Core traffic pages such as the World Cup 2026 opener use hand-curated data before any external sports API fallback.',
  },
  {
    title: 'Deployment self-checks',
    body: 'The deploy-check script validates sitemap alternates, pulse JSON shape and structured-data presence after release.',
  },
];

export default function InsightsPage() {
  return (
    <main className="container py-12">
      <section className="mx-auto max-w-5xl">
        <p className="text-brand-pulse mb-3 text-sm font-bold tracking-[0.35em] uppercase">
          AI Insights
        </p>
        <h1 className="max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
          The logic layer behind every MatchPulse page.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-300">
          MatchPulse combines curated sports data, language-aware AI prompts and
          SEO validation into one automated publishing loop.
        </p>
      </section>

      <section className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
        {insightBlocks.map((block) => (
          <article
            key={block.title}
            className="bg-brand-surface rounded-2xl border border-white/10 p-5"
          >
            <h2 className="text-xl font-bold">{block.title}</h2>
            <p className="mt-3 text-sm leading-6 text-gray-400">{block.body}</p>
          </article>
        ))}
      </section>

      <section className="border-brand-pulse/40 bg-brand-pulse/10 mx-auto mt-10 max-w-5xl rounded-3xl border p-6">
        <h2 className="text-2xl font-bold">Start from the live pages</h2>
        <p className="mt-3 max-w-2xl text-gray-300">
          Open NBA or World Cup pages to see the same logic applied to real
          match landing pages.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/nba"
            className="rounded-full bg-white px-5 py-3 text-sm font-bold text-black"
          >
            NBA Pulse
          </Link>
          <Link
            href="/world-cup"
            className="rounded-full border border-white/20 px-5 py-3 text-sm font-bold text-white"
          >
            World Cup Pulse
          </Link>
        </div>
      </section>
    </main>
  );
}
