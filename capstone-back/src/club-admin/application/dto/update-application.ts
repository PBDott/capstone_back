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
  
}