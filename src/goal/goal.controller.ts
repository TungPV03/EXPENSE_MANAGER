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
  UnauthorizedException,
} from '@nestjs/common';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GoalService } from './goal.service';
import { AddToGoalDto, CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.gaurd';

@ApiTags('Goal')
@Controller('goal')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth() 
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get('overview')
  @ApiOperation({ summary: 'Get all goals overview for the authenticated user' })
  getAllGoalsOverviewByUserId(@Req() req: any) {
    if(!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.goalService.getAllGoalsOverviewByUserId(req.user.id);
  }

  @Post('add-to-goal')
  @ApiOperation({ summary: 'Add an amount money to a goal' })
  addToGoal(@Body() dto: AddToGoalDto, @Req() req: any) {
    if(!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.goalService.addToGoal(dto, req.user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new goal' })
  create(@Body() dto: CreateGoalDto, @Req() req: any) {
    if(!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    console.log('User ID:', req.user.id);
    console.log('Request Body:', dto);
    return this.goalService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all goals for the authenticated user' })
  findAll(@Req() req: any) {
    if(!req.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.goalService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a goal by ID' })
  findOne(@Param('id') id: string) {
    return this.goalService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a goal by ID' })
  update(@Param('id') id: string, @Body() dto: UpdateGoalDto) {
    return this.goalService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a goal by ID' })
  remove(@Param('id') id: string) {
    return this.goalService.remove(+id);
  }
}
