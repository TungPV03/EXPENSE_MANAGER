import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesService } from './expense.service';
import { ExpensesController } from './expense.controller';
import { Expense } from './entities/expense.entity';
import { Category } from 'src/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Category])],
  controllers: [ExpensesController],
  providers: [ExpensesService],
})
export class ExpensesModule {}
