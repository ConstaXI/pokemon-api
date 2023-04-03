import { DataSource } from 'typeorm';
import PokemonEntity from '../entities/pokemon';
import pokemonMigrationts1680553771532 from './migrations/1680553771532-pokemon-migration.ts';

const postgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pokemon',
  entities: [PokemonEntity],
  migrations: [pokemonMigrationts1680553771532],
});

export default postgresDataSource;
