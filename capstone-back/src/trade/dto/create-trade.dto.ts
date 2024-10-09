import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateTradeDto {

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    publication: string;
    
    @IsString()
    @IsNotEmpty()
    seller: string;

    @IsInt()
    @IsNotEmpty()
    price: number;
}
