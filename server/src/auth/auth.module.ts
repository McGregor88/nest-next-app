import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LoginService } from './login/login.service';

import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    UsersModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    LoginService, 
    LocalStrategy, 
    JwtStrategy, 
    JwtRefreshStrategy
  ]
})
export class AuthModule {}
