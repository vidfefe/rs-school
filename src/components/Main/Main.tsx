import { FC, MouseEvent } from 'react';
import PokemonList from '@/components/Main/PokemonList';
import { Pokemon } from '@/types/pokemonTypes';
import Pagination from '@/components/Main/Pagination';
import Loader from '@/components/Loader';
import NoResults from '@/components/NoResults';
import {
  useGetPokemonDetailsQuery,
  useGetPokemonsQuery,
} from '@/api/pokemonApi';
import Error from '@/components/Error';
import { useRouter } from 'next/router';
import PokemonCardDetails from './PokemonCardDetails';

interface MainProps {
  searchQuery: string;
}

const Main: FC<MainProps> = ({ searchQuery }) => {
  const router = useRouter();
  const { query, push } = router;
  const currentPage = Number(query.page || '1');
  const details = query.details as string | undefined;

  const { data, isLoading, isError, error } = useGetPokemonsQuery({
    searchValue: searchQuery.trim(),
    currentPage,
  });

  const { items: results, totalPages } = data || { items: [], totalPages: 1 };
  const {
    data: detailsData,
    isError: isDetailsError,
    error: detailsError,
    isLoading: isDetailsLoading,
  } = useGetPokemonDetailsQuery(details || '', { skip: !details });

  const handleSelectPokemon = (
    event: MouseEvent<HTMLLIElement>,
    pokemon: Pokemon
  ) => {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    push({ query: { ...query, details: pokemon.name } });
  };

  const handleUlClick = (event: MouseEvent<HTMLUListElement>) => {
    if (event.target === event.currentTarget) {
      const newQuery = { ...query };
      delete newQuery.details;
      push({ query: newQuery });
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error errorMessage={(error as Error).message} />;
  if (results.length === 0) return <NoResults />;

  return (
    <div className="flex h-full w-full gap-6 p-4">
      <main className="flex flex-col flex-grow items-center gap-5">
        <PokemonList
          results={results}
          onSelectPokemon={(event, pokemon) =>
            handleSelectPokemon(event, pokemon)
          }
          onUIClick={handleUlClick}
        />
        <Pagination totalPages={totalPages} />
      </main>
      {details && (
        <aside className="w-1/3 min-w-[300px]">
          {isDetailsLoading && <Loader />}
          {isDetailsError && (
            <Error errorMessage={(detailsError as Error).message} />
          )}
          {detailsData ? (
            <PokemonCardDetails details={detailsData} />
          ) : (
            <NoResults />
          )}
        </aside>
      )}
    </div>
  );
};

export default Main;
