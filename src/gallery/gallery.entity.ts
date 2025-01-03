import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type: string;

  @Column()
  url: string;

  @Column()
  name?: string;
}
