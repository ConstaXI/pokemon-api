import { Pokemon } from '../../domain/entities/pokemon';

export type InputCreatePokemon = Omit<Pokemon, 'id' | 'nivel'>;
export type InputUpdatePokemon = Pick<Pokemon, 'treinador'>;
