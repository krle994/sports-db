import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { LeagueCard } from './index';
import type { League } from '../../types/league';

vi.mock('../../hooks/useSeasonBadge', () => ({
  useSeasonBadge: vi.fn(),
}));

const { useSeasonBadge } = await import('../../hooks/useSeasonBadge');

const mockLeague: League = {
  idLeague: '123',
  strLeague: 'Premier League',
  strSport: 'Soccer',
  strLeagueAlternate: 'EPL',
};

describe('LeagueCard', () => {
  beforeEach(() => {
    vi.mocked(useSeasonBadge).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useSeasonBadge>);
  });

  it('renders league name, sport and alternate name', () => {
    render(<LeagueCard league={mockLeague} />);
    expect(screen.getByRole('heading', { name: 'Premier League' })).toBeInTheDocument();
    expect(screen.getByText('Soccer')).toBeInTheDocument();
    expect(screen.getByText('EPL')).toBeInTheDocument();
  });

  it('shows N/A when strLeagueAlternate is empty', () => {
    render(
      <LeagueCard
        league={{ ...mockLeague, strLeagueAlternate: '' }}
      />,
    );
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('calls onSelect with league id when clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<LeagueCard league={mockLeague} onSelect={onSelect} />);
    const card = screen.getByRole('button', { name: /premier league/i });
    await user.click(card);
    expect(onSelect).toHaveBeenCalledWith('123');
  });

  it('calls onSelect when Enter is pressed', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<LeagueCard league={mockLeague} onSelect={onSelect} />);
    const card = screen.getByRole('button', { name: /premier league/i });
    card.focus();
    await user.keyboard('{Enter}');
    expect(onSelect).toHaveBeenCalledWith('123');
  });

  it('calls onSelect when Space is pressed', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<LeagueCard league={mockLeague} onSelect={onSelect} />);
    const card = screen.getByRole('button', { name: /premier league/i });
    card.focus();
    await user.keyboard(' ');
    expect(onSelect).toHaveBeenCalledWith('123');
  });

  it('does not throw when onSelect is omitted and card is clicked', async () => {
    const user = userEvent.setup();
    render(<LeagueCard league={mockLeague} />);
    const card = screen.getByRole('button', { name: /premier league/i });
    await user.click(card);
  });

  it('has role button and is focusable', () => {
    render(<LeagueCard league={mockLeague} />);
    const card = screen.getByRole('button', { name: /premier league/i });
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('when isSelected and useSeasonBadge returns badge data, shows badge', () => {
    vi.mocked(useSeasonBadge).mockReturnValue({
      data: {
        seasons: [
          { strSeason: '2023-24', strBadge: 'https://badge.example.png' },
        ],
      },
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useSeasonBadge>);
    render(<LeagueCard league={mockLeague} isSelected />);
    expect(screen.getByAltText(/2023-24|season badge/i)).toBeInTheDocument();
    expect(screen.getByText('2023-24')).toBeInTheDocument();
  });

  it('when isSelected and no badge data, shows placeholder', () => {
    vi.mocked(useSeasonBadge).mockReturnValue({
      data: { seasons: [] },
      isLoading: false,
      isError: false,
    } as unknown as ReturnType<typeof useSeasonBadge>);
    render(<LeagueCard league={mockLeague} isSelected />);
    expect(screen.getByText(/no badge available/i)).toBeInTheDocument();
  });

  it('when isSelected and isError, shows badge unavailable', () => {
    vi.mocked(useSeasonBadge).mockReturnValue({
      data: { seasons: [{ strSeason: '2023-24', strBadge: 'https://x.png' }] },
      isLoading: false,
      isError: true,
    } as unknown as ReturnType<typeof useSeasonBadge>);
    render(<LeagueCard league={mockLeague} isSelected />);
    expect(screen.getByText(/badge unavailable/i)).toBeInTheDocument();
  });
});
