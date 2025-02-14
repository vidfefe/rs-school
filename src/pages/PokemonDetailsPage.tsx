import { useLocation } from 'react-router';
import Loader from '@/components/Loader';
import NoResults from '@/components/NoResults';
import PokemonCardDetails from '@/components/Main/PokemonCardDetails';
import { useGetPokemonDetailsQuery } from '@/api/pokemonApi';
import Error from '@/components/Error';

const PokemonDetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pokemonName = searchParams.get('details');

  const {
    data: details,
    isError,
    error,
    isLoading,
  } = useGetPokemonDetailsQuery(pokemonName || '');

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Error errorMessage={(error as Error).message} />;
  }

  if (!details) {
    return <NoResults />;
  }

  return <PokemonCardDetails details={details} />;
};

export default PokemonDetailsPage;
