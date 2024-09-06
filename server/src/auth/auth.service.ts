import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { Response } from 'express';

import { UsersService } from 'src/users/users.service';
import { User } from'src/users/schemas/user.schema';
import { TokenPayload } from './interfaces/token-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User, res: Response) {
    const expiresAccessToken = new Date();
    expiresAccessToken.setMilliseconds(
      expiresAccessToken.getTime() + parseInt(this.configService.getOrThrow<string>('JWT_EXPIRATION_ACCESS_TOKEN_MS'))
    );

    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };
    const accessToken = await this.jwtService.sign(tokenPayload, { 
      secret: this.configService.getOrThrow<string>('JWT_SECRET_ACCESS_TOKEN'), 
      expiresIn: `${this.configService.getOrThrow<string>('JWT_EXPIRATION_ACCESS_TOKEN_MS')}ms`,
    });

    res.cookie('Authentication', accessToken, { 
      httpOnly: true,
      secure: this.configService.getOrThrow<string>('NODE_ENV') === 'production',
      expires: expiresAccessToken,
    });
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
}