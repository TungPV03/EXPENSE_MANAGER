import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExpensesService } from './expense.service';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.gaurd';

@ApiTags('expenses')
@Controller('expenses')
@UseGuards(JwtAuthGuard)
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense' })
  create(@Body() dto: CreateExpenseDto, @Req() req) {
    return this.expensesService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all expenses' })
  findAll(@Req() req) {
    return this.expensesService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an expense by ID' })
  findOne(@Param('id') id: string, @Req() req) {
    return this.expensesService.findOne(+id, req.user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense' })
  update(@Param('id') id: string, @Body() dto: UpdateExpenseDto, @Req() req) {
    return this.expensesService.update(+id, dto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense' })
  remove(@Param('id') id: string, @Req() req) {
    return this.expensesService.remove(+id, req.user);
  }
}