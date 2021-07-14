import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Client from "./Client";

@Entity('sales')
class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: number;

  @Column()
  date: Date;

  @Column({ name: 'total_value' })
  totalValue: number;

  @Column({ name: 'payment_status' })
  paymentStatus: 'paid' | 'pending';

  @Column({ name: 'delivery_status' })
  deliveryStatus: 'completed' | 'waiting';

  @Column({ name: 'client_name' })
  clientName: string;

  @Column({ name: 'client_id', select: false })
  clientId: string;

  @ManyToOne(type => Client)
  @JoinColumn({ name: 'client_id' })
  client: Client;
}

export default Sale;