import { Router } from 'express';
import CreatePokemonController from '../../presentation/controllers/create-pokemon-controller';
import expressAdapter from '../adapters/express-adapter';
import container from '../ioc/container';

export default (router: Router): void => {
  router.post(
    '/pokemon',
    expressAdapter(container.get(CreatePokemonController)),
  );
};
