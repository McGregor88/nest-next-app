import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { AuthService } from '../auth.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => req.cookies?.Refresh,
      ]),
      secretOrKey: configService.getOrThrow<string>('JWT_SECRET_REFRESH_TOKEN'),
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: TokenPayload) {
    return this.authService.verifyUserRefreshToken(request.cookies?.Refresh, payload.userId);
  }
}