// src/budgets/budget.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { User } from 'src/entities/user.entity';
import { BadRequestException } from '@nestjs/common';


@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreateBudgetDto, user: User): Promise<Budget> {
    // Kiểm tra budget đã tồn tại cho tháng/năm này chưa
    const existed = await this.budgetRepository.findOne({
      where: { user: { id: user.id }, month: dto.month, year: dto.year },
    });
    if (existed) {
      throw new BadRequestException('A budget for this month already exists!');
    }
    const budget = this.budgetRepository.create({
      ...dto,
      user,
    });
    return this.budgetRepository.save(budget);
  }

  findAll(user: User): Promise<Budget[]> {
    return this.budgetRepository.find({
      where: { user: { id: user.id } },
      order: { year: 'DESC', month: 'DESC' },
    });
  }

  async findOne(id: number, user: User): Promise<Budget> {
    const budget = await this.budgetRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async update(id: number, dto: UpdateBudgetDto, user: User): Promise<Budget> {
    const budget = await this.findOne(id, user);
    const updated = this.budgetRepository.merge(budget, dto);
    return this.budgetRepository.save(updated);
  }

  async remove(id: number, user: User): Promise<void> {
    const budget = await this.findOne(id, user);
    await this.budgetRepository.remove(budget);
  }
}
