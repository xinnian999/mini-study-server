import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique:true})
  username: string;

  @Column()
  password: string;

  @Column({ default: 'https://img0.baidu.com/it/u=3582999362,3809132610&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1734973200&t=9fbc9c800660134dadbc25a60ddc12de' })
  avatar: string;
}