import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class KnowType {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  icon: string;

  @Column()
  desc: string;

  @Column()
  userId: number;
}
