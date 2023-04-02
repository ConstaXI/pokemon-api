export type PokemonTypes = 'charizard' | 'mewtwo' | 'pikachu';

export const validPokemonTypes: PokemonTypes[] = [
  'charizard',
  'mewtwo',
  'pikachu',
];

export type Pokemon = {
  tipo: PokemonTypes;
  treinador: string;
  nivel: number;
};

export type PokemonWithId = Pokemon & { id: number };
