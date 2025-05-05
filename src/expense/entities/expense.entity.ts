import { Category } from 'src/entities/category.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
  } from 'typeorm';

  
  @Entity('expenses')
  export class Expense {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    date: Date;
  
    @Column({ type: 'varchar', length: 100 })
    title: string;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;
  
    @ManyToOne(() => Category, { eager: true, nullable: false })
    @JoinColumn({ name: 'category_id' })
    category: Category;
  }