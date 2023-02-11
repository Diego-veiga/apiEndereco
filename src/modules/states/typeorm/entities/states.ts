import Contries from '@modules/countries/typeorm/entities/Contries';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  @Column()
  active: boolean;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
