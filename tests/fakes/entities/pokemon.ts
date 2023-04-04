import { Pokemon, PokemonWithId } from '../../../src/domain/entities/pokemon';

export default function makeFakePokemon(
  properties?: Partial<Pokemon>,
): PokemonWithId {
  return {
    id: 1,
    treinador: 'Ash',
    tipo: 'pikachu',
    nivel: 1,
    ...properties,
  };
}
