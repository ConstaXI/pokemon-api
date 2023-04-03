import { ContainerModule, interfaces } from 'inversify';
import CreatePokemonController from '../../presentation/controllers/create-pokemon-controller';
import UpdatePokemonController from '../../presentation/controllers/update-pokemon-controller';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(UpdatePokemonController).toSelf();
  bind(CreatePokemonController).toSelf();
});
