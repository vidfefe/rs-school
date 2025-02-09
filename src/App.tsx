import { BrowserRouter, Route, Routes } from 'react-router';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import NotFound from './components/NotFound';
import PokemonDetails from './components/CardDetails';

const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/search/:page" element={<Home />} />
            <Route
              path="search/details/:pokemonName"
              element={<PokemonDetails />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
