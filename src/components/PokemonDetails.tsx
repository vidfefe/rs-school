import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { fetchPokemonDetails, PokemonDetails } from '../api/api';
import Loader from './Loader';

const PokemonDetailsPage = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (pokemonName) {
      const fetchDetails = async () => {
        setIsLoading(true);
        try {
          const data = await fetchPokemonDetails(pokemonName);
          setDetails(data);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    }
  }, [pokemonName]);

  if (isLoading) {
    return <Loader />;
  }

  if (!details) {
    return <div>No details found.</div>;
  }

  return (
    <div className="p-5 rounded-lg border-2 border-rose-600">
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
    </div>
  );
};

export default PokemonDetailsPage;
