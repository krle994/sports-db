import type { League } from '../types/league';

/**
 * Filters leagues by search query (name, alternate name, sport) and optional sport.
 * Search is case-insensitive and matches substrings.
 */
export function filterLeagues(
  leagues: League[],
  searchQuery: string,
  sportFilter: string,
): League[] {
  const query = searchQuery.trim().toLowerCase();
  const hasQuery = query.length > 0;

  return leagues.filter((league) => {
    const matchesSport = !sportFilter || sportFilter === 'all' || league.strSport === sportFilter;

    if (!matchesSport) return false;

    if (!hasQuery) return true;

    const name = (league.strLeague ?? '').toLowerCase();
    const alternate = (league.strLeagueAlternate ?? '').toLowerCase();
    const sport = (league.strSport ?? '').toLowerCase();

    return name.includes(query) || alternate.includes(query) || sport.includes(query);
  });
}

/** Returns unique sport names from leagues, sorted. */
export function getUniqueSports(leagues: League[]): string[] {
  const set = new Set(leagues.map((l) => l.strSport).filter(Boolean));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
