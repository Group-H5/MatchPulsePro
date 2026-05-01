import fs from 'fs/promises';
import path from 'path';

// Simple sitemap generator — uses the same mock set as getHotMatches.
// Writes public/sitemap.xml with xhtml:link alternates for en (default), pl, ko.

const SITE_URL = process.env.SITE_URL || 'https://matchpulse.pro';

function getHotMatches() {
  const now = new Date();
  return [
    'knicks-vs-hawks',
    'celtics-vs-76ers',
    'lakers-vs-warriors',
    'poland-vs-argentina',
    'south-korea-vs-brazil',
    'england-vs-france',
    'world-cup-2026-opener',
  ];
}

function buildUrlEntries(slugs) {
  const locales = [{ code: 'en', prefix: '' }, { code: 'pl', prefix: '/pl' }, { code: 'ko', prefix: '/ko' }];
  const lastmod = new Date().toISOString();

  return slugs
    .map((slug) => {
      const defaultLoc = `${SITE_URL}/matches/${slug}`;
      const alternates = locales
        .map((l) => `<xhtml:link rel="alternate" hreflang="${l.code}" href="${SITE_URL}${l.prefix}/matches/${slug}"/>`)
        .join('\n      ');

      return `  <url>\n    <loc>${defaultLoc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    ${alternates}\n  </url>`;
    })
    .join('\n');
}

async function writeSitemap(xml) {
  const outDir = path.join(process.cwd(), 'public');
  await fs.mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, 'sitemap.xml');
  await fs.writeFile(outPath, xml, 'utf8');
  return outPath;
}

async function main() {
  const slugs = getHotMatches();
  const entries = buildUrlEntries(slugs);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries}\n</urlset>`;
  const out = await writeSitemap(xml);
  console.log('Sitemap generated at', out);
}

main().catch((err) => {
  console.error('Failed to generate sitemap:', err);
  process.exitCode = 1;
});
