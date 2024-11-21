import { IsInt, IsObject, IsNotEmpty } from 'class-validator';

export class CreateAppResponseDto {
  @IsInt()
  @IsNotEmpty()
  applicationId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number; 

  @IsObject()
  @IsNotEmpty()
  answers: Record<string, string>; 
}