import request from 'supertest';
import app from '../../src/main/config/app';
import postgresDataSource from '../../src/infra/database/datasource';
import PokemonEntity from '../../src/infra/entities/pokemon';
import { makeFakePokemon } from '../fakes/entities/pokemon';
import PokemonNotFound from '../../src/business/errors/pokemon-not-found';

describe('GET /pokemons/:id', () => {
  const repository = postgresDataSource.getRepository(PokemonEntity);

  it('should find a pokemon', async () => {
    const pokemon = await repository.save(makeFakePokemon());
    const response = await request(app).get(`/pokemons/${pokemon.id}`).send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(pokemon);
  });

  it('should return error 404 if no pokemon was found', async () => {
    const error = new PokemonNotFound();
    const response = await request(app).get('/pokemons/999').send();

    expect(response.statusCode).toBe(error.statusCode);
    expect(response.body.message).toEqual(error.message);
  });
});
