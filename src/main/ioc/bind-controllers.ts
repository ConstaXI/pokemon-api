import { ContainerModule, interfaces } from 'inversify';
import CreatePokemonController from '../../presentation/controllers/create-pokemon-controller';
import UpdatePokemonController from '../../presentation/controllers/update-pokemon-controller';
import FindPokemonByIdController from '../../presentation/controllers/find-pokemon-by-id-controller';
import FindPokemonsController from '../../presentation/controllers/find-pokemons-controller';
import DeletePokemonController from '../../presentation/controllers/delete-pokemon-controller';
import PokemonBattleController from '../../presentation/controllers/pokemon-battle-controller';

export default new ContainerModule((bind: interfaces.Bind) => {
  bind(UpdatePokemonController).toSelf();
  bind(CreatePokemonController).toSelf();
  bind(FindPokemonByIdController).toSelf();
  bind(FindPokemonsController).toSelf();
  bind(DeletePokemonController).toSelf();
  bind(PokemonBattleController).toSelf();
});
