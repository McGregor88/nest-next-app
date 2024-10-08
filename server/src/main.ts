import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT') || 5001;

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());

    await app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));
  } catch (error) {
    console.error(error); 
  }
}
bootstrap();