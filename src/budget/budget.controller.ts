import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.gaurd';
import { BudgetAnalyticsService } from 'src/common-services/budget-analytics.service';

@ApiTags('budgets')
@UseGuards(JwtAuthGuard)
@Controller('budgets')
@ApiBearerAuth()
export class BudgetController {
  constructor(
    private readonly budgetService: BudgetService,
    private readonly budgetAnalyticsService: BudgetAnalyticsService,
  ) {}

  @Get('overview')
  findBudgetOverview(
    @Req() req,
    @Query('month', ParseIntPipe) month?: number,
    @Query('year', ParseIntPipe) year?: number,
  ) {
    return this.budgetAnalyticsService.getBudgetOverview(req.user.id, month, year);
  }

  @Post()
  create(@Body() dto: CreateBudgetDto, @Req() req) {
    return this.budgetService.create(dto, req.user);
  }

  @Get()
  findAll(@Req() req) {
    return this.budgetService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.budgetService.findOne(+id, req.user);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBudgetDto, @Req() req) {
    return this.budgetService.update(+id, dto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.budgetService.remove(+id, req.user);
  }
}
