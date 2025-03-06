import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useGetPokemonsQuery } from '@/api/pokemonApi';
import Pagination from '@/components/Main/Pagination';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/api/pokemonApi', () => ({
  useGetPokemonsQuery: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = vi.fn();
  const totalPages = 5;

  beforeEach(() => {
    mockPush.mockClear();
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (usePathname as Mock).mockReturnValue('/');
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=1&details=pikachu')
    );

    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: { totalPages },
      isLoading: false,
      isError: false,
    });
  });

  test('uses page=1 by default if the parameter is missing', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('details=pikachu')
    );

    render(<Pagination />);

    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });

  test('passes currentPage to useGetPokemonsQuery', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=3&details=pikachu')
    );

    render(<Pagination />);

    expect(useGetPokemonsQuery).toHaveBeenCalledWith({
      searchValue: '',
      currentPage: 3,
    });
  });

  test('uses totalPages = 1 if data is missing', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
    });

    render(<Pagination />);

    expect(screen.getByText('1 / 1')).toBeInTheDocument();
  });

  test('handles page change when clicking next', () => {
    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).toHaveBeenCalledWith('/?page=2&details=pikachu');
  });

  test('handles page change when clicking previous', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=2&details=pikachu')
    );

    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).toHaveBeenCalledWith('/?page=1&details=pikachu');
  });

  test('does not allow page change when on the first page', () => {
    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('does not allow page change when on the last page', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=5&details=pikachu')
    );

    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('handles page change when on page 3', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=3&details=pikachu')
    );

    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).toHaveBeenCalledWith('/?page=2&details=pikachu');
  });

  test('handles page change to the last page', () => {
    (useSearchParams as Mock).mockReturnValue(
      new URLSearchParams('page=4&details=pikachu')
    );

    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).toHaveBeenCalledWith('/?page=5&details=pikachu');
  });
});
