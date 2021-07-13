import RuralProperty from '@modules/rural-property-management/infra/typeorm/entities/RuralProperty';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Cultivation from '@modules/rural-property-management/infra/typeorm/entities/Cultivation';

@Entity('fields')
class Field {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column({ name: 'closed_at' })
  closedAt: Date;
  
  @Column({ name: 'rural_property_id', select: false })
  ruralPropertyId: string;

  @Column({ name: 'cultivation_id', select: false })
  cultivationId: string;

  @ManyToOne(type => RuralProperty)
  @JoinColumn({ name: 'rural_property_id' })
  ruralProperty: RuralProperty;

  @ManyToOne(type => Cultivation)
  @JoinColumn({ name: 'cultivation_id' })
  cultivation: Cultivation;
}

export default Field;