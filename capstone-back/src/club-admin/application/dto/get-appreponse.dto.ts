import { IsInt, IsNotEmpty } from "class-validator";

export class getAppResponseByApplicationDto {
    @IsInt()
    @IsNotEmpty()
    applicationId: number;
}