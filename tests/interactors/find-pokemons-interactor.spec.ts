import FindPokemonsInteractor from '../../src/business/interactors/pokemon/find-pokemons-interactor';
import { PokemonRepositorySymbol } from '../../src/business/protocols/repositories/pokemon-repository';
import container from '../../src/main/ioc/container';
import makeFakePokemon from '../fakes/entities/pokemon';
import FakePokemonRepository, {
  fakePokemonRepositoryFind,
} from '../fakes/repositories/pokemon-repository';

describe('FindPokemonsInteractor', () => {
  let interactor: FindPokemonsInteractor;

  beforeAll(() => {
    container.bind(PokemonRepositorySymbol).to(FakePokemonRepository);
    container.bind(FindPokemonsInteractor).toSelf();
  });

  beforeEach(() => {
    interactor = container.get(FindPokemonsInteractor);
  });

  afterAll(() => {
    container.unbindAll();
  });

  test('should call repository', async () => {
    await interactor.execute();

    expect(fakePokemonRepositoryFind).toBeCalled();
  });

  test('should return a list of pokemons', async () => {
    const pokemons = [makeFakePokemon({ id: 1 }), makeFakePokemon({ id: 2 })];
    fakePokemonRepositoryFind.mockResolvedValueOnce(pokemons);
    const result = await interactor.execute();

    expect(result.isOk()).toBeTruthy();
    expect(result.value).toHaveLength(pokemons.length);
  });
});
