import { useQuery } from '@tanstack/react-query';
import { fetchAllLeagues } from '../api/fetch';

const LEAGUES_QUERY_KEY = ['leagues'] as const;

export function useLeagues() {
  return useQuery({
    queryKey: LEAGUES_QUERY_KEY,
    queryFn: fetchAllLeagues,
  });
}
