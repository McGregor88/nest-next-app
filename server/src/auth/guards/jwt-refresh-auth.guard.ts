import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh') {
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(ctx);
  }
}