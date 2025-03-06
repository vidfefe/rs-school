import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useRouter } from 'next/router';
import { useGetPokemonDetailsQuery } from '@/api/pokemonApi';
import PokemonCardDetails from '@/components/Main/PokemonCardDetails';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/api/pokemonApi', () => ({
  useGetPokemonDetailsQuery: vi.fn(),
}));

describe('PokemonCardDetails Component', () => {
  const details = {
    name: 'Bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    height: 7,
    weight: 69,
    type: 'grass, poison',
    abilities: ['overgrow', 'chlorophyll'],
  };

  const mockPush = vi.fn();
  const mockPathname = '/pokemons';

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue({
      query: {},
      push: mockPush,
      pathname: mockPathname,
    });
    mockPush.mockClear();
  });

  test('does not fetch data when details param is missing', () => {
    (useRouter as Mock).mockReturnValue({ query: {} });
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({});

    render(<PokemonCardDetails />);
    expect(useGetPokemonDetailsQuery).toHaveBeenCalledWith('', { skip: true });

    expect(
      screen.queryByTestId('pokemon-card-details')
    ).not.toBeInTheDocument();
  });

  test('skips API call if details param is empty', () => {
    (useRouter as Mock).mockReturnValue({ query: { details: '' } });
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({});

    render(<PokemonCardDetails />);
    expect(useGetPokemonDetailsQuery).toHaveBeenCalledWith('', { skip: true });
  });

  test('renders the PokemonCardDetails component with given details', () => {
    (useRouter as Mock).mockReturnValue({ query: { details: 'Bulbasaur' } });
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({
      data: details,
      isLoading: false,
      isError: false,
    });

    render(<PokemonCardDetails />);

    expect(screen.getByText(details.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', details.image);
    expect(
      screen.getByText(
        (_, node) => node?.textContent === `Height: ${details.height} m`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, node) => node?.textContent === `Weight: ${details.weight} kg`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, node) => node?.textContent === `Type: ${details.type}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        (_, node) =>
          node?.textContent === `Abilities: ${details.abilities.join(', ')}`
      )
    ).toBeInTheDocument();
  });

  test('shows loading state while data is fetching', () => {
    (useRouter as Mock).mockReturnValue({ query: { details: 'Bulbasaur' } });
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({ isLoading: true });

    render(<PokemonCardDetails />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  test('shows error message when API request fails', () => {
    (useRouter as Mock).mockReturnValue({ query: { details: 'Bulbasaur' } });
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({
      isError: true,
      error: { message: 'Failed to fetch' },
    });

    render(<PokemonCardDetails />);
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  test('renders NoResults when no data is available', () => {
    (useRouter as Mock).mockReturnValue({ query: { details: 'Bulbasaur' } });
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({ data: null });

    render(<PokemonCardDetails />);
    expect(screen.getByTestId('no-results')).toBeInTheDocument();
  });

  test('calls push with correct URL when close button is clicked', () => {
    (useRouter as Mock).mockReturnValue({
      query: { details: 'Bulbasaur' },
      push: mockPush,
      pathname: mockPathname,
    });
    (useGetPokemonDetailsQuery as Mock).mockReturnValue({
      data: details,
      isLoading: false,
      isError: false,
    });

    render(<PokemonCardDetails />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: mockPathname,
      query: {},
    });
  });
});
