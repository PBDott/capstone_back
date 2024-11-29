import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateCalendarDto {
    @IsNotEmpty()
    @IsInt()
    calendarId: number;

    @IsNotEmpty()
    @IsDateString()
    dats: Date;

    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;
}