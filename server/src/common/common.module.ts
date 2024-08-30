import { Module } from '@nestjs/common';

import { ConfigurationModule } from "./config/configuration.module";
import { DataBaseModule } from './database/database.module';

@Module({
  imports: [
    ConfigurationModule,
    DataBaseModule
  ],
})
export class CommonModule {}