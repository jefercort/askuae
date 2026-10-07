import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  // utilizo este constructor para que traiga todas las capcidades de PrismaService
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.prisma.user.create({ data: createUserDto });
    return {
      message: 'Usuario creado correctamente',
      userCreated: newUser,
    };
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(emailUser: string) {
    return await this.prisma.user.findUnique({
      where: {
        emailUser: emailUser,
      },
    });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
