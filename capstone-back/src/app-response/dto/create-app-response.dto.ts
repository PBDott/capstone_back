import { ApplicationStatus } from '@prisma/client';
import { IsInt, IsObject, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateAppResponseDto {
  @IsInt()
  @IsNotEmpty()
  applicationId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number; 

  @IsObject()
  @IsNotEmpty()
  answers: string[]; 

  @IsObject()
  @IsNotEmpty()
  questions: string[];
}