import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(ctx);
  }
}