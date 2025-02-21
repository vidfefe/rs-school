import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import selectedPokemonsReducer from '@/store/selectedPokemonsSlice';
import { pokemonApi } from '@/api/pokemonApi';

export const createTestStore = () => {
  return configureStore({
    reducer: {
      selectedPokemons: selectedPokemonsReducer,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(pokemonApi.middleware),
  });
};

export const renderWithStore = (ui: JSX.Element) => {
  const store = createTestStore();
  return <Provider store={store}>{ui}</Provider>;
};
