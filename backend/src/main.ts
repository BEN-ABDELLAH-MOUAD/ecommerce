import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Enable CORS for frontend
  app.enableCors({
    origin: 'http://localhost:3001', // Next.js frontend port
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
