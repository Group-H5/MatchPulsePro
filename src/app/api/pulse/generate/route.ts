import { NextResponse } from 'next/server';
import { generateMatchInsight } from '@/lib/gemini';
import { fetchMatchDataBySlug } from '@/lib/sportsApi';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const slug = body.slug || body.match || (body?.params?.slug as string) || '';

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const matchData = await fetchMatchDataBySlug(slug);
    const insight = await generateMatchInsight(slug, matchData);

    return NextResponse.json({ slug, matchData, insight });
  } catch (err) {
    return NextResponse.json({ error: 'internal_error', detail: String(err) }, { status: 500 });
  }
}
