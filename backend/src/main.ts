import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  
  app.setGlobalPrefix('api');

  await app.listen(3000);
  Logger.log(' Application is running on: http://localhost:3000', 'Bootstrap');
}
bootstrap();
