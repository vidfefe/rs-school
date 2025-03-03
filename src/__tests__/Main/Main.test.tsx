import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { createTestStore } from '@/utils/testUtils';
import Main from '@/components/Main/Main';
import {
  useGetPokemonsQuery,
  useGetPokemonDetailsQuery,
} from '@/api/pokemonApi';
import { PokemonDetails } from '@/types/pokemonTypes';

// Mocks for Next.js navigation
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

// Mock for PokemonCardDetails component
vi.mock('@/components/PokemonCardDetails', () => ({
  default: ({ details }: { details: PokemonDetails }) => (
    <div>{details.name}</div>
  ),
}));

// Mock for API requests
vi.mock('@/api/pokemonApi', async () => {
  const actual =
    await vi.importActual<typeof import('@/api/pokemonApi')>(
      '@/api/pokemonApi'
    );
  return {
    ...actual,
    useGetPokemonsQuery: vi.fn(),
    useGetPokemonDetailsQuery: vi.fn(),
  };
});

describe('Main Component', () => {
  const mockPush = vi.fn();
  const mockSearchParams = new URLSearchParams();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({ push: mockPush });
    (usePathname as Mock).mockReturnValue('/');
    (useSearchParams as Mock).mockReturnValue(mockSearchParams);

    mockPokemonsQuery([]);
    mockPokemonDetailsQuery(null);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  function mockPokemonsQuery(items: { name: string }[], totalPages = 1) {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: { items, totalPages },
      isLoading: false,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
    });
  }

  function mockPokemonDetailsQuery(data: PokemonDetails | null) {
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data,
      isLoading: false,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
    });
  }

  test('renders Loader when data is loading', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders Error when API request fails', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: 'Failed to fetch data' },
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
  });

  test('renders NoResults when there are no Pokémon', () => {
    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });

  test('renders PokemonList and Pagination when data is available', () => {
    mockPokemonsQuery([{ name: 'Pikachu' }], 2);

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('updates search params when a Pokémon is selected', () => {
    mockPokemonsQuery([{ name: 'Pikachu' }]);

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    const pokemonItem = screen.getByText(/pikachu/i).closest('li');
    fireEvent.click(pokemonItem!);

    expect(mockPush).toHaveBeenCalledWith('/?details=Pikachu');
  });

  test('removes details from search params when clicking outside', () => {
    mockPokemonsQuery([{ name: 'Pikachu' }]);
    mockSearchParams.set('details', 'Pikachu');

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    const pokemonList = screen.getByTestId('pokemon-list');
    fireEvent.click(pokemonList);

    expect(mockPush).toHaveBeenCalledWith(expect.stringMatching(/^\/\??$/));
  });

  test('does not trigger selection when clicking on a checkbox', () => {
    mockPokemonsQuery([{ name: 'Pikachu' }]);

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockPush).not.toHaveBeenCalled();
  });
});
