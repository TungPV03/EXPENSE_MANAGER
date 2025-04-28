import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { GroupWallet } from './group-wallet.entity';

export enum GroupWalletRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

@Entity('group_wallet_members')
export class GroupWalletMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => GroupWallet, groupWallet => groupWallet.members)
  @JoinColumn({ name: 'group_wallet_id' })
  groupWallet: GroupWallet;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: GroupWalletRole,
    default: GroupWalletRole.MEMBER,
  })
  role: GroupWalletRole;

  @CreateDateColumn()
  created_at: Date;
} 