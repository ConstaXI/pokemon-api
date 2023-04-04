import { inject, injectable } from 'inversify';
import { PokemonWithId } from '../../domain/entities/pokemon';
import Controller from '../protocols/controller';
import HttpError from '../../domain/protocols/http-error';
import { Result, fail } from '../../domain/protocols/result';
import { HttpResponse } from '../protocols/http-response';
import httpOk from '../responses/http-ok';
import FindPokemonsInteractor from '../../business/interactors/pokemon/find-pokemons-interactor';

@injectable()
export default class FindPokemonsController
  implements Controller<PokemonWithId[]>
{
  constructor(
    @inject(FindPokemonsInteractor)
    private readonly findPokemonsInteractor: FindPokemonsInteractor,
  ) {}

  async handle(): Promise<Result<HttpResponse<PokemonWithId[]>, HttpError>> {
    const pokemons = await this.findPokemonsInteractor.execute();

    if (pokemons.isFail()) {
      return fail(pokemons.value);
    }

    return httpOk(pokemons.value);
  }
}
