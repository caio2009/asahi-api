import Field from '@modules/rural-property-management/infra/typeorm/entities/Field';
import RuralProperty from '@modules/rural-property-management/infra/typeorm/entities/RuralProperty';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Classification from './Classification';
import Cultivation from './Cultivation';
import Unit from './Unit';

@Entity('harvests')
class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  quantity: number;

  @Column({ name: 'in_stock' })
  inStock: number;

  @Column({ name: 'rural_property_id', select: false })
  ruralPropertyId: string;

  @Column({ name: 'field_id', select: false })
  fieldId: string;

  @Column({ name: 'cultivation_id', select: false })
  cultivationId: string;

  @Column({ name: 'classification_id', select: false })
  classificationId: string;

  @Column({ name: 'unit_id', select: false })
  unitId: string;

  @ManyToOne(type => RuralProperty)
  @JoinColumn({ name: 'rural_property_id' })
  ruralProperty: RuralProperty;

  @ManyToOne(type => Field)
  @JoinColumn({ name: 'field_id' })
  field: Field;

  @ManyToOne(type => Cultivation)
  @JoinColumn({ name: 'cultivation_id' })
  cultivation: Cultivation;

  @ManyToOne(type => Classification)
  @JoinColumn({ name: 'classification_id' })
  classification: Classification;

  @ManyToOne(type => Unit)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;
}

export default Harvest;