import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Income } from '../income/entities/income.entity';
import { Expense } from '../expense/entities/expense.entity';
import { Budget } from '../budget/entities/budget.entity';

@Injectable()
export class BudgetAnalyticsService {
  constructor(
    @InjectRepository(Income)
    private incomeRepository: Repository<Income>,
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async getBudgetOverview(
    userId: number,
    month?: number,
    year?: number,
  ): Promise<any> {
    // Truy vấn budgets
    const budgetQuery = this.budgetRepository
      .createQueryBuilder('budget')
      .leftJoinAndSelect('budget.user', 'user')
      .where('budget.userId = :userId', { userId });

    if (month && year) {
      budgetQuery
        .andWhere('budget.month = :month', { month })
        .andWhere('budget.year = :year', { year });
    }

    const budgets = await budgetQuery.getMany();
    const budgetedAmount = budgets.reduce(
      (sum, budget) => sum + budget.amount,
      0,
    );

    // Truy vấn incomes
    const incomeQuery = this.incomeRepository
      .createQueryBuilder('income')
      .leftJoinAndSelect('income.user', 'user')
      .where('income.userId = :userId', { userId });

    // Truy vấn expenses
    const expenseQuery = this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.user', 'user')
      .where('expense.userId = :userId', { userId });

    if (month && year) {
      incomeQuery
        .andWhere('MONTH(income.date) = :month', { month })
        .andWhere('YEAR(income.date) = :year', { year });
      expenseQuery
        .andWhere('MONTH(expense.date) = :month', { month })
        .andWhere('YEAR(expense.date) = :year', { year });
    }

    const incomes = await incomeQuery.getMany();
    const expenses = await expenseQuery.getMany();

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );
    const currentAmount = budgetedAmount + totalIncome - totalExpense;

    return {
      budgetedAmount,
      totalIncome,
      totalExpense,
      currentAmount,
      budgets, // Thêm danh sách budgets vào response
    };
  }

  async getBudgetOverviewByRange(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    if (startDate > endDate) {
      throw new BadRequestException('startDate must be before endDate');
    }

    // Truy vấn budgets
    const budgetQuery = this.budgetRepository
      .createQueryBuilder('budget')
      .leftJoinAndSelect('budget.user', 'user')
      .where('budget.userId = :userId', { userId });

    const budgets = await budgetQuery.getMany();
    const filteredBudgets = budgets.filter((budget) => {
      const budgetDate = new Date(budget.year, budget.month - 1, 1);
      return budgetDate >= startDate && budgetDate <= endDate;
    });
    const budgetedAmount = filteredBudgets.reduce(
      (sum, budget) => sum + budget.amount,
      0,
    );

    // Truy vấn incomes
    const incomeQuery = this.incomeRepository
      .createQueryBuilder('income')
      .leftJoinAndSelect('income.user', 'user')
      .where('income.userId = :userId', { userId })
      .andWhere('income.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    // Truy vấn expenses
    const expenseQuery = this.expenseRepository
      .createQueryBuilder('expense')
      .leftJoinAndSelect('expense.user', 'user')
      .where('expense.userId = :userId', { userId })
      .andWhere('expense.date BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      });

    const incomes = await incomeQuery.getMany();
    const expenses = await expenseQuery.getMany();

    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const totalExpense = expenses.reduce(
      (sum, expense) => sum + Number(expense.amount),
      0,
    );
    const currentAmount = budgetedAmount + totalIncome - totalExpense;

    return {
      budgetedAmount,
      totalIncome,
      totalExpense,
      currentAmount,
      budgets: filteredBudgets, // Thêm danh sách budgets vào response
    };
  }

  async getLastestEntries(
    userId: number,
    month?: number,
    year?: number,
  ): Promise<any> {
    // Logic lấy entries gần nhất
    return [];
  }
}
