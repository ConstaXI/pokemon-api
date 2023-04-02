import { PokemonRepository } from 'src/business/protocols/repositories/pokemon-repository';
import { Pokemon } from 'src/domain/entities/pokemon';

export default class FakePokemonRepository implements PokemonRepository {
  async save(pokemon: Pokemon): Promise<Pokemon> {
    return pokemon;
  }

  async findOne(key: keyof Pokemon, value: string | number): Promise<Pokemon> {
    throw new Error('Method not implemented.');
  }
}

export const fakePokemonRepositorySave = jest.spyOn(
  FakePokemonRepository.prototype,
  'save',
);
