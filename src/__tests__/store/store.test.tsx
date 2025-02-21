import type { Store } from '@reduxjs/toolkit';
import { beforeEach, describe, it, expect } from 'vitest';
import { createTestStore } from '@/utils/testUtils';
import {
  togglePokemon,
  unselectAllPokemons,
} from '@/store/selectedPokemonsSlice';
let store: Store;

beforeEach(() => {
  store = createTestStore();
});

describe('Redux Store', () => {
  it('should initialize with the correct state', () => {
    expect(store.getState().selectedPokemons.selected).toEqual([]);
  });

  it('should handle adding a pokemon to the selection', () => {
    store.dispatch(togglePokemon('pikachu'));
    expect(store.getState().selectedPokemons.selected).toContain('pikachu');
  });

  it('should handle removing a pokemon from the selection', () => {
    store.dispatch(togglePokemon('pikachu'));
    store.dispatch(togglePokemon('pikachu'));
    expect(store.getState().selectedPokemons.selected).not.toContain('pikachu');
  });

  it('should handle clearing all selected pokemons', () => {
    store.dispatch(togglePokemon('pikachu'));
    store.dispatch(togglePokemon('charmander'));
    store.dispatch(unselectAllPokemons());
    expect(store.getState().selectedPokemons.selected).toEqual([]);
  });
});
