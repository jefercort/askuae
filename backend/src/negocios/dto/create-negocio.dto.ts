import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateNegocioDto {
  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  userEmail!: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  description?: string;
}
