import { ContainerModule, interfaces } from 'inversify';
import CreatePokemonInteractor from '../../business/interactors/pokemon/create-pokemon-interactor';
import UpdatePokemonInteractor from '../../business/interactors/pokemon/update-pokemon-interactor';
import DeletePokemonInteractor from '../../business/interactors/pokemon/delete-pokemon-interactor';
import FindPokemonByIdInteractor from '../../business/interactors/pokemon/find-pokemon-by-id-interactor';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(CreatePokemonInteractor).toSelf();
  bind(UpdatePokemonInteractor).toSelf();
  bind(DeletePokemonInteractor).toSelf();
  bind(FindPokemonByIdInteractor).toSelf();
});
