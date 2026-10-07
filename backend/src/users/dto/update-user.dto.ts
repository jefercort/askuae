import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// aca uso PickType porque solo necesito que se PATCH una unica variable de User
// PartialType se usa para que las variables de User las que estan dentro del dto sean opcionalmente editadas
export class UpdateUserDto extends PickType(CreateUserDto, [
  'nameUser',
] as const) {}
