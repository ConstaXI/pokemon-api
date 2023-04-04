import { ContainerModule, interfaces } from 'inversify';
import { PokemonRepositorySymbol } from '../../business/protocols/repositories/pokemon-repository';
import PokemonTypeormRepository from '../../infra/repositories/pokemon-typeorm-repository';
import { BooleanGeneratorSymbol } from '../../business/protocols/services/boolean-generator';
import BooleanMathGenerator from '../../infra/services/boolean-math-generator';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(PokemonRepositorySymbol).to(PokemonTypeormRepository);
  bind(BooleanGeneratorSymbol).to(BooleanMathGenerator);
});
