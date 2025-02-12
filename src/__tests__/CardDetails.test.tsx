import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import PokemonDetailsPage from '../components/PokemonCardDetails';
import { fetchPokemonDetails } from '../api/api';

jest.mock('../api/api', () => ({
  fetchPokemonDetails: jest.fn(),
}));

describe('CardDetails Component', () => {
  const mockPokemonDetails = {
    name: 'Pikachu',
    height: 0.4,
    weight: 6,
    image: 'pikachu.png',
    description: 'Electric Pokémon',
    type: 'Electric',
    abilities: ['Static', 'Lightning Rod'],
  };

  it('should show a loading indicator while fetching data', async () => {
    (fetchPokemonDetails as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <MemoryRouter initialEntries={['/details/Pikachu']}>
        <Routes>
          <Route
            path="/details/:pokemonName"
            element={<PokemonDetailsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should display the detailed Pokémon data', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(mockPokemonDetails);

    render(
      <MemoryRouter initialEntries={['/details/Pikachu']}>
        <Routes>
          <Route
            path="/details/:pokemonName"
            element={<PokemonDetailsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Pikachu')).toBeInTheDocument()
    );

    expect(
      screen.getByText((_, element) => element?.textContent === 'Height: 0.4 m')
    ).toBeInTheDocument();

    expect(
      screen.getByText((_, element) => element?.textContent === 'Weight: 6 kg')
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) => element?.textContent === 'Type: Electric'
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        (_, element) =>
          element?.textContent === 'Abilities: Static, Lightning Rod'
      )
    ).toBeInTheDocument();

    expect(screen.getByAltText('Pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
  });

  it('should display "No details found" if the API returns null', async () => {
    (fetchPokemonDetails as jest.Mock).mockResolvedValue(null);

    render(
      <MemoryRouter initialEntries={['/details/Unknown']}>
        <Routes>
          <Route
            path="/details/:pokemonName"
            element={<PokemonDetailsPage />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('No details found.')).toBeInTheDocument()
    );
  });
});
