import { useEffect, useState } from 'react';
import Search from '../components/Search';
import Results from '../components/Results';
import ErrorButton from '../components/ErrorButton';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { Outlet, useNavigate } from 'react-router';

const Home = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useSearchQuery('searchValue');
  const [query, setQuery] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  useEffect(() => {
    if (searchValue.trim()) {
      setQuery(searchValue.trim());
    }
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    setQuery(value.trim());
    navigate(`/search/1`);
  };

  const handleCardClick = (pokemonName: string) => {
    setSelectedPokemon(pokemonName);
    navigate(`/search/details/${pokemonName}`);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
    navigate(`/search/1`);
  };

  const handleLeftClick = () => {
    if (selectedPokemon) {
      setSelectedPokemon(null);
      navigate(`/search/1`);
    }
  };

  return (
    <div className="container flex gap-5 mx-auto my-5 ">
      <div
        onClick={handleLeftClick}
        className={`w-full flex flex-col items-center justify-center gap-5 ${selectedPokemon ? 'md:w-2/3' : ''}`}
      >
        <Search onSearch={handleSearch} initialValue={searchValue} />
        <Results searchValue={query} onCardClick={handleCardClick} />
      </div>

      {selectedPokemon && (
        <div className="w-full md:w-1/3 relative">
          <button
            aria-label="Close"
            onClick={handleCloseDetails}
            className="absolute top-2 right-5 hover:text-rose-600 transition-all"
          >
            &#10005;
          </button>
          <Outlet />
        </div>
      )}

      <div className="self-end">
        <ErrorButton />
      </div>
    </div>
  );
};

export default Home;
