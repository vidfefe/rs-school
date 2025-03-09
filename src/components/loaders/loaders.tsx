import { LoaderFunction } from 'react-router';
import { pokemonApi } from '@/api/pokemonApi';
import { store } from '@/store/store';

export const homePageLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchValue = url.searchParams.get('searchValue') || '';
  const currentPage = Number(url.searchParams.get('page') || '1');

  try {
    const response = await store.dispatch(
      pokemonApi.endpoints.getPokemons.initiate({
        searchValue,
        currentPage,
      })
    );

    if (response.error) {
      throw new Error('Error fetching Pokémon data');
    }

    return {
      searchValue,
      totalPages: response.data?.totalPages ?? 0,
      data: response.data?.items ?? [],
      isError: false,
      error: null,
    };
  } catch (error) {
    console.error(error);
    return {
      searchValue,
      totalPages: 0,
      data: [],
      isError: true,
      error,
    };
  }
};

export const pokemonDetailsLoader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const pokemonName = url.searchParams.get('details');

  if (!pokemonName) {
    return {
      data: null,
      isError: false,
      error: null,
    };
  }

  try {
    const response = await store.dispatch(
      pokemonApi.endpoints.getPokemonDetails.initiate(pokemonName)
    );

    if (response.error) {
      throw new Error('Error fetching Pokémon details');
    }

    return {
      data: response.data ?? null,
      isError: !!response.error,
      error: response.error ?? null,
    };
  } catch (error) {
    console.error(error);
    return {
      data: null,
      isError: true,
      error,
    };
  }
};
