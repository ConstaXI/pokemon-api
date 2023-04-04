import { injectable } from 'inversify';
import { PokemonRepository } from '../../../src/business/protocols/repositories/pokemon-repository';
import { Pokemon, PokemonWithId } from '../../../src/domain/entities/pokemon';
import { makeFakePokemonWithId } from '../entities/pokemon';

@injectable()
export default class FakePokemonRepository implements PokemonRepository {
  async find(): Promise<PokemonWithId[]> {
    return [makeFakePokemonWithId({ id: 1 }), makeFakePokemonWithId({ id: 2 })];
  }

  async delete(id: number): Promise<void> {
    return undefined;
  }

  async save(pokemon: Pokemon): Promise<PokemonWithId> {
    return makeFakePokemonWithId();
  }

  async findOne(
    key: keyof PokemonWithId,
    value: string | number,
  ): Promise<PokemonWithId | undefined> {
    return makeFakePokemonWithId();
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

export const fakePokemonRepositoryFind = jest.spyOn(
  FakePokemonRepository.prototype,
  'find',
);

export const fakePokemonRepositoryDelete = jest.spyOn(
  FakePokemonRepository.prototype,
  'delete',
);
