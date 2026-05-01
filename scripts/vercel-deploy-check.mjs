#!/usr/bin/env node
import { env } from 'process';

const SITE_URL = env.SITE_URL || 'http://localhost:3000';
const requiredEnvs = ['SITE_URL', 'SPORTS_API_PROVIDER'];

function ok(msg) {
  console.log(`[PASS] ${msg}`);
}

function fail(msg) {
  console.error(`[FAIL] ${msg}`);
}

let hasFailure = false;

// 1. env checks
console.log('Checking environment variables...');
for (const k of requiredEnvs) {
  if (!env[k]) {
    fail(`Missing ${k} (recommended to set in deployment)`);
    hasFailure = true;
  } else {
    ok(`${k} is set`);
  }
}

if (!env.GEMINI_API_KEY) {
  console.warn('[WARN] GEMINI_API_KEY is not set — AI insights will be limited or use mock.');
}

// helper fetch
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
        fail(`${path} content-type mismatch. Expected includes '${expectations.contentType}', got '${ct}'`);
        hasFailure = true;
        return;
      }
    }
    const text = await res.text();
    if (expectations.ldJson) {
      const hasLd = /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i.test(text);
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

async function main() {
  console.log(`Using SITE_URL=${SITE_URL}`);
  // endpoints to check
  await checkUrl('/api/pulse/detect', { contentType: 'json' });
  await checkUrl('/sitemap.xml', { contentType: 'xml' });
  await checkUrl('/matches/world-cup-2026-opener', { contentType: 'html', ldJson: true });

  if (hasFailure) {
    console.error('\nOne or more checks failed. Please review the messages above.');
    process.exitCode = 2;
  } else {
    console.log('\nAll checks passed. Good to go!');
  }
}

main();
