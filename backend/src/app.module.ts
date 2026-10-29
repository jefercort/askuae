import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NegociosModule } from './negocios/negocios.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FirebaseModule } from './firebase/firebase.module';
import { ServiceProvidersModule } from './service-providers/service-providers.module';
import { ServiceOfferingsModule } from './service-offerings/service-offerings.module';

@Module({
  imports: [
    NegociosModule,
    PrismaModule,
    UsersModule,
    FirebaseModule,
    ServiceProvidersModule,
    ServiceOfferingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
