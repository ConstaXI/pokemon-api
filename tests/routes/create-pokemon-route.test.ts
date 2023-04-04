import request from 'supertest';
import app from '../../src/main/config/app';
import { InputCreatePokemon } from '../../src/business/dto/pokemon';
import { PokemonTypes } from '../../src/domain/entities/pokemon';
import InvalidPokemon from '../../src/business/errors/invalid-pokemon';

describe('POST /pokemons', () => {
  it('should create a new pokemon', async () => {
    const pokemon: InputCreatePokemon = {
      tipo: 'pikachu',
      treinador: 'Ash',
    };

    const response = await request(app).post('/pokemons').send(pokemon);

    expect(response.body).toEqual({ ...pokemon, nivel: 1, id: 1 });
    expect(response.statusCode).toBe(200);
  });

  it('should return error 400 when creating pokemon with unknown type', async () => {
    const pokemon: InputCreatePokemon = {
      tipo: 'unknown' as PokemonTypes,
      treinador: 'Ash',
    };

    const response = await request(app).post('/pokemons').send(pokemon);

    const error = new InvalidPokemon();

    expect(response.statusCode).toBe(error.statusCode);
    expect(response.body.message).toBe(error.message);
  });
});
