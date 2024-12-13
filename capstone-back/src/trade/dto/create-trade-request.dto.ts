import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTradeRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  imageIds: number[];
}
