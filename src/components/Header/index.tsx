import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <h1>Sports DB</h1>
      </div>
    </header>
  );
};
