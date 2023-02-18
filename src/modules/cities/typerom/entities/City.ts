import States from '@modules/states/typeorm/entities/states';

import {
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default class City {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  active: boolean;
  @ManyToOne(() => States, states => states.cities)
  @JoinColumn({ name: 'state_id' })
  state: States;
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
