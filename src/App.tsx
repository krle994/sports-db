import { Header } from './components/Header';
import { LeagueList } from './components/LeagueList';
import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <LeagueList />
    </div>
  );
}
