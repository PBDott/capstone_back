import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTradeDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsInt()
    @IsNotEmpty()
    price: number;

    @IsInt()
    @IsNotEmpty()
    sellerId: number;
}
