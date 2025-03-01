import { render, screen, fireEvent } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { useRouter } from 'next/router';
import PokemonCardDetails from '@/components/Main/PokemonCardDetails';
import { PokemonDetails } from '@/types/pokemonTypes';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('PokemonCardDetails Component', () => {
  const details: PokemonDetails = {
    name: 'Bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    height: 7,
    weight: 69,
    type: 'grass, poison',
    abilities: ['overgrow', 'chlorophyll'],
    description: 'Height: 0.7m, Weight: 6.9kg',
  };

  const mockPush = vi.fn();
  const mockQuery = { details: 'Bulbasaur' };
  const mockRouter = {
    query: mockQuery,
    push: mockPush,
    pathname: '/pokemons',
  };

  beforeEach(() => {
    (useRouter as Mock).mockReturnValue(mockRouter);
    mockPush.mockClear();
  });

  test('renders the PokemonCardDetails component with given details', () => {
    render(<PokemonCardDetails details={details} />);

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

  test('calls push with correct URL when close button is clicked', () => {
    render(<PokemonCardDetails details={details} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/pokemons',
      query: {},
    });
  });

  test('does not show "details" in URL after close button click', () => {
    render(<PokemonCardDetails details={details} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/pokemons',
      query: {},
    });
  });
});
