import { useTheme } from '../../contexts/ThemeContext';
import SunIcon from '../../assets/icons/sun.svg';
import MoonIcon from '../../assets/icons/moon.svg';
import styles from './ThemeSwitch.module.scss';

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.switch}
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      <span className={styles.icon} aria-hidden>
        <img
          src={theme === 'dark' ? SunIcon : MoonIcon}
          alt=""
          width={20}
          height={20}
          className={styles.iconImage}
        />
      </span>
    </button>
  );
}
