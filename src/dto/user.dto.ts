import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsIn, Min, IsString, IsEmail, IsBoolean } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'Full name of the user', example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ description: 'Email address', example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User password', example: 'password123' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Admin status', example: false })
  @IsBoolean()
  isAdmin: boolean;

  @ApiProperty({ description: 'Username', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Avatar URL', required: false, example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: 'Phone number', example: '+1234567890' })
  @IsString()
  phone: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'Full name of the user', required: false, example: 'John Doe' })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({ description: 'Email address', required: false, example: 'john@example.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ description: 'Admin status', required: false, example: false })
  @IsBoolean()
  @IsOptional()
  isAdmin?: boolean;

  @ApiProperty({ description: 'Username', required: false, example: 'johndoe' })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({ description: 'Avatar URL', required: false, example: 'https://example.com/avatar.jpg' })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ description: 'Phone number', required: false, example: '+1234567890' })
  @IsString()
  @IsOptional()
  phone?: string;
}

export class LoginDto {
  @ApiProperty({ description: 'Username', example: 'johndoe' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password', example: 'password123' })
  @IsString()
  password: string;
}

export class QueryUserDto {
  @ApiProperty({ description: 'Number of records to skip', required: false, default: 0, minimum: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number = 0;

  @ApiProperty({ description: 'Number of records to take', required: false, default: 10, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiProperty({ description: 'Sort order', required: false, default: 'ASC', enum: ['ASC', 'DESC'] })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'ASC';
}
