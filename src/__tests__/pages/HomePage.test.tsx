import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Mock, vi } from 'vitest';
import HomePage from '@/app/page';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('HomePage Component', () => {
  const mockPush = vi.fn();
  const mockRouter = { push: mockPush };

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
    (usePathname as Mock).mockReturnValue('/');
    (useSearchParams as Mock).mockReturnValue(new URLSearchParams());
    vi.clearAllMocks();
  });

  test('renders Header, Main, and Footer', () => {
    render(<HomePage />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('updates the search query when searching', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'pikachu');

    expect(screen.getByTestId('main-content')).toHaveTextContent('pikachu');
  });

  test('trims search input before updating state and URL', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const input = screen.getByTestId('search-input');
    await user.type(input, '   charmander   ');

    expect(screen.getByTestId('main-content')).toHaveTextContent('charmander');

    expect(mockPush).toHaveBeenCalledWith('/?page=1');
  });

  test('calls router.push with the correct URL when search is triggered', async () => {
    const user = userEvent.setup();
    render(<HomePage />);

    const input = screen.getByTestId('search-input');
    await user.type(input, 'bulbasaur');

    expect(mockPush).toHaveBeenCalledWith('/?page=1');
  });
});
