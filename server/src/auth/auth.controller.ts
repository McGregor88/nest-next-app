import { Controller, Post, UseGuards, Res } from '@nestjs/common';
import { Response } from 'express';

import { LoginService } from './login/login.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService
  ) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ) {
      this.loginService.login(user, res);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  refreshToken(
    @CurrentUser() user: User, 
    @Res({ passthrough: true }) res: Response
  ) {
    this.loginService.login(user, res);
  }
}