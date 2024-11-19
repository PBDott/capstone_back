import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteApplicationDto {
    @IsInt()
    @IsNotEmpty()
    applicationId: number; 
}