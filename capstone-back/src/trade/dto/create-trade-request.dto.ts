import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { title } from "process";

export class CreateTradeRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  imageId: number;
}
