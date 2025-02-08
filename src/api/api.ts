interface Pokemon {
  name: string;
  description: string;
  image: string;
}

export const fetchPokemon = async (pokemonName: string): Promise<Pokemon> => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch pokemons');
    }
    const data = await response.json();
    console.log(data);

    return {
      name: data.name,
      description: `Height: ${data.height}, Weight: ${data.weight}`,
      image: data.sprites.front_default,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Something went wrong');
  }
};
