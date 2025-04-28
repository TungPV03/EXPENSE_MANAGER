import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ type: 'varchar', length: 50, nullable: true })
  icon: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  color: string;

  @CreateDateColumn()
  created_at: Date;
} 