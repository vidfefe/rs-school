import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import PokemonList from '@/components/Main/PokemonList';
import selectedPokemonsReducer, {
  togglePokemon,
} from '@/store/selectedPokemonsSlice';
import { pokemonApi } from '@/api/pokemonApi';
import { Pokemon } from '@/types/pokemonTypes';

import type { Store } from '@reduxjs/toolkit';

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
});

describe('PokemonList Component', () => {
  it('renders provided Pokemon', () => {
    render(
      <Provider store={store}>
        <PokemonList
          results={mockPokemons}
          onSelectPokemon={vi.fn()}
          onUIClick={vi.fn()}
        />
      </Provider>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeDefined();
    expect(screen.getByText(/ivysaur/i)).toBeDefined();
  });

  it('calls onSelectPokemon when clicking a Pokemon', () => {
    const onSelectPokemon = vi.fn();

    render(
      <Provider store={store}>
        <PokemonList
          results={mockPokemons}
          onSelectPokemon={onSelectPokemon}
          onUIClick={vi.fn()}
        />
      </Provider>
    );

    const bulbasaurCard = screen.getByText(/bulbasaur/i).closest('li');
    fireEvent.click(bulbasaurCard!);

    expect(onSelectPokemon).toHaveBeenCalled();
  });

  it('marks selected Pokemon correctly', () => {
    store.dispatch(togglePokemon('bulbasaur'));

    render(
      <Provider store={store}>
        <PokemonList
          results={mockPokemons}
          onSelectPokemon={vi.fn()}
          onUIClick={vi.fn()}
        />
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];
    expect(checkbox).toBeDefined();
    expect((checkbox as HTMLInputElement).checked).toBe(true);
  });

  it('calls onUIClick when clicking on the list', () => {
    const onUIClick = vi.fn();

    render(
      <Provider store={store}>
        <PokemonList
          results={mockPokemons}
          onSelectPokemon={vi.fn()}
          onUIClick={onUIClick}
        />
      </Provider>
    );

    const list = screen.getByRole('list');
    fireEvent.click(list);

    expect(onUIClick).toHaveBeenCalled();
  });

  it('dispatches togglePokemon when a Pokemon is selected', () => {
    render(
      <Provider store={store}>
        <PokemonList
          results={mockPokemons}
          onSelectPokemon={vi.fn()}
          onUIClick={vi.fn()}
        />
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox')[0];

    fireEvent.click(checkbox as HTMLInputElement);
    expect(store.getState().selectedPokemons.selected).toContain('bulbasaur');
  });
});
