import { PartialType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class UpdateBoardDto {
    @IsInt()
    @IsNotEmpty()
    boardId: number;
    
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    comment: string;
}
