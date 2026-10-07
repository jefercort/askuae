import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nameUser!: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  emailUser!: string;

  @IsString()
  @IsNotEmpty()
  role!: string;

  @IsString()
  @IsOptional()
  profileImg?: string;

  @IsString()
  @IsNotEmpty()
  userFrom!: string;
}
