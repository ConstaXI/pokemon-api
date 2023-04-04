/* eslint-disable sonarjs/no-duplicate-string */
import { injectable } from 'inversify';
import { PokemonRepository } from '../../business/protocols/repositories/pokemon-repository';
import { Pokemon, PokemonWithId } from '../../domain/entities/pokemon';
import PokemonEntity from '../entities/pokemon';
import postgresDataSource from '../database/datasource';

@injectable()
export default class PokemonTypeormRepository implements PokemonRepository {
  async find(): Promise<PokemonWithId[]> {
    const repository = postgresDataSource.getRepository(PokemonEntity);

    return repository.find();
  }

  async save(pokemon: Pokemon | PokemonWithId): Promise<PokemonWithId> {
    const repository = postgresDataSource.getRepository(PokemonEntity);

    return repository.save(pokemon);
  }

  async findOne(
    key: 'id' | keyof Pokemon,
    value: string | number,
  ): Promise<PokemonWithId | undefined> {
    const repository = postgresDataSource.getRepository(PokemonEntity);

    const fromPersistence = await repository.findOne({
      where: { [key]: value },
    });

    if (!fromPersistence) {
      return undefined;
    }

    return fromPersistence;
  }

  async delete(id: number): Promise<void> {
    const repository = postgresDataSource.getRepository(PokemonEntity);

    await repository.delete(id);
  }
}
