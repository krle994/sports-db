import { useQuery } from '@tanstack/react-query';
import { fetchSeasonBadge } from '../api/fetch';

/** Fetches season badge for a league. Cached by React Query. */
export function useSeasonBadge(leagueId: string | null) {
  return useQuery({
    queryKey: ['seasonBadge', leagueId],
    queryFn: () => fetchSeasonBadge(leagueId!),
    enabled: Boolean(leagueId),
  });
}
