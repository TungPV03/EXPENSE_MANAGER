import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesController } from './expense.controller';
import { ExpensesService } from './expense.service';

describe('ExpenseController', () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpensesController],
      providers: [ExpensesService],
    }).compile();

    controller = module.get<ExpensesController>(ExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
