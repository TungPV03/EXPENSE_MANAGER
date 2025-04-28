import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Trích xuất token từ header
      ignoreExpiration: false, // Từ chối nếu token hết hạn
      secretOrKey: process.env.JWT_SECRET, // Phải giống với secret khi tạo token
    });
  }

  async validate(payload: any) {
    return { id: payload.sub, username: payload.username }; // Thông tin user sau khi decode JWT
  }
}
