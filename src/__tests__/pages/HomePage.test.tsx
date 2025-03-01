import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock, vi } from 'vitest';
import HomePage from '@/pages/index';
import { useRouter } from 'next/router';

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

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('HomePage Component', () => {
  const mockPush = vi.fn();
  const mockRouter = { push: mockPush };

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
    vi.clearAllMocks();
  });

  it('renders Header, Main, and Footer', () => {
    render(<HomePage />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('updates the search query when searching', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'pikachu');

    expect(screen.getByTestId('main-content')).toHaveTextContent('pikachu');
  });

  it('trims search input before updating state and URL', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const input = screen.getByTestId('search-input');
    await user.type(input, '   charmander   ');

    expect(screen.getByTestId('main-content')).toHaveTextContent('charmander');

    expect(mockPush).toHaveBeenCalledWith({ query: { page: '1' } });
  });
});
