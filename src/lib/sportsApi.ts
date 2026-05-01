// Production-ready wrapper for sports data providers with mock fallback.
export interface MatchData {
  slug: string;
  home: string;
  away: string;
  status: string;
  kickoff: string;
  score: { home: number; away: number };
  topPlayer?: string;
  location?: string;
}

const DEFAULT_PROVIDER = process.env.SPORTS_API_PROVIDER || 'mock';

async function fetchFromRapidAPI(endpoint: string, params: Record<string, string> = {}) {
  const key = process.env.RAPIDAPI_KEY;
  const host = process.env.RAPIDAPI_HOST;
  if (!key || !host) {
    throw new Error('RapidAPI credentials not configured (RAPIDAPI_KEY / RAPIDAPI_HOST)');
  }

  const url = new URL(endpoint);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': host,
      Accept: 'application/json',
    },
    method: 'GET',
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`RapidAPI error: ${res.status} ${body}`);
  }
  return res.json();
}

function capitalize(s: string) {
  return s
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function mockGetHotMatches(): MatchData[] {
  const now = new Date();
  return [
    {
      slug: 'knicks-vs-hawks',
      home: 'New York Knicks',
      away: 'Atlanta Hawks',
      kickoff: new Date(now.getTime() + 1000 * 60 * 60).toISOString(),
      status: 'Upcoming',
      score: { home: 0, away: 0 },
      topPlayer: 'Jalen Brunson',
      location: 'Madison Square Garden',
    },
    {
      slug: 'celtics-vs-76ers',
      home: 'Boston Celtics',
      away: 'Philadelphia 76ers',
      kickoff: new Date(now.getTime() + 1000 * 60 * 60 * 3).toISOString(),
      status: 'Upcoming',
      score: { home: 0, away: 0 },
      topPlayer: 'Jayson Tatum',
      location: 'TD Garden',
    },
    {
      slug: 'lakers-vs-warriors',
      home: 'Los Angeles Lakers',
      away: 'Golden State Warriors',
      kickoff: new Date(now.getTime() + 1000 * 60 * 60 * 6).toISOString(),
      status: 'Upcoming',
      score: { home: 0, away: 0 },
      topPlayer: 'LeBron James',
      location: 'Crypto.com Arena',
    },
    {
      slug: 'poland-vs-argentina',
      home: 'Poland',
      away: 'Argentina',
      kickoff: new Date(now.getTime() + 1000 * 60 * 60 * 24).toISOString(),
      status: 'Upcoming',
      score: { home: 0, away: 0 },
      topPlayer: 'Robert Lewandowski',
      location: 'Estadio Azteca, Mexico City',
    },
    {
      slug: 'south-korea-vs-brazil',
      home: 'South Korea',
      away: 'Brazil',
      kickoff: new Date(now.getTime() + 1000 * 60 * 60 * 26).toISOString(),
      status: 'Upcoming',
      score: { home: 0, away: 0 },
      topPlayer: 'Son Heung-min',
      location: 'AT&T Stadium, Arlington',
    },
    {
      slug: 'england-vs-france',
      home: 'England',
      away: 'France',
      kickoff: new Date(now.getTime() + 1000 * 60 * 60 * 28).toISOString(),
      status: 'Upcoming',
      score: { home: 0, away: 0 },
      topPlayer: 'Harry Kane',
      location: 'Rose Bowl, Pasadena',
    },
  ];
}

export async function getHotMatches(): Promise<MatchData[]> {
  const provider = (process.env.SPORTS_API_PROVIDER || DEFAULT_PROVIDER).toLowerCase();
  try {
    if (provider === 'rapidapi') {
      // Example placeholder endpoint — users should replace with actual RapidAPI sports endpoint and params
      const data = await fetchFromRapidAPI('https://example-rapidapi-sports-host/matches/today');
      // Map remote shape to MatchData if necessary. For now, attempt a safe mapping.
      if (Array.isArray(data)) {
        return data.map((d: any) => ({
          slug: d.slug || `${d.home?.toLowerCase()?.replace(/\s+/g, '-')} -vs- ${d.away?.toLowerCase()?.replace(/\s+/g, '-')}`,
          home: d.home || d.team1 || 'Home',
          away: d.away || d.team2 || 'Away',
          status: d.status || 'Scheduled',
          kickoff: d.kickoff || d.start || new Date().toISOString(),
          score: { home: d.score?.home || 0, away: d.score?.away || 0 },
          topPlayer: d.topPlayer || d.keyPlayer || 'TBD',
          location: d.location || d.venue || '',
        }));
      }
    }
  } catch (err) {
    // Log and fall through to mock
    // eslint-disable-next-line no-console
    console.warn('SPORTS API fetch failed, falling back to mock data:', err?.message || err);
  }
  return mockGetHotMatches();
}

export async function fetchMatchDataBySlug(slug: string): Promise<MatchData> {
  const provider = (process.env.SPORTS_API_PROVIDER || DEFAULT_PROVIDER).toLowerCase();
  try {
    if (provider === 'rapidapi') {
      // Example mapping — replace endpoint/params with correct provider API
      const remote = await fetchFromRapidAPI('https://example-rapidapi-sports-host/matches', { slug });
      if (remote) {
        return {
          slug: remote.slug || slug,
          home: remote.home || remote.team1 || 'Home',
          away: remote.away || remote.team2 || 'Away',
          status: remote.status || 'Scheduled',
          kickoff: remote.kickoff || remote.start || new Date().toISOString(),
          score: { home: remote.score?.home || 0, away: remote.score?.away || 0 },
          topPlayer: remote.topPlayer || remote.keyPlayer || 'TBD',
          location: remote.location || remote.venue || '',
        };
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('SPORTS API fetchMatchDataBySlug failed, using mock', err?.message || err);
  }

  // Fallback to mock behavior
  const parts = slug.split('-vs-');
  const home = parts[0] ? capitalize(parts[0].replace(/-/g, ' ')) : 'Home Team';
  const away = parts[1] ? capitalize(parts[1].replace(/-/g, ' ')) : 'Away Team';
  const now = new Date();
  return {
    slug,
    home,
    away,
    status: 'Scheduled',
    kickoff: now.toISOString(),
    score: { home: 0, away: 0 },
    topPlayer: 'TBD',
    location: slug.includes('world-cup') ? 'Estadio Azteca, Mexico City' : undefined,
  };
}

