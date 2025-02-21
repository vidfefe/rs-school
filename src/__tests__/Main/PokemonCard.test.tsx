import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import PokemonCard from '@/components/Main/PokemonCard';

describe('PokemonCard Component', () => {
  const name = 'bulbasaur';
  const description = 'Height: 0.7m, Weight: 6.9kg';
  const image =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png';
  const onClick = vi.fn();
  const onSelect = vi.fn();

  test('renders the PokemonCard component with given props', () => {
    render(
      <PokemonCard
        name={name}
        description={description}
        image={image}
        isSelected={false}
        onClick={onClick}
        onSelect={onSelect}
      />
    );

    expect(screen.getByText(name)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', image);
  });

  test('calls onClick function when the card is clicked', () => {
    render(
      <PokemonCard
        name={name}
        description={description}
        image={image}
        isSelected={false}
        onClick={onClick}
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByRole('listitem'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('calls onSelect function when checkbox is clicked', () => {
    render(
      <PokemonCard
        name={name}
        description={description}
        image={image}
        isSelected={false}
        onClick={onClick}
        onSelect={onSelect}
      />
    );

    fireEvent.click(screen.getByRole('checkbox'));
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  test('checkbox is checked when isSelected is true', () => {
    render(
      <PokemonCard
        name={name}
        description={description}
        image={image}
        isSelected={true}
        onClick={onClick}
        onSelect={onSelect}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('checkbox is unchecked when isSelected is false', () => {
    render(
      <PokemonCard
        name={name}
        description={description}
        image={image}
        isSelected={false}
        onClick={onClick}
        onSelect={onSelect}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });
});
