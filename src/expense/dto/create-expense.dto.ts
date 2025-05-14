import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpenseDto {
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

  @ApiProperty({ type: String, format: 'date' }) // Swagger UI hiển thị đúng định dạng ngày
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
