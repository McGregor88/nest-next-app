import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'bcryptjs';
import { Response } from 'express';

import { UsersService } from '../../users/users.service';
import { User } from'../../users/schemas/user.schema';
import { TokenPayload } from '../interfaces/token-payload.interface';


@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, res: Response, redirect = false) {
    const JWT_SECRET_ACCESS_TOKEN = this.configService.getOrThrow<string>('JWT_SECRET_ACCESS_TOKEN');
    const JWT_SECRET_REFRESH_TOKEN = this.configService.getOrThrow<string>('JWT_SECRET_REFRESH_TOKEN');
    const JWT_EXPIRATION_ACCESS_TOKEN_MS = this.configService.getOrThrow<string>('JWT_EXPIRATION_ACCESS_TOKEN_MS');
    const JWT_EXPIRATION_REFRESH_TOKEN_MS = this.configService.getOrThrow<string>('JWT_EXPIRATION_REFRESH_TOKEN_MS');
  
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const cookieDefaultConfig: object = {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
    };

    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(expiresAccessToken.getTime() + parseInt(JWT_EXPIRATION_ACCESS_TOKEN_MS));

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(expiresRefreshToken.getTime() + parseInt(JWT_EXPIRATION_REFRESH_TOKEN_MS));

    const accessToken = await this.jwtService.sign(tokenPayload, { 
      secret: JWT_SECRET_ACCESS_TOKEN, 
      expiresIn: `${JWT_EXPIRATION_ACCESS_TOKEN_MS}ms`,
    });

    const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: JWT_SECRET_REFRESH_TOKEN,
      expiresIn: `${JWT_EXPIRATION_REFRESH_TOKEN_MS}ms`,
    });

    res.cookie('Authentication', accessToken, {
      ...cookieDefaultConfig, 
      expires: expiresAccessToken,
    });

    res.cookie('Refresh', refreshToken, {
      ...cookieDefaultConfig,  
      expires: expiresRefreshToken,
    });

    await this.usersService.update(
      { _id: user._id },
      { $set: { refreshToken: await hash(refreshToken, 10) } }
    );

    if (redirect) {
      res.redirect(this.configService.getOrThrow('AUTH_UI_REDIRECT'));
    }
  }
}