import { Test, TestingModule } from '@nestjs/testing';
import { ServiceProvidersService } from './service-providers.service';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Role } from '@prisma/client';

describe('ServiceProvidersService', () => {
  let service: ServiceProvidersService;
  // Esto tiene que ser el doble del objeto real
  const prismaMock = {
    // jest.fn() es la funcion falsa y controlable
    user: { findUnique: jest.fn() },
    serviceProvider: { findUnique: jest.fn() },
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // cada test arranca con los mocks limpios
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceProvidersService,
        { provide: PrismaService, useValue: prismaMock }, //aca se genera la sustitucion, la injection de dependencias
      ],
    }).compile();
    service = module.get(ServiceProvidersService);
  });
  // Acá existe la estructura de test de las tres A (AAA) Arrange / Act / Assert
  // Preparar el escenario - Arrange
  // Ejecuta la funcion - Act
  // Verifico el resultado - Assert
  describe('assertCanManageServiceProvider', () => {
    it('lanza 403 si el perfil de usuario no existe', async () => {
      // Arrange
      prismaMock.user.findUnique.mockResolvedValue(null);

      // Act + Assert
      await expect(
        service.assertCanManageServiceProvider('provider-1', 'firebase-uid-1'),
        // ForbiddenException es el valor esperado asi que perfecto
      ).rejects.toThrow(ForbiddenException);
    });

    it('lanza 404 si el proveedor de servicio no existe', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'u1',
        role: Role.USER,
      });
      prismaMock.serviceProvider.findUnique.mockResolvedValue(null);

      await expect(
        service.assertCanManageServiceProvider('provider-1', 'firebase-uid-1'),
      ).rejects.toThrow(NotFoundException);
    });

    it('lanza 403 si no es owner ni admin', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'u1',
        role: Role.USER,
      });
      prismaMock.serviceProvider.findUnique.mockResolvedValue({
        userId: 'u2',
      });

      await expect(
        service.assertCanManageServiceProvider('provider-2', 'firebase-uid-1'),
      ).rejects.toThrow(ForbiddenException);
    });

    it('permite al owner con role USER', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'u1',
        role: Role.USER,
      });
      prismaMock.serviceProvider.findUnique.mockResolvedValue({
        userId: 'u1',
      });

      await expect(
        service.assertCanManageServiceProvider('provider-1', 'firebase-uid-1'),
        // cuando mi helper no retorna nada cuando todo va bien, asi que pasar significa resolver con undefined sin lanzar nada
      ).resolves.toBeUndefined();
    });

    it('permite al ADMIN aunque no sea dueño', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'u1',
        role: Role.ADMIN,
      });
      prismaMock.serviceProvider.findUnique.mockResolvedValue({
        userId: 'u2',
      });

      await expect(
        service.assertCanManageServiceProvider('provider-2', 'firebase-uid-1'),
      ).resolves.toBeUndefined();
    });

    it('lanza 403 si el provider no tiene dueño y el usuario es USER', async () => {
      prismaMock.user.findUnique.mockResolvedValue({
        id: 'u1',
        role: Role.USER,
      });
      prismaMock.serviceProvider.findUnique.mockResolvedValue({
        userId: null,
      });

      await expect(
        service.assertCanManageServiceProvider('provider-1', 'firebase-uid-1'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
