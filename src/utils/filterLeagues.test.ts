import { describe, it, expect } from 'vitest';
import { filterLeagues, getUniqueSports } from './filterLeagues';
import type { League } from '../types/league';

const leagues: League[] = [
  {
    idLeague: '1',
    strLeague: 'Premier League',
    strSport: 'Soccer',
    strLeagueAlternate: 'EPL',
  },
  {
    idLeague: '2',
    strLeague: 'La Liga',
    strSport: 'Soccer',
    strLeagueAlternate: 'LaLiga',
  },
  {
    idLeague: '3',
    strLeague: 'NBA',
    strSport: 'Basketball',
    strLeagueAlternate: 'National Basketball Association',
  },
  {
    idLeague: '4',
    strLeague: 'Champions League',
    strSport: 'Soccer',
    strLeagueAlternate: 'UCL',
  },
];

describe('filterLeagues', () => {
  it('returns all leagues when search and sport filter are empty', () => {
    expect(filterLeagues(leagues, '', '')).toEqual(leagues);
    expect(filterLeagues(leagues, '   ', 'all')).toEqual(leagues);
  });

  it('filters by sport when sportFilter is set', () => {
    const result = filterLeagues(leagues, '', 'Soccer');
    expect(result).toHaveLength(3);
    expect(result.every((l) => l.strSport === 'Soccer')).toBe(true);
  });

  it('returns all leagues when sportFilter is "all"', () => {
    expect(filterLeagues(leagues, '', 'all')).toEqual(leagues);
  });

  it('filters by search query (league name, case-insensitive)', () => {
    const result = filterLeagues(leagues, 'premier', '');
    expect(result).toHaveLength(1);
    expect(result[0].strLeague).toBe('Premier League');
  });

  it('filters by search query (alternate name)', () => {
    const result = filterLeagues(leagues, 'epl', '');
    expect(result).toHaveLength(1);
    expect(result[0].strLeagueAlternate).toBe('EPL');
  });

  it('filters by search query (sport)', () => {
    const result = filterLeagues(leagues, 'basketball', '');
    expect(result).toHaveLength(1);
    expect(result[0].strSport).toBe('Basketball');
  });

  it('trims search query', () => {
    const result = filterLeagues(leagues, '  soccer  ', '');
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((l) => l.strSport.toLowerCase().includes('soccer'))).toBe(true);
  });

  it('combines search and sport filter', () => {
    const result = filterLeagues(leagues, 'league', 'Soccer');
    expect(result).toHaveLength(2);
    expect(result.map((l) => l.strLeague)).toContain('Premier League');
    expect(result.map((l) => l.strLeague)).toContain('Champions League');
  });

  it('returns empty array when no league matches', () => {
    expect(filterLeagues(leagues, 'xyz', '')).toHaveLength(0);
    expect(filterLeagues(leagues, '', 'Tennis')).toHaveLength(0);
  });

  it('handles empty leagues array', () => {
    expect(filterLeagues([], 'test', '')).toEqual([]);
    expect(filterLeagues([], '', 'Soccer')).toEqual([]);
  });
});

describe('getUniqueSports', () => {
  it('returns unique sport names sorted alphabetically', () => {
    expect(getUniqueSports(leagues)).toEqual(['Basketball', 'Soccer']);
  });

  it('returns empty array for empty leagues', () => {
    expect(getUniqueSports([])).toEqual([]);
  });

  it('filters out falsy sport values', () => {
    const withEmpty = [
      ...leagues,
      {
        idLeague: '5',
        strLeague: 'Unknown',
        strSport: '',
        strLeagueAlternate: '',
      } as League,
    ];
    expect(getUniqueSports(withEmpty)).toEqual(['Basketball', 'Soccer']);
  });
});
