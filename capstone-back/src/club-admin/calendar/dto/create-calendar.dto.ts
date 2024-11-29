import { IsNotEmpty, IsString, IsDateString, IsInt } from 'class-validator';

export class CreateCalendarDto {
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsInt()
    clubId: number;
}