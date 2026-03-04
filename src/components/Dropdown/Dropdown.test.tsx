import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { Dropdown } from './index';

const defaultOptions = [
  { value: 'all', label: 'All Sports' },
  { value: 'Soccer', label: 'Soccer' },
  { value: 'Basketball', label: 'Basketball' },
  { value: 'Tennis', label: 'Tennis' },
  { value: 'Motorsport', label: 'Motorsport' },
];

describe('Dropdown', () => {
  it('renders with label and options', () => {
    render(<Dropdown options={defaultOptions} value="all" onChange={() => {}} />);
    expect(screen.getByLabelText(/filter/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveValue('all');
    expect(screen.getByRole('option', { name: 'All Sports' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Soccer' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Basketball' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Tennis' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Motorsport' })).toBeInTheDocument();
  });

  it('uses custom label when provided', () => {
    render(<Dropdown options={defaultOptions} value="all" onChange={() => {}} label="Sport" />);
    expect(screen.getByLabelText('Sport')).toBeInTheDocument();
  });

  it('calls onChange with selected value when user changes selection', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Dropdown options={defaultOptions} value="all" onChange={onChange} />);
    const select = screen.getByRole('combobox');
    await user.selectOptions(select, 'Soccer');
    expect(onChange).toHaveBeenCalledWith('Soccer');
  });

  it('displays current value', () => {
    render(<Dropdown options={defaultOptions} value="Basketball" onChange={() => {}} />);
    expect(screen.getByRole('combobox')).toHaveValue('Basketball');
  });
});
