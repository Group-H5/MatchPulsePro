export async function fetchMatchDataBySlug(slug: string) {
  // slug expected like 'knicks-vs-hawks' or 'teamA-vs-teamB'
  // In production integrate with a sports data provider (RapidAPI, sportsdata.io, etc.)
  // Here return a mocked structure suitable for rendering and AI prompt.
  const parts = slug.split('-vs-');
  const home = parts[0] ? capitalize(parts[0].replace(/-/g, ' ')) : 'Home Team';
  const away = parts[1] ? capitalize(parts[1].replace(/-/g, ' ')) : 'Away Team';

  // Mock dynamic fields
  const now = new Date();
  return {
    slug,
    home,
    away,
    status: 'Scheduled',
    kickoff: now.toISOString(),
    score: { home: 0, away: 0 },
    topPlayer: 'TBD',
  };
}

function capitalize(s: string) {
  return s
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function getHotMatches() {
  // In production, replace this with a call to a sports data provider returning today's hottest matches.
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
      location: 'AT&amp;T Stadium, Arlington',
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
