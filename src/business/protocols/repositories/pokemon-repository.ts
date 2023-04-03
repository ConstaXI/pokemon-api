import { Pokemon, PokemonWithId } from '../../../domain/entities/pokemon';

export const PokemonRepositorySymbol = Symbol.for('PokemonRepository');

export interface PokemonRepository {
  save(pokemon: Pokemon): Promise<PokemonWithId>;
  findOne(
    key: keyof PokemonWithId,
    value: PokemonWithId[keyof PokemonWithId],
  ): Promise<PokemonWithId | undefined>;
  delete(id: PokemonWithId['id']): Promise<void>;
}
