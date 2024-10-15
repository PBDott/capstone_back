import { PartialType } from '@nestjs/mapped-types';
import { CreateClubDto } from './create-club.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateClubDto extends PartialType(CreateClubDto) {
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
