import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import Search from '@/components/Header/Search';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { useLoaderData, useSearchParams } from 'react-router';

vi.mock('@/hooks/useSearchQuery', () => ({
  useSearchQuery: vi.fn(),
}));

vi.mock('react-router', () => ({
  useLoaderData: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('Search Component', () => {
  test('renders the search input and button', () => {
    const mockSetSearchParams = vi.fn();
    (useLoaderData as Mock).mockReturnValue({ searchValue: '' });
    (useSearchQuery as Mock).mockReturnValue(['', vi.fn()]);
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    render(<Search />);

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  test('calls setSearchParams and setSearchValue when input value changes and search button is clicked', async () => {
    const mockSetSearchParams = vi.fn();
    const mockSetSearchValue = vi.fn();

    (useSearchQuery as Mock).mockReturnValue([undefined, mockSetSearchValue]);
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
    (useLoaderData as Mock).mockReturnValue({ searchValue: '' });

    render(<Search />);

    const searchInput = screen.getByTestId('search-input');
    const searchButton = screen.getByTestId('search-button');

    fireEvent.change(searchInput, { target: { value: 'charizard' } });

    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith({
        page: '1',
        searchValue: 'charizard',
      });
    });

    expect(mockSetSearchValue).toHaveBeenCalledWith('charizard');
  });

  test('renders initial input value based on loaderData or searchValue', () => {
    (useSearchQuery as Mock).mockReturnValue(['', vi.fn()]);
    (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);
    (useLoaderData as Mock).mockReturnValue({ searchValue: 'pikachu' });

    render(<Search />);

    const searchInput = screen.getByTestId('search-input');
    expect((searchInput as HTMLInputElement).value).toBe('pikachu');
  });
  test('calls setSearchParams to delete searchValue and set page=1 when input is empty', async () => {
    const mockSetSearchParams = vi.fn();
    (useLoaderData as Mock).mockReturnValue({ searchValue: 'pikachu' });
    (useSearchQuery as Mock).mockReturnValue(['', vi.fn()]);

    const initialSearchParams = new URLSearchParams({ searchValue: 'pikachu' });
    const updatedSearchParams = new URLSearchParams();
    updatedSearchParams.set('page', '1');

    (useSearchParams as Mock).mockReturnValue([
      initialSearchParams,
      mockSetSearchParams,
    ]);

    render(<Search />);

    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith(updatedSearchParams);
    });
  });
  test('calls setSearchParams with page=1 and searchValue when loaderSearchValue is falsy', async () => {
    const mockSetSearchParams = vi.fn();
    const trimmedValue = 'charizard';
    const loaderSearchValue = '';

    (useLoaderData as Mock).mockReturnValue({ searchValue: loaderSearchValue });
    (useSearchQuery as Mock).mockReturnValue([trimmedValue, vi.fn()]);
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);

    render(<Search />);

    const searchButton = screen.getByTestId('search-button');
    const searchInput = screen.getByTestId('search-input');

    fireEvent.change(searchInput, { target: { value: trimmedValue } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockSetSearchParams).toHaveBeenCalledWith({
        page: '1',
        searchValue: trimmedValue,
      });
    });
  });
});
