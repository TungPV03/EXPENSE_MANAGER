import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { GroupWalletMember } from './group-wallet-member.entity';

@Entity('group_wallets')
export class GroupWallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'varchar', length: 10, default: 'VND' })
  currency: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => GroupWalletMember, member => member.groupWallet)
  members: GroupWalletMember[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
} 