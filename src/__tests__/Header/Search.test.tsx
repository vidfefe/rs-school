import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import Search from '@/components/Header/Search';
import { Mock, vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(() => '/'),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));

describe('Search Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('updates input value on change', () => {
    render(<Search />);

    const searchInput = screen.getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'charizard' } });

    expect((searchInput as HTMLInputElement).value).toBe('charizard');
  });

  test('calls router.push with correct URL on search', () => {
    render(<Search />);

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: 'charizard' } });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith('/?page=1');
  });
});
