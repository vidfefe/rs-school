import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsReducer from './selectedPokemonsSlice';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsReducer,
  },
});

export type selectedPokemonsState = ReturnType<typeof store.getState>;
