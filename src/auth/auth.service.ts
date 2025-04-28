import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepo } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepo: UserRepo,
  ) {}

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      isAdmin: user.isAdmin,
    };

    // Generate access token và refresh token khi người dùng đăng nhập
    const { accessToken, refreshToken } = await this.generateTokens(payload);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepo.getUserByConditions({
      username,
    });

    if (
      user &&
      (await this.userRepo.validatePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async validateAdmin(username: string, password: string): Promise<any> {
    const user = await this.userRepo.getUserByConditions({
      username,
      isAdmin: true,
    });

    if (
      user &&
      (await this.userRepo.validatePassword(password, user.password))
    ) {
      return user;
    }
    return null;
  }

  async generateTokens(payload: any) {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '3600s',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      return await this.generateTokens({
        username: payload.username,
        sub: payload.id,
        isAdmin: payload.isAdmin,
      });
    } catch (error) {
      throw new UnauthorizedException(`Invalid refresh token: ${error}`);
    }
  }
}
