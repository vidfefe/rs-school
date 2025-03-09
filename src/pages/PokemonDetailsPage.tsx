import { useLoaderData } from 'react-router';
import PokemonCardDetails from '@/components/Main/PokemonCardDetails';
import Error from '@/components/Error';
import { PokemonDetails } from '@/types/pokemonTypes';

interface LoaderData {
  data: PokemonDetails;
  isError: boolean;
  error: unknown;
}

const PokemonDetailsPage = () => {
  const { data: detailsData, isError, error } = useLoaderData<LoaderData>();

  if (isError) {
    return <Error errorMessage={(error as Error).message} />;
  }

  if (!detailsData) {
    return null;
  }

  return (
    <aside className="w-1/3 min-w-[300px]">
      <PokemonCardDetails details={detailsData} />
    </aside>
  );
};

export default PokemonDetailsPage;
