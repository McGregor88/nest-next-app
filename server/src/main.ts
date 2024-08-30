import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const PORT = configService.get('PORT') || 5001;

    app.enableCors();
    await app.listen(PORT, () => console.log(`server started on PORT: ${PORT}`));
  } catch (error) {
    console.error(error); 
  }
}
bootstrap();