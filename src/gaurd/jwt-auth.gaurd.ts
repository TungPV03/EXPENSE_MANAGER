import {
  Injectable,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtAdminAuthGuard extends JwtAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthorized = await super.canActivate(context);
    if (!isAuthorized) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user.isAdmin) {
      throw new ForbiddenException('Access denied. Admins only.');
    }

    return true;
  }
}
