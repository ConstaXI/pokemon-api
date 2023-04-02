import InvalidPokemon from '@business/errors/invalid-pokemon';
import {
  PokemonRepository,
  PokemonRepositorySymbol,
} from '@business/protocols';
import { Pokemon, Result, ok, validPokemonTypes, Interactor } from '@domain';
import { inject, injectable } from 'inversify';

@injectable()
// eslint-disable-next-line import/prefer-default-export
export default class CreatePokemonInteractor
  implements Interactor<Pokemon, InvalidPokemon>
{
  constructor(
    @inject(PokemonRepositorySymbol)
    private readonly pokemonRepository: PokemonRepository,
  ) {}

  async execute(pokemon: Pokemon): Promise<Result<Pokemon, InvalidPokemon>> {
    if (validPokemonTypes.includes(pokemon.tipo) === false) {
      return fail(new InvalidPokemon());
    }

    const result = await this.pokemonRepository.save(pokemon);

    return ok(result);
  }
}
