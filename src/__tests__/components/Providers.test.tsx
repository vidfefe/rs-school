import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Providers from '@/components/Providers';
import { store } from '@/store/store';
import { useTheme } from '@/context/useTheme';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <p data-testid="current-theme">Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

vi.mock('@/store/store', () => ({
  store: {
    dispatch: vi.fn(),
    getState: vi.fn(() => ({
      selectedPokemons: { selected: [] },
    })),
    subscribe: vi.fn(),
  },
}));

describe('Providers Component', () => {
  test('renders children correctly', () => {
    render(
      <Providers>
        <div data-testid="child">Child Component</div>
      </Providers>
    );
    expect(screen.getByTestId('child')).toHaveTextContent('Child Component');
  });

  test('integrates Redux store and initializes state correctly', () => {
    render(
      <Providers>
        <TestComponent />
      </Providers>
    );

    expect(store.getState().selectedPokemons.selected).toEqual([]);
    expect(screen.getByTestId('current-theme')).toHaveTextContent(
      'Current theme: light'
    );
  });

  test('toggles theme using ThemeContext', async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <TestComponent />
      </Providers>
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

    await user.click(button);
    expect(screen.getByTestId('current-theme')).toHaveTextContent(
      'Current theme: light'
    );
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  test('throws an error if useTheme is used outside ThemeProvider', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      'Sorry, the theme cannot apply'
    );
    consoleErrorMock.mockRestore();
  });
});
