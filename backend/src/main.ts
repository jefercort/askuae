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
  // Este es para habilitar las cors ya que si hay un puerto diferente tanto en front como en back entonces apareceria una
  // restriccion de acceso por medio de cors
  app.enableCors({
    // aca estoy determinando mi whitelist, tambien puede ser un dominio de pagina que pueda consumir la API desde el frontend
    origin: [process.env.FRONTEND_URL],
    // aca los metodos HTTP que el frontend puede usar 'GET,HEAD,PUT,PATCH,POST,DELETE'
    methods: 'GET,PATCH,POST,DELETE',
  });

  await app.listen(process.env.BACKEND_PORT ?? 3000);
}
bootstrap();
