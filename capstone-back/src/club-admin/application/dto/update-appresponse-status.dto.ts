import { ApplicationStatus } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class UpdateAppResponseStatusDto {
    @IsInt()
    @IsNotEmpty()
    applicationId: number;
  
    @IsInt()
    @IsNotEmpty()
    userId: number;
  
    @IsEnum(ApplicationStatus)
    @IsNotEmpty()
    status: ApplicationStatus;
}