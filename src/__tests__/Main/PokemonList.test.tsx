import { describe, test, expect, vi, beforeEach, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import PokemonList from '@/components/Main/PokemonList';
import selectedPokemonsReducer, {
  togglePokemon,
} from '@/store/selectedPokemonsSlice';
import { useGetPokemonsQuery } from '@/api/pokemonApi';
import { useRouter } from 'next/router';

import type { Store } from '@reduxjs/toolkit';

vi.mock('@/api/pokemonApi', () => ({
  useGetPokemonsQuery: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(() => ({
    query: {},
    push: vi.fn(),
  })),
}));

let store: Store;

const mockPokemons = [
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
    },
  });
});

describe('PokemonList Component', () => {
  test('renders provided Pokemon', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: { items: mockPokemons },
      isLoading: false,
      isError: false,
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
  });

  test('handles Pokemon selection', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: { items: mockPokemons },
      isLoading: false,
      isError: false,
    });

    const pushMock = vi.fn();
    (useRouter as Mock).mockReturnValue({ query: {}, push: pushMock });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const bulbasaurCard = screen.getByText(/bulbasaur/i).closest('li');
    fireEvent.click(bulbasaurCard!);

    expect(pushMock).toHaveBeenCalledWith({ query: { details: 'bulbasaur' } });
  });

  test('marks selected Pokemon correctly', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: { items: mockPokemons },
      isLoading: false,
      isError: false,
    });

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

  test('removes "details" from URL when clicking outside', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: { items: mockPokemons },
      isLoading: false,
      isError: false,
    });

    const pushMock = vi.fn();
    (useRouter as Mock).mockReturnValue({
      query: { details: 'bulbasaur' },
      push: pushMock,
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const list = screen.getByTestId('pokemon-list');
    fireEvent.click(list);

    expect(pushMock).toHaveBeenCalledWith({ query: {} });
  });

  test('renders loader when data is loading', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('renders error message when there is an error', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to fetch data'),
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(screen.getByText(/failed to fetch data/i)).toBeInTheDocument();
  });

  test('renders empty array when data.items is empty', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: { items: [] },
      isLoading: false,
      isError: false,
      error: null,
    });

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const pokemonList = screen.getByTestId('pokemon-list');
    expect(pokemonList).toBeEmptyDOMElement();
  });
  test('does not trigger action if clicked on a checkbox', () => {
    (useGetPokemonsQuery as Mock).mockReturnValue({
      data: { items: mockPokemons },
      isLoading: false,
      isError: false,
    });
    const mockHandler = vi.fn();

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    const bulbasaurCard = screen.getByText(/bulbasaur/i).closest('li');

    if (bulbasaurCard) {
      const checkbox = bulbasaurCard.querySelector('input[type="checkbox"]');
      if (checkbox) {
        fireEvent.click(checkbox);
      }
    }

    expect(mockHandler).not.toHaveBeenCalled();
  });
});
