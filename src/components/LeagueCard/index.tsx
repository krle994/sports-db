import { useCallback } from 'react';
import { useSeasonBadge } from '../../hooks/useSeasonBadge';
import type { League } from '../../types/league';
import styles from './LeagueCard.module.scss';

export interface LeagueCardProps {
  league: League;
  onSelect?: (leagueId: string) => void;
  isSelected?: boolean;
}

export function LeagueCard({ league, onSelect, isSelected = false }: LeagueCardProps) {
  const { idLeague, strLeague, strSport, strLeagueAlternate } = league;
  const { data, isLoading, isError } = useSeasonBadge(isSelected ? idLeague : null);

  const firstSeasonWithBadge = data?.seasons?.find((s) => s.strBadge) ?? data?.seasons?.[0];

  const handleClick = useCallback(() => {
    onSelect?.(idLeague);
  }, [idLeague, onSelect]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect?.(idLeague);
      }
    },
    [idLeague, onSelect],
  );

  return (
    <article
      className={styles.card}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <h3 className={styles.leagueName}>{strLeague}</h3>
      <p className={styles.sport}>{strSport}</p>
      <p className={styles.alternate}>{strLeagueAlternate ? strLeagueAlternate : 'N/A'}</p>
      {isSelected && (
        <div className={styles.badgeWrapper}>
          {firstSeasonWithBadge?.strBadge && (
            <div className={styles.badgeFrame}>
              <div className={styles.badge}>
                {isError && <span className={styles.badgeError}>Badge unavailable</span>}
                {!isLoading && !isError && (
                  <>
                    <img
                      src={firstSeasonWithBadge.strBadge}
                      alt={firstSeasonWithBadge.strSeason ?? 'Season badge'}
                      className={styles.badgeImage}
                    />
                    {firstSeasonWithBadge.strSeason && (
                      <span className={styles.badgeLabel}>{firstSeasonWithBadge.strSeason}</span>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
          {!firstSeasonWithBadge?.strBadge && (
            <div className={styles.badgeFrame} aria-hidden="true">
              <span className={styles.badgePlaceholderIcon}>🏆</span>
              <span className={styles.badgePlaceholder}>No badge available</span>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
