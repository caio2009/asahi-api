import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('rural_properties')
class RuralProperty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;
}

export default RuralProperty;