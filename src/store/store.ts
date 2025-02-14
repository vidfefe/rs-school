import { configureStore } from '@reduxjs/toolkit';
import selectedPokemonsReducer from './selectedPokemonsSlice';
import { pokemonApi } from '@/api/pokemonApi';

export const store = configureStore({
  reducer: {
    selectedPokemons: selectedPokemonsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
