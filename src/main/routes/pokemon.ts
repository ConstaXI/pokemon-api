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
  /**
   * @openapi
   * '/pokemons':
   *  post:
   *     tags:
   *     - Pokemon
   *     summary: Creates a new pokemon
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            properties:
   *              tipo:
   *                type: string
   *                default: pikachu
   *              treinador:
   *                type: string
   *                default: Ash
   *     responses:
   *      200:
   *        description: Pokemon has been created
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                id:
   *                  type: number
   *                tipo:
   *                  type: string
   *                treinador:
   *                  type: string
   *                nivel:
   *                  type: number
   *      400:
   *        description: Bad request
   */
  router.post(
    '/pokemons',
    expressAdapter(container.get(CreatePokemonController)),
  );

  /**
   * @openapi
   * '/pokemons/{id}':
   *  put:
   *     tags:
   *     - Pokemon
   *     summary: Updates existing Pokemon
   *     parameters:
   *       - name: id
   *         in: path
   *         description: Pokemon id
   *         required: true
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *            type: object
   *            properties:
   *              treinador:
   *                type: string
   *     responses:
   *      204:
   *        description: Pokemon has been updated
   *      400:
   *        description: Bad request, invalid id or tried to update forbidden properties
   *      404:
   *        description: Pokemon not found
   */
  router.put(
    '/pokemons/:id',
    expressAdapter(container.get(UpdatePokemonController)),
  );

  /**
   * @openapi
   * '/pokemons/{id}':
   *  get:
   *     tags:
   *     - Pokemon
   *     summary: Find a single existing Pokemon
   *     parameters:
   *       - name: id
   *         in: path
   *         description: Pokemon id
   *         required: true
   *     responses:
   *      204:
   *        description: Pokemon has been updated
   *      400:
   *        description: Bad request, invalid id
   *      404:
   *        description: Pokemon not found
   */
  router.get(
    '/pokemons/:id',
    expressAdapter(container.get(FindPokemonByIdController)),
  );

  /**
   * @openapi
   * '/pokemons':
   *  get:
   *     tags:
   *     - Pokemon
   *     summary: Get all Pokemons
   *     responses:
   *      200:
   *        description: Got all Pokemons
   *        content:
   *          application/json:
   *            schema:
   *              type: array
   *              properties:
   *                id:
   *                  type: number
   *                tipo:
   *                  type: string
   *                treinador:
   *                  type: string
   *                nivel:
   *                  type: number
   *      400:
   *        description: Bad request, invalid id
   *      404:
   *        description: Pokemon not found
   */
  router.get(
    '/pokemons',
    expressAdapter(container.get(FindPokemonsController)),
  );

  /**
   * @openapi
   * '/pokemons/{id}':
   *  delete:
   *     tags:
   *     - Pokemon
   *     summary: Deletes a Pokemon
   *     parameters:
   *       - name: id
   *         in: path
   *         description: Pokemon id
   *         required: true
   *     responses:
   *      204:
   *        description: Pokemon has been deleted
   *      400:
   *        description: Bad request, invalid id
   *      404:
   *        description: Pokemon not found
   */
  router.delete(
    '/pokemons/:id',
    expressAdapter(container.get(DeletePokemonController)),
  );

  /**
   * @openapi
   * '/batalhar/{pokemonAId}/{pokemonBId}':
   *  post:
   *     tags:
   *     - Pokemon
   *     summary: Deletes a Pokemon
   *     parameters:
   *       - name: pokemonAId
   *         in: path
   *         description: Id of the first Pokemon
   *         required: true
   *       - name: pokemonBId
   *         in: path
   *         description: Id of the second Pokemon
   *         required: true
   *     responses:
   *      200:
   *        description: Battle result
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                vencedor:
   *                  type: object
   *                  properties:
   *                    id:
   *                      type: number
   *                    tipo:
   *                      type: string
   *                    treinador:
   *                      type: string
   *                    nivel:
   *                      type: number
   *                perdedor:
   *                  type: object
   *                  properties:
   *                    id:
   *                      type: number
   *                    tipo:
   *                      type: string
   *                    treinador:
   *                      type: string
   *                    nivel:
   *                      type: number
   *      400:
   *        description: Bad request, invalid id
   *      404:
   *        description: Pokemon not found
   */
  router.post(
    '/batalhar/:pokemonAId/:pokemonBId',
    expressAdapter(container.get(PokemonBattleController)),
  );
};
