import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { fireEvent, act } from '@testing-library/react';
import { Searchbar } from './index';

describe('Searchbar', () => {
  it('renders with default placeholder', () => {
    render(<Searchbar onSearchChange={() => {}} />);
    expect(screen.getByPlaceholderText(/search leagues/i)).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<Searchbar onSearchChange={() => {}} placeholder="Search…" />);
    expect(screen.getByPlaceholderText('Search…')).toBeInTheDocument();
  });

  it('updates input value as user types', async () => {
    const user = userEvent.setup();
    render(<Searchbar onSearchChange={() => {}} />);
    const input = screen.getByRole('searchbox');
    await user.type(input, 'premier');
    expect(input).toHaveValue('premier');
  });

  it('calls onSearchChange with debounced value after delay', async () => {
    vi.useFakeTimers();
    const onSearchChange = vi.fn();
    render(<Searchbar onSearchChange={onSearchChange} debounceMs={200} />);
    const input = screen.getByRole('searchbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(onSearchChange).not.toHaveBeenLastCalledWith('test');
    await act(async () => {
      await vi.advanceTimersByTimeAsync(200);
    });
    expect(onSearchChange).toHaveBeenLastCalledWith('test');
    vi.useRealTimers();
  });

  it('has accessible search label', () => {
    render(<Searchbar onSearchChange={() => {}} />);
    expect(screen.getByRole('searchbox', { name: /search leagues/i })).toBeInTheDocument();
  });
});
