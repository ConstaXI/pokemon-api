import { inject, injectable } from 'inversify';
import Controller from '../../main/protocols/controller';
import { PokemonWithId } from '../../domain/entities/pokemon';
import { Result, fail } from '../../domain/protocols/result';
import { HttpResponse } from '../../main/protocols/http-response';
import { InputUpdatePokemon } from '../../business/dto/pokemon';
import CannotUpdateFields from '../../business/errors/cannot-update-field';
import UpdatePokemonInteractor from '../../business/interactors/pokemon/update-pokemon-interactor';
import FindPokemonByIdInteractor from '../../business/interactors/pokemon/find-pokemon-by-id-interactor';
import httpNoContent from '../responses/http-no-content';

@injectable()
export default class UpdatePokemonController
  implements Controller<null, CannotUpdateFields>
{
  constructor(
    @inject(FindPokemonByIdInteractor)
    private readonly findPokemonByIdInteractor: FindPokemonByIdInteractor,
    @inject(UpdatePokemonController)
    private readonly updatePokemonInteractor: UpdatePokemonInteractor,
  ) {}

  async handle(
    request: InputUpdatePokemon & { id: PokemonWithId['id'] },
  ): Promise<Result<HttpResponse<null>, CannotUpdateFields>> {
    const pokemon = await this.findPokemonByIdInteractor.execute(request.id);

    if (pokemon.isFail()) {
      return fail(pokemon.value);
    }

    const updateResult = await this.updatePokemonInteractor.execute(
      pokemon.value,
      request.treinador,
    );

    if (updateResult.isFail()) {
      return fail(updateResult.value);
    }

    return httpNoContent();
  }
}
