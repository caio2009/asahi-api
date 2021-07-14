import Harvest from "@modules/rural-property-management/infra/typeorm/entities/Harvest";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Sale from "./Sale";

@Entity('sale_items')
class SaleItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'unit_price' })
  unitPrice: number;

  @Column()
  quantity: number;

  @Column({ name: 'harvest_id', select: false })
  harvestId: string;

  @Column({ name: 'sale_id', select: false })
  saleId: string;

  @ManyToOne(type => Harvest)
  @JoinColumn({ name: 'harvest_id' })
  harvest: Harvest;

  @ManyToOne(type => Sale)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}

export default SaleItem;