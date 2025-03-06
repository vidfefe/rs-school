import PokemonCard from '@/components/Main/PokemonCard';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import { togglePokemon } from '@/store/selectedPokemonsSlice';
import { RootState } from '@/store/store';
import { Pokemon } from '@/types/pokemonTypes';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../Error';
import Loader from '../Loader';
import { useGetPokemonsQuery } from '@/api/pokemonApi';

const PokemonList = () => {
  const router = useRouter();
  const { query, push } = router;
  const [searchValue] = useSearchQuery('searchValue');
  const currentPage = Number(query.page || '1');

  const { data, isLoading, isError, error } = useGetPokemonsQuery({
    searchValue,
    currentPage,
  });
  const { items: pokemons } = data || { items: [] };

  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );

  const handleSelectPokemon = (
    event: React.MouseEvent<HTMLLIElement>,
    pokemon: Pokemon
  ) => {
    if ((event.target as HTMLElement).closest('input[type="checkbox"]')) {
      return;
    }
    push({ query: { ...query, details: pokemon.name } });
  };

  const handleUlClick = (event: React.MouseEvent<HTMLUListElement>) => {
    if (event.target === event.currentTarget) {
      const newQuery = { ...query };
      delete newQuery.details;
      push({ query: newQuery });
    }
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
