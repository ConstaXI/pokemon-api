import { DataSource } from 'typeorm';
import pokemonMigrationts1680553771532 from './migrations/1680553771532-pokemon-migration';
import PokemonEntity from '../entities/pokemon';
import environment from '../../main/config/environment';

const postgresDataSource = new DataSource({
  type: 'postgres',
  host: environment.DATABASE_URL,
  port: environment.DATABASE_PORT as number,
  username: environment.DATABASE_USER,
  password: environment.DATABASE_PASSWORD,
  database: environment.DATABASE_NAME,
  entities: [PokemonEntity],
  migrations: [pokemonMigrationts1680553771532],
});

export default postgresDataSource;
