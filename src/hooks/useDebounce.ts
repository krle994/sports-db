import { useEffect, useState } from 'react';

/**
 * Debounces a value. The returned value updates only after the given delay
 * has passed without the source value changing. Useful for text inputs to
 * avoid excessive API calls or re-renders on every keystroke.
 *
 * @param value - The value to debounce (e.g. input value)
 * @param delay - Delay in milliseconds before updating the debounced value
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
