import request from 'supertest';
import app from '../../src/main/config/app';
import postgresDataSource from '../../src/infra/database/datasource';
import PokemonEntity from '../../src/infra/entities/pokemon';
import { makeFakePokemon } from '../fakes/entities/pokemon';
import PokemonNotFound from '../../src/business/errors/pokemon-not-found';

describe('DELETE /pokemons/:id', () => {
  const repository = postgresDataSource.getRepository(PokemonEntity);

  it('should delete a pokemon', async () => {
    const pokemon = await repository.save(makeFakePokemon());

    const response = await request(app)
      .delete(`/pokemons/${pokemon.id}`)
      .send();

    const deletedPokemon = await repository.findOneBy({ id: pokemon.id });

    expect(response.statusCode).toBe(204);
    expect(deletedPokemon).toBeNull();
  });

  it('should return error 404 if no pokemon was found', async () => {
    const error = new PokemonNotFound();
    const response = await request(app).delete('/pokemons/999').send();

    expect(response.statusCode).toBe(error.statusCode);
    expect(response.body.message).toEqual(error.message);
  });
});
