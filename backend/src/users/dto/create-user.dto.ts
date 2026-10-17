import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { AuthProvider } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nameUser!: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  profileImg?: string;

  @IsNotEmpty()
  @IsEnum(AuthProvider)
  authProvider!: AuthProvider;
}
