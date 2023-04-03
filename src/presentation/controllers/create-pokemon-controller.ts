import { inject, injectable } from 'inversify';
import CreatePokemonInteractor from '../../business/interactors/pokemon/create-pokemon-interactor';
import Controller from '../protocols/controller';
import { Pokemon } from '../../domain/entities/pokemon';
import { Result, fail } from '../../domain/protocols/result';
import { HttpResponse } from '../protocols/http-response';
import { InputCreatePokemon } from '../../business/dto/pokemon';
import httpOk from '../responses/http-ok';
import InvalidPokemon from '../../business/errors/invalid-pokemon';

@injectable()
export default class CreatePokemonController implements Controller<Pokemon> {
  constructor(
    @inject(CreatePokemonInteractor)
    private readonly createPokemonInteractor: CreatePokemonInteractor,
  ) {}

  async handle(
    request: InputCreatePokemon,
  ): Promise<Result<HttpResponse<Pokemon>, InvalidPokemon>> {
    const result = await this.createPokemonInteractor.execute(request);

    if (result.isFail()) {
      return fail(result.value);
    }

    return httpOk(result.value);
  }
}
