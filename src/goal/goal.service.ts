import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createGoalDTO: CreateGoalDto): Promise<Goal> {
    const user = await this.userRepository.findOne({
      where: { id: createGoalDTO.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const goal = this.goalRepository.create({
      ...createGoalDTO,
      user,
    });
    return this.goalRepository.save(goal);
  }

  findAll(): Promise<Goal[]> {
    return this.goalRepository.find();
  }

  findOne(id: number): Promise<Goal> {
    return this.goalRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateGoalDto): Promise<Goal> {
    const goal = await this.goalRepository.findOne({ where: { id } });
    if (!goal) throw new NotFoundException('Goal not found');

    const updated = Object.assign(goal, dto);
    return this.goalRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.goalRepository.delete(id);
  }
}
