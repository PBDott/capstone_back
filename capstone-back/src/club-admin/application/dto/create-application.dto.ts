import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreasteApplicationDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    question: string;

    @IsDateString()
    @IsNotEmpty()
    from: Date; 
  
    @IsDateString()
    @IsNotEmpty()
    to: Date; 
  
    @IsDateString()
    @IsNotEmpty()
    interviewFrom: Date; 
  
    @IsDateString()
    @IsNotEmpty()
    interviewTo: Date; 
  
    @IsInt()
    @IsNotEmpty()
    clubId: number; 
}