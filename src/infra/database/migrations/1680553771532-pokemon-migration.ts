import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class pokemonMigrationts1680553771532
  implements MigrationInterface
{
  async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'pokemon',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'tipo',
            type: 'enum',
            enum: ['charizard', 'mewtwo', 'pikachu'],
          },
          {
            name: 'treinador',
            type: 'varchar',
          },
          {
            name: 'nivel',
            type: 'integer',
          },
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('pokemon');
  }
}
