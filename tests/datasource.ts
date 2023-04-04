import { DataSource } from 'typeorm';
import pokemonMigrationts1680553771532 from '../src/infra/database/migrations/1680553771532-pokemon-migration';
import PokemonEntity from '../src/infra/entities/pokemon';

const postgresTestDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'pokemon-test',
  entities: [PokemonEntity],
  migrations: [pokemonMigrationts1680553771532],
});

export default postgresTestDataSource;
