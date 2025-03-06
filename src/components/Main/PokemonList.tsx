'use client';

import PokemonCard from '@/components/Main/PokemonCard';
import { togglePokemon } from '@/store/selectedPokemonsSlice';
import { RootState } from '@/store/store';
import { Pokemon } from '@/types/pokemonTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useGetPokemonsQuery } from '@/api/pokemonApi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import Loader from '@/components/Loader';
import Error from '@/components/Error';

const PokemonList = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [searchValue] = useSearchQuery('searchValue');
  const currentPage = Number(searchParams.get('page') || '1');

  const { data, isLoading, isError, error } = useGetPokemonsQuery({
    searchValue,
    currentPage,
  });
  const { items: pokemons } = data || { items: [] };

  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );

  const handleUlClick = (event: React.MouseEvent<HTMLUListElement>) => {
    if (event.target === event.currentTarget) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete('details');
      const newUrl = `${pathname}?${newSearchParams.toString()}`;
      router.push(newUrl);
    }
  };

  const handleSelectPokemon = (
    event: React.MouseEvent<HTMLLIElement>,
    pokemon: Pokemon
  ) => {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('details', pokemon.name);
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };

  if (isLoading) return <Loader />;
  if (isError) return <Error errorMessage={(error as Error).message} />;

  return (
    <ul
      data-testid="pokemon-list"
      className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-8"
      onClick={handleUlClick}
    >
      {pokemons.map((pokemon, index) => (
        <PokemonCard
          key={index}
          {...pokemon}
          isSelected={selectedPokemons.includes(pokemon.name)}
          onClick={(event) => handleSelectPokemon(event, pokemon)}
          onSelect={() => dispatch(togglePokemon(pokemon.name))}
        />
      ))}
    </ul>
  );
};

export default PokemonList;
