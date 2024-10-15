import { IsInt, IsNotEmpty } from "class-validator";

export class DeleteClubDto {
    @IsInt()
    @IsNotEmpty()
    clubId: number;
}