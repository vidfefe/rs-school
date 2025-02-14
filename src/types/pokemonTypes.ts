export interface Pokemon {
  name: string;
  description: string;
  image: string;
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

export interface PokemonResponse {
  results: { name: string; url: string }[];
  count: number;
}

export interface ApiPokemonDetailsResponse {
  name: string;
  height: number;
  weight: number;
  sprites: { front_default: string };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
}
