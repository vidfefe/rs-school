interface PokemonResponse {
  results: { name: string; url: string }[];
  count: number;
}

interface ApiPokemonsDetailsResponse {
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

interface ApiPokemonDetailsResponse {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}

export interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  image: string;
  description: string;
  type: string;
  abilities: string[];
}

export const fetchPokemon = async (
  searchValue: string,
  currentPage: number,
  limit: number = 12
): Promise<{ items: Pokemon[]; totalPages: number }> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemons`);
    }

    const data: PokemonResponse = await response.json();

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
        const details: ApiPokemonsDetailsResponse = await res.json();

        return {
          name: details.name,
          description: `Height: ${details.height}, Weight: ${details.weight}`,
          image:
            details.sprites.front_default ||
            'https://placehold.co/250x250/transparent/red',
        };
      })
    );

    return { items: results, totalPages };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong');
  }
};

export const fetchPokemonDetails = async (
  pokemonName: string
): Promise<PokemonDetails | null> => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const details: ApiPokemonDetailsResponse = await res.json();

    return {
      name: details.name,
      height: details.height,
      weight: details.weight,
      image:
        details.sprites.front_default ||
        'https://placehold.co/250x250/transparent/red',
      description: `Height: ${details.height}m, Weight: ${details.weight}kg`,
      type: details.types.map((type) => type.type.name).join(', '),
      abilities: details.abilities.map((ability) => ability.ability.name),
    };
  } catch (error) {
    if (error instanceof Error) throw new Error('Failed to fetch details');
    return null;
  }
};
