import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import City from '@modules/cities/typerom/entities/City';
import Contries from '../../../countries/typeorm/entities/Contries';

@Entity('states')
export default class States {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column({ length: 4 })
  abbreviation: string;
  @ManyToOne(() => Contries, contries => contries.states)
  @JoinColumn({ name: 'contry_id' })
  contry: Contries;

  @OneToMany(() => City, cities => cities.state)
  cities: City[];
  @Column()
  active: boolean;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
