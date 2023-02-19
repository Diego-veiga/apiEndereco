import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class createCitiesOfSates1676146410629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'cities',
      new TableForeignKey({
        name: 'CitiesOfState',
        columnNames: ['state_id'],
        referencedTableName: 'states',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cities', 'CitiesOfState');
  }
}
