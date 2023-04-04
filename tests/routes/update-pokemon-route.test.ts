import request from 'supertest';
import app from '../../src/main/config/app';
import { InputUpdatePokemon } from '../../src/business/dto/pokemon';
import postgresDataSource from '../../src/infra/database/datasource';
import PokemonEntity from '../../src/infra/entities/pokemon';
import CannotUpdateFields from '../../src/business/errors/cannot-update-field';
import { makeFakePokemon } from '../fakes/entities/pokemon';

describe('PUT /pokemons/:id', () => {
  const repository = postgresDataSource.getRepository(PokemonEntity);

  it('should update treinador', async () => {
    const treinador = 'Updated';

    const toUpdate: InputUpdatePokemon = {
      treinador,
    };

    const pokemon = await repository.save(makeFakePokemon());

    const response = await request(app)
      .put(`/pokemons/${pokemon.id}`)
      .send(toUpdate);

    const updatedPokemon = await repository.findOneBy({ id: pokemon.id });

    expect(response.statusCode).toBe(204);
    expect(updatedPokemon?.treinador).toBe(treinador);
  });

  it('should return error 400 when trying to update something besides treinador', async () => {
    const toUpdate = {
      treinador: 'Any',
      nivel: 999,
    };

    const error = new CannotUpdateFields();

    const pokemon = await repository.save(makeFakePokemon());

    const response = await request(app)
      .put(`/pokemons/${pokemon.id}`)
      .send(toUpdate);

    expect(response.statusCode).toBe(error.statusCode);
    expect(response.body.message).toBe(error.message);
  });
});
