import PokemonBattleInteractor from '../../src/business/interactors/battle/pokemon-battle-interactor';
import { BooleanGeneratorSymbol } from '../../src/business/protocols/services/boolean-generator';
import container from '../../src/main/ioc/container';
import { makeFakePokemonWithId } from '../fakes/entities/pokemon';
import FakeBooleanGenerator, {
  fakeBooleanGeneratorGenerate,
} from '../fakes/services/fake-boolean-generator';

describe('PokemonBattleInteractor', () => {
  let interactor: PokemonBattleInteractor;

  beforeAll(() => {
    container.bind(BooleanGeneratorSymbol).to(FakeBooleanGenerator);
    container.bind(PokemonBattleInteractor).toSelf();
  });

  beforeEach(() => {
    interactor = container.get(PokemonBattleInteractor);
  });

  afterAll(() => {
    container.unbindAll();
  });

  test('Should return Pokemon A in vencedor', async () => {
    const pokemonA = makeFakePokemonWithId({ id: 1 });
    const pokemonB = makeFakePokemonWithId({ id: 2 });

    fakeBooleanGeneratorGenerate.mockReturnValueOnce(true);

    const result = await interactor.execute(pokemonA, pokemonB);

    expect(result.isOk()).toBeTruthy();

    if (result.isOk()) {
      expect(result.value.vencedor.id).toBe(pokemonA.id);
      expect(result.value.perdedor.id).toBe(pokemonB.id);
    }
  });

  test('Should return Pokemon B in vencedor', async () => {
    const pokemonA = makeFakePokemonWithId({ id: 1 });
    const pokemonB = makeFakePokemonWithId({ id: 2 });

    fakeBooleanGeneratorGenerate.mockReturnValueOnce(true);

    const result = await interactor.execute(pokemonA, pokemonB);

    expect(result.isOk()).toBeTruthy();

    if (result.isOk()) {
      expect(result.value.vencedor.id).toBe(pokemonA.id);
      expect(result.value.perdedor.id).toBe(pokemonB.id);
    }
  });

  test('Should call repoisitory with correct probability of winning', async () => {
    const pokemonA = makeFakePokemonWithId({ nivel: 4 });
    const pokemonB = makeFakePokemonWithId({ nivel: 10 });

    const probability = pokemonA.nivel / (pokemonA.nivel + pokemonB.nivel);

    await interactor.execute(pokemonA, pokemonB);

    expect(fakeBooleanGeneratorGenerate).toBeCalledWith(probability);
  });

  test('Should increment winner nivel and decrement loser nivel', async () => {
    const pokemonA = makeFakePokemonWithId({ id: 1 });
    const pokemonB = makeFakePokemonWithId({ id: 2 });

    const pokemonANivel = pokemonA.nivel;
    const pokemonBNivel = pokemonB.nivel;

    fakeBooleanGeneratorGenerate.mockReturnValueOnce(true);

    const result = await interactor.execute(pokemonA, pokemonB);

    expect(result.isOk()).toBeTruthy();

    if (result.isOk()) {
      expect(result.value.vencedor.nivel).toBe(pokemonANivel + 1);
      expect(result.value.perdedor.nivel).toBe(pokemonBNivel - 1);
    }
  });
});
