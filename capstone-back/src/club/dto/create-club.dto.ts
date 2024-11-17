import { IsNotEmpty, IsString } from "class-validator";

export class CreateClubDto {

    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;
}
