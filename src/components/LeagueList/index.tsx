import { useMemo, useState, useCallback } from 'react';
import { useLeagues } from '../../hooks/useLeagues';
import { filterLeagues, getUniqueSports } from '../../utils/filterLeagues';
import { LeagueCard } from '../LeagueCard';
import { LoadingSpinner } from '../LoadingSpinner';
import { Searchbar } from '../Searchbar';
import { Dropdown } from '../Dropdown';
import type { DropdownOption } from '../Dropdown';
import styles from './LeagueList.module.scss';

const ALL_SPORTS_VALUE = 'all';

export function LeagueList() {
  const { data, isLoading, isError, error } = useLeagues();
  const [searchQuery, setSearchQuery] = useState('');
  const [sportFilter, setSportFilter] = useState(ALL_SPORTS_VALUE);
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);

  const leagues = data?.leagues ?? [];
  const sportOptions = useMemo<DropdownOption[]>(() => {
    const sports = getUniqueSports(leagues);
    return [
      { value: ALL_SPORTS_VALUE, label: 'All sports' },
      ...sports.map((s) => ({ value: s, label: s })),
    ];
  }, [leagues]);

  const filteredLeagues = useMemo(
    () => filterLeagues(leagues, searchQuery, sportFilter),
    [leagues, searchQuery, sportFilter],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleLeagueSelect = useCallback((leagueId: string) => {
    setSelectedLeagueId((prev) => (prev === leagueId ? null : leagueId));
  }, []);

  if (isLoading) {
    return <LoadingSpinner label="Loading leagues" />;
  }

  if (isError) {
    return (
      <p className={styles.message} role="alert">
        {error instanceof Error ? error.message : 'Failed to load leagues'}
      </p>
    );
  }

  if (leagues.length === 0) {
    return <p className={styles.message}>No leagues found.</p>;
  }

  return (
    <section className={styles.section}>
      <div className={styles.toolbar}>
        <Searchbar onSearchChange={handleSearchChange} />
        <Dropdown
          options={sportOptions}
          value={sportFilter}
          onChange={setSportFilter}
          label="Sport"
          id="filter-sport"
        />
      </div>

      {filteredLeagues.length === 0 ? (
        <p className={styles.message} role="status">
          No leagues match your search or filter. Try different terms or choose another sport.
        </p>
      ) : (
        <ul className={styles.list}>
          {filteredLeagues.map((league) => (
            <li key={league.idLeague}>
              <LeagueCard
                league={league}
                onSelect={handleLeagueSelect}
                isSelected={selectedLeagueId === league.idLeague}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
