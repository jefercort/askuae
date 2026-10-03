import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NegociosModule } from './negocios/negocios.module';

@Module({
  imports: [NegociosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
