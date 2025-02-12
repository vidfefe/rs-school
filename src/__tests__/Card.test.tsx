import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../components/PokemonCard';

describe('Card Component', () => {
  it('should render the relevant card data', () => {
    const mockOnClick = jest.fn();

    render(
      <Card
        name="Pikachu"
        description="Electric type Pokémon"
        image="pikachu.png"
        onClick={mockOnClick}
      />
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Electric type Pokémon')).toBeInTheDocument();
    expect(screen.getByAltText('Pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
  });

  it('should trigger onClick when the card is clicked', () => {
    const mockOnClick = jest.fn();

    render(
      <Card
        name="Pikachu"
        description="Electric type Pokémon"
        image="pikachu.png"
        onClick={mockOnClick}
      />
    );

    fireEvent.click(screen.getByAltText('Pikachu'));

    expect(mockOnClick).toHaveBeenCalledWith('Pikachu');
  });
});
