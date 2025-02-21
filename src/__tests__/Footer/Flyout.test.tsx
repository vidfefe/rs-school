import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Flyout from '@/components/Footer/Flyout';
import { createTestStore } from '@/utils/testUtils';
import { vi } from 'vitest';
import * as downloadCsvModule from '@/utils/downloadCsv';
import { Provider } from 'react-redux';

import { togglePokemon } from '@/store/selectedPokemonsSlice';

describe('Flyout', () => {
  it('is hidden when no Pokémon are selected', () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const flyout = screen.getByTestId('flyout');
    expect(flyout.classList.contains('opacity-0')).toBe(true);
    expect(flyout.classList.contains('translate-y-full')).toBe(true);
  });

  it('renders when Pokémon are selected', () => {
    const store = createTestStore();

    act(() => {
      store.dispatch(togglePokemon('pikachu'));
      store.dispatch(togglePokemon('bulbasaur'));
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const flyout = screen.getByTestId('flyout');
    expect(flyout.classList.contains('opacity-0')).toBe(false);
    expect(flyout.classList.contains('translate-y-full')).toBe(false);

    expect(screen.getByText(/2 pokemons selected/i)).toBeInTheDocument();
  });

  it('dispatches unselectAllPokemons action', async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    act(() => {
      store.dispatch(togglePokemon('pikachu'));
      store.dispatch(togglePokemon('charmander'));
    });

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /unselect all/i });
    await user.click(button);

    expect(store.getState().selectedPokemons.selected).toHaveLength(0);
  });

  it('calls downloadCsv with correct data', async () => {
    const user = userEvent.setup();
    const store = createTestStore();

    act(() => {
      store.dispatch(togglePokemon('pikachu'));
    });

    const downloadCsvMock = vi
      .spyOn(downloadCsvModule, 'downoloadCsv')
      .mockImplementation(() => {});

    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /download/i });
    await user.click(button);

    expect(downloadCsvMock).toHaveBeenCalledWith(
      [
        {
          name: 'pikachu',
          detailsURL: 'https://pokeapi.co/api/v2/pokemon/pikachu',
        },
      ],
      '1_pokemons.csv'
    );

    downloadCsvMock.mockRestore();
  });
});
