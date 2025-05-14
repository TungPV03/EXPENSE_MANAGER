import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Goal } from './entities/goal.entity';
import { AddToGoalDto, CreateGoalDto } from './dto/create-goal.dto';
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

  async create(createGoalDTO: CreateGoalDto, userId: number): Promise<Goal> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const goal = this.goalRepository.create({
      ...createGoalDTO,
      user,
    });
    return this.goalRepository.save(goal);
  }

  findAll(userId: number): Promise<Goal[]> {
    return this.goalRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
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

  async getAllGoalsOverviewByUserId(userId: number): Promise<any> {
    const goals = await this.goalRepository.find({
      where: {
        user: { id: userId },
      },
      relations: ['user'],
    });

    const totalGoals = goals.reduce(
      (acc, goal) => acc + goal.targetAmount,
      0,
    );
    const totalCurrentAmount = goals.reduce(
      (acc, goal) => acc + goal.currentAmount,
      0,
    );
    const totalRemainingAmount = totalGoals - totalCurrentAmount;

    return {
      totalGoals,
      totalCurrentAmount,
      totalRemainingAmount,
    }
  }

  async addToGoal(dto: AddToGoalDto, userId: number): Promise<Goal> {
    const goal = await this.goalRepository.findOne({
      where: { id: Number(dto.goalId), user: { id: userId } },
    });
    if (!goal) throw new NotFoundException('Goal not found');

    goal.currentAmount += dto.amount;
    return this.goalRepository.save(goal);
  }
}
