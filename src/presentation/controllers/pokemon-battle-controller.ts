import { inject, injectable } from 'inversify';
import { BattleResult } from '../../business/dto/battle';
import PokemonBattleInteractor from '../../business/interactors/battle/pokemon-battle-interactor';
import HttpError from '../../domain/protocols/http-error';
import { Result, fail } from '../../domain/protocols/result';
import Controller from '../protocols/controller';
import { HttpResponse } from '../protocols/http-response';
import FindPokemonByIdInteractor from '../../business/interactors/pokemon/find-pokemon-by-id-interactor';
import PokemonNotFound from '../../business/errors/pokemon-not-found';
import httpOk from '../responses/http-ok';
import IdMustBeANumber from '../../business/errors/id-must-be-a-number';

@injectable()
export default class PokemonBattleController
  implements Controller<BattleResult>
{
  constructor(
    @inject(FindPokemonByIdInteractor)
    private readonly findPokemonByIdInteractor: FindPokemonByIdInteractor,
    @inject(PokemonBattleInteractor)
    private readonly pokemonBattleInteractor: PokemonBattleInteractor,
  ) {}

  async handle(request: {
    pokemonAId: string;
    pokemonBId: string;
  }): Promise<Result<HttpResponse<BattleResult>, HttpError>> {
    const { pokemonAId, pokemonBId } = request;

    const idA = Number(pokemonAId);
    const idB = Number(pokemonBId);

    if (Number.isNaN(idA) || Number.isNaN(idB)) {
      return fail(new IdMustBeANumber());
    }

    const pokemonA = await this.findPokemonByIdInteractor.execute(idA);
    const pokemonB = await this.findPokemonByIdInteractor.execute(idB);

    if (pokemonA.isFail() || pokemonB.isFail()) {
      return fail(new PokemonNotFound());
    }

    const battleResult = await this.pokemonBattleInteractor.execute(
      pokemonA.value,
      pokemonB.value,
    );

    if (battleResult.isFail()) {
      return fail(battleResult.value);
    }

    return httpOk(battleResult.value);
  }
}
