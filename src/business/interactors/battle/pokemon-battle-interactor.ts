import { inject, injectable } from 'inversify';
import { PokemonWithId } from '../../../domain/entities/pokemon';
import HttpError from '../../../domain/protocols/http-error';
import { Interactor } from '../../../domain/protocols/interactor';
import { Result, ok } from '../../../domain/protocols/result';
import { BattleResult } from '../../dto/battle';
import BooleanGenerator, {
  BooleanGeneratorSymbol,
} from '../../protocols/services/boolean-generator';

@injectable()
export default class PokemonBattleInteractor
  implements Interactor<BattleResult>
{
  constructor(
    @inject(BooleanGeneratorSymbol)
    private readonly booleanGenerator: BooleanGenerator,
  ) {}

  async execute(
    pokemonA: PokemonWithId,
    pokemonB: PokemonWithId,
  ): Promise<Result<BattleResult, HttpError>> {
    const { nivel: pokemonANivel } = pokemonA;
    const { nivel: pokemonBNivel } = pokemonB;

    const probabilityOfAWins = pokemonANivel / (pokemonANivel + pokemonBNivel);

    const pokemonAWins = this.booleanGenerator.generate(probabilityOfAWins);

    const vencedorAndPerdedor: BattleResult = {
      vencedor: pokemonAWins ? pokemonA : pokemonB,
      perdedor: pokemonAWins ? pokemonB : pokemonA,
    };

    vencedorAndPerdedor.vencedor.nivel += 1;
    vencedorAndPerdedor.perdedor.nivel -= 1;

    console.log(vencedorAndPerdedor);

    return ok(vencedorAndPerdedor);
  }
}
