import { Controller, Post, Body, Request, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/gaurd/jwt-auth.gaurd';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, UserDto } from 'src/dto/user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 201,
    description: 'User login successfully',
  })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      return { message: 'Invalid username or password' };
    }
    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({
    status: 201,
    description: 'User register successfully',
  })
  @ApiBody({ type: UserDto })
  @Post('register')
  register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiResponse({
    status: 201,
    description: 'Refresh token successfully',
  })
  @Post('refresh')
  async refreshToken(@Body('refreshToken') refreshToken) {
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('protected')
  getProtectedResource(@Request() req) {
    return { message: 'This is a protected resource', user: req.user };
  }
}
