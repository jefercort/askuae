// Carga las variables del .env (DATABASE_URL, PORT...) antes que cualquier otro módulo
import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Esta herramienta me permite agregar la validacion estricta en todo éste backend
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //va a borrar los campos que no se tienen en cuenta en el dto
      forbidNonWhitelisted: true, // devuelve un 400 y me avisa que campos fueron rechazados
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
