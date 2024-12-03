import { IsDateString, IsInt, IsNotEmpty, IsString } from "class-validator";

export class UpdateApplicationDto {
    @IsInt()
    @IsNotEmpty()
    applicationId: number; 

    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    questions: string[];

    @IsString()
    @IsNotEmpty()
    from: string; 
  
    @IsString()
    @IsNotEmpty()
    to: string; 
  
    @IsString()
    @IsNotEmpty()
    interviewFrom: string; 
  
    @IsString()
    @IsNotEmpty()
    interviewTo: string; 
  
}