import PokemonCard from '@/components/Main/PokemonCard';
import { Pokemon } from '@/types/pokemonTypes';

interface ResultsProps {
  results: Pokemon[];
  onSelectPokemon: (pokemonName: Pokemon) => void;
  onUIClick: (event: React.MouseEvent<HTMLUListElement>) => void;
}

const PokemonList: React.FC<ResultsProps> = ({
  results,
  onSelectPokemon,
  onUIClick,
}) => {
  return (
    <ul
      className="grid grid-cols-1 md:grid-cols-3 place-items-center gap-8"
      onClick={onUIClick}
    >
      {results.map((pokemon, index) => (
        <PokemonCard
          key={index}
          {...pokemon}
          onClick={() => onSelectPokemon(pokemon)}
        />
      ))}
    </ul>
  );
};

export default PokemonList;
