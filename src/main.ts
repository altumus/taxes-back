import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const BASE_URL = process.env.DEV_URL;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
