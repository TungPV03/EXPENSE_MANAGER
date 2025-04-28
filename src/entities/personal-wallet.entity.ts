import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('personal_wallets')
export class PersonalWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'varchar', length: 10, default: 'VND' })
  currency: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 