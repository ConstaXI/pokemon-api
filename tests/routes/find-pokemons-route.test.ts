import request from 'supertest';
import app from '../../src/main/config/app';
import postgresDataSource from '../../src/infra/database/datasource';
import PokemonEntity from '../../src/infra/entities/pokemon';
import { makeFakePokemon } from '../fakes/entities/pokemon';

describe('GET /pokemons', () => {
  const repository = postgresDataSource.getRepository(PokemonEntity);

  it('should find a pokemon list', async () => {
    const pokemonList = [
      makeFakePokemon(),
      makeFakePokemon(),
      makeFakePokemon(),
    ];
    await repository.save(pokemonList);
    const response = await request(app).get('/pokemons').send();

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toEqual(pokemonList.length);
  });
});
