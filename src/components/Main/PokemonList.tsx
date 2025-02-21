import PokemonCard from '@/components/Main/PokemonCard';
import { togglePokemon } from '@/store/selectedPokemonsSlice';
import { RootState } from '@/store/store';
import { Pokemon } from '@/types/pokemonTypes';
import { useDispatch, useSelector } from 'react-redux';

interface ResultsProps {
  results: Pokemon[];
  onSelectPokemon: (
    event: React.MouseEvent<HTMLLIElement>,
    pokemonName: Pokemon
  ) => void;
  onUIClick: (event: React.MouseEvent<HTMLUListElement>) => void;
}

const PokemonList: React.FC<ResultsProps> = ({
  results,
  onSelectPokemon,
  onUIClick,
}) => {
  const dispatch = useDispatch();
  const selectedPokemons = useSelector(
    (state: RootState) => state.selectedPokemons.selected
  );

  return (
    <ul
      data-testid="pokemon-list"
      className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-8"
      onClick={onUIClick}
    >
      {results.map((pokemon, index) => (
        <PokemonCard
          key={index}
          {...pokemon}
          isSelected={selectedPokemons.includes(pokemon.name)}
          onClick={(event) => onSelectPokemon(event, pokemon)}
          onSelect={() => dispatch(togglePokemon(pokemon.name))}
        />
      ))}
    </ul>
  );
};

export default PokemonList;
