import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  // aca utilizo exports para que el los servicios de prisma puedan ser usados donde se requieran
  exports: [PrismaService],
})
export class PrismaModule {}
