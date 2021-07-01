import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cultivations')
class Cultivation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  
  @Column({ name: 'image_url' })
  imageUrl: string;
}

export default Cultivation;