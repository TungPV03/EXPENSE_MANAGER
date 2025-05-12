import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateGoalDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNumber()
  currentAmount: number;

  @ApiProperty()
  @IsNumber()
  targetAmount: number;

  @ApiProperty()
  @IsString()
  contributionType: string; // e.g., "monthly", "weekly", etc.

  @ApiProperty()
  @IsDateString()
  deadline: string; // ISO format date string (e.g., "2025-12-31")
}
