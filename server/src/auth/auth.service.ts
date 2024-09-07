import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
  ) {}

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