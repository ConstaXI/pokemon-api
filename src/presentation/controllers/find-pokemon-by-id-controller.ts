import { inject, injectable } from 'inversify';
import { PokemonWithId } from '../../domain/entities/pokemon';
import Controller from '../protocols/controller';
import FindPokemonByIdInteractor from '../../business/interactors/pokemon/find-pokemon-by-id-interactor';
import HttpError from '../../domain/protocols/http-error';
import { Result, fail } from '../../domain/protocols/result';
import { HttpResponse } from '../protocols/http-response';
import httpOk from '../responses/http-ok';

@injectable()
export default class FindPokemonByIdController
  implements Controller<PokemonWithId>
{
  constructor(
    @inject(FindPokemonByIdInteractor)
    private readonly findPokemonByIdInteractor: FindPokemonByIdInteractor,
  ) {}

  async handle(request: {
    id: PokemonWithId['id'];
  }): Promise<Result<HttpResponse<PokemonWithId>, HttpError>> {
    const pokemon = await this.findPokemonByIdInteractor.execute(request.id);

    if (pokemon.isFail()) {
      return fail(pokemon.value);
    }

    return httpOk(pokemon.value);
  }
}
