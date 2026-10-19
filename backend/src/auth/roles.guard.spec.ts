import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { PrismaService } from '../prisma/prisma.service';

describe('RolesGuard', () => {
  it('should be defined', () => {
    expect(new RolesGuard({} as Reflector, {} as PrismaService)).toBeDefined();
  });
});
