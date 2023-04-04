/* eslint-disable sonarjs/no-duplicate-string */
import { Router } from 'express';
import CreatePokemonController from '../../presentation/controllers/create-pokemon-controller';
import expressAdapter from '../adapters/express-adapter';
import container from '../ioc/container';
import UpdatePokemonController from '../../presentation/controllers/update-pokemon-controller';
import FindPokemonByIdController from '../../presentation/controllers/find-pokemon-by-id-controller';
import FindPokemonsController from '../../presentation/controllers/find-pokemons-controller';
import DeletePokemonController from '../../presentation/controllers/delete-pokemon-controller';
import PokemonBattleController from '../../presentation/controllers/pokemon-battle-controller';

export default (router: Router): void => {
  router.post(
    '/pokemons',
    expressAdapter(container.get(CreatePokemonController)),
  );

  router.put(
    '/pokemons/:id',
    expressAdapter(container.get(UpdatePokemonController)),
  );

  router.get(
    '/pokemons/:id',
    expressAdapter(container.get(FindPokemonByIdController)),
  );

  router.get(
    '/pokemons',
    expressAdapter(container.get(FindPokemonsController)),
  );

  router.delete(
    '/pokemons/:id',
    expressAdapter(container.get(DeletePokemonController)),
  );

  router.post(
    '/batalhar/:pokemonAId/:pokemonBId',
    expressAdapter(container.get(PokemonBattleController)),
  );
};
