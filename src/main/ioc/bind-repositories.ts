import { ContainerModule, interfaces } from 'inversify';
import { PokemonRepositorySymbol } from '../../business/protocols/repositories/pokemon-repository';
import PokemonTypeormRepository from '../../infra/repositories/pokemon-typeorm-repository';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(PokemonRepositorySymbol).to(PokemonTypeormRepository);
});
