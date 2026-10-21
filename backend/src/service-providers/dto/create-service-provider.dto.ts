import { City } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateServiceProviderDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @IsEmail()
  @IsOptional()
  @MaxLength(255)
  email?: string;

  @IsPhoneNumber()
  @IsOptional()
  @MaxLength(50)
  phone1?: string;

  @IsPhoneNumber()
  @IsOptional()
  @MaxLength(50)
  phone2?: string;

  @IsBoolean()
  @IsOptional()
  wp1?: boolean;

  @IsBoolean()
  @IsOptional()
  wp2?: boolean;

  @IsBoolean()
  @IsOptional()
  tg1?: boolean;

  @IsBoolean()
  @IsOptional()
  tg2?: boolean;

  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  instaUrl?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  tiktokUrl?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(255)
  websiteUrl?: string;

  @IsEnum(City)
  city!: City;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  address?: string;

  @IsUrl()
  @IsOptional()
  @MaxLength(2048)
  mapsUrl?: string;
}
