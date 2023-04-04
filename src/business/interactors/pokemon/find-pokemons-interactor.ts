import { inject, injectable } from 'inversify';
import { PokemonWithId } from '../../../domain/entities/pokemon';
import HttpError from '../../../domain/protocols/http-error';
import { Interactor } from '../../../domain/protocols/interactor';
import {
  PokemonRepository,
  PokemonRepositorySymbol,
} from '../../protocols/repositories/pokemon-repository';
import { Result, ok } from '../../../domain/protocols/result';

@injectable()
export default class FindPokemonsInteractor
  implements Interactor<PokemonWithId[], HttpError>
{
  constructor(
    @inject(PokemonRepositorySymbol)
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async execute(): Promise<Result<PokemonWithId[], HttpError>> {
    const pokemons = await this.pokemonRepository.find();

    return ok(pokemons);
  }
}
