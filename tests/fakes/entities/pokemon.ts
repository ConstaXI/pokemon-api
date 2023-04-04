import { PokemonWithId } from '../../../src/domain/entities/pokemon';

export default function makeFakePokemon(
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
