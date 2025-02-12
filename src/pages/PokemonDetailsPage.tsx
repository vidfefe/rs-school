import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { fetchPokemonDetails, PokemonDetails } from '@/api/api';
import Loader from '@/components/Loader';
import NoResults from '@/components/NoResults';
import PokemonCardDetails from '@/components/PokemonCardDetails';

const PokemonDetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pokemonName = searchParams.get('details');

  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (pokemonName) {
      const fetchDetails = async () => {
        setIsLoading(true);
        try {
          console.log(pokemonName);
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
    return <NoResults />;
  }

  return <PokemonCardDetails details={details} />;
};

export default PokemonDetailsPage;
