import { BrowserRouter, Route, Routes } from 'react-router';
import ErrorBoundary from '@/components/ErrorBoundary';
import HomePage from '@/pages/HomePage';
import NotFound from '@/components/NotFound';
import PokemonDetailsPage from '@/pages/PokemonDetailsPage';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route index element={<PokemonDetailsPage />} />
            {/* <Route path="/search/:page" element={<Home />} /> */}
            {/* <Route
              path="search/details/:pokemonName"
              element={<PokemonDetails />}
            /> */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
