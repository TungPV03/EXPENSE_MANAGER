// src/incomes/incomes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { User } from 'src/entities/user.entity';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepo: Repository<Income>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateIncomeDto, user: User) {
    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    if (!category) throw new NotFoundException('Category not found');
    const income = this.incomeRepo.create({
      ...dto,
      category,
      user,
    });
    return this.incomeRepo.save(income);
  }

  findAll(user: User) {
    return this.incomeRepo.find({
      where: { user: { id: user.id } },
    });
  }

  async findOne(id: number, user: User) {
    const income = await this.incomeRepo.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!income) throw new NotFoundException('Income not found');
    return income;
  }

  async update(id: number, dto: UpdateIncomeDto, user: User) {
    const income = await this.incomeRepo.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!income) throw new NotFoundException('Income not found');

    Object.assign(income, dto);
    return this.incomeRepo.save(income);
  }

  async remove(id: number, user: User) {
    const income = await this.incomeRepo.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!income) throw new NotFoundException('Income not found');

    await this.incomeRepo.remove(income);
    return { deleted: true };
  }
}
