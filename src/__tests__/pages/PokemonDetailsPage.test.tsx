import { render, screen } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useLoaderData } from 'react-router';
import PokemonDetailsPage from '@/pages/PokemonDetailsPage';

vi.mock('react-router', () => ({
  useLoaderData: vi.fn(),
}));

vi.mock('@/components/Main/PokemonCardDetails', () => ({
  default: ({ details }: { details: { name: string } }) => (
    <div data-testid="pokemon-details">{details.name}</div>
  ),
}));

vi.mock('@/components/Error', () => ({
  default: ({ errorMessage }: { errorMessage: string }) => (
    <div data-testid="error-message">{errorMessage}</div>
  ),
}));

describe('PokemonDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders error message on API error', async () => {
    (useLoaderData as Mock).mockReturnValue({
      data: null,
      isError: true,
      error: new Error('Failed to fetch Pokémon details'),
    });

    render(<PokemonDetailsPage />);

    expect(screen.getByTestId('error-message')).toHaveTextContent(
      'Failed to fetch Pokémon details'
    );
  });

  test('renders null when no data is returned', async () => {
    (useLoaderData as Mock).mockReturnValue({
      data: null,
      isError: false,
    });

    render(<PokemonDetailsPage />);

    // Since it returns null, the page should not render anything
    expect(screen.queryByTestId('pokemon-details')).toBeNull();
  });

  test('renders PokemonCardDetails when data is available', async () => {
    (useLoaderData as Mock).mockReturnValue({
      data: { name: 'pikachu' },
      isError: false,
    });

    render(<PokemonDetailsPage />);

    expect(screen.getByTestId('pokemon-details')).toHaveTextContent('pikachu');
  });
});
