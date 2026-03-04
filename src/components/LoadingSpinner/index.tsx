import styles from './LoadingSpinner.module.scss';

export interface LoadingSpinnerProps {
  /** Accessible label for screen readers */
  label?: string;
}

export function LoadingSpinner({ label = 'Loading' }: LoadingSpinnerProps) {
  return (
    <div className={styles.spinner} role="status" aria-busy aria-label={label}>
      <span className={styles.ring} aria-hidden />
    </div>
  );
}
