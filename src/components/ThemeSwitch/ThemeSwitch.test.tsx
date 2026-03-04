import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { ThemeSwitch } from './index';

describe('ThemeSwitch', () => {
  it('renders a button with accessible label', () => {
    render(<ThemeSwitch />);
    const button = screen.getByRole('button', {
      name: /switch to (light|dark) mode/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('toggles aria-label when clicked', async () => {
    const user = userEvent.setup();
    render(<ThemeSwitch />);

    const button = screen.getByRole('button', {
      name: /switch to (light|dark) mode/i,
    });
    const initialLabel = button.getAttribute('aria-label');

    await user.click(button);
    expect(button.getAttribute('aria-label')).not.toBe(initialLabel);
  });
});
