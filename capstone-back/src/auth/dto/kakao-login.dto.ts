import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class KakaoLoginDto {
    @IsNotEmpty()
    @IsString()
    kakaoId: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}