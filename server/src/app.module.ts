import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    CommonModule,
    UsersModule,
    AuthModule,
    TasksModule,
  ],
})
export class AppModule {}
