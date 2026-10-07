import {
  IsEmail,
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

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  emailUser!: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  profileImg?: string;

  @IsNotEmpty()
  @IsEnum(AuthProvider)
  authProvider!: AuthProvider;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  firebaseUid!: string;
}
