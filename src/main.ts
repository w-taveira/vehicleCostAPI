import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove campos extras
      forbidNonWhitelisted: true, // erro se mandar campo a mais
      transform: true, // transforma string em number
      stopAtFirstError: true, //para no primeiro erro
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
