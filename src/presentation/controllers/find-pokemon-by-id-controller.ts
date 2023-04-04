import { inject, injectable } from 'inversify';
import { PokemonWithId } from '../../domain/entities/pokemon';
import Controller from '../protocols/controller';
import FindPokemonByIdInteractor from '../../business/interactors/pokemon/find-pokemon-by-id-interactor';
import HttpError from '../../domain/protocols/http-error';
import { Result, fail } from '../../domain/protocols/result';
import { HttpResponse } from '../protocols/http-response';
import httpOk from '../responses/http-ok';
import IdMustBeANumber from '../../business/errors/id-must-be-a-number';

@injectable()
export default class FindPokemonByIdController
  implements Controller<PokemonWithId>
{
  constructor(
    @inject(FindPokemonByIdInteractor)
    private readonly findPokemonByIdInteractor: FindPokemonByIdInteractor,
  ) {}

  async handle(request: {
    id: string;
  }): Promise<Result<HttpResponse<PokemonWithId>, HttpError>> {
    const id = Number(request.id);

    if (Number.isNaN(id)) {
      return fail(new IdMustBeANumber());
    }

    const pokemon = await this.findPokemonByIdInteractor.execute(id);

    if (pokemon.isFail()) {
      return fail(pokemon.value);
    }

    return httpOk(pokemon.value);
  }
}
