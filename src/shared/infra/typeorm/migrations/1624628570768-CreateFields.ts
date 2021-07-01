import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFields1624628570768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'fields',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'closed_at',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'rural_property_id',
                    type: 'uuid'
                },
                {
                    name: 'cultivation_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKRuralPropertyField',
                    referencedTableName: 'rural_properties',
                    referencedColumnNames: ['id'],
                    columnNames: ['rural_property_id'],
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
                {
                    name: 'FKCultivationField',
                    referencedTableName: 'cultivations',
                    referencedColumnNames: ['id'],
                    columnNames: ['cultivation_id'],
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('fields');
    }

}
