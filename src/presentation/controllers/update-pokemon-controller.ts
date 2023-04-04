import { inject, injectable } from 'inversify';
import Controller from '../protocols/controller';
import { PokemonWithId } from '../../domain/entities/pokemon';
import { Result, fail } from '../../domain/protocols/result';
import { HttpResponse } from '../protocols/http-response';
import { InputUpdatePokemon } from '../../business/dto/pokemon';
import CannotUpdateFields from '../../business/errors/cannot-update-field';
import UpdatePokemonInteractor from '../../business/interactors/pokemon/update-pokemon-interactor';
import FindPokemonByIdInteractor from '../../business/interactors/pokemon/find-pokemon-by-id-interactor';
import httpNoContent from '../responses/http-no-content';
import IdMustBeANumber from '../../business/errors/id-must-be-a-number';

@injectable()
export default class UpdatePokemonController
  implements Controller<null, CannotUpdateFields>
{
  constructor(
    @inject(FindPokemonByIdInteractor)
    private readonly findPokemonByIdInteractor: FindPokemonByIdInteractor,
    @inject(UpdatePokemonInteractor)
    private readonly updatePokemonInteractor: UpdatePokemonInteractor,
  ) {}

  async handle(
    request: InputUpdatePokemon & { id: string },
  ): Promise<Result<HttpResponse<null>, CannotUpdateFields>> {
    const requestKeys = Object.keys(request);

    for (const requestKey of requestKeys) {
      if (requestKey !== 'id' && requestKey !== 'treinador') {
        return fail(new CannotUpdateFields());
      }
    }

    const id = Number(request.id);

    if (Number.isNaN(id)) {
      return fail(new IdMustBeANumber());
    }

    const pokemon = await this.findPokemonByIdInteractor.execute(id);

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
