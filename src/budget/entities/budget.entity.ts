// src/budgets/entities/budget.entity.ts
import { User } from 'src/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.budgets, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'float', default: 0 })
  amount: number;

  @Column({ type: 'int' })
  month: number;

  @Column({ type: 'int' })
  year: number;
}
