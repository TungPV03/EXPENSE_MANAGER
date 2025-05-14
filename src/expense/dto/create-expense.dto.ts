import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
  @ApiProperty() //{ type: String, format: 'date' }
  @IsNotEmpty()
  @IsString()
  date: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ description: 'ID of the category' })
  @IsNumber()
  categoryId: number;
}
