// src/budgets/budget.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from 'src/entities/user.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const user = await this.userRepository.findOne({
      where: { id: createBudgetDto.userId },
    });
    if (!user) throw new NotFoundException('User not found');

    const budget = this.budgetRepository.create({
      ...createBudgetDto,
      user,
    });
    return this.budgetRepository.save(budget);
  }

  findAll(): Promise<Budget[]> {
    return this.budgetRepository.find();
  }

  findOne(id: number): Promise<Budget> {
    return this.budgetRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({ where: { id } });
    if (!budget) throw new NotFoundException('Budget not found');

    const updated = Object.assign(budget, dto);
    return this.budgetRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    await this.budgetRepository.delete(id);
  }
}
