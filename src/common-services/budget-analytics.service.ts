import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/budget/entities/budget.entity';
import { Expense } from 'src/expense/entities/expense.entity';
import { Income } from 'src/income/entities/income.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetAnalyticsService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepo: Repository<Budget>,
    @InjectRepository(Income)
    private incomeRepo: Repository<Income>,
    @InjectRepository(Expense)
    private expenseRepo: Repository<Expense>,
  ) {}

  async getTotalBudget(
    userId: number,
    month: number,
    year: number,
  ): Promise<number> {
    const budget = await this.budgetRepo.findOne({
      where: { user: { id: userId }, month, year },
    });
    return budget?.amount || 0;
  }

  async getTotalIncome(
    userId: number,
    month: number,
    year: number,
  ): Promise<number> {
    const result = await this.incomeRepo
      .createQueryBuilder('income')
      .select('SUM(income.amount)', 'sum')
      .where('income.user_id = :userId', { userId })
      .andWhere('MONTH(income.date) = :month AND YEAR(income.date) = :year', {
        month,
        year,
      })
      .getRawOne();

    return Number(result.sum) || 0;
  }

  async getTotalExpense(
    userId: number,
    month: number,
    year: number,
  ): Promise<number> {
    const result = await this.expenseRepo
      .createQueryBuilder('expense')
      .select('SUM(expense.amount)', 'sum')
      .where('expense.user_id = :userId', { userId })
      .andWhere('MONTH(expense.date) = :month AND YEAR(expense.date) = :year', {
        month,
        year,
      })
      .getRawOne();

    return Number(result.sum) || 0;
  }

  async getBudgetOverview(userId: number, month: number, year: number) {
    const [budgetAmount, totalIncome, totalExpense] = await Promise.all([
      this.getTotalBudget(userId, month, year),
      this.getTotalIncome(userId, month, year),
      this.getTotalExpense(userId, month, year),
    ]);

    return {
      budgetedAmount: budgetAmount,
      totalIncome,
      totalExpense,
      currentAmount: budgetAmount + totalIncome - totalExpense,
    };
  }
}
