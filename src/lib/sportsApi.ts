// Production-ready wrapper for NBA data providers with curated playoff fallback.
export interface MatchData {
  slug: string;
  home: string;
  away: string;
  league?: string;
  status: string;
  kickoff: string;
  score: { home: number; away: number };
  topPlayer?: string;
  location?: string;
  isStatic?: boolean;
  isFallback?: boolean;
  staticInsight?: Record<string, string>;
}

const DEFAULT_PROVIDER = process.env.SPORTS_API_PROVIDER || 'mock';

export const NBA_PLAYOFF_SLUGS = [
  'lakers-vs-nuggets',
  'celtics-vs-heat',
  'suns-vs-timberwolves',
  'thunder-vs-mavericks',
  'knicks-vs-76ers',
  'bucks-vs-pacers',
];

const STATIC_MATCHES: Record<string, MatchData> = {
  'lakers-vs-nuggets': {
    slug: 'lakers-vs-nuggets',
    home: 'Los Angeles Lakers',
    away: 'Denver Nuggets',
    league: 'NBA Playoffs',
    status: 'Playoff Preview',
    kickoff: '2026-05-02T02:00:00Z',
    score: { home: 0, away: 0 },
    topPlayer: 'LeBron James vs Nikola Jokic',
    location: 'Crypto.com Arena',
    isStatic: true,
    staticInsight: {
      en: 'Lakers vs Nuggets: Jokic forces deep help, while LeBron and Davis must win the rim battle. Injury depth and late-game shot quality decide the edge.',
      pl: 'Lakers kontra Nuggets: Jokic wymusza pomoc w obronie, a LeBron i Davis muszą wygrać strefę podkoszową. Kluczowe będą zdrowie i końcówki.',
      ko: '레이커스 vs 너기츠: 요키치가 더블팀을 끌어내고, 르브론과 데이비스는 림 싸움을 이겨야 합니다. 부상 변수와 클러치 효율이 핵심입니다.',
      zh: '湖人对掘金：约基奇会持续牵动协防，詹姆斯与浓眉必须赢下禁区。伤病深度和关键回合质量决定走势。',
    },
  },
  'celtics-vs-heat': {
    slug: 'celtics-vs-heat',
    home: 'Boston Celtics',
    away: 'Miami Heat',
    league: 'NBA Playoffs',
    status: 'Playoff Preview',
    kickoff: '2026-05-02T00:30:00Z',
    score: { home: 0, away: 0 },
    topPlayer: 'Jayson Tatum vs Jimmy Butler',
    location: 'TD Garden',
    isStatic: true,
    staticInsight: {
      en: 'Celtics vs Heat: Boston owns spacing and size, but Miami can slow pace with switches and zone looks. Watch Tatum reads versus Butler pressure.',
      pl: 'Celtics kontra Heat: Boston ma spacing i przewagę fizyczną, ale Miami spowolni tempo zmianami i strefą. Tatum kontra presja Butlera.',
      ko: '셀틱스 vs 히트: 보스턴은 간격과 사이즈가 강점이지만 마이애미는 스위치와 지역방어로 템포를 늦출 수 있습니다.',
      zh: '凯尔特人对热火：波士顿空间和体型占优，但迈阿密会用换防与联防降速。塔图姆如何处理巴特勒压迫是关键。',
    },
  },
  'suns-vs-timberwolves': {
    slug: 'suns-vs-timberwolves',
    home: 'Phoenix Suns',
    away: 'Minnesota Timberwolves',
    league: 'NBA Playoffs',
    status: 'Playoff Preview',
    kickoff: '2026-05-03T01:30:00Z',
    score: { home: 0, away: 0 },
    topPlayer: 'Kevin Durant vs Anthony Edwards',
    location: 'Footprint Center',
    isStatic: true,
    staticInsight: {
      en: 'Suns vs Timberwolves: Durant and Booker hunt midrange gaps, while Edwards attacks early-clock mismatches. Gobert foul pressure is the swing point.',
      pl: 'Suns kontra Timberwolves: Durant i Booker szukają półdystansu, Edwards atakuje szybkie mismatch’e. Faule Goberta mogą zmienić serię.',
      ko: '선즈 vs 팀버울브스: 듀란트와 부커는 미드레인지 빈틈을 노리고, 에드워즈는 빠른 미스매치를 공략합니다.',
      zh: '太阳对森林狼：杜兰特与布克寻找中距离缝隙，爱德华兹冲击早攻错位。戈贝尔犯规控制是胜负手。',
    },
  },
  'thunder-vs-mavericks': {
    slug: 'thunder-vs-mavericks',
    home: 'Oklahoma City Thunder',
    away: 'Dallas Mavericks',
    league: 'NBA Playoffs',
    status: 'Playoff Preview',
    kickoff: '2026-05-03T23:00:00Z',
    score: { home: 0, away: 0 },
    topPlayer: 'Shai Gilgeous-Alexander vs Luka Doncic',
    location: 'Paycom Center',
    isStatic: true,
    staticInsight: {
      en: 'Thunder vs Mavericks: SGA pressure meets Luka half-court control. Dallas must protect corners; OKC needs playoff rebounding to travel.',
      pl: 'Thunder kontra Mavericks: presja SGA kontra kontrola Luki w ataku pozycyjnym. Dallas musi bronić rogów, OKC zbierać w playoffowym tempie.',
      ko: '썬더 vs 매버릭스: SGA의 림 압박과 루카의 하프코트 운영이 맞붙습니다. 코너 수비와 리바운드가 핵심입니다.',
      zh: '雷霆对独行侠：亚历山大的突破压迫对上东契奇半场掌控。达拉斯要守住底角，雷霆必须提升篮板强度。',
    },
  },
  'knicks-vs-76ers': {
    slug: 'knicks-vs-76ers',
    home: 'New York Knicks',
    away: 'Philadelphia 76ers',
    league: 'NBA Playoffs',
    status: 'Playoff Preview',
    kickoff: '2026-05-04T00:00:00Z',
    score: { home: 0, away: 0 },
    topPlayer: 'Jalen Brunson vs Joel Embiid',
    location: 'Madison Square Garden',
    isStatic: true,
    staticInsight: {
      en: 'Knicks vs 76ers: Brunson targets drop coverage, while Embiid health shapes every possession. Offensive boards are New York’s clearest edge.',
      pl: 'Knicks kontra 76ers: Brunson atakuje drop coverage, a zdrowie Embiida zmienia każde posiadanie. Zbiórki w ataku dają Knicks przewagę.',
      ko: '닉스 vs 76ers: 브런슨은 드롭 수비를 공략하고, 엠비드의 몸 상태가 모든 포제션을 좌우합니다.',
      zh: '尼克斯对76人：布伦森针对沉退防守，恩比德健康状态影响每个回合。前场篮板是纽约最清晰优势。',
    },
  },
  'bucks-vs-pacers': {
    slug: 'bucks-vs-pacers',
    home: 'Milwaukee Bucks',
    away: 'Indiana Pacers',
    league: 'NBA Playoffs',
    status: 'Playoff Preview',
    kickoff: '2026-05-04T02:30:00Z',
    score: { home: 0, away: 0 },
    topPlayer: 'Giannis Antetokounmpo vs Tyrese Haliburton',
    location: 'Fiserv Forum',
    isStatic: true,
    staticInsight: {
      en: 'Bucks vs Pacers: Giannis rim pressure tests Indiana’s transition defense, while Haliburton can punish slow cross-matches. Pace is the bet.',
      pl: 'Bucks kontra Pacers: Giannis testuje obronę transition Indiany, a Haliburton karze wolne powroty. Tempo będzie kluczowe.',
      ko: '벅스 vs 페이서스: 야니스의 림 압박과 할리버튼의 빠른 전환 운영이 충돌합니다. 페이스가 승부처입니다.',
      zh: '雄鹿对步行者：字母哥冲击篮筐考验印第安纳转换防守，哈利伯顿会惩罚慢速对位。节奏是核心变量。',
    },
  },
};

async function fetchFromRapidAPI(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const key = process.env.RAPIDAPI_KEY;
  const host = process.env.RAPIDAPI_HOST;
  if (!key || !host) {
    throw new Error(
      'RapidAPI credentials not configured (RAPIDAPI_KEY / RAPIDAPI_HOST)'
    );
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

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : String(err);
}

function getStaticMatches(): MatchData[] {
  return NBA_PLAYOFF_SLUGS.map((slug) => STATIC_MATCHES[slug]).filter(Boolean);
}

export async function getHotMatches(): Promise<MatchData[]> {
  const provider = (
    process.env.SPORTS_API_PROVIDER || DEFAULT_PROVIDER
  ).toLowerCase();
  try {
    if (provider === 'rapidapi') {
      const data = await fetchFromRapidAPI(
        'https://example-rapidapi-sports-host/nba/playoffs'
      );
      if (Array.isArray(data)) {
        return data.map((d: any) => ({
          slug:
            d.slug ||
            `${d.home?.toLowerCase()?.replace(/\s+/g, '-')}-vs-${d.away?.toLowerCase()?.replace(/\s+/g, '-')}`,
          home: d.home || d.team1 || 'Home',
          away: d.away || d.team2 || 'Away',
          league: d.league || 'NBA Playoffs',
          status: d.status || 'Scheduled',
          kickoff: d.kickoff || d.start || new Date().toISOString(),
          score: { home: d.score?.home || 0, away: d.score?.away || 0 },
          topPlayer: d.topPlayer || d.keyPlayer || 'TBD',
          location: d.location || d.venue || '',
        }));
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      'SPORTS API fetch failed, falling back to NBA playoff mock data:',
      getErrorMessage(err)
    );
  }
  return getStaticMatches();
}

export async function fetchMatchDataBySlug(slug: string): Promise<MatchData> {
  const staticMatch = STATIC_MATCHES[slug];
  if (staticMatch) {
    return staticMatch;
  }

  const provider = (
    process.env.SPORTS_API_PROVIDER || DEFAULT_PROVIDER
  ).toLowerCase();
  try {
    if (provider === 'rapidapi') {
      const remote = await fetchFromRapidAPI(
        'https://example-rapidapi-sports-host/nba/playoffs/match',
        { slug }
      );
      if (remote) {
        return {
          slug: remote.slug || slug,
          home: remote.home || remote.team1 || 'Home',
          away: remote.away || remote.team2 || 'Away',
          league: remote.league || 'NBA Playoffs',
          status: remote.status || 'Scheduled',
          kickoff: remote.kickoff || remote.start || new Date().toISOString(),
          score: {
            home: remote.score?.home || 0,
            away: remote.score?.away || 0,
          },
          topPlayer: remote.topPlayer || remote.keyPlayer || 'TBD',
          location: remote.location || remote.venue || '',
        };
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(
      'SPORTS API fetchMatchDataBySlug failed, using safe fallback',
      getErrorMessage(err)
    );
  }

  return {
    slug,
    home: 'Loading',
    away: 'match data',
    league: 'NBA Playoffs',
    status: 'Loading match data...',
    kickoff: new Date().toISOString(),
    score: { home: 0, away: 0 },
    topPlayer: 'TBD',
    isFallback: true,
  };
}
