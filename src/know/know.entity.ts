import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Know {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  typeId: number;
  
  @Column({ default: 0 })
  count?: number;

  @Column({ default: 0 })
  correctCount?: number;

  @Column({ default: 0 })
  errorCount?: number;

  // @BeforeInsert()
  // calculateCount() {
  //   this.count = this.correctCount + this.errorCount;
  // }

}
