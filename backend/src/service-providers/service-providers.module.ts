import { Module } from '@nestjs/common';
import { ServiceProvidersService } from './service-providers.service';
import { ServiceProvidersController } from './service-providers.controller';
import { FirebaseModule } from '../firebase/firebase.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, FirebaseModule],
  controllers: [ServiceProvidersController],
  providers: [ServiceProvidersService],
  exports: [ServiceProvidersService],
})
export class ServiceProvidersModule {}
