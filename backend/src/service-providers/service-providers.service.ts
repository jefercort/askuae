import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateServiceProviderDto } from './dto/create-service-provider.dto';
import { UpdateServiceProviderDto } from './dto/update-service-provider.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';

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

  private async assertCanManageServiceProvider(
    serviceProviderId: string,
    firebaseUid: string,
  ) {
    const whoIam = await this.prisma.user.findUnique({
      where: {
        firebaseUid: firebaseUid,
      },
      select: {
        id: true,
        role: true,
      },
    });
    if (!whoIam) {
      throw new ForbiddenException('No existe el perfil de usuario'); //403
    }

    const servProvider = await this.prisma.serviceProvider.findUnique({
      where: {
        id: serviceProviderId,
      },
      select: {
        userId: true,
      },
    });
    if (!servProvider) {
      throw new NotFoundException('El proveedor de servicio no existe'); //404
    }

    const isOwner = servProvider.userId === whoIam.id;
    const isAdmin = whoIam.role === Role.ADMIN;

    if (!isOwner && !isAdmin) {
      throw new ForbiddenException('No se puede modificar el proveedor');
    }
  }

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

  async updateServiceProvider(
    id: string,
    firebaseUid: string,
    updateServiceProviderDto: UpdateServiceProviderDto,
  ) {
    await this.assertCanManageServiceProvider(id, firebaseUid);
    return await this.prisma.serviceProvider.update({
      data: updateServiceProviderDto,
      where: {
        id: id,
      },
      include: publicServiceProviderInclude,
    });
  }
}
