import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for development
  await app.listen(3000, '0.0.0.0');
  console.log(`NestJS Backend is running on port 3000`);
}
bootstrap().catch((err) => {
  console.error(err);
});
