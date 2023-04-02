import { ContainerModule, interfaces } from 'inversify';
import CreatePokemonInteractor from '../../business/interactors/pokemon/create-pokemon-interactor';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(CreatePokemonInteractor).toSelf();
});
