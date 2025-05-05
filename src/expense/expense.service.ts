import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepo: Repository<Expense>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateExpenseDto) {
    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    if (!category) throw new NotFoundException('Category not found');

    const expense = this.expenseRepo.create({
      ...dto,
      category,
    });
    return this.expenseRepo.save(expense);
  }

  findAll() {
    return this.expenseRepo.find(); // includes eager-loaded category
  }

  findOne(id: number) {
    return this.expenseRepo.findOneBy({ id });
  }

  async update(id: number, dto: UpdateExpenseDto) {
    const expense = await this.expenseRepo.findOneBy({ id });
    if (!expense) throw new NotFoundException('Expense not found');

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
      if (!category) throw new NotFoundException('Category not found');
      expense.category = category;
    }

    Object.assign(expense, dto);
    return this.expenseRepo.save(expense);
  }

  async remove(id: number) {
    const res = await this.expenseRepo.delete(id);
    if (!res.affected) throw new NotFoundException('Expense not found');
    return { deleted: true };
  }
}