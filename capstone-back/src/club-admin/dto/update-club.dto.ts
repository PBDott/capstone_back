import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateClubDto {
    @IsInt()
    @IsNotEmpty()
    clubId: number;
    
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    location: string;

    @IsString()
    @IsNotEmpty()
    description: string;
}
