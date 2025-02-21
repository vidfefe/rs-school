import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/ThemeContext';
import { useTheme } from '@/context/useTheme';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import ThemeToggle from '@/components/ThemeToggle';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p data-testid="current-theme">Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider and ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
  });

  it('provides default theme from localStorage or light if not set', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent(
      'Current theme: dark'
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles theme between light and dark', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByRole('button', { name: /toggle theme/i });

    expect(screen.getByTestId('current-theme')).toHaveTextContent(
      'Current theme: light'
    );
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    await user.click(button);

    expect(screen.getByTestId('current-theme')).toHaveTextContent(
      'Current theme: dark'
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(button);

    expect(screen.getByTestId('current-theme')).toHaveTextContent(
      'Current theme: light'
    );
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
  it('toggles theme using ThemeToggle component', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const toggleButton = screen.getByRole('button');

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');

    await user.click(toggleButton);

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');

    await user.click(toggleButton);

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('throws an error if useTheme is used outside ThemeProvider', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'Sorry, the theme cannot apply'
    );

    consoleErrorMock.mockRestore();
  });
});
