import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('units')
class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column()
  abbreviation: string;
}

export default Unit;