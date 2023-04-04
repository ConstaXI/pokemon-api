import request from 'supertest';
import app from '../../src/main/config/app';
import postgresDataSource from '../../src/infra/database/datasource';
import PokemonEntity from '../../src/infra/entities/pokemon';
import { makeFakePokemon } from '../fakes/entities/pokemon';

describe('POST /batalhar/:pokemonAId/:pokemonBId', () => {
  const repository = postgresDataSource.getRepository(PokemonEntity);

  it('Should battle pokemons and delete perdedor', async () => {
    const pokemons = await repository.save([
      makeFakePokemon({ tipo: 'pikachu', nivel: 1 }),
      makeFakePokemon({ tipo: 'mewtwo', nivel: 1 }),
    ]);

    const [pokemonA, pokemonB] = pokemons;

    const response = await request(app).post(
      `/batalhar/${pokemonA.id}/${pokemonB.id}`,
    );

    expect(response.statusCode).toBe(200);

    if (response.body.vencedor.id === pokemonA.id) {
      expect(response.body.vencedor.nivel).toBe(pokemonA.nivel + 1);

      const deletedPokemon = await repository.findOneBy({ id: pokemonB.id });

      expect(deletedPokemon).toBeNull();
    }

    if (response.body.vencedor.id === pokemonB.id) {
      expect(response.body.vencedor.nivel).toBe(pokemonB.nivel + 1);

      const deletedPokemon = await repository.findOneBy({ id: pokemonA.id });

      expect(deletedPokemon).toBeNull();
    }
  });
});
