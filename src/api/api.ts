interface PokemonResponse {
  results: { name: string; url: string }[];
}

interface ApiPokemonDetailsResponse {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
}

export interface Pokemon {
  name: string;
  description: string;
  image: string;
}

export const fetchPokemon = async (searchValue: string): Promise<Pokemon[]> => {
  try {
    const response = await fetch(
      'https://pokeapi.co/api/v2/pokemon?limit=1000'
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemons`);
    }

    const data: PokemonResponse = await response.json();

    const filteredPokemon = data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    const limitedPokemon = filteredPokemon.slice(0, 12);

    const results = limitedPokemon.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      const details: ApiPokemonDetailsResponse = await res.json();

      return {
        name: details.name,
        description: `Height: ${details.height}, Weight: ${details.weight}`,
        image:
          details.sprites.front_default ||
          'https://placehold.co/250x250/transparent/red',
      };
    });

    return Promise.all(results);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong');
  }
};
