'use client';

import { createSlice } from '@reduxjs/toolkit';

interface SelectedPokemonsState {
  selected: string[];
}

const initialState: SelectedPokemonsState = {
  selected: JSON.parse(localStorage.getItem('selectedPokemons') || '[]'),
};

export const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',
  initialState,
  reducers: {
    togglePokemon: (state, action) => {
      if (state.selected.includes(action.payload)) {
        state.selected = state.selected.filter(
          (name) => name !== action.payload
        );
      } else {
        state.selected.push(action.payload);
      }
      localStorage.setItem('selectedPokemons', JSON.stringify(state.selected));
    },
    unselectAllPokemons: (state) => {
      state.selected = [];
      localStorage.removeItem('selectedPokemons');
    },
  },
});

export const { togglePokemon, unselectAllPokemons } =
  selectedPokemonsSlice.actions;

export default selectedPokemonsSlice.reducer;
