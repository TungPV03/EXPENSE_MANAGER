// create-income.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIncomeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  date: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ type: String, format: 'date' }) // Swagger UI hiển thị đúng định dạng ngày
  @IsNotEmpty()
  @IsDateString()
  date: Date;
}
