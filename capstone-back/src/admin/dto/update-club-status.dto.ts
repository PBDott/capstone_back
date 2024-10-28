import { ClubStatus } from "@prisma/client";
import { IsEnum, IsInt, IsNotEmpty } from "class-validator";

export class UpdateClubStatusDto {
    @IsInt()
    @IsNotEmpty()
    clubId: number;

    @IsEnum(ClubStatus)
    @IsNotEmpty()
    status: ClubStatus;
}