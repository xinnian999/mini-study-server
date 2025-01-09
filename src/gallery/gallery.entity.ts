import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  type: string;

  @Column()
  url_suffix: string;

  @Column()
  title?: string;
}
