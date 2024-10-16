import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class KakaoLoginDto {
    @IsNotEmpty()
    @IsString()
    kakaoId: string;

    @IsOptional()
    @IsString()
    nickName: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    school: string;

    @IsOptional()
    @IsString()
    major: string;

    @IsOptional()
    @IsInt()
    studentId: number;  
}
