import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useSearchParams } from 'react-router';
import { Provider } from 'react-redux';
import { createTestStore } from '@/utils/testUtils';
import Main from '@/components/Main/Main';
import { useGetPokemonsQuery } from '@/api/pokemonApi';

vi.mock('react-router', () => ({
  useSearchParams: vi.fn(),
  Outlet: () => <div data-testid="outlet" />,
}));

vi.mock('@/api/pokemonApi', () => {
  const actual =
    vi.importActual<typeof import('@/api/pokemonApi')>('@/api/pokemonApi');
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
  };
});

describe('Main Component', () => {
  const mockSetSearchParams = vi.fn();

  beforeEach(() => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
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
    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  test('calls handleUlClick and removes details from search params', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ details: 'pikachu' }),
      mockSetSearchParams,
    ]);

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

    const ulElement = screen.getByRole('list');
    fireEvent.click(ulElement);

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });

  test('renders Outlet when details param exists', () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams({ details: 'pikachu' }),
      mockSetSearchParams,
    ]);

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

    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  test('does not call handleSelectPokemon when clicking on checkbox', () => {
    vi.mocked(useGetPokemonsQuery).mockReturnValue({
      data: { items: [{ name: 'Pikachu', isSelected: false }] },
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

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockSetSearchParams).not.toHaveBeenCalled();
  });
  test('calls handleSelectPokemon and updates search params with correct value', () => {
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
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));

    mockSetSearchParams.mock.calls[0][0](new URLSearchParams());
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });
  test('calls setSearchParams to delete details when clicking on empty area', () => {
    render(
      <Provider store={createTestStore()}>
        <Main searchQuery="" />
      </Provider>
    );

    const pokemonList = screen.getByTestId('pokemon-list');
    fireEvent.click(pokemonList);

    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
    mockSetSearchParams.mock.calls[0][0](
      new URLSearchParams({ details: 'Pikachu' })
    );
    expect(mockSetSearchParams).toHaveBeenCalledWith(expect.any(Function));
  });
});
