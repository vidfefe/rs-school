import { createBrowserRouter } from 'react-router-dom';
import Error from '@/components/Error';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import PokemonDetailsPage from '@/pages/PokemonDetailsPage';
import {
  homePageLoader,
  pokemonDetailsLoader,
} from './components/loaders/loaders';

const routes = [
  {
    path: '/',
    element: <HomePage />,
    loader: homePageLoader,
    errorElement: <Error errorMessage="Something went wrong on the homepage" />,
    children: [
      {
        index: true,
        errorElement: (
          <Error errorMessage="Something went wrong on the Pokémon details page" />
        ),
        element: <PokemonDetailsPage />,
        loader: pokemonDetailsLoader,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <Error errorMessage="Page not found" />,
  },
];

export const router = createBrowserRouter(routes);
export default routes;
