import { injectable } from 'inversify';
import { PokemonRepository } from '../../../src/business/protocols/repositories/pokemon-repository';
import { Pokemon, PokemonWithId } from '../../../src/domain/entities/pokemon';
import makeFakePokemon from '../entities/pokemon';

@injectable()
export default class FakePokemonRepository implements PokemonRepository {
  async delete(id: number): Promise<void> {
    return undefined;
  }

  async save(pokemon: Pokemon): Promise<PokemonWithId> {
    return makeFakePokemon();
  }

  async findOne(
    key: keyof PokemonWithId,
    value: string | number,
  ): Promise<PokemonWithId | undefined> {
    return makeFakePokemon();
  }
}

export const fakePokemonRepositorySave = jest.spyOn(
  FakePokemonRepository.prototype,
  'save',
);

export const fakePokemonRepositoryFindOne = jest.spyOn(
  FakePokemonRepository.prototype,
  'findOne',
);

export const fakePokemonRepositoryDelete = jest.spyOn(
  FakePokemonRepository.prototype,
  'delete',
);
