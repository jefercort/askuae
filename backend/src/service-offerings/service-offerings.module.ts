import { Module } from '@nestjs/common';
import { ServiceOfferingsService } from './service-offerings.service';
import { ServiceOfferingsController } from './service-offerings.controller';
import { ServiceProvidersModule } from '../service-providers/service-providers.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [ServiceProvidersModule, PrismaModule, FirebaseModule],
  controllers: [ServiceOfferingsController],
  providers: [ServiceOfferingsService],
})
export class ServiceOfferingsModule {}
