import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('classifications')
class Classification {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;
}

export default Classification;