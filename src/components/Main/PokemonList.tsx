import PokemonCard from '@/components/Main/PokemonCard';
import { togglePokemon } from '@/store/selectedPokemonsSlice';
import { RootState } from '@/store/store';
import { Pokemon } from '@/types/pokemonTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData, useSearchParams } from 'react-router';
import NoResults from '@/components/NoResults';
import Error from '@/components/Error';

interface LoaderData {
  data: Pokemon[] | null;
  searchValue: string;
  currentPage: number;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

const PokemonList = () => {
  const { data: pokemons, isError, error } = useLoaderData<LoaderData>();
  const [, setSearchParams] = useSearchParams();

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
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set('details', pokemon.name);
      return newParams;
    });
  };

  const handleUlClick = (event: React.MouseEvent<HTMLUListElement>) => {
    if (event.target === event.currentTarget) {
      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams);
        newParams.delete('details');
        return newParams;
      });
    }
  };

  if (isError) return <Error errorMessage={(error as Error).message} />;

  if (!pokemons || pokemons.length === 0) return <NoResults />;

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
