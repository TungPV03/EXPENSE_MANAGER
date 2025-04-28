import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Category, TransactionType } from './category.entity';

export enum WalletType {
  PERSONAL = 'PERSONAL',
  GROUP = 'GROUP',
}

@Entity('transactions')
export class Transaction {
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
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  transaction_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 