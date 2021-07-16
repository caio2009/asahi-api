import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSaleItems1626215123172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sale_items',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'unit_price',
                    type: 'decimal',
                    precision: 5,
                    scale: 2
                },
                {
                    name: 'quantity',
                    type: 'int'
                },
                {
                    name: 'harvest_id',
                    type: 'uuid'
                },
                {
                    name: 'sale_id',
                    type: 'uuid'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKHarvestSaleItem',
                    referencedTableName: 'harvests',
                    referencedColumnNames: ['id'],
                    columnNames: ['harvest_id'],
                    onDelete: 'restrict',
                    onUpdate: 'cascade'
                },
                {
                    name: 'FKSaleSaleItem',
                    referencedTableName: 'sales',
                    referencedColumnNames: ['id'],
                    columnNames: ['sale_id'],
                    onDelete: 'cascade',
                    onUpdate: 'cascade'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sale_items');
    }

}
