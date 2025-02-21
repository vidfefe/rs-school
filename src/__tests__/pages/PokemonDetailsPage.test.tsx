import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PokemonDetailsPage from '@/pages/PokemonDetailsPage';
import { vi } from 'vitest';
import { useGetPokemonDetailsQuery } from '@/api/pokemonApi';

vi.mock('react-router', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-router');
  return {
    ...actual,
    useLocation: () => ({
      search: '?details=pikachu',
    }),
  };
});

vi.mock('@/api/pokemonApi', () => ({
  useGetPokemonDetailsQuery: vi.fn(),
}));

vi.mock('@/components/Main/PokemonCardDetails', () => ({
  default: ({ details }: { details: { name: string } }) => (
    <div data-testid="pokemon-details">{details.name}</div>
  ),
}));

describe('PokemonDetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the loader when loading', () => {
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      isLoading: true,
    });

    render(
      <MemoryRouter>
        <PokemonDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('renders error message on API error', () => {
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      isError: true,
      error: new Error('Failed to fetch Pokémon details'),
    });

    render(
      <MemoryRouter>
        <PokemonDetailsPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Failed to fetch Pokémon details')
    ).toBeInTheDocument();
  });

  it('renders NoResults when no details are returned', () => {
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({ data: null });

    render(
      <MemoryRouter>
        <PokemonDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('no-results')).toBeInTheDocument();
    expect(screen.getByText('No Pokemon found')).toBeInTheDocument();
  });

  it('renders PokemonCardDetails when data is available', () => {
    (useGetPokemonDetailsQuery as jest.Mock).mockReturnValue({
      data: { name: 'pikachu' },
    });

    render(
      <MemoryRouter>
        <PokemonDetailsPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('pokemon-details')).toHaveTextContent('pikachu');
  });

  it('calls useGetPokemonDetailsQuery with empty string when details param is missing', () => {
    vi.mock('react-router', async (importOriginal) => {
      const actual = (await importOriginal()) as typeof import('react-router');
      return {
        ...actual,
        useLocation: () => ({ search: '' }),
      };
    });

    render(
      <MemoryRouter>
        <PokemonDetailsPage />
      </MemoryRouter>
    );

    expect(useGetPokemonDetailsQuery).toHaveBeenCalledWith('');
  });
});
