import { ContainerModule, interfaces } from 'inversify';
import CreatePokemonInteractor from '../../business/interactors/pokemon/create-pokemon-interactor';
import UpdatePokemonInteractor from '../../business/interactors/pokemon/update-pokemon-interactor';
import DeletePokemonInteractor from '../../business/interactors/pokemon/delete-pokemon-interactor';
import FindPokemonByIdInteractor from '../../business/interactors/pokemon/find-pokemon-by-id-interactor';
import FindPokemonsInteractor from '../../business/interactors/pokemon/find-pokemons-interactor';
import PokemonBattleInteractor from '../../business/interactors/battle/pokemon-battle-interactor';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(CreatePokemonInteractor).toSelf();
  bind(UpdatePokemonInteractor).toSelf();
  bind(DeletePokemonInteractor).toSelf();
  bind(FindPokemonByIdInteractor).toSelf();
  bind(FindPokemonsInteractor).toSelf();
  bind(PokemonBattleInteractor).toSelf();
});
