import { FC, MouseEvent } from 'react';
import PokemonList from '@/components/Main/PokemonList';
import { Outlet, useSearchParams } from 'react-router';
import { Pokemon } from '@/types/pokemonTypes';
import Pagination from '@/components/Main/Pagination';
import Loader from '@/components/Loader';
import NoResults from '@/components/NoResults';
import { useGetPokemonsQuery } from '@/api/pokemonApi';
import Error from '@/components/Error';

interface MainProps {
  searchQuery: string;
}

const Main: FC<MainProps> = ({ searchQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') || '1');

  const { data, isLoading, isError, error } = useGetPokemonsQuery({
    searchValue: searchQuery.trim(),
    currentPage,
  });

  const { items: results, totalPages } = data || { items: [], totalPages: 1 };

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('details', pokemon.name);
      return newParams;
    });
  };

  const handleUlClick = (event: MouseEvent<HTMLUListElement>) => {
    if (event.target === event.currentTarget) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete('details');
        return newParams;
      });
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error errorMessage={(error as Error).message} />;
  }

  if (results.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="flex h-full w-full gap-6 p-4">
      <main className="flex flex-col flex-grow items-center gap-5">
        <PokemonList
          results={results}
          onSelectPokemon={handleSelectPokemon}
          onUIClick={handleUlClick}
        />
        <Pagination totalPages={totalPages} />
      </main>
      {searchParams.get('details') && (
        <aside className="w-1/3 min-w-[300px]">
          <Outlet />
        </aside>
      )}
    </div>
  );
};

export default Main;
