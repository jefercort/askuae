import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceOfferingDto } from './dto/create-service-offering.dto';
import { UpdateServiceOfferingDto } from './dto/update-service-offering.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { ServiceProvidersService } from '../service-providers/service-providers.service';

@Injectable()
export class ServiceOfferingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly serviceProviderService: ServiceProvidersService,
  ) {}

  async createServiceOffering(
    createServiceOfferingDto: CreateServiceOfferingDto,
    providerId: string,
    firebaseUid: string,
  ) {
    // con esta funcion que importo desde serviceProvider, me apoyo para permitir la creacion del servicio ofertado
    await this.serviceProviderService.assertCanManageServiceProvider(
      providerId,
      firebaseUid,
    );
    try {
      const serviceOffered = {
        ...createServiceOfferingDto,
        providerId,
      };
      return await this.prisma.serviceOffering.create({ data: serviceOffered });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new NotFoundException('La categoría no existe');
      }
      throw error;
    }
  }

  async updateServiceOffered(
    offeringId: number,
    providerId: string,
    firebaseUid: string,
    updateServiceOfferingDto: UpdateServiceOfferingDto,
  ) {
    // aca no es suficiente comprobar si es owner del servicio o admin ya que asi cualquier usuario logeado, y con service provider puede modificar el serviceOffering de otros usuarios (negocios) porque el update lo modifica por mediod del offeringId
    await this.serviceProviderService.assertCanManageServiceProvider(
      providerId,
      firebaseUid,
    );
    try {
      // tengo la opcion de primero buscar si le offeringId le pertenece al usuario y luego actualizar, pero eso implica una query mas asi que utilizo el filtro extra que me permite ingresar prisma en "where" para que solo se haga una consulta. Esto sirve a partir de Prisma -v5
      return await this.prisma.serviceOffering.update({
        where: {
          id: offeringId,
          // aca ingrese el filtro para saber si pertenece al service provider
          providerId,
        },
        data: updateServiceOfferingDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new NotFoundException('La categoria no existe');
      }
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        // La oferta no existe dentro de este negocio
        throw new NotFoundException('El servicio no existe en éste negocio');
      }
      throw error;
    }
  }

  async removeServiceOffered(
    offeringId: number,
    providerId: string,
    firebaseUid: string,
  ) {
    await this.serviceProviderService.assertCanManageServiceProvider(
      providerId,
      firebaseUid,
    );
    try {
      return await this.prisma.serviceOffering.delete({
        where: {
          id: offeringId,
          // aca ingrese el filtro para saber si pertenece al service provider para eliminar el servicio ofertado
          providerId,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('El servicio no existe en este negocio');
      }
      throw error;
    }
  }
}
