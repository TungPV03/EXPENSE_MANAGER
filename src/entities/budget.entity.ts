import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Category } from './category.entity';
import { WalletType } from './transaction.entity';

export enum BudgetPeriod {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
}

@Entity('budgets')
export class Budget {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: WalletType,
  })
  wallet_type: WalletType;

  @Column()
  wallet_id: number;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: BudgetPeriod,
  })
  period: BudgetPeriod;

  @Column({ type: 'date' })
  start_date: Date;

  @Column({ type: 'date' })
  end_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 