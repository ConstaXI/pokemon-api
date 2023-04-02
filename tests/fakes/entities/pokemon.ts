import { Pokemon } from 'src/domain/entities/pokemon';

export default function makeFakePokemon(
  properties?: Partial<Pokemon>,
): Pokemon {
  return {
    id: 0,
    treinador: 'Ash',
    tipo: 'pikachu',
    nivel: 1,
    ...properties,
  };
}
