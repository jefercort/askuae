import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

// Aca estoy aplicando el DRY rule (Don't Repeat Yourself) y lo hago para que se mantenga la decision en este solo lugar, ya que se usa en varias funciones y tambien evito que se tengan que crear dos objetos diferentes al llamar serviceOfferings
// aca utilizo satisfies para que revise que el objeto sea un include valido y conserva el tipo exacto que impuse
const publicServiceProviderInclude = {
  serviceOfferings: {
    select: {
      id: true,
      title: true,
      category: {
        select: {
          name: true,
        },
      },
      price: true,
      description: true,
    },
  },
} satisfies Prisma.ServiceProviderInclude;

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

  async findAllServiceProviders() {
    const result = await this.prisma.serviceProvider.findMany({
      orderBy: {
        rating: {
          sort: 'desc',
          nulls: 'last',
        },
      },
      include: publicServiceProviderInclude,
    });
    return result;
  }

  async findServiceProviderById(id: string) {
    const foundServProv = await this.prisma.serviceProvider.findUnique({
      where: {
        id: id,
      },
      include: publicServiceProviderInclude,
    });
    if (!foundServProv) {
      throw new NotFoundException('El proveedor de servicio no existe');
    }
    return foundServProv;
  }

  update(id: number, updateServiceProviderDto: UpdateServiceProviderDto) {
    return `This action updates a #${id} serviceProvider`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceProvider`;
  }
}
