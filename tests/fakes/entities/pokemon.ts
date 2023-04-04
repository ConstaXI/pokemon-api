import { Pokemon, PokemonWithId } from '../../../src/domain/entities/pokemon';

export function makeFakePokemonWithId(
  properties?: Partial<PokemonWithId>,
): PokemonWithId {
  return {
    id: 1,
    treinador: 'Ash',
    tipo: 'pikachu',
    nivel: 1,
    ...properties,
  };
}

export function makeFakePokemon(properties?: Partial<Pokemon>): Pokemon {
  return {
    treinador: 'Ash',
    tipo: 'pikachu',
    nivel: 1,
    ...properties,
  };
}
