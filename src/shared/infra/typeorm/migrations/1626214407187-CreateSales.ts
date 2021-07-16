import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSales1626214407187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sales',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'number',
                    type: 'serial'
                },
                {
                    name: 'date',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'total_value',
                    type: 'decimal',
                    precision: 8,
                    scale: 2
                },
                {
                    name: 'payment_status',
                    type: 'enum',
                    enum: ['paid', 'pending']
                },
                {
                    name: 'delivery_status',
                    type: 'enum',
                    enum: ['completed', 'waiting']
                },
                {
                    name: 'client_name',
                    type: 'varchar'
                },
                {
                    name: 'client_id',
                    type: 'uuid',
                    isNullable: true
                }
            ],
            foreignKeys: [
                {
                    name: 'FKClientSale',
                    referencedTableName: 'clients',
                    referencedColumnNames: ['id'],
                    columnNames: ['client_id'],
                    onDelete: 'set null',
                    onUpdate: 'cascade'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sales');
    }

}
