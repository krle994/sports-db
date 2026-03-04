import type { AllLeaguesResponse } from '../types/league';
import type { SeasonBadgeResponse } from '../types/season';
import { ENDPOINTS } from './constants';

export async function fetchAllLeagues(): Promise<AllLeaguesResponse> {
  const res = await fetch(ENDPOINTS.allLeagues);
  if (!res.ok) throw new Error(`Leagues API error: ${res.status}`);
  return res.json();
}

export async function fetchSeasonBadge(leagueId: string): Promise<SeasonBadgeResponse> {
  const res = await fetch(ENDPOINTS.seasonBadge(leagueId));
  if (!res.ok) throw new Error(`Season badge API error: ${res.status}`);
  return res.json();
}
