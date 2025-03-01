import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { createTestStore } from '@/utils/testUtils';
import Main from '@/components/Main/Main';
import {
  useGetPokemonsQuery,
  useGetPokemonDetailsQuery,
} from '@/api/pokemonApi';
import { PokemonDetails } from '@/types/pokemonTypes';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/components/PokemonCardDetails', () => ({
  default: ({ details }: { details: PokemonDetails }) => (
    <div>{details.name}</div>
  ),
}));

vi.mock('@/api/pokemonApi', async () => {
  const actual =
    await vi.importActual<typeof import('@/api/pokemonApi')>(
      '@/api/pokemonApi'
    );
  return {
    ...actual,
    pokemonApi: {
      reducerPath: 'pokemonApi',
      reducer: (state = {}) => state,
      middleware:
        () => (next: (action: unknown) => void) => (action: unknown) =>
          next(action),
    },
    useGetPokemonsQuery: vi.fn(),
    useGetPokemonDetailsQuery: vi.fn(),
  };
});

describe('Main Component', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      query: {},
      push: mockPush,
    });
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: { items: [], totalPages: 1 },
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });
    vi.mocked(useGetPokemonDetailsQuery).mockReturnValue({
      data: null,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('renders Loader when data is loading', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
      isFetching: true,
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
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: { items: [], totalPages: 1 },
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });

  test('renders PokemonList and Pagination when data is available', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: { items: [{ name: 'Pikachu' }], totalPages: 2 },
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  test('calls handleSelectPokemon and updates search params', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: { items: [{ name: 'Pikachu' }], totalPages: 1 },
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    const pokemonItem = screen.getByText(/pikachu/i).closest('li');
    expect(pokemonItem).toBeInTheDocument();

    fireEvent.click(pokemonItem!);
    expect(mockPush).toHaveBeenCalledWith({ query: { details: 'Pikachu' } });
  });

  test('calls handleUlClick and removes details from search params', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: { items: [{ name: 'Pikachu' }], totalPages: 1 },
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });

    (useRouter as Mock).mockReturnValue({
      query: { details: 'pikachu' },
      push: mockPush,
    });

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    const ulElement = screen.getByTestId('pokemon-list');
    fireEvent.click(ulElement);

    expect(mockPush).toHaveBeenCalledWith({ query: {} });
  });

  test('does not trigger action if clicked on a checkbox', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: { items: [{ name: 'Pikachu' }], totalPages: 1 },
      isLoading: false,
      isError: false,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });
    const mockHandler = vi.fn();

    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockHandler).not.toHaveBeenCalled();
  });
});
