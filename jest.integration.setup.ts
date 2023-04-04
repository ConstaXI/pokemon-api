import 'reflect-metadata';

process.env.DATABASE_NAME = 'pokemon_test';

const postgresDataSource = (await import('./src/infra/database/datasource')).default

beforeAll(async () => {
    await postgresDataSource.initialize();
    await postgresDataSource.runMigrations();
});

afterAll(async () => {
    await postgresDataSource.undoLastMigration();
    await postgresDataSource.destroy();
});
