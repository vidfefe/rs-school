import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import HomePage from '@/pages/HomePage';
import { vi } from 'vitest';

vi.mock('@/components/Header/Header', () => ({
  default: ({ onSearch }: { onSearch: (value: string) => void }) => (
    <input
      type="text"
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      data-testid="search-input"
    />
  ),
}));

vi.mock('@/components/Main/Main', () => ({
  default: ({ searchQuery }: { searchQuery: string }) => (
    <div data-testid="main-content">{searchQuery}</div>
  ),
}));

vi.mock('@/components/Footer/Footer', () => ({
  default: () => <footer>Footer</footer>,
}));

describe('HomePage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Header, Main, and Footer', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('updates the search query when searching', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const input = screen.getByTestId('search-input');
    await user.type(input, 'pikachu');

    expect(screen.getByTestId('main-content')).toHaveTextContent('pikachu');
  });

  it('trims search input before updating state', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const input = screen.getByTestId('search-input');
    await user.type(input, '   charmander   ');

    expect(screen.getByTestId('main-content')).toHaveTextContent('charmander');
  });
});
