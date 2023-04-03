import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  PokemonTypes,
  PokemonWithId,
  validPokemonTypes,
} from '../../domain/entities/pokemon';

@Entity('pokemon')
export default class PokemonEntity implements PokemonWithId {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('enum', { enum: validPokemonTypes })
  tipo: PokemonTypes;

  @Column('varchar')
  treinador: string;

  @Column('int')
  nivel: number;
}
