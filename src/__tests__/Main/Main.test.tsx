import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from '@/utils/testUtils';
import Main from '@/components/Main/Main';
import { vi } from 'vitest';

vi.mock('@/components/Main/PokemonList', () => ({
  default: () => <div data-testid="pokemon-list">Pokemon List</div>,
}));

vi.mock('@/components/Main/Pagination', () => ({
  default: () => <div data-testid="pagination">Pagination</div>,
}));

vi.mock('@/components/Main/PokemonCardDetails', () => ({
  default: () => (
    <div data-testid="pokemon-card-details">Pokemon Card Details</div>
  ),
}));

describe('Main Component', () => {
  test('renders Main with PokemonList, Pagination, and PokemonCardDetails', () => {
    render(
      <Provider store={createTestStore()}>
        <Main />
      </Provider>
    );

    expect(screen.getByTestId('pokemon-list')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-card-details')).toBeInTheDocument();
  });
});
