import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ServiceProvidersService {
  constructor(private readonly prisma: PrismaService) {}

  async createServiceProvider(
    createServiceProviderDto: CreateServiceProviderDto,
    uid: string,
  ) {
    try {
      return await this.prisma.serviceProvider.create({
        data: {
          ...createServiceProviderDto,
          user: {
            // aca utilizo connect para asociar en una sola consulta el firebaseUid con el uid del usuario actual que lo está creando
            connect: {
              firebaseUid: uid,
            },
          },
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('El usuario no existe');
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all serviceProviders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceProvider`;
  }

  update(id: number, updateServiceProviderDto: UpdateServiceProviderDto) {
    return `This action updates a #${id} serviceProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceProvider`;
  }
}
