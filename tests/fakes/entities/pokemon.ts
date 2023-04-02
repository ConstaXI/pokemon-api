import { Pokemon, PokemonWithId } from '../../../src/domain/entities/pokemon';

export default function makeFakePokemon(
  properties?: Partial<Pokemon>,
): PokemonWithId {
  return {
    id: 0,
    treinador: 'Ash',
    tipo: 'pikachu',
    nivel: 1,
    ...properties,
  };
}
