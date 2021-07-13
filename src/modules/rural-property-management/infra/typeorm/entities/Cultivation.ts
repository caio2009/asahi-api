import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cultivations')
class Cultivation {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;
  
  @Column({ name: 'image' })
  image: string;
}

export default Cultivation;