import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  // utilizo este constructor para que traiga todas las capcidades de PrismaService
  constructor(private readonly prisma: PrismaService) {}

  async createUser(
    createUserDto: CreateUserDto,
    firebaseUid: string,
    emailUser: string,
  ) {
    // aca uso el try catch porque si uso un if la respuesta nunca va a llegar y si hay un error no lo voy a detectar
    try {
      const completeData = {
        ...createUserDto,
        emailUser,
        firebaseUid,
      };
      return await this.prisma.user.create({ data: completeData });
    } catch (error) {
      // cuando la funcion choque con emailUser y con firebaseUid entonces se debe verificar lo siguiente
      // 1 que el error viene de prisma por eso el instanceof
      // 2 que el error del codigo sea P2002
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Ya existe un usuario con esos datos'); //Error 409
      }
      // aca si a pesar de eso hay otro error que no se captura con el if entonces igual detiene la funcion
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findUserByFirebaseUid(uid: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        firebaseUid: uid,
      },
    });
    if (!foundUser) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return foundUser;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        data: updateUserDto,
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('El usuario no existe para editarlo'); //Error 404
      }
      // si se vuelve editable un campo @unique, atrapar también P2002.

      throw error;
    }
  }

  async removeUser(id: string) {
    try {
      return await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('El usuario no existe para eliminarlo');
      } else if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2003'
      ) {
        throw new ConflictException(
          'El usuario no se puede eliminar porque tiene reviews o comments registrados', //Error 409
        );
      }
      throw error;
    }
  }
}
