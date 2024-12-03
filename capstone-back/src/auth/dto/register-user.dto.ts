import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class RegisterUserDto {
    @IsNotEmpty()
    @IsString()
    kakaoId: string;

    @IsNotEmpty()
    @IsString()
    nickname: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    school: string;

    @IsNotEmpty()
    @IsString()
    major: string;

    @IsNotEmpty()
    @IsInt()
    studentId: number;
}