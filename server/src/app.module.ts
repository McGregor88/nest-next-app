import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    CommonModule,
    TasksModule,
    //CatsModule,
    //UsersModule
  ],
})
export class AppModule {}
