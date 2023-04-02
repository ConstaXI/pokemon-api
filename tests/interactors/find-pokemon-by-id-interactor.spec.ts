import InvalidPokemon from '../../src/business/errors/invalid-pokemon';
import PokemonNotFound from '../../src/business/errors/pokemon-not-found';
import FindPokemonByIdInteractor from '../../src/business/interactors/pokemon/find-pokemon-by-id-interactor';
import { PokemonRepositorySymbol } from '../../src/business/protocols/repositories/pokemon-repository';
import container from '../../src/main/ioc/container';
import FakePokemonRepository, {
  fakePokemonRepositoryFindOne,
  fakePokemonRepositorySave,
} from '../fakes/repositories/pokemon-repository';

describe('FindPokemonByIdInteractor', () => {
  let interactor: FindPokemonByIdInteractor;

  beforeAll(() => {
    container.bind(PokemonRepositorySymbol).to(FakePokemonRepository);
    container.bind(FindPokemonByIdInteractor).toSelf();
  });

  beforeEach(() => {
    interactor = container.get(FindPokemonByIdInteractor);
  });

  afterAll(() => {
    container.unbindAll();
  });

  test('should call repository with id 0', async () => {
    const id = 0;
    await interactor.execute(id);
    expect(fakePokemonRepositoryFindOne).toBeCalledWith('id', id);
  });

  test('should return an error if no pokemons were found', async () => {
    fakePokemonRepositoryFindOne.mockResolvedValueOnce(undefined);
    const result = await interactor.execute(0);

    expect(result.isFail()).toBe(true);
    expect(result.value).toBeInstanceOf(PokemonNotFound);
  });
});
