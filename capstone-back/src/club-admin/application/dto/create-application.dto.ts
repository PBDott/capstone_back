import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreasteApplicationDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    questions: string[];
  
    @IsInt()
    @IsNotEmpty()
    clubId: number; 
}