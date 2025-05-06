import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { Budget } from './entities/budget.entity';
import { User } from 'src/entities/user.entity';
import { BudgetAnalyticsService } from 'src/common-services/budget-analytics.service';
import { Income } from 'src/income/entities/income.entity';
import { Expense } from 'src/expense/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, User, Income, Expense])],
  controllers: [BudgetController],
  providers: [BudgetService, BudgetAnalyticsService],
})
export class BudgetModule {}
