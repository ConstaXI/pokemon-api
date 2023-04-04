import request from 'supertest';
import app from '../../src/main/config/app';
import { InputCreatePokemon } from '../../src/business/dto/pokemon';

describe('POST /pokemons', () => {
  it('should create a new pokemon', async () => {
    const pokemon: InputCreatePokemon = {
      tipo: 'pikachu',
      treinador: 'Ash',
    };

    const response = await request(app).post('/pokemon').send(pokemon);

    expect(response.body).toEqual({ ...pokemon, nivel: 1, id: 1 });
    expect(response.statusCode).toBe(200);
  });
});
