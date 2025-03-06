'use client';
import { useGetPokemonDetailsQuery } from '@/api/pokemonApi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Loader from '../Loader';
import Error from '../Error';
import NoResults from '../NoResults';

const PokemonCardDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const details = searchParams.get('details') as string | undefined;

  const {
    data: detailsData,
    isError: isDetailsError,
    error: detailsError,
    isLoading: isDetailsLoading,
  } = useGetPokemonDetailsQuery(details || '', { skip: !details });

  const handleClose = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete('details');
    const newUrl = `${pathname}?${newSearchParams.toString()}`;
    router.push(newUrl);
  };

  if (!details) return null;

  return (
    <aside className="w-1/3 min-w-[300px]">
      {isDetailsLoading && <Loader />}
      {isDetailsError && (
        <Error errorMessage={(detailsError as Error).message} />
      )}
      {detailsData ? (
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
          <h2 className="text-3xl font-bold">{detailsData.name}</h2>
          <img
            src={detailsData.image}
            alt={detailsData.name}
            className="mx-auto my-4 w-[300px] h-[300px] object-cover"
          />
          <p className="mt-2">
            <strong>Height:</strong> {detailsData.height} m
          </p>
          <p>
            <strong>Weight:</strong> {detailsData.weight} kg
          </p>
          <p>
            <strong>Type:</strong> {detailsData.type}
          </p>
          <p>
            <strong>Abilities:</strong> {detailsData.abilities.join(', ')}
          </p>
        </article>
      ) : (
        <NoResults />
      )}
    </aside>
  );
};

export default PokemonCardDetails;
