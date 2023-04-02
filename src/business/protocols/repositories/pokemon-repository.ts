import { Pokemon } from 'src/domain/entities/pokemon';

export const PokemonRepositorySymbol = Symbol('PokemonRepository');

export interface PokemonRepository {
  save(pokemon: Pokemon): Promise<Pokemon>;
  findOne(key: keyof Pokemon, value: Pokemon[keyof Pokemon]): Promise<Pokemon>;
}
