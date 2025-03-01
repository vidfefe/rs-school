import { render, screen, waitFor } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { pokemonApi } from '@/api/pokemonApi';
import { vi } from 'vitest';
import selectedPokemonsReducer from '@/store/selectedPokemonsSlice';
import { Pokemon } from '@/types/pokemonTypes';
import PokemonList from '@/components/Main/PokemonList';

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

vi.stubGlobal(
  'fetch',
  vi.fn((url) => {
    if (url.includes('pokemon?limit=1000&offset=0')) {
      return Promise.resolve({
        json: () => Promise.resolve({ results: mockPokemons }),
      });
    }
    return Promise.reject(new Error('Unknown URL'));
  })
);

const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  preloadedState: {
    selectedPokemons: { selected: [] },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

test('fetches and displays pokemons', async () => {
  render(
    <Provider store={store}>
      <PokemonList
        results={mockPokemons}
        onSelectPokemon={() => {}}
        onUIClick={() => {}}
      />
    </Provider>
  );

  await waitFor(() =>
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2)
  );

  const pokemonNames = screen.getAllByRole('heading', { level: 2 });

  expect(pokemonNames[0]).toHaveTextContent(/bulbasaur/i);
  expect(pokemonNames[1]).toHaveTextContent(/ivysaur/i);

  await waitFor(() => expect(screen.getAllByRole('listitem')).toHaveLength(2));
});
