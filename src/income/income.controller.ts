// src/incomes/incomes.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Income')
@Controller('income')
export class IncomeController {
  constructor(private readonly incomesService: IncomeService) {}

  @Post()
  @ApiOperation({ summary: 'Create income' })
  create(@Body() dto: CreateIncomeDto) {
    return this.incomesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all incomes' })
  findAll() {
    return this.incomesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get income by ID' })
  findOne(@Param('id') id: string) {
    return this.incomesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update income by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateIncomeDto) {
    return this.incomesService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete income by ID' })
  remove(@Param('id') id: string) {
    return this.incomesService.remove(+id);
  }
}