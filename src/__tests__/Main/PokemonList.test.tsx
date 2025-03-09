import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import PokemonList from '@/components/Main/PokemonList';
import selectedPokemonsReducer, {
  togglePokemon,
} from '@/store/selectedPokemonsSlice';
import { pokemonApi } from '@/api/pokemonApi';
import { useLoaderData, useSearchParams } from 'react-router';
import { Pokemon } from '@/types/pokemonTypes';

import type { Store } from '@reduxjs/toolkit';

vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useLoaderData: vi.fn(),
  useSearchParams: vi.fn(),
}));

let store: Store;

const mockPokemons: Pokemon[] = [
  {
    name: 'bulbasaur',
    description: 'Height: 0.7m, Weight: 6.9kg',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
  },
  {
    name: 'ivysaur',
    description: 'Height: 1m, Weight: 13kg',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
  },
];

beforeEach(() => {
  store = configureStore({
    reducer: {
      selectedPokemons: selectedPokemonsReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });

  (useLoaderData as Mock).mockReturnValue({
    data: mockPokemons,
    isError: false,
    error: null,
  });
  (useSearchParams as Mock).mockReturnValue([new URLSearchParams(), vi.fn()]);
});

describe('PokemonList Component', () => {
  test('renders provided Pokemon', () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeDefined();
    expect(screen.getByText(/ivysaur/i)).toBeDefined();
  });

  test('sets searchParams to selected Pokemon when clicked', () => {
    const setSearchParams = vi.fn();
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams(),
      setSearchParams,
    ]);

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const bulbasaurCard = screen.getByText(/bulbasaur/i).closest('li');
    fireEvent.click(bulbasaurCard!);

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));
    expect(
      setSearchParams.mock.calls[0][0](new URLSearchParams()).get('details')
    ).toBe('bulbasaur');
  });

  test('clears details from searchParams when clicking on the list', () => {
    const setSearchParams = vi.fn();
    (useSearchParams as Mock).mockReturnValue([
      new URLSearchParams({ details: 'bulbasaur' }),
      setSearchParams,
    ]);

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const list = screen.getByTestId('pokemon-list');
    fireEvent.click(list);

    expect(setSearchParams).toHaveBeenCalledWith(expect.any(Function));
    expect(
      setSearchParams.mock.calls[0][0](new URLSearchParams()).get('details')
    ).toBeNull();
  });

  test('marks selected Pokemon correctly', () => {
    store.dispatch(togglePokemon('bulbasaur'));

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).toBeDefined();
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  test('dispatches togglePokemon when a Pokemon is selected', () => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);

    expect(store.getState().selectedPokemons.selected).toContain('bulbasaur');
  });
  test('renders NoResults component when there are no Pokémon', () => {
    (useLoaderData as Mock).mockReturnValue({
      data: [],
      isError: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText(/no pokemon found/i)).toBeDefined();
  });
  test('renders Error component when there is an error', () => {
    (useLoaderData as Mock).mockReturnValue({
      data: null,
      isError: true,
      error: new Error('Network error'),
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText(/network error/i)).toBeDefined();
  });
});
