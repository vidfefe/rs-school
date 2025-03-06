import { render, screen, fireEvent } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import { useRouter } from 'next/router';
import { useGetPokemonsQuery } from '@/api/pokemonApi';
import Pagination from '@/components/Main/Pagination';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/api/pokemonApi', () => ({
  useGetPokemonsQuery: vi.fn(),
}));

describe('Pagination Component', () => {
  const mockPush = vi.fn();
  const totalPages = 5;

  beforeEach(() => {
    mockPush.mockClear();
    (useRouter as Mock).mockReturnValue({
      query: { page: '1', details: 'pikachu' },
      push: mockPush,
    });

    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: { totalPages },
      isLoading: false,
      isError: false,
    });
  });

  test('uses page=1 by default if the parameter is missing', () => {
    (useRouter as Mock).mockReturnValue({
      query: { details: 'pikachu' },
      push: mockPush,
    });

    render(<Pagination />);
    expect(screen.getByText('1 / 5')).toBeInTheDocument();
  });

  test('passes currentPage to useGetPokemonsQuery', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '3', details: 'pikachu' },
      push: mockPush,
    });

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

    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '2', details: 'pikachu' },
    });
  });

  test('handles page change when clicking previous', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '2', details: 'pikachu' },
      push: mockPush,
    });

    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '1', details: 'pikachu' },
    });
  });

  test('does not allow page change when on the first page', () => {
    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('does not allow page change when on the last page', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '5', details: 'pikachu' },
      push: mockPush,
    });

    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).not.toHaveBeenCalled();
  });

  test('handles page change when on page 3', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '3', details: 'pikachu' },
      push: mockPush,
    });

    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '<' }));

    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '2', details: 'pikachu' },
    });
  });

  test('handles page change to the last page', () => {
    (useRouter as Mock).mockReturnValue({
      query: { page: '4', details: 'pikachu' },
      push: mockPush,
    });

    render(<Pagination />);

    fireEvent.click(screen.getByRole('button', { name: '>' }));

    expect(mockPush).toHaveBeenCalledWith({
      query: { page: '5', details: 'pikachu' },
    });
  });
});
