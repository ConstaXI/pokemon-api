import UpdatePokemonInteractor from '../../src/business/interactors/pokemon/update-pokemon-interactor';
import { PokemonRepositorySymbol } from '../../src/business/protocols/repositories/pokemon-repository';
import container from '../../src/main/ioc/container';
import makeFakePokemon from '../fakes/entities/pokemon';
import FakePokemonRepository, {
  fakePokemonRepositorySave,
} from '../fakes/repositories/pokemon-repository';

describe('UpdatePokemonInteractor', () => {
  let interactor: UpdatePokemonInteractor;

  beforeAll(() => {
    container.bind(PokemonRepositorySymbol).to(FakePokemonRepository);
    container.bind(UpdatePokemonInteractor).toSelf();
  });

  beforeEach(() => {
    interactor = container.get(UpdatePokemonInteractor);
  });

  afterAll(() => {
    container.unbindAll();
  });

  test('should call repository with updated pokemon', async () => {
    const pokemon = makeFakePokemon();
    const treinador = 'Treinador Fake';
    await interactor.execute(pokemon, treinador);

    expect(fakePokemonRepositorySave).toBeCalledWith({
      ...pokemon,
      treinador,
    });
  });
});
