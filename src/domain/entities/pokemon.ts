export type PokemonTypes = 'charizard' | 'mewtwo' | 'pikachu';

export const validPokemonTypes: PokemonTypes[] = [
  'charizard',
  'mewtwo',
  'pikachu',
];

export type Pokemon = {
  id: number;
  tipo: PokemonTypes;
  treinador: string;
  nivel: number;
};
