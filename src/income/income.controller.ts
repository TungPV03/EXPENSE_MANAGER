// src/incomes/incomes.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { IncomeService } from './income.service';
import { CreateIncomeDto } from './dto/create-income.dto';
import { UpdateIncomeDto } from './dto/update-income.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.gaurd';

@ApiTags('Income')
@Controller('income')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class IncomeController {
  constructor(private readonly incomesService: IncomeService) {}

  @Post()
  @ApiOperation({ summary: 'Create income' })
  create(@Body() dto: CreateIncomeDto, @Req() req: any) {
    return this.incomesService.create(dto, req.user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all incomes' })
  findAll(@Req() req: any) {
    return this.incomesService.findAll(req.user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get income by ID' })
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.incomesService.findOne(+id, req.user);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update income by ID' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateIncomeDto,
    @Req() req: any,
  ) {
    return this.incomesService.update(+id, dto, req.user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete income by ID' })
  remove(@Param('id') id: string, @Req() req: any) {
    return this.incomesService.remove(+id, req.user);
  }
}
