import { PokemonDetails } from '@/types/pokemonTypes';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface PokemonCardDetailsProps {
  details: PokemonDetails;
}

const PokemonCardDetails: FC<PokemonCardDetailsProps> = ({ details }) => {
  const router = useRouter();
  const { query, push, pathname } = router;

  const handleClose = () => {
    const newQuery = { ...query };
    delete newQuery.details;

    push({ pathname, query: newQuery });
  };

  return (
    <article
      data-testid="pokemon-card-details"
      className=" relative min-w-72 p-3 rounded-lg border-2 border-rose-600"
    >
      <button
        onClick={handleClose}
        className="absolute top-0.5 right-2 text-xl font-semibold "
        aria-label="Close"
      >
        <span className="text-gray-300 transition-all hover:text-rose-600">
          ✕
        </span>
      </button>
      <h2 className="text-3xl font-bold">{details.name}</h2>
      <img
        src={details.image}
        alt={details.name}
        className="mx-auto my-4 w-[300px] h-[300px] object-cover"
      />
      <p className="mt-2">
        <strong>Height:</strong> {details.height} m
      </p>
      <p>
        <strong>Weight:</strong> {details.weight} kg
      </p>
      <p>
        <strong>Type:</strong> {details.type}
      </p>
      <p>
        <strong>Abilities:</strong> {details.abilities.join(', ')}
      </p>
    </article>
  );
};

export default PokemonCardDetails;
