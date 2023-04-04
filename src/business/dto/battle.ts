import { PokemonWithId } from '../../domain/entities/pokemon';

export type BattleResult = {
  vencedor: PokemonWithId;
  perdedor: PokemonWithId;
};
