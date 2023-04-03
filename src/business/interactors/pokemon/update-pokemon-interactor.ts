import { inject, injectable } from 'inversify';
import { PokemonWithId } from '../../../domain/entities/pokemon';
import { Interactor } from '../../../domain/protocols/interactor';
import { Result, ok } from '../../../domain/protocols/result';
import CannotUpdateFields from '../../errors/cannot-update-field';
import {
  PokemonRepository,
  PokemonRepositorySymbol,
} from '../../protocols/repositories/pokemon-repository';

@injectable()
export default class UpdatePokemonInteractor
  implements Interactor<PokemonWithId, CannotUpdateFields>
{
  constructor(
    @inject(PokemonRepositorySymbol)
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async execute(
    pokemon: PokemonWithId,
    treinador: string,
  ): Promise<Result<PokemonWithId, CannotUpdateFields>> {
    const updated = {
      ...pokemon,
      treinador,
    };

    await this.pokemonRepository.save(updated);

    return ok(updated);
  }
}
