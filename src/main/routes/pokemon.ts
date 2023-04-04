import { Router } from 'express';
import CreatePokemonController from '../../presentation/controllers/create-pokemon-controller';
import expressAdapter from '../adapters/express-adapter';
import container from '../ioc/container';
import UpdatePokemonController from '../../presentation/controllers/update-pokemon-controller';
import FindPokemonByIdController from '../../presentation/controllers/find-pokemon-by-id-controller';

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
};
