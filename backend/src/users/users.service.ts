import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  // utilizo este constructor para que traiga todas las capcidades de PrismaService
  constructor(private readonly prisma: PrismaService) { }

  async createUser(createUserDto: CreateUserDto) {
    // aca uso el try catch porque si uso un if la respuesta nunca va a llegar y si hay un error no lo voy a detectar
    try {
      return await this.prisma.user.create({ data: createUserDto });
    } catch (error) {
      // cuando la funcion choque con emailUser y con firebaseUid entonces se debe verificar lo siguiente
      // 1 que el error viene de prisma por eso el instanceof
      // 2 que el error del codigo sea P2002
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Ya existe un usuario con esos datos');
      }
      // aca si a pesar de eso hay otro error que no se captura con el if entonces igual detiene la funcion
      throw error;
    }
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findUser(emailUser: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        emailUser: emailUser,
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
        throw new NotFoundException('El usuario no existe para editarlo');
      }
      // en caso que tuviera que se puediera editar el correo o el firebaseUid pero como no enotnces queda comentado
      // if (
      //   error instanceof Prisma.PrismaClientKnownRequestError &&
      //   error.code === 'P2002'
      // ) {
      //   throw new ConflictException('Ya existe un usuario con ese correo');
      // }
      throw error;
    }
  }

  removeUser(id: string) {
    return `This action removes a #${id} user`;
  }
}
