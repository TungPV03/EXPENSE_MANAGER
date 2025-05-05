import { User } from 'src/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('goals')
export class Goal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'float', default: 0 })
  currentAmount: number;

  @Column({ type: 'float' })
  targetAmount: number;

  @Column({ type: 'varchar', length: 50 })
  contributionType: string; // e.g., "monthly", "weekly"

  @Column({ type: 'date' })
  deadline: Date;
}
