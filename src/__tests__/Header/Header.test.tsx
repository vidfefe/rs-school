import { render, screen } from '@testing-library/react';
import Header from '@/components/Header/Header';
import { ThemeProvider } from '@/context/ThemeContext';

vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    query: {},
  }),
}));

describe('Header Component', () => {
  test('renders Header component with Search and ThemeToggle', () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );

    expect(screen.getByText(/Pokémon Search/i)).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /🌞|🌙/i })).toBeInTheDocument();
  });
});
