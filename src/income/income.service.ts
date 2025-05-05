// src/incomes/incomes.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Income } from './entities/income.entity';
import { Repository } from 'typeorm';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';

@Injectable()
export class IncomeService {
  constructor(
    @InjectRepository(Income)
    private incomeRepo: Repository<Income>,
  ) {}

  create(createIncomeDto: CreateIncomeDto) {
    const income = this.incomeRepo.create(createIncomeDto);
    return this.incomeRepo.save(income);
  }

  findAll() {
    return this.incomeRepo.find();
  }

  findOne(id: number) {
    return this.incomeRepo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateIncomeDto) {
    const income = await this.incomeRepo.preload({
      id,
      ...dto,
    });
    if (!income) throw new NotFoundException('Income not found');
    return this.incomeRepo.save(income);
  }

  remove(id: number) {
    return this.incomeRepo.delete(id);
  }
}
