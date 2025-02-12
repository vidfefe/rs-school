import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Results from '../components/Main/PokemonList';
import { MemoryRouter, Route, Routes } from 'react-router';
import { fetchPokemon } from '../api/api';

jest.mock('../api/api', () => ({
  fetchPokemon: jest.fn(),
}));

describe('Results Component', () => {
  it('should render the specified number of cards', async () => {
    (fetchPokemon as jest.Mock).mockResolvedValueOnce({
      items: [
        { name: 'Pikachu', description: 'Electric', image: 'pikachu.png' },
        { name: 'Bulbasaur', description: 'Grass', image: 'bulbasaur.png' },
        { name: 'Charmander', description: 'Fire', image: 'charmander.png' },
      ],
      totalPages: 1,
    });

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route
            path="/search/:page"
            element={<Results searchValue="poke" onCardClick={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getAllByRole('img')).toHaveLength(3));
  });

  it('should display a message when no cards are present', async () => {
    (fetchPokemon as jest.Mock).mockResolvedValueOnce({
      items: [],
      totalPages: 1,
    });

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route
            path="/search/:page"
            element={
              <Results searchValue="nonexistent" onCardClick={() => {}} />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText(/No Pokemon found/i)).toBeInTheDocument()
    );
  });

  it('should show a loader while fetching data', async () => {
    (fetchPokemon as jest.Mock).mockResolvedValueOnce({
      items: [],
      totalPages: 1,
    });

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route
            path="/search/:page"
            element={<Results searchValue="poke" onCardClick={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.queryByTestId('loader')).not.toBeInTheDocument()
    );
  });

  it('should display an error message if there is an error fetching data', async () => {
    (fetchPokemon as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch')
    );

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route
            path="/search/:page"
            element={<Results searchValue="poke" onCardClick={() => {}} />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByText('Failed to fetch')).toBeInTheDocument()
    );
  });
});
