import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateCalendarDto {
    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsInt()
    clubId: number;
}