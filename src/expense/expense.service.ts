import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expense } from './entities/expense.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Category } from 'src/entities/category.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepo: Repository<Expense>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateExpenseDto, user: User) {
    const category = await this.categoryRepo.findOneBy({ id: dto.categoryId });
    if (!category) throw new NotFoundException('Category not found');

    const expense = this.expenseRepo.create({
      ...dto,
      category,
      user, // gắn user từ JWT vào
    });

    return this.expenseRepo.save(expense);
  }

  findAll(user: User) {
    return this.expenseRepo.find({
      where: { user: { id: user.id } },
      relations: ['category'],
    });
  }

  async findOne(id: number, user: User) {
    const expense = await this.expenseRepo.findOne({
      where: { id, user: { id: user.id } },
      relations: ['category'],
    });
    if (!expense) throw new NotFoundException('Expense not found');
    return expense;
  }

  async update(id: number, dto: UpdateExpenseDto, user: User) {
    const expense = await this.expenseRepo.findOne({
      where: { id, user: { id: user.id } },
      relations: ['category'],
    });
    if (!expense) throw new NotFoundException('Expense not found');

    if (dto.categoryId) {
      const category = await this.categoryRepo.findOneBy({
        id: dto.categoryId,
      });
      if (!category) throw new NotFoundException('Category not found');
      expense.category = category;
    }

    Object.assign(expense, dto);
    return this.expenseRepo.save(expense);
  }

  async remove(id: number, user: User) {
    const expense = await this.expenseRepo.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!expense) throw new NotFoundException('Expense not found');

    await this.expenseRepo.remove(expense);
    return { deleted: true };
  }
}
