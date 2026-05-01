#!/usr/bin/env node
import { env } from 'process';

const SITE_URL = env.SITE_URL || 'http://localhost:3000';

function ok(msg) {
  console.log(`[PASS] ${msg}`);
}

function warn(msg) {
  console.warn(`[WARN] ${msg}`);
}

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
}

let hasFailure = false;

console.log('Checking environment variables...');
if (!env.SITE_URL) {
  warn(
    'SITE_URL is not set. Falling back to http://localhost:3000; production canonical URLs and SEO checks may be wrong.'
  );
} else {
  ok('SITE_URL is set');
}

if (!env.SPORTS_API_PROVIDER) {
  warn('SPORTS_API_PROVIDER is not set. The app will use mock sports data.');
} else {
  ok('SPORTS_API_PROVIDER is set');
}

if (!env.GEMINI_API_KEY) {
  warn(
    'GEMINI_API_KEY is not set. AI insights will be limited or use fallback previews.'
  );
}

async function checkUrl(path, expectations = {}) {
  const url = `${SITE_URL.replace(/\/$/, '')}${path}`;
  try {
    const res = await fetch(url, { method: 'GET' });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok) {
      fail(`${path} responded with status ${res.status}`);
      hasFailure = true;
      return;
    }
    // basic checks
    if (expectations.contentType) {
      if (!ct.includes(expectations.contentType)) {
        fail(
          `${path} content-type mismatch. Expected includes '${expectations.contentType}', got '${ct}'`
        );
        hasFailure = true;
        return;
      }
    }
    const text = await res.text();
    if (expectations.includes) {
      for (const pattern of expectations.includes) {
        if (!pattern.test(text)) {
          fail(`${path} is missing expected pattern: ${pattern}`);
          hasFailure = true;
          return;
        }
      }
    }
    if (expectations.ldJson) {
      const hasLd =
        /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i.test(text);
      if (!hasLd) {
        fail(`${path} missing application/ld+json script tag`);
        hasFailure = true;
        return;
      }
    }
    ok(`${path} OK`);
  } catch (err) {
    fail(`${path} fetch failed: ${err.message}`);
    hasFailure = true;
  }
}

async function checkPulseDetect() {
  const path = '/api/pulse/detect';
  const url = `${SITE_URL.replace(/\/$/, '')}${path}`;
  try {
    const res = await fetch(url, { method: 'GET' });
    const ct = res.headers.get('content-type') || '';
    if (!res.ok) {
      fail(`${path} responded with status ${res.status}`);
      hasFailure = true;
      return;
    }
    if (!ct.includes('json')) {
      fail(`${path} content-type mismatch. Expected JSON, got '${ct}'`);
      hasFailure = true;
      return;
    }
    const json = await res.json();
    if (json?.detected !== true || !Array.isArray(json?.items)) {
      fail(
        `${path} JSON shape mismatch. Expected { detected: true, items: [...] }`
      );
      hasFailure = true;
      return;
    }
    const firstItem = json.items[0];
    if (firstItem && (!firstItem.slug || !firstItem.insight)) {
      fail(
        `${path} item shape mismatch. Expected items with slug and insight.`
      );
      hasFailure = true;
      return;
    }
    ok(`${path} JSON structure OK`);
  } catch (err) {
    fail(`${path} fetch failed: ${err.message}`);
    hasFailure = true;
  }
}

async function main() {
  console.log(`Using SITE_URL=${SITE_URL}`);
  await checkPulseDetect();
  await checkUrl('/sitemap.xml', {
    contentType: 'xml',
    includes: [/<xhtml:link\b/i, /\/matches\/world-cup-2026-opener/i],
  });
  await checkUrl('/matches/world-cup-2026-opener', {
    contentType: 'html',
    ldJson: true,
  });

  if (hasFailure) {
    console.error(
      '\nOne or more checks failed. Please review the messages above.'
    );
    process.exitCode = 2;
  } else {
    console.log('\nAll checks passed. Good to go!');
  }
}

main();
