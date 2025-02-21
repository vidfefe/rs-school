import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { useNavigate, useLocation } from 'react-router';
import PokemonCardDetails from '@/components/Main/PokemonCardDetails';
import { PokemonDetails } from '@/types/pokemonTypes';

vi.mock('react-router');

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

  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLocation).mockReturnValue({
      search: '?details=Pikachu',
      pathname: '/pokemons',
      state: null,
      key: 'default',
      hash: '',
    });

    mockNavigate.mockClear();
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

  test('calls navigate with correct URL when close button is clicked', () => {
    render(<PokemonCardDetails details={details} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/pokemons?', { replace: true });
  });

  test('does not show "details" in URL after close button click', () => {
    render(<PokemonCardDetails details={details} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith('/pokemons?', { replace: true });
  });
});
