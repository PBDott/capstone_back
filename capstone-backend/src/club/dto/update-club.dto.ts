import { PartialType } from '@nestjs/mapped-types';
import { CreateClubDto } from './create-club.dto';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateClubDto extends PartialType(CreateClubDto) {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  school: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  @IsNotEmpty()
  adminList: number[];
}
