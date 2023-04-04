import DeletePokemonInteractor from '../../src/business/interactors/pokemon/delete-pokemon-interactor';
import { PokemonRepositorySymbol } from '../../src/business/protocols/repositories/pokemon-repository';
import container from '../../src/main/ioc/container';
import makeFakePokemonWithId from '../fakes/entities/pokemon';
import FakePokemonRepository, {
  fakePokemonRepositoryDelete,
} from '../fakes/repositories/pokemon-repository';

describe('DeletePokemonInteractor', () => {
  let interactor: DeletePokemonInteractor;

  beforeAll(() => {
    container.bind(PokemonRepositorySymbol).to(FakePokemonRepository);
    container.bind(DeletePokemonInteractor).toSelf();
  });

  beforeEach(() => {
    interactor = container.get(DeletePokemonInteractor);
  });

  afterAll(() => {
    container.unbindAll();
  });

  test('should call repository with pokemon id', async () => {
    const pokemon = makeFakePokemonWithId();
    await interactor.execute(pokemon);

    expect(fakePokemonRepositoryDelete).toBeCalledWith(pokemon.id);
  });
});
