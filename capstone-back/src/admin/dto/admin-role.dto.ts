import { IsInt, IsNotEmpty } from "class-validator";

export class ChangeAdminDto {
    @IsInt()
    @IsNotEmpty()
    userId: number;
}