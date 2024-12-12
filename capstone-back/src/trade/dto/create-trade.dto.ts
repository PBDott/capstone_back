import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTradeDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  sellerId: number;

  @IsInt()
  imageIds: number[];
}
