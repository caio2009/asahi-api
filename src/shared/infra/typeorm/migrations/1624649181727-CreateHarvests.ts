import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateHarvests1624649181727 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'harvests',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'date',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'quantity',
                    type: 'integer'
                },
                {
                    name: 'in_stock',
                    type: 'integer'
                },
                {
                    name: 'rural_property_id',
                    type: 'uuid'
                },
                {
                    name: 'field_id',
                    type: 'uuid'
                },
                {
                    name: 'cultivation_id',
                    type: 'uuid'
                },
                {
                    name: 'classification_id',
                    type: 'uuid'
                },
                {
                    name: 'unit_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKRuralPropertyHarvest',
                    referencedTableName: 'rural_properties',
                    referencedColumnNames: ['id'],
                    columnNames: ['rural_property_id'],
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
                {
                    name: 'FKFieldHarvest',
                    referencedTableName: 'fields',
                    referencedColumnNames: ['id'],
                    columnNames: ['field_id'],
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                },
                {
                    name: 'FKCultivationHarvest',
                    referencedTableName: 'cultivations',
                    referencedColumnNames: ['id'],
                    columnNames: ['cultivation_id'],
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                },
                {
                    name: 'FKClassificationHarvest',
                    referencedTableName: 'classifications',
                    referencedColumnNames: ['id'],
                    columnNames: ['classification_id'],
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                },
                {
                    name: 'FKUnitHarvest',
                    referencedTableName: 'units',
                    referencedColumnNames: ['id'],
                    columnNames: ['unit_id'],
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('harvests');
    }

}
