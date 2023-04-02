import { inject, injectable } from 'inversify';
import { Pokemon, PokemonWithId } from '../../../domain/entities/pokemon';
import { Interactor } from '../../../domain/protocols/interactor';
import { Result, fail, ok } from '../../../domain/protocols/result';
import PokemonNotFound from '../../errors/pokemon-not-found';
import {
  PokemonRepository,
  PokemonRepositorySymbol,
} from '../../protocols/repositories/pokemon-repository';

@injectable()
export default class FindPokemonByIdInteractor
  implements Interactor<PokemonWithId, PokemonNotFound>
{
  constructor(
    @inject(PokemonRepositorySymbol)
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async execute(
    id: PokemonWithId['id'],
  ): Promise<Result<PokemonWithId, PokemonNotFound>> {
    const pokemon = await this.pokemonRepository.findOne('id', id);

    if (!pokemon) {
      return fail(new PokemonNotFound());
    }

    return ok(pokemon);
  }
}
