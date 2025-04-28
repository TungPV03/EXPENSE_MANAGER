import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { QueryUserDto, UpdateUserDto, UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.gaurd';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Get list of users' })
  @ApiResponse({ status: 200, description: 'Return list of users successfully.' })
  async getManyUsers(@Query() query: QueryUserDto) {
    return this.userService.getListUsers(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Return user successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserById(@Param('id') id: number) {
    return this.userService.findUserById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUserById(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.userService.updateUserById(Number(id), user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updatePassword(
    @Param('id') id: number,
    @Body('password') password: string,
  ) {
    return this.userService.updatePassword(Number(id), password);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(Number(id));
  }
}
