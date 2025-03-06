import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import Search from '@/components/Header/Search';
import { Mock, vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('Search Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      push: mockPush,
      query: {},
    });
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

  test('calls router.push with correct query object on search', () => {
    render(<Search />);

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: 'charizard' } });
    fireEvent.click(searchButton);

    expect(mockPush).toHaveBeenCalledWith({ query: { page: '1' } });
  });
});
