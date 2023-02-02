import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class createContryIdStates1675295873844 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'states',
      new TableColumn({
        name: 'contry_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'states',
      new TableForeignKey({
        name: 'StatesOfContry',
        columnNames: ['contry_id'],
        referencedTableName: 'contries',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('states', 'StatesOfContry');
    await queryRunner.dropColumn('states', 'contry_id');
  }
}
