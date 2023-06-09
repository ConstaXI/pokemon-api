import { inject, injectable } from 'inversify';
import InvalidPokemon from '../../errors/invalid-pokemon';
import {
  PokemonRepository,
  PokemonRepositorySymbol,
} from '../../protocols/repositories/pokemon-repository';
import { Pokemon, validPokemonTypes } from '../../../domain/entities/pokemon';
import { Interactor } from '../../../domain/protocols/interactor';
import { Result, ok, fail } from '../../../domain/protocols/result';
import { InputCreatePokemon } from '../../dto/pokemon';

@injectable()
export default class CreatePokemonInteractor
  implements Interactor<Pokemon, InvalidPokemon>
{
  constructor(
    @inject(PokemonRepositorySymbol)
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async execute(
    pokemon: InputCreatePokemon,
  ): Promise<Result<Pokemon, InvalidPokemon>> {
    if (validPokemonTypes.includes(pokemon.tipo) === false) {
      return fail(new InvalidPokemon());
    }

    const entity: Pokemon = {
      ...pokemon,
      nivel: 1,
    };

    const result = await this.pokemonRepository.save(entity);

    return ok(result);
  }
}
