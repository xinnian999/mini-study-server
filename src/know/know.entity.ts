import { Entity, Column, PrimaryGeneratedColumn, BeforeUpdate } from 'typeorm';

@Entity()
export class Know {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  url_suffix: string;

  @Column()
  typeId: number;

  @Column({ default: 0 })
  correct?: number;

  @Column({ default: 0 })
  error?: number;

  @Column({ default: 0 })
  count?: number;

  @Column({ default: '0' })
  correctRate?: string;

  @BeforeUpdate()
  calculate() {
    this.count = this.correct + this.error;
    this.correctRate =
      (this.correct / (this.correct + this.error)).toFixed(2) || '0';
      
    if (this.correct + this.error === 0) {
      this.correctRate = '0';
    }
  }
}
