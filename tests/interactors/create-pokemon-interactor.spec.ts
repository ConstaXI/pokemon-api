import InvalidPokemon from '../../src/business/errors/invalid-pokemon';
import CreatePokemonInteractor from '../../src/business/interactors/pokemon/create-pokemon-interactor';
import { PokemonRepositorySymbol } from '../../src/business/protocols/repositories/pokemon-repository';
import { PokemonTypes } from '../../src/domain/entities/pokemon';
import container from '../../src/main/ioc/container';
import { makeFakePokemonWithId } from '../fakes/entities/pokemon';
import FakePokemonRepository, {
  fakePokemonRepositorySave,
} from '../fakes/repositories/pokemon-repository';

describe('CreatePokemonInteractor', () => {
  let interactor: CreatePokemonInteractor;

  beforeAll(() => {
    container.bind(PokemonRepositorySymbol).to(FakePokemonRepository);
    container.bind(CreatePokemonInteractor).toSelf();
  });

  beforeEach(() => {
    interactor = container.get(CreatePokemonInteractor);
  });

  afterAll(() => {
    container.unbindAll();
  });

  test('should call repository with nivel 1', async () => {
    const pokemon = makeFakePokemonWithId();
    await interactor.execute(pokemon);

    expect(fakePokemonRepositorySave).toBeCalledWith({
      ...pokemon,
      nivel: 1,
    });
  });

  test('should return an error if the pokemon type is invalid', async () => {
    const result = await interactor.execute(
      makeFakePokemonWithId({ tipo: 'invalid' as PokemonTypes }),
    );

    expect(result.isFail()).toBe(true);
    expect(result.value).toBeInstanceOf(InvalidPokemon);
  });
});
