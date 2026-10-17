import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FirebaseAuthGuard } from '../firebase/firebase-auth.guard';
import { CurrentUser } from '../firebase/current-user.decorator';
import type { DecodedIdToken } from 'firebase-admin/auth';

@UseGuards(FirebaseAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  // acá el controlador recibe los datos en formato json en DTO verifica que tengan la estructura correcta
  // tambien le agrege el decorador que creé que es el CurrentUser y los parametros vienen en DecodedIdToken
  create(
    // un decorador por parametro pegado a el
    @Body() createUserDto: CreateUserDto,
    @CurrentUser() user: DecodedIdToken,
  ) {
    // En esta opcion tambien puedo usar BadRequestException para informar que el dato viene mal formado
    // pero en este caso uso UnauthorizedException porque es una identidad que viene incompleta
    if (!user.email) {
      throw new UnauthorizedException(
        'La identidad está incompleta por el email',
      );
    }
    // el servicio toma estos datos y le dice a prisma que los guarde
    return this.usersService.createUser(createUserDto, user.uid, user.email);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('me')
  getMyProfile(@CurrentUser() user: DecodedIdToken) {
    return this.usersService.findUserByFirebaseUid(user.uid);
  }

  @Patch(':id')
  update(
    // valida que el id tenga formato UUID; si no, responde 400 en vez de que Postgres falle con un 500
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.removeUser(id);
  }
}
