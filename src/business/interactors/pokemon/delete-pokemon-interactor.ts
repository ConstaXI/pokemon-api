import { inject, injectable } from 'inversify';
import {
  PokemonRepository,
  PokemonRepositorySymbol,
} from '../../protocols/repositories/pokemon-repository';
import { PokemonWithId } from '../../../domain/entities/pokemon';
import { Interactor } from '../../../domain/protocols/interactor';
import { Result, ok } from '../../../domain/protocols/result';
import HttpError from '../../../domain/protocols/http-error';

@injectable()
export default class DeletePokemonInteractor implements Interactor<undefined> {
  constructor(
    @inject(PokemonRepositorySymbol)
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async execute(pokemon: PokemonWithId): Promise<Result<undefined, HttpError>> {
    const { id } = pokemon;

    await this.pokemonRepository.delete(id);

    return ok(undefined);
  }
}
