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
      '/userAvatar/image97.jpg',
  })
  avatar_url_suffix?: string;

  @Column({
    default: `宝宝${Math.floor(1000 + Math.random() * 9000).toString()}`,
  })
  nickname?: string;
}
