import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({
    default:
      'https://t7.baidu.com/it/u=817611040,1231620461&fm=217&app=126&size=f242,150&n=0&f=PNG?s=6330AA66EE22248C5994289A03008093&sec=1735318800&t=ff97ab2cb5983cf5901425e37c5907cc',
  })
  avatar?: string;

  @Column({
    default: `宝宝${Math.floor(1000 + Math.random() * 9000).toString()}`,
  })
  nickname?: string;
}
