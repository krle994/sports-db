import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import styles from './Searchbar.module.scss';

const DEFAULT_DEBOUNCE_MS = 300;

export interface SearchbarProps {
  onSearchChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function Searchbar({
  onSearchChange,
  placeholder = 'Search leagues…',
  debounceMs = DEFAULT_DEBOUNCE_MS,
}: SearchbarProps) {
  const [value, setValue] = useState('');
  const debouncedValue = useDebounce(value, debounceMs);

  useEffect(() => {
    onSearchChange(debouncedValue);
  }, [debouncedValue, onSearchChange]);

  return (
    <div className={styles.searchbar}>
      <span className={styles.icon} aria-hidden>
        🔍
      </span>
      <input
        type="search"
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        aria-label="Search leagues"
        autoComplete="off"
      />
    </div>
  );
}
