import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { Response } from 'express';

import { UsersService } from '../users/users.service';
import { User } from'../users/schemas/user.schema';
import { TokenPayload } from './interfaces/token-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, res: Response, redirect = false) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() + parseInt(this.configService.getOrThrow<string>('JWT_EXPIRATION_ACCESS_TOKEN_MS'))
    );

    const expiresRefreshToken = new Date();
    expiresRefreshToken.setMilliseconds(
      expiresRefreshToken.getTime() + parseInt(this.configService.getOrThrow<string>('JWT_EXPIRATION_REFRESH_TOKEN_MS'))
    );

    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const accessToken = await this.jwtService.sign(tokenPayload, { 
      secret: this.configService.getOrThrow('JWT_SECRET_ACCESS_TOKEN'), 
      expiresIn: `${this.configService.getOrThrow('JWT_EXPIRATION_ACCESS_TOKEN_MS')}ms`,
    });
  
    console.log('JWT_SECRET_REFRESH_TOKEN:', this.configService.getOrThrow<string>('JWT_SECRET_ACCESS_TOKEN'));

   const refreshToken = this.jwtService.sign(tokenPayload, {
      secret: this.configService.getOrThrow('JWT_SECRET_REFRESH_TOKEN'),
      expiresIn: `${this.configService.getOrThrow('JWT_EXPIRATION_REFRESH_TOKEN_MS')}ms`,
    });

    console.log('JWT_SECRET_REFRESH_TOKEN:', this.configService.getOrThrow<string>('JWT_SECRET_REFRESH_TOKEN'));

    res.cookie('Authentication', accessToken, { 
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });

    res.cookie('Refresh', refreshToken, { 
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
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

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.findOne({ email });
      const authenticated = await compare(password, user.password);

      if (!authenticated) {
        throw new UnauthorizedException();
      }
      
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async verifyUserRefreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.usersService.findOne({ _id: userId });
      const authenticated = await compare(refreshToken, user.refreshToken);

      if (!authenticated) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }
}