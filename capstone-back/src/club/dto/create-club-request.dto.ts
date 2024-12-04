import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateClubRequestDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  school: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  imageId: number;
}
