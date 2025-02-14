import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Pokemon,
  PokemonDetails,
  PokemonResponse,
  ApiPokemonDetailsResponse,
} from '@/types/pokemonTypes';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<
      { items: Pokemon[]; totalPages: number },
      { searchValue: string; currentPage: number; limit?: number }
    >({
      query: () => 'pokemon?limit=1000&offset=0',
      transformResponse: async (
        data: PokemonResponse,
        _,
        { searchValue, currentPage, limit = 12 }
      ) => {
        const filteredPokemon = data.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        const totalPages = Math.ceil(filteredPokemon.length / limit);
        const paginatedPokemon = filteredPokemon.slice(
          (currentPage - 1) * limit,
          currentPage * limit
        );

        const results = await Promise.all(
          paginatedPokemon.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const details = await res.json();

            return {
              name: details.name,
              description: `Height: ${details.height}m, Weight: ${details.weight}kg`,
              image:
                details.sprites.front_default ||
                'https://placehold.co/250x250/transparent/red',
            };
          })
        );

        return { items: results, totalPages };
      },
    }),
    getPokemonDetails: builder.query<PokemonDetails, string>({
      query: (pokemonName) => `pokemon/${pokemonName}`,
      transformResponse: (
        details: ApiPokemonDetailsResponse
      ): PokemonDetails => ({
        name: details.name,
        height: details.height,
        weight: details.weight,
        image:
          details.sprites.front_default ||
          'https://placehold.co/250x250/transparent/red',
        description: `Height: ${details.height}m, Weight: ${details.weight}kg`,
        type: details.types.map((type) => type.type.name).join(', '),
        abilities: details.abilities.map((ability) => ability.ability.name),
      }),
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = pokemonApi;
