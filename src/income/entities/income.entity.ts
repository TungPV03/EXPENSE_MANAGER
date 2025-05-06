// src/incomes/entities/income.entity.ts
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
  } from 'typeorm';
  
  @Entity('incomes')
  export class Income {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    date: Date;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'float' })
    amount: number;

    @ManyToOne(() => User, { eager: true, nullable: false })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Category, { eager: true, nullable: false })
    @JoinColumn({ name: 'category_id' })
    category: Category;
  }