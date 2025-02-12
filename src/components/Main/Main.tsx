import { FC, MouseEvent, useEffect, useState } from 'react';
import PokemonList from '@/components/Main/PokemonList';
import { Outlet, useSearchParams } from 'react-router';
import { Pokemon } from '@/types/pokemonTypes';
import Pagination from '@/components/Main/Pagination';
import Loader from '@/components/Loader';
import NoResults from '@/components/NoResults';
import { fetchPokemon } from '@/api/api';

interface MainProps {
  searchQuery: string;
}

const Main: FC<MainProps> = ({ searchQuery }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [results, setResults] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);

  const currentPage = Number(searchParams.get('page') || '1');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { items, totalPages } = await fetchPokemon(
          searchQuery.trim(),
          currentPage
        );
        setResults(items);
        setTotalPages(totalPages);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, currentPage]);

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
  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
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
