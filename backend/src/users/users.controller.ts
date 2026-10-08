import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // acá el controlador recibe los datos en formato json en DTO verifica que tengan la estructura correcta
  create(@Body() createUserDto: CreateUserDto) {
    // el servicio toma estos datos y le dice a prisma que los guarde
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':emailUser')
  findOne(@Param('emailUser') emailUser: string) {
    return this.usersService.findUser(emailUser);
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
