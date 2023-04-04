import { inject, injectable } from 'inversify';
import Controller from '../protocols/controller';
import { PokemonWithId } from '../../domain/entities/pokemon';
import { Result, fail } from '../../domain/protocols/result';
import { HttpResponse } from '../protocols/http-response';
import DeletePokemonInteractor from '../../business/interactors/pokemon/delete-pokemon-interactor';
import FindPokemonByIdInteractor from '../../business/interactors/pokemon/find-pokemon-by-id-interactor';
import httpNoContent from '../responses/http-no-content';
import PokemonNotFound from '../../business/errors/pokemon-not-found';

@injectable()
export default class DeletePokemonController
  implements Controller<null, PokemonNotFound>
{
  constructor(
    @inject(FindPokemonByIdInteractor)
    private readonly findPokemonByIdInteractor: FindPokemonByIdInteractor,
    @inject(DeletePokemonInteractor)
    private readonly deletePokemonInteractor: DeletePokemonInteractor,
  ) {}

  async handle(request: {
    id: PokemonWithId['id'];
  }): Promise<Result<HttpResponse<null>, PokemonNotFound>> {
    const pokemon = await this.findPokemonByIdInteractor.execute(request.id);

    if (pokemon.isFail()) {
      return fail(pokemon.value);
    }

    const result = await this.deletePokemonInteractor.execute(pokemon.value);

    if (result.isFail()) {
      return fail(result.value);
    }

    return httpNoContent();
  }
}
